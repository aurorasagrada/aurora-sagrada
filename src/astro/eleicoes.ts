/**
 * Sistema de Eleições Mágicas
 * Calcula scores para diferentes temas baseado em posições planetárias e aspectos
 */

import { ElectionScore, DayData } from '@/lib/types';
import { getAllPlanets, isRetrograde } from './engine-efemerides';
import { calculateAspects, filterAspectsByType, classifyAspectsByNature } from './aspectos';
import { getLunarPhase } from './fases-lunares';
import { getLunarMansion } from './mansoes-lunares';
import { getZodiacSign } from '@/lib/date';

// Carrega configuração de eleições
let electionConfig: any = null;

async function loadElectionConfig() {
  if (!electionConfig) {
    try {
      const response = await fetch('/data/eleicoes-magickas.json');
      electionConfig = await response.json();
    } catch (error) {
      console.error('Erro ao carregar configuração de eleições:', error);
      // Configuração padrão mínima
      electionConfig = {
        weights: {
          amor: { venus: 1.0, lua: 0.6 },
          trabalho: { saturno: 0.8, mercurio: 0.7 },
          beleza: { venus: 1.0 },
          prosperidade: { jupiter: 1.0 },
          justica: { jupiter: 0.7, saturno: 0.6 },
          contato: { netuno: 0.9, lua: 0.7 }
        },
        rules: []
      };
    }
  }
}

/**
 * Calcula score de eleição para um tema específico
 */
export async function calculateElectionScore(
  date: Date,
  theme: string
): Promise<ElectionScore> {
  await loadElectionConfig();
  
  try {
    const [positions, aspects, lunarPhase] = await Promise.all([
      getAllPlanets(date),
      calculateAspects(date),
      getLunarPhase(date)
    ]);
    
    const moon = positions.moon;
    const mansion = getLunarMansion(moon.longitude);
    
    const weights = electionConfig.weights[theme.toLowerCase()] || {};
    let score = 0;
    const factors = {
      positive: [] as string[],
      negative: [] as string[],
      neutral: [] as string[]
    };
    
    // Avalia planetas principais
    for (const [planet, weight] of Object.entries(weights)) {
      if (typeof weight === 'number' && positions[planet as keyof typeof positions]) {
        const planetPos = positions[planet as keyof typeof positions] as any;
        const planetScore = await evaluatePlanet(planet, planetPos, date);
        
        score += planetScore * weight;
        
        if (planetScore > 0) {
          factors.positive.push(`${planet} favorável (+${(planetScore * weight).toFixed(1)})`);
        } else if (planetScore < 0) {
          factors.negative.push(`${planet} desfavorável (${(planetScore * weight).toFixed(1)})`);
        }
      }
    }
    
    // Avalia aspectos
    const aspectScore = evaluateAspects(aspects, theme);
    score += aspectScore.score;
    factors.positive.push(...aspectScore.positive);
    factors.negative.push(...aspectScore.negative);
    
    // Avalia fase lunar
    const phaseScore = evaluateLunarPhase(lunarPhase, theme);
    score += phaseScore.score;
    if (phaseScore.description) {
      if (phaseScore.score > 0) {
        factors.positive.push(phaseScore.description);
      } else if (phaseScore.score < 0) {
        factors.negative.push(phaseScore.description);
      } else {
        factors.neutral.push(phaseScore.description);
      }
    }
    
    // Avalia mansão lunar
    const mansionScore = evaluateLunarMansion(mansion, theme);
    score += mansionScore.score;
    if (mansionScore.description) {
      if (mansionScore.score > 0) {
        factors.positive.push(mansionScore.description);
      } else if (mansionScore.score < 0) {
        factors.negative.push(mansionScore.description);
      }
    }
    
    // Aplica regras especiais
    const rulesResult = await applySpecialRules(date, theme, score);
    score = rulesResult.score;
    factors.negative.push(...rulesResult.penalties);
    
    // Normaliza score para 0-1
    score = Math.max(0, Math.min(1, score));
    
    // Determina recomendação
    let recommendation: ElectionScore['recommendation'];
    if (score >= 0.8) recommendation = 'excellent';
    else if (score >= 0.6) recommendation = 'good';
    else if (score >= 0.4) recommendation = 'fair';
    else if (score >= 0.2) recommendation = 'poor';
    else recommendation = 'avoid';
    
    return {
      theme,
      score,
      factors,
      recommendation
    };
  } catch (error) {
    console.error(`Erro ao calcular eleição para ${theme}:`, error);
    return {
      theme,
      score: 0,
      factors: { positive: [], negative: ['Erro no cálculo'], neutral: [] },
      recommendation: 'avoid'
    };
  }
}

/**
 * Avalia um planeta individual
 */
async function evaluatePlanet(planetName: string, position: any, date: Date): Promise<number> {
  let score = 0;
  
  // Verifica retrogradação
  const retrograde = await isRetrograde(planetName, date);
  if (retrograde) {
    score -= 0.3; // Penalidade por retrogradação
  }
  
  // Avalia dignidades simples (domicílio/exaltação)
  const dignityScore = evaluateDignity(planetName, position.longitude);
  score += dignityScore;
  
  // Avalia velocidade (planetas muito lentos podem ser menos efetivos)
  if (Math.abs(position.speed) < 0.1) {
    score -= 0.1; // Penalidade por movimento muito lento
  }
  
  return score;
}

/**
 * Avalia dignidades essenciais simples
 */
function evaluateDignity(planetName: string, longitude: number): number {
  const sign = getZodiacSign(longitude);
  
  // Dignidades simplificadas
  const dignities: Record<string, Record<string, number>> = {
    sun: { 'Leão': 0.5, 'Áries': 0.3, 'Aquário': -0.3, 'Libra': -0.5 },
    moon: { 'Câncer': 0.5, 'Touro': 0.3, 'Capricórnio': -0.3, 'Escorpião': -0.5 },
    mercury: { 'Gêmeos': 0.5, 'Virgem': 0.5, 'Sagitário': -0.3, 'Peixes': -0.5 },
    venus: { 'Touro': 0.5, 'Libra': 0.5, 'Peixes': 0.3, 'Escorpião': -0.3, 'Áries': -0.5 },
    mars: { 'Áries': 0.5, 'Escorpião': 0.5, 'Capricórnio': 0.3, 'Libra': -0.3, 'Touro': -0.5 },
    jupiter: { 'Sagitário': 0.5, 'Peixes': 0.5, 'Câncer': 0.3, 'Gêmeos': -0.3, 'Virgem': -0.5 },
    saturn: { 'Capricórnio': 0.5, 'Aquário': 0.5, 'Libra': 0.3, 'Câncer': -0.3, 'Áries': -0.5 }
  };
  
  const planetDignities = dignities[planetName.toLowerCase()];
  return planetDignities?.[sign] || 0;
}

/**
 * Avalia aspectos para um tema
 */
function evaluateAspects(aspects: any[], theme: string): {
  score: number;
  positive: string[];
  negative: string[];
} {
  const { benefic, malefic } = classifyAspectsByNature(aspects);
  const positive: string[] = [];
  const negative: string[] = [];
  
  let score = 0;
  
  // Aspectos benéficos
  benefic.forEach(aspect => {
    const aspectScore = aspect.exact ? 0.3 : 0.2;
    score += aspectScore;
    positive.push(`${aspect.type} ${aspect.planet1}-${aspect.planet2} (+${aspectScore.toFixed(1)})`);
  });
  
  // Aspectos maléficos
  malefic.forEach(aspect => {
    const aspectScore = aspect.exact ? -0.3 : -0.2;
    score += aspectScore;
    negative.push(`${aspect.type} ${aspect.planet1}-${aspect.planet2} (${aspectScore.toFixed(1)})`);
  });
  
  return { score, positive, negative };
}

/**
 * Avalia fase lunar para um tema
 */
function evaluateLunarPhase(phase: any, theme: string): {
  score: number;
  description?: string;
} {
  const phaseScores: Record<string, Record<string, number>> = {
    amor: { 'Crescente': 0.3, 'Cheia': 0.4, 'Minguante': -0.1, 'Nova': 0.1 },
    trabalho: { 'Crescente': 0.2, 'Cheia': 0.1, 'Minguante': 0.3, 'Nova': 0.2 },
    beleza: { 'Crescente': 0.4, 'Cheia': 0.3, 'Minguante': -0.2, 'Nova': 0.1 },
    prosperidade: { 'Crescente': 0.4, 'Cheia': 0.3, 'Minguante': -0.1, 'Nova': 0.2 },
    justica: { 'Crescente': 0.2, 'Cheia': 0.3, 'Minguante': 0.2, 'Nova': 0.1 },
    contato: { 'Crescente': 0.2, 'Cheia': 0.4, 'Minguante': 0.3, 'Nova': 0.4 }
  };
  
  const themeScores = phaseScores[theme.toLowerCase()] || {};
  const score = themeScores[phase.name] || 0;
  
  return {
    score,
    description: score !== 0 ? `Lua ${phase.name} (${score > 0 ? '+' : ''}${score.toFixed(1)})` : undefined
  };
}

/**
 * Avalia mansão lunar para um tema
 */
function evaluateLunarMansion(mansion: any, theme: string): {
  score: number;
  description?: string;
} {
  // Verifica se a mansão é favorável para o tema
  const favorable = mansion.favorable_for.some((fav: string) => 
    fav.toLowerCase().includes(theme.toLowerCase()) ||
    theme.toLowerCase().includes(fav.toLowerCase())
  );
  
  const avoid = mansion.avoid_for.some((av: string) => 
    av.toLowerCase().includes(theme.toLowerCase()) ||
    theme.toLowerCase().includes(av.toLowerCase())
  );
  
  let score = 0;
  let description = '';
  
  if (favorable) {
    score = 0.3;
    description = `Mansão ${mansion.name} favorável (+0.3)`;
  } else if (avoid) {
    score = -0.4;
    description = `Mansão ${mansion.name} desfavorável (-0.4)`;
  }
  
  return { score, description: description || undefined };
}

/**
 * Aplica regras especiais
 */
async function applySpecialRules(date: Date, theme: string, currentScore: number): Promise<{
  score: number;
  penalties: string[];
}> {
  const penalties: string[] = [];
  let score = currentScore;
  
  // Verifica Lua vazia de curso
  // (implementação simplificada - na prática usaria isVoidOfCourse)
  
  // Verifica eclipses
  // (implementação futura)
  
  // Verifica retrogradações críticas
  const criticalRetrogrades = ['mercury', 'venus', 'mars'];
  for (const planet of criticalRetrogrades) {
    if (await isRetrograde(planet, date)) {
      score *= 0.8; // Reduz 20%
      penalties.push(`${planet} retrógrado (-20%)`);
    }
  }
  
  return { score, penalties };
}

/**
 * Calcula scores para todos os temas
 */
export async function calculateAllElectionScores(date: Date): Promise<ElectionScore[]> {
  await loadElectionConfig();
  
  const themes = Object.keys(electionConfig.weights);
  const scores: ElectionScore[] = [];
  
  for (const theme of themes) {
    try {
      const score = await calculateElectionScore(date, theme);
      scores.push(score);
    } catch (error) {
      console.warn(`Erro ao calcular score para ${theme}:`, error);
    }
  }
  
  return scores.sort((a, b) => b.score - a.score);
}

/**
 * Obtém melhores datas para um tema em um período
 */
export async function getBestDatesForTheme(
  theme: string,
  startDate: Date,
  endDate: Date,
  minScore: number = 0.6
): Promise<{ date: Date; score: ElectionScore }[]> {
  const results: { date: Date; score: ElectionScore }[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    try {
      const score = await calculateElectionScore(currentDate, theme);
      if (score.score >= minScore) {
        results.push({
          date: new Date(currentDate),
          score
        });
      }
    } catch (error) {
      console.warn(`Erro ao calcular score para ${currentDate}:`, error);
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return results.sort((a, b) => b.score.score - a.score.score);
}


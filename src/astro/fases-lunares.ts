/**
 * Sistema de Fases Lunares
 * Inclui cálculo de fases, esbats, eclipses e Lua vazia de curso
 */

import { LunarPhase, VoidOfCourse, Aspect } from '@/lib/types';
import { calculateLunarPhase, normalizeDegrees } from '@/lib/math';
import { getMoon, getSun, getAllPlanets } from './engine-efemerides';
import { calculateAspects } from './aspectos';

/**
 * Calcula a fase lunar para uma data
 */
export async function getLunarPhase(date: Date): Promise<LunarPhase> {
  try {
    const [sun, moon] = await Promise.all([
      getSun(date),
      getMoon(date)
    ]);
    
    const phaseData = calculateLunarPhase(sun.longitude, moon.longitude);
    
    // Calcula próximas fases
    const nextNewMoon = await findNextPhase(date, 'Nova');
    const nextFullMoon = await findNextPhase(date, 'Cheia');
    
    return {
      name: phaseData.phase,
      illumination: phaseData.illumination,
      age: phaseData.age,
      distance: moon.distance,
      angular_diameter: calculateAngularDiameter(moon.distance),
      next_new_moon: nextNewMoon,
      next_full_moon: nextFullMoon
    };
  } catch (error) {
    console.error('Erro ao calcular fase lunar:', error);
    throw new Error('Erro no cálculo da fase lunar');
  }
}

/**
 * Calcula o diâmetro angular da Lua
 */
function calculateAngularDiameter(distance: number): number {
  // Diâmetro angular médio da Lua é ~31.1 arcmin
  // Varia com a distância (perigeu ~33.5', apogeu ~29.3')
  const meanDistance = 384400; // km
  const meanDiameter = 31.1; // arcmin
  
  return (meanDiameter * meanDistance) / distance;
}

/**
 * Encontra a próxima ocorrência de uma fase específica
 */
async function findNextPhase(startDate: Date, targetPhase: string): Promise<Date> {
  let currentDate = new Date(startDate);
  let attempts = 0;
  const maxAttempts = 60; // Máximo 60 dias de busca
  
  while (attempts < maxAttempts) {
    currentDate.setDate(currentDate.getDate() + 1);
    attempts++;
    
    try {
      const [sun, moon] = await Promise.all([
        getSun(currentDate),
        getMoon(currentDate)
      ]);
      
      const phase = calculateLunarPhase(sun.longitude, moon.longitude);
      
      if (phase.phase === targetPhase) {
        return currentDate;
      }
    } catch (error) {
      console.warn(`Erro ao calcular fase para ${currentDate}:`, error);
    }
  }
  
  // Se não encontrou, retorna uma estimativa baseada no ciclo lunar
  const daysToAdd = targetPhase === 'Nova' ? 29.53 : 14.77;
  return new Date(startDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
}

/**
 * Verifica se é uma superlua
 */
export async function isSuperMoon(date: Date): Promise<boolean> {
  try {
    const moon = await getMoon(date);
    const phase = await getLunarPhase(date);
    
    // Superlua: Lua Cheia ou Nova com distância < 360.000 km
    const isFullOrNew = phase.name === 'Cheia' || phase.name === 'Nova';
    const isClose = moon.distance < 360000;
    
    return isFullOrNew && isClose;
  } catch (error) {
    console.error('Erro ao verificar superlua:', error);
    return false;
  }
}

/**
 * Verifica se é uma Blue Moon (segunda Lua Cheia no mês)
 */
export async function isBlueMoon(date: Date): Promise<boolean> {
  try {
    const phase = await getLunarPhase(date);
    if (phase.name !== 'Cheia') return false;
    
    // Verifica se houve outra Lua Cheia no mesmo mês
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    let fullMoonCount = 0;
    let currentDate = new Date(startOfMonth);
    
    while (currentDate <= endOfMonth) {
      try {
        const dayPhase = await getLunarPhase(currentDate);
        if (dayPhase.name === 'Cheia') {
          fullMoonCount++;
        }
      } catch (error) {
        // Ignora erros em dias individuais
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return fullMoonCount >= 2;
  } catch (error) {
    console.error('Erro ao verificar Blue Moon:', error);
    return false;
  }
}

/**
 * Verifica se é uma Black Moon (segunda Lua Nova no mês)
 */
export async function isBlackMoon(date: Date): Promise<boolean> {
  try {
    const phase = await getLunarPhase(date);
    if (phase.name !== 'Nova') return false;
    
    // Verifica se houve outra Lua Nova no mesmo mês
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    let newMoonCount = 0;
    let currentDate = new Date(startOfMonth);
    
    while (currentDate <= endOfMonth) {
      try {
        const dayPhase = await getLunarPhase(currentDate);
        if (dayPhase.name === 'Nova') {
          newMoonCount++;
        }
      } catch (error) {
        // Ignora erros em dias individuais
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return newMoonCount >= 2;
  } catch (error) {
    console.error('Erro ao verificar Black Moon:', error);
    return false;
  }
}

/**
 * Calcula se a Lua está vazia de curso
 */
export async function isVoidOfCourse(date: Date): Promise<VoidOfCourse | null> {
  try {
    const moon = await getMoon(date);
    const currentSign = Math.floor(moon.longitude / 30);
    const nextSignStart = (currentSign + 1) * 30;
    
    // Calcula aspectos da Lua com outros planetas
    const aspects = await calculateAspects(date);
    const moonAspects = aspects.filter(aspect => 
      aspect.planet1.toLowerCase() === 'moon' || aspect.planet2.toLowerCase() === 'moon'
    );
    
    // Encontra o último aspecto aplicativo da Lua
    let lastApplyingAspect: Aspect | null = null;
    let lastAspectTime = new Date(0);
    
    for (const aspect of moonAspects) {
      if (aspect.applying) {
        // Estima quando o aspecto ficará exato
        const aspectTime = estimateExactAspectTime(date, aspect);
        if (aspectTime > lastAspectTime) {
          lastAspectTime = aspectTime;
          lastApplyingAspect = aspect;
        }
      }
    }
    
    // Se não há aspectos aplicativos, a Lua pode estar vazia de curso
    if (!lastApplyingAspect) {
      // Calcula quando a Lua muda de signo
      const timeToSignChange = calculateTimeToSignChange(moon.longitude, moon.speed);
      const signChangeTime = new Date(date.getTime() + timeToSignChange);
      
      return {
        start: date,
        end: signChangeTime,
        duration_hours: timeToSignChange / (1000 * 60 * 60),
        last_aspect: moonAspects[moonAspects.length - 1] || null,
        next_sign: getSignName((currentSign + 1) % 12)
      };
    }
    
    // Se o último aspecto aplicativo acontece antes da mudança de signo,
    // a Lua fica vazia de curso após esse aspecto
    const timeToSignChange = calculateTimeToSignChange(moon.longitude, moon.speed);
    const signChangeTime = new Date(date.getTime() + timeToSignChange);
    
    if (lastAspectTime < signChangeTime) {
      return {
        start: lastAspectTime,
        end: signChangeTime,
        duration_hours: (signChangeTime.getTime() - lastAspectTime.getTime()) / (1000 * 60 * 60),
        last_aspect: lastApplyingAspect,
        next_sign: getSignName((currentSign + 1) % 12)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao calcular Lua vazia de curso:', error);
    return null;
  }
}

/**
 * Estima quando um aspecto ficará exato
 */
function estimateExactAspectTime(date: Date, aspect: Aspect): Date {
  // Estimativa simples baseada no orbe atual
  // Em uma implementação mais precisa, usaríamos as velocidades dos planetas
  const hoursPerDegree = 2; // Aproximação
  const hoursToExact = aspect.orb * hoursPerDegree;
  
  return new Date(date.getTime() + (hoursToExact * 60 * 60 * 1000));
}

/**
 * Calcula tempo até a Lua mudar de signo
 */
function calculateTimeToSignChange(longitude: number, speed: number): number {
  const currentSign = Math.floor(longitude / 30);
  const nextSignStart = (currentSign + 1) * 30;
  const degreesToGo = nextSignStart - longitude;
  
  // Tempo em dias, convertido para milissegundos
  const daysToGo = degreesToGo / Math.abs(speed);
  return daysToGo * 24 * 60 * 60 * 1000;
}

/**
 * Obtém nome do signo por índice
 */
function getSignName(signIndex: number): string {
  const signs = [
    'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
    'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
  ];
  return signs[signIndex] || 'Desconhecido';
}

/**
 * Obtém informações completas da Lua para uma data
 */
export async function getCompleteLunarInfo(date: Date): Promise<{
  phase: LunarPhase;
  voidOfCourse: VoidOfCourse | null;
  isSuperMoon: boolean;
  isBlueMoon: boolean;
  isBlackMoon: boolean;
}> {
  try {
    const [phase, voidOfCourse, superMoon, blueMoon, blackMoon] = await Promise.all([
      getLunarPhase(date),
      isVoidOfCourse(date),
      isSuperMoon(date),
      isBlueMoon(date),
      isBlackMoon(date)
    ]);
    
    return {
      phase,
      voidOfCourse,
      isSuperMoon: superMoon,
      isBlueMoon: blueMoon,
      isBlackMoon: blackMoon
    };
  } catch (error) {
    console.error('Erro ao obter informações lunares completas:', error);
    throw new Error('Erro ao calcular informações lunares');
  }
}


/**
 * Sistema de Aspectos Astrológicos
 * Detecta aspectos entre planetas com orbes configuráveis
 */

import { Aspect, PlanetPosition, SolarSystemPositions } from '@/lib/types';
import { calculateAspect, isAspectApplying, angleDifference } from '@/lib/math';
import { getAllPlanets } from './engine-efemerides';

// Configuração padrão de orbes por aspecto
const DEFAULT_ORBS = {
  conjunction: 8,
  sextile: 4,
  square: 6,
  trine: 6,
  opposition: 8
};

// Orbes especiais por planeta
const PLANET_ORBS = {
  sun: 10,
  moon: 12,
  mercury: 6,
  venus: 6,
  mars: 6,
  jupiter: 8,
  saturn: 8,
  uranus: 4,
  neptune: 4,
  pluto: 4
};

/**
 * Calcula todos os aspectos para uma data
 */
export async function calculateAspects(
  date: Date, 
  customOrbs?: Partial<typeof DEFAULT_ORBS>
): Promise<Aspect[]> {
  try {
    const positions = await getAllPlanets(date);
    const orbs = { ...DEFAULT_ORBS, ...customOrbs };
    const aspects: Aspect[] = [];
    
    const planets = Object.entries(positions) as [string, PlanetPosition][];
    
    // Calcula aspectos entre todos os pares de planetas
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const [planet1Name, planet1] = planets[i];
        const [planet2Name, planet2] = planets[j];
        
        const aspectData = calculateAspect(planet1.longitude, planet2.longitude);
        
        if (aspectData.type) {
          // Verifica se está dentro do orbe
          const maxOrb = getMaxOrb(planet1Name, planet2Name, aspectData.type, orbs);
          
          if (aspectData.orb <= maxOrb) {
            const applying = isAspectApplying(
              planet1.longitude,
              planet1.speed,
              planet2.longitude,
              planet2.speed,
              getAspectAngle(aspectData.type)
            );
            
            aspects.push({
              planet1: planet1Name,
              planet2: planet2Name,
              type: aspectData.type as Aspect['type'],
              angle: aspectData.angle,
              orb: aspectData.orb,
              exact: aspectData.orb < 1,
              applying,
              separating: !applying
            });
          }
        }
      }
    }
    
    // Ordena por orbe (aspectos mais exatos primeiro)
    return aspects.sort((a, b) => a.orb - b.orb);
  } catch (error) {
    console.error('Erro ao calcular aspectos:', error);
    throw new Error('Erro no cálculo de aspectos');
  }
}

/**
 * Obtém o orbe máximo para um aspecto entre dois planetas
 */
function getMaxOrb(
  planet1: string, 
  planet2: string, 
  aspectType: string, 
  orbs: typeof DEFAULT_ORBS
): number {
  const baseOrb = orbs[aspectType as keyof typeof orbs] || 4;
  
  // Aplica orbes especiais para Sol e Lua
  const planet1Orb = PLANET_ORBS[planet1 as keyof typeof PLANET_ORBS] || baseOrb;
  const planet2Orb = PLANET_ORBS[planet2 as keyof typeof PLANET_ORBS] || baseOrb;
  
  // Usa o maior orbe entre os dois planetas
  return Math.max(planet1Orb, planet2Orb, baseOrb);
}

/**
 * Obtém o ângulo padrão para um tipo de aspecto
 */
function getAspectAngle(aspectType: string): number {
  const angles = {
    conjunction: 0,
    sextile: 60,
    square: 90,
    trine: 120,
    opposition: 180
  };
  
  return angles[aspectType as keyof typeof angles] || 0;
}

/**
 * Filtra aspectos por tipo
 */
export function filterAspectsByType(
  aspects: Aspect[], 
  types: Aspect['type'][]
): Aspect[] {
  return aspects.filter(aspect => types.includes(aspect.type));
}

/**
 * Filtra aspectos por planeta
 */
export function filterAspectsByPlanet(
  aspects: Aspect[], 
  planetName: string
): Aspect[] {
  return aspects.filter(aspect => 
    aspect.planet1.toLowerCase() === planetName.toLowerCase() ||
    aspect.planet2.toLowerCase() === planetName.toLowerCase()
  );
}

/**
 * Obtém aspectos exatos (orbe < 1°)
 */
export function getExactAspects(aspects: Aspect[]): Aspect[] {
  return aspects.filter(aspect => aspect.exact);
}

/**
 * Obtém aspectos aplicativos
 */
export function getApplyingAspects(aspects: Aspect[]): Aspect[] {
  return aspects.filter(aspect => aspect.applying);
}

/**
 * Obtém aspectos separativos
 */
export function getSeparatingAspects(aspects: Aspect[]): Aspect[] {
  return aspects.filter(aspect => aspect.separating);
}

/**
 * Classifica aspectos por natureza (benéfico/maléfico)
 */
export function classifyAspectsByNature(aspects: Aspect[]): {
  benefic: Aspect[];
  malefic: Aspect[];
  neutral: Aspect[];
} {
  const benefic: Aspect[] = [];
  const malefic: Aspect[] = [];
  const neutral: Aspect[] = [];
  
  aspects.forEach(aspect => {
    switch (aspect.type) {
      case 'sextile':
      case 'trine':
        benefic.push(aspect);
        break;
      case 'square':
      case 'opposition':
        malefic.push(aspect);
        break;
      case 'conjunction':
        neutral.push(aspect);
        break;
    }
  });
  
  return { benefic, malefic, neutral };
}

/**
 * Obtém aspectos de um planeta específico
 */
export async function getPlanetAspects(
  date: Date, 
  planetName: string,
  customOrbs?: Partial<typeof DEFAULT_ORBS>
): Promise<Aspect[]> {
  const allAspects = await calculateAspects(date, customOrbs);
  return filterAspectsByPlanet(allAspects, planetName);
}

/**
 * Verifica se dois planetas estão em aspecto
 */
export async function areInAspect(
  date: Date,
  planet1: string,
  planet2: string,
  aspectType?: Aspect['type']
): Promise<Aspect | null> {
  const aspects = await calculateAspects(date);
  
  const aspect = aspects.find(a => 
    (a.planet1.toLowerCase() === planet1.toLowerCase() && 
     a.planet2.toLowerCase() === planet2.toLowerCase()) ||
    (a.planet1.toLowerCase() === planet2.toLowerCase() && 
     a.planet2.toLowerCase() === planet1.toLowerCase())
  );
  
  if (!aspect) return null;
  
  if (aspectType && aspect.type !== aspectType) return null;
  
  return aspect;
}

/**
 * Obtém estatísticas dos aspectos
 */
export function getAspectStatistics(aspects: Aspect[]): {
  total: number;
  byType: Record<string, number>;
  exact: number;
  applying: number;
  separating: number;
  averageOrb: number;
} {
  const byType: Record<string, number> = {};
  let totalOrb = 0;
  
  aspects.forEach(aspect => {
    byType[aspect.type] = (byType[aspect.type] || 0) + 1;
    totalOrb += aspect.orb;
  });
  
  return {
    total: aspects.length,
    byType,
    exact: aspects.filter(a => a.exact).length,
    applying: aspects.filter(a => a.applying).length,
    separating: aspects.filter(a => a.separating).length,
    averageOrb: aspects.length > 0 ? totalOrb / aspects.length : 0
  };
}

/**
 * Formata aspecto como string legível
 */
export function formatAspect(aspect: Aspect): string {
  const typeNames = {
    conjunction: 'Conjunção',
    sextile: 'Sextil',
    square: 'Quadratura',
    trine: 'Trígono',
    opposition: 'Oposição'
  };
  
  const typeName = typeNames[aspect.type] || aspect.type;
  const status = aspect.applying ? 'aplicativo' : 'separativo';
  const exactText = aspect.exact ? ' (exato)' : ` (orbe ${aspect.orb.toFixed(1)}°)`;
  
  return `${aspect.planet1} ${typeName} ${aspect.planet2} ${status}${exactText}`;
}

/**
 * Obtém aspectos em uma janela de tempo
 */
export async function getAspectsInTimeWindow(
  startDate: Date,
  endDate: Date,
  stepHours: number = 6
): Promise<{ date: Date; aspects: Aspect[] }[]> {
  const results: { date: Date; aspects: Aspect[] }[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    try {
      const aspects = await calculateAspects(currentDate);
      results.push({
        date: new Date(currentDate),
        aspects
      });
    } catch (error) {
      console.warn(`Erro ao calcular aspectos para ${currentDate}:`, error);
    }
    
    currentDate.setHours(currentDate.getHours() + stepHours);
  }
  
  return results;
}


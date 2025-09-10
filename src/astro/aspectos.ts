/**
 * Sistema de Aspectos Astrológicos
 * Detecta aspectos entre planetas com orbes configuráveis
 */

import { Aspect, PlanetPosition, SolarSystemPositions } from '../lib/types';
import { calculateAspect, isAspectApplying, angleDifference } from '../lib/math';
import { getAllPlanets } from './engine-efemerides';

// Configuração padrão de orbes por aspecto
const DEFAULT_ORBS = {
  conjunction: 8,
  sextile: 4,
  square: 6,
  trine: 6,
  opposition: 8
};

// Tipos de aspectos e seus ângulos
const ASPECT_ANGLES = {
  conjunction: 0,
  sextile: 60,
  square: 90,
  trine: 120,
  opposition: 180
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
 * Detecta aspectos entre planetas para uso no NowCard
 */
export async function detectarAspectos(planetData: any[], date: Date): Promise<any[]> {
  const aspects: any[] = [];
  
  try {
    // Converter dados dos planetas para formato interno
    const planets = planetData.map(p => ({
      name: p.name.toLowerCase(),
      longitude: (p.position.degree + getSignOffset(p.position.sign)) % 360
    }));

    // Verificar aspectos entre todos os pares
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const planet1 = planets[i];
        const planet2 = planets[j];
        
        const angle = Math.abs(planet1.longitude - planet2.longitude);
        const normalizedAngle = angle > 180 ? 360 - angle : angle;
        
        // Verificar cada tipo de aspecto
        for (const [aspectName, aspectAngle] of Object.entries(ASPECT_ANGLES)) {
          const orb = DEFAULT_ORBS[aspectName as keyof typeof DEFAULT_ORBS];
          const difference = Math.abs(normalizedAngle - aspectAngle);
          
          if (difference <= orb) {
            aspects.push({
              planet1: planet1.name,
              planet2: planet2.name,
              aspect: aspectName,
              orb: difference,
              applying: Math.random() > 0.5 // Simplificado por enquanto
            });
          }
        }
      }
    }
    
    // Retornar apenas os aspectos mais próximos
    return aspects
      .sort((a, b) => a.orb - b.orb)
      .slice(0, 5);
      
  } catch (error) {
    console.error('Erro ao detectar aspectos:', error);
    return [];
  }
}

/**
 * Obtém o offset em graus para um signo
 */
function getSignOffset(sign: string): number {
  const signs = [
    'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
    'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
  ];
  
  const index = signs.indexOf(sign);
  return index >= 0 ? index * 30 : 0;
}

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
        
        const angle = angleDifference(planet1.longitude, planet2.longitude);
        const aspect = calculateAspect(angle);
        
        if (aspect) {
          const orb = Math.abs(angle - aspect.angle);
          const maxOrb = Math.max(
            PLANET_ORBS[planet1Name as keyof typeof PLANET_ORBS] || orbs[aspect.name as keyof typeof orbs],
            PLANET_ORBS[planet2Name as keyof typeof PLANET_ORBS] || orbs[aspect.name as keyof typeof orbs]
          );
          
          if (orb <= maxOrb) {
            aspects.push({
              planet1: planet1Name,
              planet2: planet2Name,
              aspect: aspect.name,
              angle: aspect.angle,
              orb,
              applying: isAspectApplying(planet1, planet2, aspect.angle),
              strength: 1 - (orb / maxOrb)
            });
          }
        }
      }
    }
    
    return aspects.sort((a, b) => b.strength - a.strength);
  } catch (error) {
    console.error('Erro ao calcular aspectos:', error);
    return [];
  }
}

/**
 * Obtém aspectos por planeta
 */
export async function getAspectsByPlanet(
  planet: string,
  date: Date
): Promise<Aspect[]> {
  const allAspects = await calculateAspects(date);
  return allAspects.filter(
    aspect => aspect.planet1 === planet || aspect.planet2 === planet
  );
}

/**
 * Verifica se há aspectos exatos (orbe < 1°)
 */
export async function getExactAspects(date: Date): Promise<Aspect[]> {
  const allAspects = await calculateAspects(date);
  return allAspects.filter(aspect => aspect.orb < 1);
}

export default {
  calculateAspects,
  detectarAspectos,
  getAspectsByPlanet,
  getExactAspects
};

/**
 * Classifica aspectos por natureza (harmonioso/tenso)
 */
export function classifyAspectsByNature(aspects: any[]): {
  harmonious: any[];
  tense: any[];
} {
  const harmonious = aspects.filter(aspect => 
    ['conjunction', 'sextile', 'trine'].includes(aspect.aspect)
  );
  
  const tense = aspects.filter(aspect => 
    ['square', 'opposition'].includes(aspect.aspect)
  );
  
  return { harmonious, tense };
}

/**
 * Filtra aspectos por tipo
 */
export function filterAspectsByType(aspects: any[], aspectType: string): any[] {
  return aspects.filter(aspect => aspect.aspect === aspectType);
}


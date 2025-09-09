/**
 * Engine de Efemérides - Wrapper TypeScript para a base canônica
 * Mantém a base íntegra e fornece interface TypeScript
 */

import { PlanetPosition, SunPosition, MoonPosition } from '@/lib/types';
import { toJulianDay, fromJulianDay } from '@/lib/date';

// Importação dinâmica da base canônica
let EfemeridesCompletas: any = null;

/**
 * Carrega a base de efemérides de forma assíncrona
 */
async function loadEfemerides() {
  if (!EfemeridesCompletas) {
    try {
      const module = await import('../../data/efemerides-completas-integrais.js');
      EfemeridesCompletas = module.default || module;
    } catch (error) {
      console.error('Erro ao carregar efemérides:', error);
      throw new Error('Não foi possível carregar a base de efemérides');
    }
  }
}

/**
 * Converte resultado da base para formato TypeScript
 */
function toPlanetPosition(result: any): PlanetPosition {
  return {
    longitude: result.longitude || 0,
    latitude: result.latitude || 0,
    distance: result.distance || 0,
    sign: getZodiacSign(result.longitude || 0),
    degree: (result.longitude || 0) % 30,
    retrograde: result.retrograde || false,
    speed: result.speed || 0
  };
}

/**
 * Obtém o signo zodiacal pela longitude eclíptica
 */
function getZodiacSign(longitude: number): string {
  const signs = [
    'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
    'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
  ];
  
  const signIndex = Math.floor(longitude / 30) % 12;
  return signs[signIndex];
}

/**
 * Obtém a posição do Sol para uma data
 */
export async function getSun(date: Date): Promise<SunPosition> {
  await loadEfemerides();
  
  try {
    const jd = toJulianDay(date);
    
    // Simula cálculo do Sol (implementação simplificada para desenvolvimento)
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const longitude = (dayOfYear * 0.9856) % 360; // Aproximação simples
    
    return {
      longitude,
      latitude: 0,
      distance: 149597870.7, // UA em km
      sign: getZodiacSign(longitude),
      degree: longitude % 30,
      retrograde: false,
      speed: 0.9856,
      declination: 23.44 * Math.sin((longitude - 81) * Math.PI / 180),
      rightAscension: longitude
    };
  } catch (error) {
    console.error('Erro ao calcular posição do Sol:', error);
    throw new Error('Erro no cálculo da posição do Sol');
  }
}

/**
 * Obtém a posição da Lua para uma data
 */
export async function getMoon(date: Date): Promise<MoonPosition> {
  await loadEfemerides();
  
  try {
    const jd = toJulianDay(date);
    
    // Simula cálculo da Lua (implementação simplificada para desenvolvimento)
    const daysSinceEpoch = (date.getTime() - new Date(2000, 0, 1).getTime()) / (1000 * 60 * 60 * 24);
    const longitude = (daysSinceEpoch * 13.176) % 360; // Movimento lunar aproximado
    const distance = 384400; // Distância média Terra-Lua em km
    
    return {
      longitude,
      latitude: 0,
      distance,
      sign: getZodiacSign(longitude),
      degree: longitude % 30,
      retrograde: false,
      speed: 13.176,
      phase: calculateLunarPhase(date),
      age: (daysSinceEpoch % 29.53) // Ciclo lunar aproximado
    };
  } catch (error) {
    console.error('Erro ao calcular posição da Lua:', error);
    throw new Error('Erro no cálculo da posição da Lua');
  }
}

/**
 * Calcula a fase lunar aproximada
 */
function calculateLunarPhase(date: Date): number {
  const daysSinceNewMoon = (date.getTime() - new Date(2000, 0, 6).getTime()) / (1000 * 60 * 60 * 24);
  const cycle = daysSinceNewMoon % 29.53;
  return cycle / 29.53; // 0 = Nova, 0.5 = Cheia
}

/**
 * Obtém a posição de um planeta para uma data
 */
export async function getPlanet(planetName: string, date: Date): Promise<PlanetPosition> {
  await loadEfemerides();
  
  try {
    const jd = toJulianDay(date);
    
    // Mapeamento de planetas para funções (sem duplicatas)
    const planetMap: Record<string, any> = {
      'mercury': { longitude: 0, speed: 4.09 },
      'venus': { longitude: 0, speed: 1.60 },
      'mars': { longitude: 0, speed: 0.52 },
      'jupiter': { longitude: 0, speed: 0.08 },
      'saturn': { longitude: 0, speed: 0.03 },
      'uranus': { longitude: 0, speed: 0.01 },
      'neptune': { longitude: 0, speed: 0.006 },
      'pluto': { longitude: 0, speed: 0.004 },
      // Nomes em português
      'mercurio': { longitude: 0, speed: 4.09 },
      'marte': { longitude: 0, speed: 0.52 },
      'saturno': { longitude: 0, speed: 0.03 },
      'urano': { longitude: 0, speed: 0.01 },
      'netuno': { longitude: 0, speed: 0.006 },
      'plutao': { longitude: 0, speed: 0.004 }
    };
    
    const planetData = planetMap[planetName.toLowerCase()];
    if (!planetData) {
      throw new Error(`Planeta não encontrado: ${planetName}`);
    }
    
    // Simula posição planetária (implementação simplificada para desenvolvimento)
    const daysSinceEpoch = (date.getTime() - new Date(2000, 0, 1).getTime()) / (1000 * 60 * 60 * 24);
    const longitude = (daysSinceEpoch * planetData.speed) % 360;
    
    return {
      longitude,
      latitude: 0,
      distance: 0,
      sign: getZodiacSign(longitude),
      degree: longitude % 30,
      retrograde: Math.random() < 0.1, // 10% chance de retrógrado
      speed: planetData.speed
    };
  } catch (error) {
    console.error(`Erro ao calcular posição de ${planetName}:`, error);
    throw new Error(`Erro no cálculo da posição de ${planetName}`);
  }
}

/**
 * Obtém todas as posições planetárias para uma data
 */
export async function getAllPlanets(date: Date): Promise<Record<string, PlanetPosition>> {
  const planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
  const positions: Record<string, PlanetPosition> = {};
  
  for (const planet of planets) {
    try {
      positions[planet] = await getPlanet(planet, date);
    } catch (error) {
      console.error(`Erro ao obter posição de ${planet}:`, error);
    }
  }
  
  return positions;
}

/**
 * Verifica se um planeta está retrógrado
 */
export async function isRetrograde(planetName: string, date: Date): Promise<boolean> {
  try {
    const position = await getPlanet(planetName, date);
    return position.retrograde;
  } catch (error) {
    console.error(`Erro ao verificar retrogradação de ${planetName}:`, error);
    return false;
  }
}

/**
 * Obtém planetas retrógrados ativos
 */
export async function getActiveRetrogrades(date: Date): Promise<string[]> {
  const planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
  const retrogrades: string[] = [];
  
  for (const planet of planets) {
    try {
      if (await isRetrograde(planet, date)) {
        retrogrades.push(planet);
      }
    } catch (error) {
      console.error(`Erro ao verificar retrogradação de ${planet}:`, error);
    }
  }
  
  return retrogrades;
}

export default {
  getSun,
  getMoon,
  getPlanet,
  getAllPlanets,
  isRetrograde,
  getActiveRetrogrades
};


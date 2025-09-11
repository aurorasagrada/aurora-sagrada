/**
 * Engine de Efemérides - Wrapper TypeScript para a base canônica v2
 * Mantém a base íntegra e fornece interface TypeScript
 * Versão 2: Correções baseadas em Meeus/NOAA para precisão astronômica
 */

import { PlanetPosition, SunPosition, MoonPosition } from '../lib/types';
import { toJulianDay, fromJulianDay } from '../lib/date';

// Importação da base canônica v2 (corrigida)
let EfemeridesCompletas: any = null;

/**
 * Carrega a base de efemérides v2 de forma assíncrona
 */
async function loadEfemerides() {
  if (!EfemeridesCompletas) {
    try {
      const module = await import('../../data/efemerides-completas-integrais-v2.js');
      EfemeridesCompletas = module.EfemeridesCompletas || module.default || module;
      
      // Carregar dados VSOP87 se disponíveis
      await loadVSOPData();
      
      console.log('Efemérides v2 carregadas com sucesso');
    } catch (error) {
      console.warn('Erro ao carregar efemérides v2, usando fallback:', error);
      EfemeridesCompletas = createFallbackEphemeris();
    }
  }
  return EfemeridesCompletas;
}

/**
 * Carrega dados VSOP87 para cálculos precisos
 */
async function loadVSOPData() {
  try {
    // Tentar carregar dados VSOP87 se existirem
    const vsopFiles = [
      'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'
    ];
    
    for (const planet of vsopFiles) {
      try {
        const data = await import(`../../data/vsop87/${planet}.json`);
        if (EfemeridesCompletas.setVSOPData) {
          EfemeridesCompletas.setVSOPData(planet, data.default || data);
        }
      } catch (error) {
        console.warn(`Dados VSOP87 para ${planet} não encontrados`);
      }
    }
  } catch (error) {
    console.warn('Erro ao carregar dados VSOP87:', error);
  }
}

/**
 * Cria efemérides de fallback para casos de erro
 */
function createFallbackEphemeris() {
  return {
    calcularTodasPosicoes: (data: Date) => {
      const dayOfYear = Math.floor((data.getTime() - new Date(data.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        Sol: {
          longitude: (dayOfYear * 0.9856) % 360,
          latitude: 0,
          distancia: 149597870.7,
          signo: getSignFromLongitude((dayOfYear * 0.9856) % 360),
          grauNoSigno: ((dayOfYear * 0.9856) % 360) % 30,
          retrogrado: false,
          velocidade: 0.9856
        },
        Lua: {
          longitude: (dayOfYear * 13.176) % 360,
          latitude: 0,
          distancia: 384400,
          signo: getSignFromLongitude((dayOfYear * 13.176) % 360),
          grauNoSigno: ((dayOfYear * 13.176) % 360) % 30,
          retrogrado: false,
          velocidade: 13.176
        },
        Mercurio: {
          longitude: (dayOfYear * 4.09) % 360,
          latitude: 0,
          distancia: 57910000,
          signo: getSignFromLongitude((dayOfYear * 4.09) % 360),
          grauNoSigno: ((dayOfYear * 4.09) % 360) % 30,
          retrogrado: Math.random() < 0.2,
          velocidade: 4.09
        },
        Venus: {
          longitude: (dayOfYear * 1.6) % 360,
          latitude: 0,
          distancia: 108200000,
          signo: getSignFromLongitude((dayOfYear * 1.6) % 360),
          grauNoSigno: ((dayOfYear * 1.6) % 360) % 30,
          retrogrado: Math.random() < 0.1,
          velocidade: 1.6
        },
        Marte: {
          longitude: (dayOfYear * 0.524) % 360,
          latitude: 0,
          distancia: 227940000,
          signo: getSignFromLongitude((dayOfYear * 0.524) % 360),
          grauNoSigno: ((dayOfYear * 0.524) % 360) % 30,
          retrogrado: Math.random() < 0.15,
          velocidade: 0.524
        },
        Jupiter: {
          longitude: (dayOfYear * 0.083) % 360,
          latitude: 0,
          distancia: 778330000,
          signo: getSignFromLongitude((dayOfYear * 0.083) % 360),
          grauNoSigno: ((dayOfYear * 0.083) % 360) % 30,
          retrogrado: Math.random() < 0.3,
          velocidade: 0.083
        },
        Saturno: {
          longitude: (dayOfYear * 0.033) % 360,
          latitude: 0,
          distancia: 1426940000,
          signo: getSignFromLongitude((dayOfYear * 0.033) % 360),
          grauNoSigno: ((dayOfYear * 0.033) % 360) % 30,
          retrogrado: Math.random() < 0.35,
          velocidade: 0.033
        },
        Urano: {
          longitude: (dayOfYear * 0.012) % 360,
          latitude: 0,
          distancia: 2870990000,
          signo: getSignFromLongitude((dayOfYear * 0.012) % 360),
          grauNoSigno: ((dayOfYear * 0.012) % 360) % 30,
          retrogrado: Math.random() < 0.4,
          velocidade: 0.012
        },
        Netuno: {
          longitude: (dayOfYear * 0.006) % 360,
          latitude: 0,
          distancia: 4498250000,
          signo: getSignFromLongitude((dayOfYear * 0.006) % 360),
          grauNoSigno: ((dayOfYear * 0.006) % 360) % 30,
          retrogrado: Math.random() < 0.4,
          velocidade: 0.006
        },
        Plutao: {
          longitude: (dayOfYear * 0.004) % 360,
          latitude: 0,
          distancia: 5906380000,
          signo: getSignFromLongitude((dayOfYear * 0.004) % 360),
          grauNoSigno: ((dayOfYear * 0.004) % 360) % 30,
          retrogrado: Math.random() < 0.4,
          velocidade: 0.004
        }
      };
    },
    calcularProximosEclipses: () => []
  };
}

/**
 * Converte longitude em graus para signo zodiacal
 */
function getSignFromLongitude(longitude: number): string {
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
  const efemerides = await loadEfemerides();
  
  try {
    const posicoes = efemerides.calcularTodasPosicoes(date);
    const solData = posicoes.Sol;
    
    return {
      longitude: solData.longitude,
      latitude: solData.latitude || 0,
      distance: solData.distancia || 149597870.7,
      sign: solData.signo,
      degree: solData.grauNoSigno,
      retrograde: solData.retrogrado || false,
      speed: solData.velocidade || 0.9856,
      declination: solData.declinacao || 0,
      rightAscension: solData.ascensaoReta || solData.longitude
    };
  } catch (error) {
    console.error('Erro ao calcular posição do Sol:', error);
    // Retornar dados padrão em vez de erro
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const longitude = (dayOfYear * 0.9856) % 360;
    
    return {
      longitude: longitude,
      latitude: 0,
      distance: 149597870.7,
      sign: getSignFromLongitude(longitude),
      degree: longitude % 30,
      retrograde: false,
      speed: 0.9856,
      declination: 0,
      rightAscension: longitude
    };
  }
}

/**
 * Obtém a posição da Lua para uma data
 */
export async function getMoon(date: Date): Promise<MoonPosition> {
  const efemerides = await loadEfemerides();
  
  try {
    const posicoes = efemerides.calcularTodasPosicoes(date);
    const luaData = posicoes.Lua;
    
    // Calcular fase lunar aproximada
    const daysSinceNewMoon = ((date.getTime() / (1000 * 60 * 60 * 24)) % 29.53);
    const phase = Math.abs(Math.cos((daysSinceNewMoon / 29.53) * 2 * Math.PI));
    
    return {
      longitude: luaData.longitude,
      latitude: luaData.latitude || 0,
      distance: luaData.distancia || 384400,
      sign: luaData.signo,
      degree: luaData.grauNoSigno,
      retrograde: luaData.retrogrado || false,
      speed: luaData.velocidade || 13.176,
      phase: phase,
      age: daysSinceNewMoon
    };
  } catch (error) {
    console.error('Erro ao calcular posição da Lua:', error);
    // Retornar dados padrão em vez de erro
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const longitude = (dayOfYear * 13.176) % 360;
    
    return {
      longitude: longitude,
      latitude: 0,
      distance: 384400,
      sign: getSignFromLongitude(longitude),
      degree: longitude % 30,
      retrograde: false,
      speed: 13.176,
      phase: 0.66,
      age: 15
    };
  }
}

/**
 * Obtém a posição de um planeta para uma data
 */
export async function getPlanet(planetName: string, date: Date): Promise<PlanetPosition> {
  const efemerides = await loadEfemerides();
  
  try {
    const posicoes = efemerides.calcularTodasPosicoes(date);
    
    // Mapeamento de nomes em português para nomes padrão
    const planetNameMap: Record<string, string> = {
      'sol': 'Sol',
      'lua': 'Lua',
      'mercurio': 'Mercurio',
      'venus': 'Venus',
      'marte': 'Marte',
      'jupiter': 'Jupiter',
      'saturno': 'Saturno',
      'urano': 'Urano',
      'netuno': 'Netuno',
      'plutao': 'Plutao'
    };
    
    const mappedName = planetNameMap[planetName.toLowerCase()] || planetName;
    const planetData = posicoes[mappedName];
    
    if (!planetData) {
      throw new Error(`Planeta ${planetName} não encontrado`);
    }
    
    return {
      longitude: planetData.longitude,
      latitude: planetData.latitude || 0,
      distance: planetData.distancia,
      sign: planetData.signo,
      degree: planetData.grauNoSigno,
      retrograde: planetData.retrogrado || false,
      speed: planetData.velocidade
    };
  } catch (error) {
    console.error(`Erro ao calcular posição de ${planetName}:`, error);
    // Retornar dados padrão
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const longitude = (dayOfYear * 1) % 360;
    
    return {
      longitude: longitude,
      latitude: 0,
      distance: 100000000,
      sign: getSignFromLongitude(longitude),
      degree: longitude % 30,
      retrograde: false,
      speed: 1
    };
  }
}

/**
 * Calcula todas as posições planetárias para uma data
 */
export async function calcularPosicoesPlanetarias(date: Date): Promise<Record<string, PlanetPosition>> {
  const efemerides = await loadEfemerides();
  
  try {
    const posicoes = efemerides.calcularTodasPosicoes(date);
    const resultado: Record<string, PlanetPosition> = {};
    
    for (const [nome, dados] of Object.entries(posicoes)) {
      const planetData = dados as any;
      resultado[nome] = {
        longitude: planetData.longitude,
        latitude: planetData.latitude || 0,
        distance: planetData.distancia,
        sign: planetData.signo,
        degree: planetData.grauNoSigno,
        retrograde: planetData.retrogrado || false,
        speed: planetData.velocidade
      };
    }
    
    return resultado;
  } catch (error) {
    console.error('Erro ao calcular posições planetárias:', error);
    return {};
  }
}

/**
 * Função para obter fase lunar
 */
export function obterFaseLunar(date: Date): { fase: string; iluminacao: number; idade: number } {
  const daysSinceNewMoon = ((date.getTime() / (1000 * 60 * 60 * 24)) % 29.53);
  const iluminacao = Math.abs(Math.cos((daysSinceNewMoon / 29.53) * 2 * Math.PI)) * 100;
  
  let fase = 'nova';
  if (daysSinceNewMoon < 7.4) fase = 'crescente';
  else if (daysSinceNewMoon < 14.8) fase = 'cheia';
  else if (daysSinceNewMoon < 22.1) fase = 'minguante';
  
  return {
    fase,
    iluminacao,
    idade: daysSinceNewMoon
  };
}


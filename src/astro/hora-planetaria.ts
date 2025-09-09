/**
 * Sistema de Horas Planetárias (Opcional)
 * Calcula as horas planetárias tradicionais com opção de ignorar DST
 */

import { adjustForMagicMode, formatInTz, DEFAULT_TIMEZONE } from '@/lib/date';

// Ordem tradicional dos planetas para as horas
const PLANETARY_ORDER = [
  'Saturno', 'Júpiter', 'Marte', 'Sol', 'Vênus', 'Mercúrio', 'Lua'
];

// Correspondências dos planetas com os dias da semana
const PLANETARY_DAYS = {
  0: 'Sol',      // Domingo
  1: 'Lua',      // Segunda
  2: 'Marte',    // Terça
  3: 'Mercúrio', // Quarta
  4: 'Júpiter',  // Quinta
  5: 'Vênus',    // Sexta
  6: 'Saturno'   // Sábado
};

export interface PlanetaryHour {
  hour: number;
  planet: string;
  startTime: Date;
  endTime: Date;
  isDayHour: boolean;
  isNightHour: boolean;
}

export interface DayPlanetaryHours {
  date: Date;
  dayRuler: string;
  sunrise: Date;
  sunset: Date;
  dayHours: PlanetaryHour[];
  nightHours: PlanetaryHour[];
  allHours: PlanetaryHour[];
}

/**
 * Calcula as horas planetárias para uma data
 */
export async function calculatePlanetaryHours(
  date: Date,
  latitude: number = -23.5505, // São Paulo
  longitude: number = -46.6333,
  ignoreDST: boolean = false,
  timezone: string = DEFAULT_TIMEZONE
): Promise<DayPlanetaryHours> {
  try {
    // Ajusta data para modo magia se necessário
    const adjustedDate = adjustForMagicMode(date, ignoreDST);
    
    // Calcula nascer e pôr do sol
    const { sunrise, sunset } = calculateSunTimes(adjustedDate, latitude, longitude);
    
    // Determina o regente do dia
    const dayOfWeek = adjustedDate.getDay();
    const dayRuler = PLANETARY_DAYS[dayOfWeek as keyof typeof PLANETARY_DAYS];
    
    // Calcula duração do dia e da noite
    const dayDuration = sunset.getTime() - sunrise.getTime();
    const nightDuration = 24 * 60 * 60 * 1000 - dayDuration; // 24h - duração do dia
    
    // Calcula horas do dia (12 horas desiguais)
    const dayHourDuration = dayDuration / 12;
    const dayHours: PlanetaryHour[] = [];
    
    // Encontra índice do planeta regente do dia
    const dayRulerIndex = PLANETARY_ORDER.indexOf(dayRuler);
    
    for (let i = 0; i < 12; i++) {
      const planetIndex = (dayRulerIndex + i) % 7;
      const planet = PLANETARY_ORDER[planetIndex];
      const startTime = new Date(sunrise.getTime() + (i * dayHourDuration));
      const endTime = new Date(sunrise.getTime() + ((i + 1) * dayHourDuration));
      
      dayHours.push({
        hour: i + 1,
        planet,
        startTime,
        endTime,
        isDayHour: true,
        isNightHour: false
      });
    }
    
    // Calcula horas da noite (12 horas desiguais)
    const nightHourDuration = nightDuration / 12;
    const nightHours: PlanetaryHour[] = [];
    
    // A primeira hora da noite continua a sequência do dia
    const firstNightPlanetIndex = (dayRulerIndex + 12) % 7;
    
    for (let i = 0; i < 12; i++) {
      const planetIndex = (firstNightPlanetIndex + i) % 7;
      const planet = PLANETARY_ORDER[planetIndex];
      const startTime = new Date(sunset.getTime() + (i * nightHourDuration));
      const endTime = new Date(sunset.getTime() + ((i + 1) * nightHourDuration));
      
      nightHours.push({
        hour: i + 13, // Continua numeração das horas do dia
        planet,
        startTime,
        endTime,
        isDayHour: false,
        isNightHour: true
      });
    }
    
    return {
      date: adjustedDate,
      dayRuler,
      sunrise,
      sunset,
      dayHours,
      nightHours,
      allHours: [...dayHours, ...nightHours]
    };
  } catch (error) {
    console.error('Erro ao calcular horas planetárias:', error);
    throw new Error('Erro no cálculo das horas planetárias');
  }
}

/**
 * Calcula nascer e pôr do sol (implementação simplificada)
 */
function calculateSunTimes(date: Date, latitude: number, longitude: number): {
  sunrise: Date;
  sunset: Date;
} {
  // Implementação simplificada - em produção usaria biblioteca astronômica
  // Para São Paulo, aproximações baseadas no período do ano
  
  const dayOfYear = getDayOfYear(date);
  const year = date.getFullYear();
  
  // Equação do tempo simplificada
  const declination = 23.45 * Math.sin((360 * (284 + dayOfYear) / 365) * Math.PI / 180);
  const latRad = latitude * Math.PI / 180;
  const declRad = declination * Math.PI / 180;
  
  const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(declRad));
  const sunriseHour = 12 - (hourAngle * 12 / Math.PI);
  const sunsetHour = 12 + (hourAngle * 12 / Math.PI);
  
  // Correção para longitude
  const longitudeCorrection = longitude / 15; // 15° por hora
  
  const sunrise = new Date(date);
  sunrise.setHours(Math.floor(sunriseHour - longitudeCorrection));
  sunrise.setMinutes((sunriseHour - longitudeCorrection - Math.floor(sunriseHour - longitudeCorrection)) * 60);
  sunrise.setSeconds(0);
  sunrise.setMilliseconds(0);
  
  const sunset = new Date(date);
  sunset.setHours(Math.floor(sunsetHour - longitudeCorrection));
  sunset.setMinutes((sunsetHour - longitudeCorrection - Math.floor(sunsetHour - longitudeCorrection)) * 60);
  sunset.setSeconds(0);
  sunset.setMilliseconds(0);
  
  return { sunrise, sunset };
}

/**
 * Obtém dia do ano
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Obtém a hora planetária atual
 */
export async function getCurrentPlanetaryHour(
  latitude?: number,
  longitude?: number,
  ignoreDST?: boolean,
  timezone?: string
): Promise<PlanetaryHour | null> {
  try {
    const now = new Date();
    const hours = await calculatePlanetaryHours(now, latitude, longitude, ignoreDST, timezone);
    
    return hours.allHours.find(hour => 
      now >= hour.startTime && now <= hour.endTime
    ) || null;
  } catch (error) {
    console.error('Erro ao obter hora planetária atual:', error);
    return null;
  }
}

/**
 * Obtém correspondências mágicas de um planeta
 */
export function getPlanetaryCorrespondences(planet: string): {
  element: string;
  colors: string[];
  metals: string[];
  stones: string[];
  herbs: string[];
  incenses: string[];
  magical_uses: string[];
} {
  const correspondences = {
    'Sol': {
      element: 'Fogo',
      colors: ['Dourado', 'Amarelo', 'Laranja'],
      metals: ['Ouro'],
      stones: ['Citrino', 'Topázio', 'Diamante', 'Âmbar'],
      herbs: ['Girassol', 'Calêndula', 'Hipérico', 'Louro'],
      incenses: ['Olíbano', 'Canela', 'Laranja'],
      magical_uses: ['Sucesso', 'Liderança', 'Vitalidade', 'Cura', 'Proteção']
    },
    'Lua': {
      element: 'Água',
      colors: ['Prata', 'Branco', 'Azul Claro'],
      metals: ['Prata'],
      stones: ['Pedra da Lua', 'Pérola', 'Quartzo Claro', 'Selenita'],
      herbs: ['Artemísia', 'Jasmim', 'Lírio', 'Salgueiro'],
      incenses: ['Sândalo', 'Jasmim', 'Mirra'],
      magical_uses: ['Intuição', 'Sonhos', 'Psiquismo', 'Fertilidade', 'Purificação']
    },
    'Marte': {
      element: 'Fogo',
      colors: ['Vermelho', 'Escarlate', 'Ferro'],
      metals: ['Ferro', 'Aço'],
      stones: ['Granadas', 'Hematita', 'Jaspe Vermelho', 'Rubi'],
      herbs: ['Pimenta', 'Gengibre', 'Alho', 'Urtiga'],
      incenses: ['Pinho', 'Dragão', 'Pimenta'],
      magical_uses: ['Coragem', 'Força', 'Proteção', 'Energia', 'Guerra']
    },
    'Mercúrio': {
      element: 'Ar',
      colors: ['Amarelo', 'Laranja', 'Multicolor'],
      metals: ['Mercúrio', 'Liga'],
      stones: ['Ágata', 'Aventurina', 'Citrino', 'Quartzo'],
      herbs: ['Lavanda', 'Hortelã', 'Salsa', 'Erva-doce'],
      incenses: ['Lavanda', 'Hortelã', 'Benjoim'],
      magical_uses: ['Comunicação', 'Viagem', 'Sabedoria', 'Negócios', 'Estudos']
    },
    'Júpiter': {
      element: 'Fogo',
      colors: ['Azul', 'Púrpura', 'Turquesa'],
      metals: ['Estanho'],
      stones: ['Safira', 'Lápis-lazúli', 'Turquesa', 'Ametista'],
      herbs: ['Sálvia', 'Cedro', 'Carvalho', 'Hissopo'],
      incenses: ['Cedro', 'Sândalo', 'Sálvia'],
      magical_uses: ['Prosperidade', 'Justiça', 'Honra', 'Liderança', 'Expansão']
    },
    'Vênus': {
      element: 'Terra',
      colors: ['Verde', 'Rosa', 'Azul Claro'],
      metals: ['Cobre'],
      stones: ['Esmeralda', 'Quartzo Rosa', 'Jade', 'Turmalina Rosa'],
      herbs: ['Rosa', 'Verbena', 'Tomilho', 'Violeta'],
      incenses: ['Rosa', 'Sândalo', 'Benjoim'],
      magical_uses: ['Amor', 'Beleza', 'Arte', 'Harmonia', 'Fertilidade']
    },
    'Saturno': {
      element: 'Terra',
      colors: ['Preto', 'Marrom', 'Cinza Escuro'],
      metals: ['Chumbo'],
      stones: ['Ônix', 'Obsidiana', 'Hematita', 'Jet'],
      herbs: ['Cipreste', 'Confrei', 'Musgo', 'Patchouli'],
      incenses: ['Mirra', 'Patchouli', 'Cipreste'],
      magical_uses: ['Proteção', 'Banimento', 'Disciplina', 'Tempo', 'Karma']
    }
  };
  
  return correspondences[planet as keyof typeof correspondences] || correspondences['Sol'];
}

/**
 * Verifica se é uma boa hora para um tipo de magia
 */
export async function isGoodHourForMagic(
  magicType: string,
  date?: Date,
  latitude?: number,
  longitude?: number,
  ignoreDST?: boolean
): Promise<{
  favorable: boolean;
  currentHour: PlanetaryHour | null;
  reason: string;
  recommendation: string;
}> {
  try {
    const currentHour = await getCurrentPlanetaryHour(latitude, longitude, ignoreDST);
    
    if (!currentHour) {
      return {
        favorable: false,
        currentHour: null,
        reason: 'Não foi possível calcular a hora planetária atual',
        recommendation: 'Tente novamente mais tarde'
      };
    }
    
    const correspondences = getPlanetaryCorrespondences(currentHour.planet);
    const favorable = correspondences.magical_uses.some(use => 
      use.toLowerCase().includes(magicType.toLowerCase()) ||
      magicType.toLowerCase().includes(use.toLowerCase())
    );
    
    return {
      favorable,
      currentHour,
      reason: favorable 
        ? `Hora de ${currentHour.planet} favorece ${magicType}`
        : `Hora de ${currentHour.planet} não é ideal para ${magicType}`,
      recommendation: favorable
        ? `Aproveite a energia de ${currentHour.planet} para ${magicType}`
        : `Aguarde uma hora de ${correspondences.magical_uses.join(' ou ')} para ${magicType}`
    };
  } catch (error) {
    console.error('Erro ao verificar hora para magia:', error);
    return {
      favorable: false,
      currentHour: null,
      reason: 'Erro no cálculo',
      recommendation: 'Consulte um almanaque planetário'
    };
  }
}


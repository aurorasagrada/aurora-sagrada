import { format, formatInTimeZone, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

export const DEFAULT_TIMEZONE = 'America/Sao_Paulo';

/**
 * Converte uma data para o timezone configurado
 */
export function toTimezone(date: Date, timezone: string = DEFAULT_TIMEZONE): Date {
  return utcToZonedTime(date, timezone);
}

/**
 * Converte uma data do timezone local para UTC
 */
export function fromTimezone(date: Date, timezone: string = DEFAULT_TIMEZONE): Date {
  return zonedTimeToUtc(date, timezone);
}

/**
 * Formata uma data no timezone especificado
 */
export function formatInTz(
  date: Date, 
  formatStr: string, 
  timezone: string = DEFAULT_TIMEZONE
): string {
  return formatInTimeZone(date, timezone, formatStr, { locale: ptBR });
}

/**
 * Obtém a data/hora atual no timezone configurado
 */
export function nowInTimezone(timezone: string = DEFAULT_TIMEZONE): Date {
  return toTimezone(new Date(), timezone);
}

/**
 * Calcula o Julian Day Number para uma data
 */
export function toJulianDay(date: Date): number {
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  return (utc / 86400000) + 2440587.5;
}

/**
 * Converte Julian Day Number para Date
 */
export function fromJulianDay(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000);
}

/**
 * Normaliza graus para o range 0-360
 */
export function normalizeDegrees(degrees: number): number {
  degrees = degrees % 360;
  return degrees < 0 ? degrees + 360 : degrees;
}

/**
 * Converte graus decimais para graus, minutos, segundos
 */
export function degreesToDMS(degrees: number): { degrees: number; minutes: number; seconds: number } {
  const d = Math.floor(Math.abs(degrees));
  const m = Math.floor((Math.abs(degrees) - d) * 60);
  const s = Math.round(((Math.abs(degrees) - d) * 60 - m) * 60);
  
  return {
    degrees: degrees < 0 ? -d : d,
    minutes: m,
    seconds: s
  };
}

/**
 * Obtém o nome do signo zodiacal para uma longitude
 */
export function getZodiacSign(longitude: number): string {
  const signs = [
    'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
    'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
  ];
  
  const normalizedLong = normalizeDegrees(longitude);
  const signIndex = Math.floor(normalizedLong / 30);
  return signs[signIndex];
}

/**
 * Obtém o grau dentro do signo para uma longitude
 */
export function getDegreeInSign(longitude: number): number {
  const normalizedLong = normalizeDegrees(longitude);
  return normalizedLong % 30;
}

/**
 * Formata posição planetária como string
 */
export function formatPlanetPosition(longitude: number): string {
  const sign = getZodiacSign(longitude);
  const degree = getDegreeInSign(longitude);
  const dms = degreesToDMS(degree);
  
  return `${dms.degrees}°${dms.minutes.toString().padStart(2, '0')}'${dms.seconds.toString().padStart(2, '0')}" ${sign}`;
}

/**
 * Verifica se uma data está no horário de verão (para modo magia)
 */
export function isDST(date: Date, timezone: string = DEFAULT_TIMEZONE): boolean {
  // Implementação simplificada - no Brasil, horário de verão foi abolido em 2019
  // Manter para compatibilidade futura
  return false;
}

/**
 * Ajusta data removendo horário de verão se necessário (modo magia)
 */
export function adjustForMagicMode(date: Date, ignoreDST: boolean = false): Date {
  if (!ignoreDST || !isDST(date)) {
    return date;
  }
  
  // Subtrai 1 hora se estiver no horário de verão e modo magia estiver ativo
  return new Date(date.getTime() - (60 * 60 * 1000));
}


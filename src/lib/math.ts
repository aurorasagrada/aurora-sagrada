/**
 * Utilitários matemáticos para cálculos astrológicos
 */

/**
 * Converte graus para radianos
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Converte radianos para graus
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Normaliza ângulo para o range 0-360 graus
 */
export function normalizeAngle(angle: number): number {
  angle = angle % 360;
  return angle < 0 ? angle + 360 : angle;
}

/**
 * Calcula a diferença angular entre dois ângulos
 */
export function angleDifference(angle1: number, angle2: number): number {
  let diff = Math.abs(angle1 - angle2);
  if (diff > 180) {
    diff = 360 - diff;
  }
  return diff;
}

/**
 * Calcula o aspecto entre duas posições planetárias
 */
export function calculateAspect(pos1: number, pos2: number): {
  angle: number;
  type: string | null;
  orb: number;
} {
  const diff = angleDifference(pos1, pos2);
  
  const aspects = [
    { name: 'conjunction', angle: 0, orb: 8 },
    { name: 'sextile', angle: 60, orb: 4 },
    { name: 'square', angle: 90, orb: 6 },
    { name: 'trine', angle: 120, orb: 6 },
    { name: 'opposition', angle: 180, orb: 8 }
  ];
  
  for (const aspect of aspects) {
    const orbDiff = Math.abs(diff - aspect.angle);
    if (orbDiff <= aspect.orb) {
      return {
        angle: diff,
        type: aspect.name,
        orb: orbDiff
      };
    }
  }
  
  return {
    angle: diff,
    type: null,
    orb: 0
  };
}

/**
 * Verifica se um aspecto está aplicativo (se aproximando) ou separativo (se afastando)
 */
export function isAspectApplying(
  planet1Pos: number, 
  planet1Speed: number,
  planet2Pos: number, 
  planet2Speed: number,
  aspectAngle: number
): boolean {
  // Calcula as posições futuras (em 1 dia)
  const future1 = normalizeAngle(planet1Pos + planet1Speed);
  const future2 = normalizeAngle(planet2Pos + planet2Speed);
  
  const currentDiff = angleDifference(planet1Pos, planet2Pos);
  const futureDiff = angleDifference(future1, future2);
  
  // Se a diferença futura está mais próxima do aspecto exato, está aplicativo
  const currentOrbToAspect = Math.abs(currentDiff - aspectAngle);
  const futureOrbToAspect = Math.abs(futureDiff - aspectAngle);
  
  return futureOrbToAspect < currentOrbToAspect;
}

/**
 * Calcula a mansão lunar baseada na longitude da Lua
 */
export function calculateLunarMansion(moonLongitude: number): number {
  // Cada mansão lunar tem aproximadamente 12°51'25.7" (360° / 28)
  const mansionSize = 360 / 28;
  const normalizedLong = normalizeAngle(moonLongitude);
  
  // Mansão 1 começa em 0° Áries
  const mansionNumber = Math.floor(normalizedLong / mansionSize) + 1;
  
  return mansionNumber > 28 ? 28 : mansionNumber;
}

/**
 * Calcula a fase lunar baseada na diferença Sol-Lua
 */
export function calculateLunarPhase(sunLongitude: number, moonLongitude: number): {
  phase: string;
  illumination: number;
  age: number;
} {
  const diff = normalizeAngle(moonLongitude - sunLongitude);
  
  let phase: string;
  let illumination: number;
  
  if (diff < 45 || diff >= 315) {
    phase = 'Nova';
    illumination = 0;
  } else if (diff >= 45 && diff < 135) {
    phase = 'Crescente';
    illumination = 0.5;
  } else if (diff >= 135 && diff < 225) {
    phase = 'Cheia';
    illumination = 1;
  } else {
    phase = 'Minguante';
    illumination = 0.5;
  }
  
  // Idade aproximada da lua em dias (baseada na diferença angular)
  const age = (diff / 360) * 29.53;
  
  return { phase, illumination, age };
}

/**
 * Interpola linearmente entre dois valores
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp um valor entre min e max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Converte coordenadas eclípticas para equatoriais (simplificado)
 */
export function eclipticToEquatorial(
  longitude: number, 
  latitude: number, 
  obliquity: number = 23.4392911
): { ra: number; dec: number } {
  const lonRad = degreesToRadians(longitude);
  const latRad = degreesToRadians(latitude);
  const oblRad = degreesToRadians(obliquity);
  
  const ra = Math.atan2(
    Math.sin(lonRad) * Math.cos(oblRad) - Math.tan(latRad) * Math.sin(oblRad),
    Math.cos(lonRad)
  );
  
  const dec = Math.asin(
    Math.sin(latRad) * Math.cos(oblRad) + Math.cos(latRad) * Math.sin(oblRad) * Math.sin(lonRad)
  );
  
  return {
    ra: normalizeAngle(radiansToDegrees(ra)),
    dec: radiansToDegrees(dec)
  };
}


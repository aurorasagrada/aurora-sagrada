// Tipos base do sistema Aurora Sagrada

export interface PlanetPosition {
  longitude: number;
  latitude: number;
  distance: number;
  speed: number;
  sign: string;
  degree: number;
  minute: number;
  second: number;
}

export interface SolarSystemPositions {
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
  angle: number;
  orb: number;
  exact: boolean;
  applying: boolean;
  separating: boolean;
}

export interface LunarPhase {
  name: string;
  illumination: number;
  age: number;
  distance: number;
  angular_diameter: number;
  next_new_moon: Date;
  next_full_moon: Date;
}

export interface LunarMansion {
  number: number;
  name: string;
  arabic_name: string;
  nature: string;
  ruler: string;
  degree_start: number;
  degree_end: number;
  magical_uses: string[];
  astrological_uses: string[];
  favorable_for: string[];
  avoid_for: string[];
}

export interface Goddess {
  nome: string;
  elemento: string;
  dominio: string;
  invocacao: string;
  correspondencias: {
    cores: string[];
    cristais: string[];
    ervas: string[];
    oferendas: string[];
    simbolos: string[];
    animais: string[];
    pedras_preciosas: string[];
    metais: string[];
    incensos: string[];
    dia_semana: string;
    numero_sagrado: number;
    festivais: string[];
    locais_sagrados: string[];
    aspectos: string[];
    poderes: string[];
    historia: string;
  };
}

export interface ElectionScore {
  theme: string;
  score: number;
  factors: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'avoid';
}

export interface DayData {
  date: Date;
  sun: PlanetPosition;
  moon: PlanetPosition;
  lunar_phase: LunarPhase;
  lunar_mansion: LunarMansion;
  aspects: Aspect[];
  goddess: Goddess;
  elections: ElectionScore[];
  void_of_course: boolean;
  eclipse: boolean;
  retrograde_planets: string[];
}

export interface Config {
  timezone: string;
  ignoreDST: boolean;
  language: string;
  theme: 'dark' | 'parchment';
  orbs: Record<string, number>;
  modules: Record<string, boolean>;
  calendar: {
    defaultView: string;
    showWeekNumbers: boolean;
    highlightToday: boolean;
  };
  elections: {
    maxDaysAhead: number;
    minScore: number;
    showScoreDetails: boolean;
  };
}

export interface Sabbat {
  name: string;
  date: Date;
  hemisphere: 'north' | 'south';
  meaning: string;
  correspondences: {
    colors: string[];
    herbs: string[];
    crystals: string[];
    activities: string[];
  };
}

export interface ParacelsusPlantPart {
  phase: string;
  part: string;
  description: string;
  uses: string[];
  timing: string;
}

export interface VoidOfCourse {
  start: Date;
  end: Date;
  duration_hours: number;
  last_aspect: Aspect;
  next_sign: string;
}


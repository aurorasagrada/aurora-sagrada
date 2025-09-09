/**
 * Sistema de Mansões Lunares
 * Calcula a mansão lunar baseada na longitude eclíptica da Lua
 */

import { LunarMansion } from '@/lib/types';
import { calculateLunarMansion } from '@/lib/math';

// Dados das 28 mansões lunares
const LUNAR_MANSIONS: Record<number, Omit<LunarMansion, 'number'>> = {
  1: {
    name: 'Al-Sharatain',
    arabic_name: 'الشرطان',
    nature: 'Marcial',
    ruler: 'Marte',
    degree_start: 0,
    degree_end: 12.857,
    magical_uses: ['proteção', 'viagens', 'novos começos', 'coragem'],
    astrological_uses: ['iniciar projetos', 'mudanças', 'liderança'],
    favorable_for: ['viagens', 'mudanças de residência', 'novos empreendimentos'],
    avoid_for: ['casamento', 'empréstimos', 'cirurgias']
  },
  2: {
    name: 'Al-Butain',
    arabic_name: 'البطين',
    nature: 'Solar',
    ruler: 'Sol',
    degree_start: 12.857,
    degree_end: 25.714,
    magical_uses: ['descoberta de tesouros', 'encontrar objetos perdidos', 'revelações'],
    astrological_uses: ['investigações', 'pesquisas', 'descobertas'],
    favorable_for: ['pesquisas', 'estudos', 'investigações'],
    avoid_for: ['navegação', 'viagens marítimas', 'casamento']
  },
  3: {
    name: 'Al-Thurayya',
    arabic_name: 'الثريا',
    nature: 'Lunar',
    ruler: 'Lua',
    degree_start: 25.714,
    degree_end: 38.571,
    magical_uses: ['alquimia', 'caça', 'navegação', 'proteção em viagens'],
    astrological_uses: ['viagens', 'caça', 'navegação'],
    favorable_for: ['viagens', 'caça', 'navegação', 'alquimia'],
    avoid_for: ['casamento', 'empréstimos', 'construção']
  },
  4: {
    name: 'Al-Dabaran',
    arabic_name: 'الدبران',
    nature: 'Venusiana',
    ruler: 'Vênus',
    degree_start: 38.571,
    degree_end: 51.428,
    magical_uses: ['destruição', 'vingança', 'separação', 'banimentos'],
    astrological_uses: ['destruição de inimigos', 'separações'],
    favorable_for: ['banimentos', 'separações necessárias', 'destruição de obstáculos'],
    avoid_for: ['casamento', 'sociedades', 'amizades', 'construção']
  },
  5: {
    name: 'Al-Haqah',
    arabic_name: 'الهقعة',
    nature: 'Mercurial',
    ruler: 'Mercúrio',
    degree_start: 51.428,
    degree_end: 64.285,
    magical_uses: ['favor de reis', 'honras', 'dignidades', 'proteção'],
    astrological_uses: ['obter favores', 'honras', 'promoções'],
    favorable_for: ['buscar favores', 'promoções', 'honras', 'proteção'],
    avoid_for: ['viagens', 'mudanças', 'casamento']
  },
  6: {
    name: 'Al-Hanah',
    arabic_name: 'الهنعة',
    nature: 'Jupiteriana',
    ruler: 'Júpiter',
    degree_start: 64.285,
    degree_end: 77.142,
    magical_uses: ['amor', 'benevolência', 'favor', 'amizade'],
    astrological_uses: ['amor', 'amizade', 'reconciliação'],
    favorable_for: ['amor', 'casamento', 'amizades', 'reconciliação'],
    avoid_for: ['guerra', 'conflitos', 'separações']
  },
  7: {
    name: 'Al-Dhira',
    arabic_name: 'الذراع',
    nature: 'Saturnina',
    ruler: 'Saturno',
    degree_start: 77.142,
    degree_end: 89.999,
    magical_uses: ['ganho', 'comércio', 'lucro', 'amizade'],
    astrological_uses: ['comércio', 'negócios', 'lucro'],
    favorable_for: ['comércio', 'negócios', 'ganhos', 'amizades'],
    avoid_for: ['viagens marítimas', 'casamento', 'empréstimos']
  },
  8: {
    name: 'Al-Nathrah',
    arabic_name: 'النثرة',
    nature: 'Saturnina',
    ruler: 'Saturno',
    degree_start: 90,
    degree_end: 102.857,
    magical_uses: ['amor', 'amizade', 'viajantes', 'prisioneiros'],
    astrological_uses: ['libertação', 'viagens', 'amor'],
    favorable_for: ['libertação', 'viagens', 'amor', 'amizade'],
    avoid_for: ['casamento', 'empréstimos', 'construção']
  },
  9: {
    name: 'Al-Tarf',
    arabic_name: 'الطرف',
    nature: 'Solar',
    ruler: 'Sol',
    degree_start: 102.857,
    degree_end: 115.714,
    magical_uses: ['dano', 'separação', 'inimizade', 'destruição'],
    astrological_uses: ['separação', 'destruição de inimigos'],
    favorable_for: ['banimentos', 'separações necessárias', 'destruição de obstáculos'],
    avoid_for: ['casamento', 'amizades', 'sociedades', 'construção']
  },
  10: {
    name: 'Al-Jabhah',
    arabic_name: 'الجبهة',
    nature: 'Venusiana',
    ruler: 'Vênus',
    degree_start: 115.714,
    degree_end: 128.571,
    magical_uses: ['amor', 'benevolência', 'ganho', 'amizade'],
    astrological_uses: ['amor', 'ganhos', 'benevolência'],
    favorable_for: ['amor', 'ganhos', 'amizades', 'benevolência'],
    avoid_for: ['guerra', 'conflitos', 'separações']
  },
  11: {
    name: 'Al-Zubrah',
    arabic_name: 'الزبرة',
    nature: 'Mercurial',
    ruler: 'Mercúrio',
    degree_start: 128.571,
    degree_end: 141.428,
    magical_uses: ['libertação de prisioneiros', 'favor', 'ganho'],
    astrological_uses: ['libertação', 'favor', 'ganhos'],
    favorable_for: ['libertação', 'favor', 'ganhos', 'estudos'],
    avoid_for: ['casamento', 'viagens marítimas', 'empréstimos']
  },
  12: {
    name: 'Al-Sarfah',
    arabic_name: 'الصرفة',
    nature: 'Jupiteriana',
    ruler: 'Júpiter',
    degree_start: 141.428,
    degree_end: 154.285,
    magical_uses: ['colheita', 'plantio', 'libertação', 'amizade'],
    astrological_uses: ['agricultura', 'libertação', 'amizade'],
    favorable_for: ['plantio', 'colheita', 'libertação', 'amizades'],
    avoid_for: ['viagens marítimas', 'casamento', 'construção']
  },
  13: {
    name: 'Al-Awwa',
    arabic_name: 'العوا',
    nature: 'Marcial',
    ruler: 'Marte',
    degree_start: 154.285,
    degree_end: 167.142,
    magical_uses: ['colheita', 'viajantes', 'marinheiros', 'casamento'],
    astrological_uses: ['colheita', 'viagens', 'casamento'],
    favorable_for: ['colheita', 'viagens', 'casamento', 'navegação'],
    avoid_for: ['empréstimos', 'sociedades', 'construção']
  },
  14: {
    name: 'Al-Simak',
    arabic_name: 'السماك',
    nature: 'Venusiana',
    ruler: 'Vênus',
    degree_start: 167.142,
    degree_end: 179.999,
    magical_uses: ['amor', 'amizade', 'colheita', 'viajantes'],
    astrological_uses: ['amor', 'colheita', 'viagens'],
    favorable_for: ['amor', 'colheita', 'viagens', 'amizades'],
    avoid_for: ['guerra', 'conflitos', 'separações']
  },
  15: {
    name: 'Al-Ghafr',
    arabic_name: 'الغفر',
    nature: 'Marcial',
    ruler: 'Marte',
    degree_start: 180,
    degree_end: 192.857,
    magical_uses: ['extração de tesouros', 'favor', 'amizade'],
    astrological_uses: ['descobertas', 'favor', 'amizade'],
    favorable_for: ['descobertas', 'favor', 'amizades', 'pesquisas'],
    avoid_for: ['viagens marítimas', 'casamento', 'empréstimos']
  },
  16: {
    name: 'Al-Zubana',
    arabic_name: 'الزبانى',
    nature: 'Mercurial',
    ruler: 'Mercúrio',
    degree_start: 192.857,
    degree_end: 205.714,
    magical_uses: ['separação', 'divórcio', 'libertação', 'destruição'],
    astrological_uses: ['separação', 'libertação', 'destruição'],
    favorable_for: ['separações necessárias', 'libertação', 'banimentos'],
    avoid_for: ['casamento', 'sociedades', 'amizades', 'construção']
  },
  17: {
    name: 'Al-Iklil',
    arabic_name: 'الإكليل',
    nature: 'Marcial',
    ruler: 'Marte',
    degree_start: 205.714,
    degree_end: 218.571,
    magical_uses: ['amor', 'amizade', 'aflição de inimigos', 'proteção'],
    astrological_uses: ['amor', 'proteção contra inimigos'],
    favorable_for: ['amor', 'proteção', 'defesa contra inimigos'],
    avoid_for: ['viagens marítimas', 'empréstimos', 'construção']
  },
  18: {
    name: 'Al-Qalb',
    arabic_name: 'القلب',
    nature: 'Solar',
    ruler: 'Sol',
    degree_start: 218.571,
    degree_end: 231.428,
    magical_uses: ['separação', 'inimizade', 'destruição', 'corrupção'],
    astrological_uses: ['separação', 'destruição de inimigos'],
    favorable_for: ['banimentos', 'separações necessárias', 'destruição de obstáculos'],
    avoid_for: ['casamento', 'amizades', 'sociedades', 'construção']
  },
  19: {
    name: 'Al-Shaulah',
    arabic_name: 'الشولة',
    nature: 'Marcial',
    ruler: 'Marte',
    degree_start: 231.428,
    degree_end: 244.285,
    magical_uses: ['cerco de cidades', 'vingança', 'separação'],
    astrological_uses: ['cercos', 'vingança', 'separação'],
    favorable_for: ['banimentos', 'separações', 'destruição de obstáculos'],
    avoid_for: ['casamento', 'amizades', 'construção', 'viagens']
  },
  20: {
    name: 'Al-Naayim',
    arabic_name: 'النعائم',
    nature: 'Venusiana',
    ruler: 'Vênus',
    degree_start: 244.285,
    degree_end: 257.142,
    magical_uses: ['domesticação de animais', 'fortalecimento', 'destruição'],
    astrological_uses: ['domesticação', 'fortalecimento'],
    favorable_for: ['trabalho com animais', 'fortalecimento', 'treinamento'],
    avoid_for: ['casamento', 'amizades', 'viagens marítimas']
  },
  21: {
    name: 'Al-Baldah',
    arabic_name: 'البلدة',
    nature: 'Solar',
    ruler: 'Sol',
    degree_start: 257.142,
    degree_end: 269.999,
    magical_uses: ['destruição', 'separação', 'divórcio', 'libertação'],
    astrological_uses: ['destruição', 'separação', 'libertação'],
    favorable_for: ['separações necessárias', 'libertação', 'banimentos'],
    avoid_for: ['casamento', 'sociedades', 'amizades', 'construção']
  },
  22: {
    name: 'Sad al-Dhabih',
    arabic_name: 'سعد الذابح',
    nature: 'Marcial',
    ruler: 'Marte',
    degree_start: 270,
    degree_end: 282.857,
    magical_uses: ['destruição', 'morte', 'separação', 'libertação'],
    astrological_uses: ['destruição', 'separação', 'libertação'],
    favorable_for: ['banimentos', 'separações', 'libertação de prisões'],
    avoid_for: ['casamento', 'construção', 'amizades', 'sociedades']
  },
  23: {
    name: 'Sad Bula',
    arabic_name: 'سعد بلع',
    nature: 'Saturnina',
    ruler: 'Saturno',
    degree_start: 282.857,
    degree_end: 295.714,
    magical_uses: ['cura', 'libertação', 'destruição', 'separação'],
    astrological_uses: ['cura', 'libertação', 'destruição'],
    favorable_for: ['cura', 'libertação', 'banimentos', 'separações'],
    avoid_for: ['casamento', 'amizades', 'construção', 'viagens']
  },
  24: {
    name: 'Sad al-Suud',
    arabic_name: 'سعد السعود',
    nature: 'Jupiteriana',
    ruler: 'Júpiter',
    degree_start: 295.714,
    degree_end: 308.571,
    magical_uses: ['casamento', 'amizade', 'vitória', 'libertação'],
    astrological_uses: ['casamento', 'vitória', 'libertação'],
    favorable_for: ['casamento', 'amizades', 'vitórias', 'libertação'],
    avoid_for: ['guerra', 'conflitos', 'separações']
  },
  25: {
    name: 'Sad al-Akhbiyah',
    arabic_name: 'سعد الأخبية',
    nature: 'Marcial',
    ruler: 'Marte',
    degree_start: 308.571,
    degree_end: 321.428,
    magical_uses: ['cerco', 'destruição', 'divórcio', 'separação'],
    astrological_uses: ['cercos', 'destruição', 'separação'],
    favorable_for: ['banimentos', 'separações', 'destruição de obstáculos'],
    avoid_for: ['casamento', 'amizades', 'construção', 'sociedades']
  },
  26: {
    name: 'Al-Fargh al-Mukdim',
    arabic_name: 'الفرغ المقدم',
    nature: 'Mercurial',
    ruler: 'Mercúrio',
    degree_start: 321.428,
    degree_end: 334.285,
    magical_uses: ['amor', 'união', 'segurança', 'favor'],
    astrological_uses: ['amor', 'união', 'segurança'],
    favorable_for: ['amor', 'união', 'segurança', 'favor'],
    avoid_for: ['guerra', 'conflitos', 'separações']
  },
  27: {
    name: 'Al-Fargh al-Thani',
    arabic_name: 'الفرغ الثاني',
    nature: 'Lunar',
    ruler: 'Lua',
    degree_start: 334.285,
    degree_end: 347.142,
    magical_uses: ['aumento de colheitas', 'ganho', 'comércio', 'casamento'],
    astrological_uses: ['colheitas', 'ganhos', 'comércio'],
    favorable_for: ['colheitas', 'ganhos', 'comércio', 'casamento'],
    avoid_for: ['viagens marítimas', 'empréstimos', 'construção']
  },
  28: {
    name: 'Batn al-Hut',
    arabic_name: 'بطن الحوت',
    nature: 'Saturnina',
    ruler: 'Saturno',
    degree_start: 347.142,
    degree_end: 360,
    magical_uses: ['aumento de colheitas', 'ganho', 'casamento', 'amizade'],
    astrological_uses: ['colheitas', 'ganhos', 'casamento'],
    favorable_for: ['colheitas', 'ganhos', 'casamento', 'amizades'],
    avoid_for: ['viagens marítimas', 'empréstimos', 'guerra']
  }
};

/**
 * Obtém a mansão lunar para uma longitude da Lua
 */
export function getLunarMansion(moonLongitude: number): LunarMansion {
  const mansionNumber = calculateLunarMansion(moonLongitude);
  const mansionData = LUNAR_MANSIONS[mansionNumber];
  
  if (!mansionData) {
    throw new Error(`Mansão lunar ${mansionNumber} não encontrada`);
  }
  
  return {
    number: mansionNumber,
    ...mansionData
  };
}

/**
 * Obtém todas as mansões lunares
 */
export function getAllLunarMansions(): LunarMansion[] {
  return Object.entries(LUNAR_MANSIONS).map(([number, data]) => ({
    number: parseInt(number),
    ...data
  }));
}

/**
 * Obtém mansão lunar por número
 */
export function getLunarMansionByNumber(number: number): LunarMansion | null {
  if (number < 1 || number > 28) {
    return null;
  }
  
  const mansionData = LUNAR_MANSIONS[number];
  return mansionData ? { number, ...mansionData } : null;
}

/**
 * Verifica se uma atividade é favorável na mansão atual
 */
export function isActivityFavorable(
  moonLongitude: number, 
  activity: string
): boolean {
  const mansion = getLunarMansion(moonLongitude);
  return mansion.favorable_for.some(fav => 
    fav.toLowerCase().includes(activity.toLowerCase())
  );
}

/**
 * Verifica se uma atividade deve ser evitada na mansão atual
 */
export function shouldAvoidActivity(
  moonLongitude: number, 
  activity: string
): boolean {
  const mansion = getLunarMansion(moonLongitude);
  return mansion.avoid_for.some(avoid => 
    avoid.toLowerCase().includes(activity.toLowerCase())
  );
}

/**
 * Obtém recomendações para uma mansão lunar
 */
export function getMansionRecommendations(moonLongitude: number): {
  mansion: LunarMansion;
  favorable: string[];
  avoid: string[];
  magical_uses: string[];
} {
  const mansion = getLunarMansion(moonLongitude);
  
  return {
    mansion,
    favorable: mansion.favorable_for,
    avoid: mansion.avoid_for,
    magical_uses: mansion.magical_uses
  };
}


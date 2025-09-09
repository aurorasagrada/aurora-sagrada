/**
 * Sistema de Partes da Planta segundo Paracelso
 * Relaciona fases lunares com partes específicas das plantas para colheita
 */

import { ParacelsusPlantPart, LunarPhase } from '@/lib/types';
import { getLunarPhase } from './fases-lunares';

/**
 * Dados das partes da planta por fase lunar segundo Paracelso
 */
const PARACELSUS_PLANT_PARTS: Record<string, ParacelsusPlantPart> = {
  'Nova': {
    phase: 'Nova',
    part: 'Raízes',
    description: 'Durante a Lua Nova, a energia se concentra nas raízes. É o melhor momento para colher raízes medicinais.',
    uses: [
      'Colheita de raízes medicinais',
      'Preparação de tinturas de raiz',
      'Trabalhos de enraizamento',
      'Magias de fundação e base'
    ],
    timing: 'Preferencialmente antes do nascer do sol, quando a energia telúrica está mais concentrada'
  },
  'Crescente': {
    phase: 'Crescente',
    part: 'Folhas',
    description: 'Na Lua Crescente, a seiva sobe e as folhas concentram princípios ativos. Ideal para colher folhas.',
    uses: [
      'Colheita de folhas medicinais',
      'Preparação de chás e infusões',
      'Trabalhos de crescimento',
      'Magias de expansão e desenvolvimento'
    ],
    timing: 'Durante a manhã, após o orvalho secar, quando a planta está mais vigorosa'
  },
  'Cheia': {
    phase: 'Cheia',
    part: 'Flores',
    description: 'A Lua Cheia potencializa as flores, concentrando óleos essenciais e princípios aromáticos.',
    uses: [
      'Colheita de flores medicinais',
      'Preparação de óleos essenciais',
      'Trabalhos de florescimento',
      'Magias de plenitude e manifestação'
    ],
    timing: 'Ao meio-dia ou início da tarde, quando as flores estão completamente abertas'
  },
  'Minguante': {
    phase: 'Minguante',
    part: 'Frutos e Sementes',
    description: 'Na Lua Minguante, frutos e sementes concentram a essência vital da planta para perpetuação.',
    uses: [
      'Colheita de frutos medicinais',
      'Coleta de sementes',
      'Trabalhos de preservação',
      'Magias de sabedoria e conservação'
    ],
    timing: 'Final da tarde ou início da noite, quando os frutos estão maduros'
  }
};

/**
 * Correspondências específicas por tipo de planta
 */
const PLANT_TYPE_CORRESPONDENCES = {
  'medicinais': {
    'Nova': ['Bardana', 'Dente-de-leão', 'Valeriana', 'Ginseng', 'Equinácea'],
    'Crescente': ['Hortelã', 'Melissa', 'Sálvia', 'Alecrim', 'Manjericão'],
    'Cheia': ['Lavanda', 'Camomila', 'Rosa', 'Jasmim', 'Calêndula'],
    'Minguante': ['Espinheiro', 'Sabugueiro', 'Rosa Mosqueta', 'Cardo Mariano']
  },
  'magicas': {
    'Nova': ['Mandrágora', 'Raiz de Adão', 'Angélica', 'Gengibre'],
    'Crescente': ['Artemísia', 'Verbena', 'Salsa', 'Louro'],
    'Cheia': ['Hipérico', 'Verbasco', 'Mil-folhas', 'Acácia'],
    'Minguante': ['Zimbro', 'Cipreste', 'Teixo', 'Avelã']
  },
  'culinarias': {
    'Nova': ['Cebola', 'Alho', 'Rabanete', 'Cenoura'],
    'Crescente': ['Salsa', 'Coentro', 'Manjericão', 'Orégano'],
    'Cheia': ['Tomilho', 'Lavanda', 'Flores comestíveis'],
    'Minguante': ['Pimenta', 'Cominho', 'Erva-doce', 'Anis']
  }
};

/**
 * Obtém informações sobre a parte da planta para uma data
 */
export async function getPlantPartForDate(date: Date): Promise<ParacelsusPlantPart> {
  try {
    const lunarPhase = await getLunarPhase(date);
    const plantPart = PARACELSUS_PLANT_PARTS[lunarPhase.name];
    
    if (!plantPart) {
      throw new Error(`Fase lunar não reconhecida: ${lunarPhase.name}`);
    }
    
    return plantPart;
  } catch (error) {
    console.error('Erro ao obter parte da planta:', error);
    // Retorna informação padrão em caso de erro
    return PARACELSUS_PLANT_PARTS['Nova'];
  }
}

/**
 * Obtém plantas recomendadas para uma fase específica
 */
export function getPlantsForPhase(
  phase: string, 
  type: 'medicinais' | 'magicas' | 'culinarias' = 'medicinais'
): string[] {
  const plants = PLANT_TYPE_CORRESPONDENCES[type];
  return plants[phase as keyof typeof plants] || [];
}

/**
 * Obtém todas as correspondências de plantas por fase
 */
export function getAllPlantCorrespondences(): Record<string, {
  part: string;
  medicinais: string[];
  magicas: string[];
  culinarias: string[];
}> {
  const result: Record<string, any> = {};
  
  Object.keys(PARACELSUS_PLANT_PARTS).forEach(phase => {
    result[phase] = {
      part: PARACELSUS_PLANT_PARTS[phase].part,
      medicinais: getPlantsForPhase(phase, 'medicinais'),
      magicas: getPlantsForPhase(phase, 'magicas'),
      culinarias: getPlantsForPhase(phase, 'culinarias')
    };
  });
  
  return result;
}

/**
 * Verifica se é um bom momento para colher uma parte específica
 */
export async function isGoodTimeForHarvest(
  date: Date, 
  plantPart: 'raizes' | 'folhas' | 'flores' | 'frutos'
): Promise<{
  favorable: boolean;
  reason: string;
  recommendation: string;
}> {
  try {
    const currentPart = await getPlantPartForDate(date);
    const partMap = {
      'raizes': 'Raízes',
      'folhas': 'Folhas', 
      'flores': 'Flores',
      'frutos': 'Frutos e Sementes'
    };
    
    const targetPart = partMap[plantPart];
    const favorable = currentPart.part === targetPart;
    
    return {
      favorable,
      reason: favorable 
        ? `Lua ${currentPart.phase} favorece a colheita de ${targetPart.toLowerCase()}`
        : `Lua ${currentPart.phase} favorece ${currentPart.part.toLowerCase()}, não ${targetPart.toLowerCase()}`,
      recommendation: favorable 
        ? currentPart.timing
        : `Aguarde a fase ${Object.keys(PARACELSUS_PLANT_PARTS).find(phase => 
            PARACELSUS_PLANT_PARTS[phase].part === targetPart
          )} para colher ${targetPart.toLowerCase()}`
    };
  } catch (error) {
    console.error('Erro ao verificar momento de colheita:', error);
    return {
      favorable: false,
      reason: 'Erro ao calcular fase lunar',
      recommendation: 'Consulte um almanaque lunar'
    };
  }
}

/**
 * Obtém calendário de colheita para o mês
 */
export async function getHarvestCalendar(
  year: number, 
  month: number
): Promise<{
  date: Date;
  phase: string;
  part: string;
  plants: {
    medicinais: string[];
    magicas: string[];
    culinarias: string[];
  };
  timing: string;
}[]> {
  const calendar = [];
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  for (let day = 1; day <= endDate.getDate(); day++) {
    const date = new Date(year, month - 1, day);
    
    try {
      const plantPart = await getPlantPartForDate(date);
      
      calendar.push({
        date,
        phase: plantPart.phase,
        part: plantPart.part,
        plants: {
          medicinais: getPlantsForPhase(plantPart.phase, 'medicinais'),
          magicas: getPlantsForPhase(plantPart.phase, 'magicas'),
          culinarias: getPlantsForPhase(plantPart.phase, 'culinarias')
        },
        timing: plantPart.timing
      });
    } catch (error) {
      console.warn(`Erro ao calcular para ${date}:`, error);
    }
  }
  
  return calendar;
}

/**
 * Obtém dicas de preparação por fase lunar
 */
export function getPreparationTips(phase: string): {
  methods: string[];
  preservation: string[];
  magical_uses: string[];
} {
  const tips = {
    'Nova': {
      methods: [
        'Decocção lenta para extrair princípios das raízes',
        'Maceração em álcool para tinturas',
        'Secagem ao ar livre, longe da luz solar'
      ],
      preservation: [
        'Armazenar em recipientes escuros',
        'Manter em local seco e fresco',
        'Etiquetar com data de colheita'
      ],
      magical_uses: [
        'Trabalhos de enraizamento e estabilidade',
        'Magias de proteção e fundação',
        'Rituais de conexão com a terra'
      ]
    },
    'Crescente': {
      methods: [
        'Infusão rápida para preservar óleos voláteis',
        'Secagem rápida em local ventilado',
        'Preparação de águas aromáticas'
      ],
      preservation: [
        'Secar rapidamente para manter cor verde',
        'Armazenar em recipientes herméticos',
        'Usar dentro de um ano'
      ],
      magical_uses: [
        'Trabalhos de crescimento e expansão',
        'Magias de prosperidade',
        'Rituais de desenvolvimento pessoal'
      ]
    },
    'Cheia': {
      methods: [
        'Destilação para óleos essenciais',
        'Preparação de hidrolatos',
        'Secagem lenta para preservar aromas'
      ],
      preservation: [
        'Colher no pico da floração',
        'Secar em local escuro e arejado',
        'Armazenar flores inteiras quando possível'
      ],
      magical_uses: [
        'Trabalhos de plenitude e manifestação',
        'Magias de amor e beleza',
        'Rituais de celebração'
      ]
    },
    'Minguante': {
      methods: [
        'Extração de óleos por prensagem',
        'Preparação de conservas',
        'Fermentação controlada'
      ],
      preservation: [
        'Colher frutos bem maduros',
        'Secar sementes completamente',
        'Armazenar em recipientes herméticos'
      ],
      magical_uses: [
        'Trabalhos de sabedoria e conservação',
        'Magias de banimento e limpeza',
        'Rituais de ancestralidade'
      ]
    }
  };
  
  return tips[phase as keyof typeof tips] || tips['Nova'];
}


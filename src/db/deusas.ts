/**
 * Conector para BasedeDadosdoguiaLunar.js - Seção de Deusas
 * Mantém a base canônica intacta e expõe funcionalidades tipadas
 */

import { Goddess } from '@/lib/types';

// Importa a base canônica (será carregada dinamicamente)
let BaseDados: any = null;

/**
 * Carrega a base de dados se ainda não foi carregada
 */
async function loadBaseDados(): Promise<void> {
  if (!BaseDados) {
    try {
      // Carrega o módulo da base de dados
      const module = await import('../../data/BasedeDadosdoguiaLunar.js');
      BaseDados = module.deusas365Completa || module.default?.deusas365Completa || module.default;
      
      if (!BaseDados) {
        console.warn('Base de deusas não encontrada, usando dados locais');
        // Fallback para dados locais
        BaseDados = {
          1: {
            nome: "Brigid",
            origem: "Celta", 
            dominio: "Fogo sagrado, poesia, cura, metalurgia",
            elemento: "Fogo",
            invocacao: "Brigid das chamas eternas, desperta em mim a inspiração divina.",
            correspondencias: {
              ervas: ["Dente-de-leão", "Trevo", "Cardo"],
              cristais: ["Cornalina", "Citrino", "Granadas"],
              cores: ["Vermelho", "Dourado", "Branco"],
              incensos: ["Olíbano", "Sândalo", "Canela"],
              oferendas: ["Leite", "Mel", "Pão"],
              dia_semana: "Terça-feira",
              planeta: "Marte",
              numero: "3"
            }
          }
        };
      }
    } catch (error) {
      console.error('Erro ao carregar base de deusas:', error);
      // Dados de fallback
      BaseDados = {
        1: {
          nome: "Brigid",
          origem: "Celta",
          dominio: "Fogo sagrado, poesia, cura, metalurgia", 
          elemento: "Fogo",
          invocacao: "Brigid das chamas eternas, desperta em mim a inspiração divina.",
          correspondencias: {
            ervas: ["Dente-de-leão", "Trevo", "Cardo"],
            cristais: ["Cornalina", "Citrino", "Granadas"],
            cores: ["Vermelho", "Dourado", "Branco"],
            incensos: ["Olíbano", "Sândalo", "Canela"],
            oferendas: ["Leite", "Mel", "Pão"],
            dia_semana: "Terça-feira",
            planeta: "Marte",
            numero: "3"
          }
        }
      };
    }
  }
}

/**
 * Obtém a deusa do dia para uma data específica
 */
export async function getGoddessOfDay(date: Date): Promise<Goddess> {
  await loadBaseDados();
  
  try {
    const dayOfYear = getDayOfYear(date);
    const goddessData = BaseDados[dayOfYear];
    
    if (!goddessData) {
      throw new Error(`Deusa não encontrada para o dia ${dayOfYear}`);
    }
    
    return goddessData as Goddess;
  } catch (error) {
    console.error('Erro ao obter deusa do dia:', error);
    throw new Error('Erro ao buscar deusa do dia');
  }
}

/**
 * Obtém deusa por dia do ano (1-365/366)
 */
export async function getGoddessByDayOfYear(dayOfYear: number): Promise<Goddess | null> {
  await loadBaseDados();
  
  try {
    if (dayOfYear < 1 || dayOfYear > 366) {
      return null;
    }
    
    const goddessData = BaseDados[dayOfYear];
    return goddessData ? (goddessData as Goddess) : null;
  } catch (error) {
    console.error(`Erro ao obter deusa para dia ${dayOfYear}:`, error);
    return null;
  }
}

/**
 * Busca deusas por elemento
 */
export async function getGoddessesByElement(element: string): Promise<Goddess[]> {
  await loadBaseDados();
  
  try {
    const goddesses: Goddess[] = [];
    
    for (let day = 1; day <= 365; day++) {
      const goddessData = BaseDados[day];
      if (goddessData && goddessData.elemento.toLowerCase() === element.toLowerCase()) {
        goddesses.push(goddessData as Goddess);
      }
    }
    
    return goddesses;
  } catch (error) {
    console.error(`Erro ao buscar deusas por elemento ${element}:`, error);
    return [];
  }
}

/**
 * Busca deusas por domínio
 */
export async function getGoddessesByDomain(domain: string): Promise<Goddess[]> {
  await loadBaseDados();
  
  try {
    const goddesses: Goddess[] = [];
    
    for (let day = 1; day <= 365; day++) {
      const goddessData = BaseDados[day];
      if (goddessData && goddessData.dominio.toLowerCase().includes(domain.toLowerCase())) {
        goddesses.push(goddessData as Goddess);
      }
    }
    
    return goddesses;
  } catch (error) {
    console.error(`Erro ao buscar deusas por domínio ${domain}:`, error);
    return [];
  }
}

/**
 * Obtém correspondências de uma deusa por erva
 */
export async function getGoddessByHerb(herb: string): Promise<Goddess[]> {
  await loadBaseDados();
  
  try {
    const goddesses: Goddess[] = [];
    
    for (let day = 1; day <= 365; day++) {
      const goddessData = BaseDados[day];
      if (goddessData && goddessData.correspondencias.ervas.some((erva: string) => 
        erva.toLowerCase().includes(herb.toLowerCase())
      )) {
        goddesses.push(goddessData as Goddess);
      }
    }
    
    return goddesses;
  } catch (error) {
    console.error(`Erro ao buscar deusas por erva ${herb}:`, error);
    return [];
  }
}

/**
 * Obtém correspondências de uma deusa por cristal
 */
export async function getGoddessByCrystal(crystal: string): Promise<Goddess[]> {
  await loadBaseDados();
  
  try {
    const goddesses: Goddess[] = [];
    
    for (let day = 1; day <= 365; day++) {
      const goddessData = BaseDados[day];
      if (goddessData && goddessData.correspondencias.cristais.some((cristal: string) => 
        cristal.toLowerCase().includes(crystal.toLowerCase())
      )) {
        goddesses.push(goddessData as Goddess);
      }
    }
    
    return goddesses;
  } catch (error) {
    console.error(`Erro ao buscar deusas por cristal ${crystal}:`, error);
    return [];
  }
}

/**
 * Obtém todas as deusas (para referência)
 */
export async function getAllGoddesses(): Promise<Record<number, Goddess>> {
  await loadBaseDados();
  
  try {
    return BaseDados as Record<number, Goddess>;
  } catch (error) {
    console.error('Erro ao obter todas as deusas:', error);
    return {};
  }
}

/**
 * Obtém estatísticas das deusas
 */
export async function getGoddessStatistics(): Promise<{
  total: number;
  byElement: Record<string, number>;
  byDayOfWeek: Record<string, number>;
  mostCommonHerbs: string[];
  mostCommonCrystals: string[];
}> {
  await loadBaseDados();
  
  try {
    const byElement: Record<string, number> = {};
    const byDayOfWeek: Record<string, number> = {};
    const herbCount: Record<string, number> = {};
    const crystalCount: Record<string, number> = {};
    
    for (let day = 1; day <= 365; day++) {
      const goddessData = BaseDados[day];
      if (goddessData) {
        // Conta por elemento
        const element = goddessData.elemento;
        byElement[element] = (byElement[element] || 0) + 1;
        
        // Conta por dia da semana
        const dayOfWeek = goddessData.correspondencias.dia_semana;
        byDayOfWeek[dayOfWeek] = (byDayOfWeek[dayOfWeek] || 0) + 1;
        
        // Conta ervas
        goddessData.correspondencias.ervas.forEach((erva: string) => {
          herbCount[erva] = (herbCount[erva] || 0) + 1;
        });
        
        // Conta cristais
        goddessData.correspondencias.cristais.forEach((cristal: string) => {
          crystalCount[cristal] = (crystalCount[cristal] || 0) + 1;
        });
      }
    }
    
    // Ordena ervas e cristais mais comuns
    const mostCommonHerbs = Object.entries(herbCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([herb]) => herb);
      
    const mostCommonCrystals = Object.entries(crystalCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([crystal]) => crystal);
    
    return {
      total: Object.keys(BaseDados).length,
      byElement,
      byDayOfWeek,
      mostCommonHerbs,
      mostCommonCrystals
    };
  } catch (error) {
    console.error('Erro ao calcular estatísticas das deusas:', error);
    return {
      total: 0,
      byElement: {},
      byDayOfWeek: {},
      mostCommonHerbs: [],
      mostCommonCrystals: []
    };
  }
}

/**
 * Obtém dica mágica prática para uma deusa
 */
export async function getMagicalTip(goddess: Goddess): Promise<string> {
  const tips = [
    `Invoque ${goddess.nome} durante ${goddess.correspondencias.dia_semana} para trabalhos de ${goddess.dominio.toLowerCase()}.`,
    `Use ${goddess.correspondencias.ervas[0]} e ${goddess.correspondencias.cristais[0]} em rituais dedicados a ${goddess.nome}.`,
    `Acenda incenso de ${goddess.correspondencias.incensos[0]} ao trabalhar com a energia de ${goddess.nome}.`,
    `Vista ${goddess.correspondencias.cores[0].toLowerCase()} ao invocar ${goddess.nome} para amplificar a conexão.`,
    `Ofereça ${goddess.correspondencias.oferendas[0]} a ${goddess.nome} em seu altar pessoal.`
  ];
  
  // Retorna uma dica aleatória
  return tips[Math.floor(Math.random() * tips.length)];
}

/**
 * Verifica se a base de deusas está disponível
 */
export async function isGoddessBaseAvailable(): Promise<boolean> {
  try {
    await loadBaseDados();
    return BaseDados !== null;
  } catch {
    return false;
  }
}

/**
 * Calcula dia do ano (1-365/366)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}


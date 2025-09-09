// Base de Dados do Guia Lunar - Versão Simplificada para Desenvolvimento
// Arquivo temporário até correção da base completa

export const deusas365Completa = {
  1: {
    nome: "Brigid",
    origem: "Celta",
    dominio: "Fogo sagrado, poesia, cura, metalurgia",
    elemento: "Fogo",
    invocacao: "Brigid das chamas eternas, desperta em mim a inspiração divina e a força criadora que transforma o mundo.",
    correspondencias: {
      ervas: ["Dente-de-leão", "Trevo", "Cardo", "Rowan"],
      cristais: ["Cornalina", "Citrino", "Granadas", "Âmbar"],
      cores: ["Vermelho", "Dourado", "Branco", "Verde"],
      incensos: ["Olíbano", "Sândalo", "Canela", "Cedro"],
      oferendas: ["Leite", "Mel", "Pão", "Flores brancas"],
      dia_semana: "Terça-feira",
      planeta: "Marte",
      numero: "3"
    }
  },
  2: {
    nome: "Ísis",
    origem: "Egípcia",
    dominio: "Magia, maternidade, cura, proteção",
    elemento: "Água",
    invocacao: "Grande Ísis, mãe de todas as magias, concede-me tua sabedoria ancestral e teu poder de cura.",
    correspondencias: {
      ervas: ["Lótus", "Mirra", "Acácia", "Papiro"],
      cristais: ["Lápis-lazúli", "Turquesa", "Prata", "Pérola"],
      cores: ["Azul", "Dourado", "Branco", "Prata"],
      incensos: ["Mirra", "Kyphi", "Lótus", "Sândalo"],
      oferendas: ["Água", "Flores de lótus", "Incenso", "Jóias"],
      dia_semana: "Segunda-feira",
      planeta: "Lua",
      numero: "7"
    }
  },
  3: {
    nome: "Atena",
    origem: "Grega",
    dominio: "Sabedoria, estratégia, artes, justiça",
    elemento: "Ar",
    invocacao: "Sábia Atena, deusa da estratégia divina, ilumina minha mente com tua sabedoria e guia meus passos na justiça.",
    correspondencias: {
      ervas: ["Oliveira", "Sálvia", "Lavanda", "Louro"],
      cristais: ["Safira", "Sodalita", "Ametista", "Quartzo claro"],
      cores: ["Azul", "Prata", "Branco", "Dourado"],
      incensos: ["Sálvia", "Olíbano", "Lavanda", "Benjoim"],
      oferendas: ["Azeite", "Pergaminhos", "Penas", "Livros"],
      dia_semana: "Quarta-feira",
      planeta: "Mercúrio",
      numero: "5"
    }
  },
  4: {
    nome: "Afrodite",
    origem: "Grega",
    dominio: "Amor, beleza, prazer, fertilidade",
    elemento: "Água",
    invocacao: "Divina Afrodite, deusa do amor eterno, desperta em mim a beleza interior e a capacidade de amar verdadeiramente.",
    correspondencias: {
      ervas: ["Rosa", "Mirto", "Maçã", "Verbena"],
      cristais: ["Quartzo rosa", "Esmeralda", "Pérola", "Morganita"],
      cores: ["Rosa", "Verde", "Azul claro", "Dourado"],
      incensos: ["Rosa", "Sândalo", "Ylang-ylang", "Benjoim"],
      oferendas: ["Rosas", "Mel", "Vinho doce", "Perfumes"],
      dia_semana: "Sexta-feira",
      planeta: "Vênus",
      numero: "6"
    }
  },
  5: {
    nome: "Freya",
    origem: "Nórdica",
    dominio: "Amor, guerra, morte, fertilidade, seidr",
    elemento: "Terra",
    invocacao: "Poderosa Freya, senhora do seidr e da guerra, concede-me tua força e tua magia para enfrentar os desafios.",
    correspondencias: {
      ervas: ["Bétula", "Sabugueiro", "Primula", "Morango"],
      cristais: ["Âmbar", "Granadas", "Cornalina", "Jaspe"],
      cores: ["Dourado", "Vermelho", "Verde", "Âmbar"],
      incensos: ["Âmbar", "Copal", "Pinho", "Cedro"],
      oferendas: ["Hidromel", "Flores", "Jóias", "Âmbar"],
      dia_semana: "Sexta-feira",
      planeta: "Vênus",
      numero: "8"
    }
  }
};

// Função para obter deusa por dia do ano
export function getGoddessOfDay(dayOfYear) {
  // Para teste, rotaciona entre as 5 deusas disponíveis
  const goddessIndex = ((dayOfYear - 1) % 5) + 1;
  return deusas365Completa[goddessIndex];
}

// Exporta como default também para compatibilidade
export default {
  deusas365Completa,
  getGoddessOfDay
};


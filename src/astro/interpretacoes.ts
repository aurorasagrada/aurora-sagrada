/**
 * Sistema de Interpretações Astrológicas
 * Gera textos dinâmicos baseados nos cálculos astronômicos
 */

export interface InterpretacaoAspecto {
  tipo: string;
  planetas: [string, string];
  orbe: number;
  aplicativo: boolean;
  titulo: string;
  descricao: string;
  energia: 'harmonioso' | 'tenso' | 'neutro';
  duracao: string;
  sugestoes: string[];
}

export interface InterpretacaoTransito {
  planeta: string;
  signo: string;
  grau: number;
  dignidade?: string;
  interpretacao: string;
  palavrasChave: string[];
}

// Interpretações dos Aspectos
export const INTERPRETACOES_ASPECTOS: Record<string, any> = {
  'conjuncao': {
    simbolo: '☌',
    nome: 'Conjunção',
    energia: 'neutro',
    descricao: 'União e fusão de energias planetárias',
    interpretacoes: {
      'sol-lua': {
        titulo: 'Sol ☌ Lua',
        descricao: 'Momento de síntese entre consciência e emoções. Ideal para novos começos e definição de intenções.',
        sugestoes: ['Meditação', 'Rituais de manifestação', 'Planejamento pessoal']
      },
      'venus-marte': {
        titulo: 'Vênus ☌ Marte',
        descricao: 'Fusão entre amor e desejo. Energia criativa e magnética em alta.',
        sugestoes: ['Arte criativa', 'Romance', 'Projetos estéticos']
      },
      'mercurio-sol': {
        titulo: 'Mercúrio ☌ Sol',
        descricao: 'Mente e identidade em sintonia. Excelente para comunicação e aprendizado.',
        sugestoes: ['Estudos', 'Escrita', 'Negociações importantes']
      }
    }
  },
  'trigono': {
    simbolo: '△',
    nome: 'Trígono',
    energia: 'harmonioso',
    descricao: 'Fluxo harmonioso e facilitador entre planetas',
    interpretacoes: {
      'sol-lua': {
        titulo: 'Sol △ Lua',
        descricao: 'Harmonia entre consciência e emoções. Período de equilíbrio e bem-estar.',
        sugestoes: ['Rituais de gratidão', 'Trabalhos de cura', 'Conexão familiar']
      },
      'jupiter-venus': {
        titulo: 'Júpiter △ Vênus',
        descricao: 'Expansão do amor e da beleza. Sorte em relacionamentos e finanças.',
        sugestoes: ['Investimentos', 'Relacionamentos', 'Arte e beleza']
      },
      'mercurio-jupiter': {
        titulo: 'Mercúrio △ Júpiter',
        descricao: 'Expansão mental e sabedoria. Ideal para estudos superiores e filosofia.',
        sugestoes: ['Ensino', 'Publicações', 'Viagens educativas']
      }
    }
  },
  'sextil': {
    simbolo: '⚹',
    nome: 'Sextil',
    energia: 'harmonioso',
    descricao: 'Oportunidades e cooperação entre energias planetárias',
    interpretacoes: {
      'venus-marte': {
        titulo: 'Vênus ⚹ Marte',
        descricao: 'Energia criativa e amorosa em cooperação. Momento favorável para projetos artísticos.',
        sugestoes: ['Criatividade', 'Colaborações', 'Projetos de beleza']
      },
      'sol-mercurio': {
        titulo: 'Sol ⚹ Mercúrio',
        descricao: 'Comunicação clara e expressão autêntica. Bom para apresentações e ideias.',
        sugestoes: ['Comunicação', 'Ideias criativas', 'Networking']
      }
    }
  },
  'quadratura': {
    simbolo: '□',
    nome: 'Quadratura',
    energia: 'tenso',
    descricao: 'Tensão criativa que demanda ação e resolução',
    interpretacoes: {
      'jupiter-saturno': {
        titulo: 'Júpiter □ Saturno',
        descricao: 'Tensão entre expansão e limitação. Momento de reavaliar estruturas e metas.',
        sugestoes: ['Planejamento estratégico', 'Revisão de metas', 'Disciplina']
      },
      'marte-plutao': {
        titulo: 'Marte □ Plutão',
        descricao: 'Intensidade e transformação forçada. Cuidado com conflitos e poder.',
        sugestoes: ['Transformação pessoal', 'Exercícios físicos', 'Terapia']
      }
    }
  },
  'oposicao': {
    simbolo: '☍',
    nome: 'Oposição',
    energia: 'tenso',
    descricao: 'Polarização que busca equilíbrio e integração',
    interpretacoes: {
      'sol-lua': {
        titulo: 'Sol ☍ Lua',
        descricao: 'Lua Cheia - culminação e revelação. Momento de colheita e liberação.',
        sugestoes: ['Rituais de liberação', 'Celebrações', 'Conclusões']
      },
      'venus-marte': {
        titulo: 'Vênus ☍ Marte',
        descricao: 'Tensão entre amor e desejo. Necessidade de equilibrar dar e receber.',
        sugestoes: ['Diálogo em relacionamentos', 'Equilíbrio emocional', 'Arte expressiva']
      }
    }
  }
};

// Interpretações dos Signos
export const INTERPRETACOES_SIGNOS: Record<string, any> = {
  'aries': {
    nome: 'Áries',
    elemento: 'Fogo',
    modalidade: 'Cardinal',
    regente: 'Marte',
    palavrasChave: ['Iniciativa', 'Coragem', 'Liderança', 'Pioneirismo'],
    interpretacao: 'Energia de início, coragem e ação direta. Momento para liderar e iniciar projetos.'
  },
  'touro': {
    nome: 'Touro',
    elemento: 'Terra',
    modalidade: 'Fixo',
    regente: 'Vênus',
    palavrasChave: ['Estabilidade', 'Sensualidade', 'Persistência', 'Materialização'],
    interpretacao: 'Energia de consolidação, prazer sensorial e construção sólida. Foco na estabilidade.'
  },
  'gemeos': {
    nome: 'Gêmeos',
    elemento: 'Ar',
    modalidade: 'Mutável',
    regente: 'Mercúrio',
    palavrasChave: ['Comunicação', 'Versatilidade', 'Curiosidade', 'Conexões'],
    interpretacao: 'Energia de comunicação, aprendizado e conexões múltiplas. Momento para trocar ideias.'
  },
  'cancer': {
    nome: 'Câncer',
    elemento: 'Água',
    modalidade: 'Cardinal',
    regente: 'Lua',
    palavrasChave: ['Nutrição', 'Proteção', 'Intuição', 'Família'],
    interpretacao: 'Energia emocional, nutritiva e protetora. Foco no lar e nas emoções.'
  },
  'leao': {
    nome: 'Leão',
    elemento: 'Fogo',
    modalidade: 'Fixo',
    regente: 'Sol',
    palavrasChave: ['Criatividade', 'Expressão', 'Generosidade', 'Brilho'],
    interpretacao: 'Energia criativa, expressiva e radiante. Momento para brilhar e criar.'
  },
  'virgem': {
    nome: 'Virgem',
    elemento: 'Terra',
    modalidade: 'Mutável',
    regente: 'Mercúrio',
    palavrasChave: ['Análise', 'Perfeição', 'Serviço', 'Organização'],
    interpretacao: 'Energia analítica, organizadora e de aperfeiçoamento. Foco nos detalhes e na eficiência.'
  },
  'libra': {
    nome: 'Libra',
    elemento: 'Ar',
    modalidade: 'Cardinal',
    regente: 'Vênus',
    palavrasChave: ['Equilíbrio', 'Harmonia', 'Relacionamentos', 'Justiça'],
    interpretacao: 'Energia de equilíbrio, beleza e relacionamentos. Busca por harmonia e justiça.'
  },
  'escorpiao': {
    nome: 'Escorpião',
    elemento: 'Água',
    modalidade: 'Fixo',
    regente: 'Plutão',
    palavrasChave: ['Transformação', 'Intensidade', 'Mistério', 'Regeneração'],
    interpretacao: 'Energia transformadora, intensa e regenerativa. Momento para mudanças profundas.'
  },
  'sagitario': {
    nome: 'Sagitário',
    elemento: 'Fogo',
    modalidade: 'Mutável',
    regente: 'Júpiter',
    palavrasChave: ['Expansão', 'Filosofia', 'Aventura', 'Sabedoria'],
    interpretacao: 'Energia expansiva, filosófica e aventureira. Busca por conhecimento e horizontes.'
  },
  'capricornio': {
    nome: 'Capricórnio',
    elemento: 'Terra',
    modalidade: 'Cardinal',
    regente: 'Saturno',
    palavrasChave: ['Estrutura', 'Ambição', 'Responsabilidade', 'Conquista'],
    interpretacao: 'Energia estruturadora, ambiciosa e responsável. Foco em metas e conquistas.'
  },
  'aquario': {
    nome: 'Aquário',
    elemento: 'Ar',
    modalidade: 'Fixo',
    regente: 'Urano',
    palavrasChave: ['Inovação', 'Liberdade', 'Humanitarismo', 'Originalidade'],
    interpretacao: 'Energia inovadora, libertária e humanitária. Momento para mudanças e originalidade.'
  },
  'peixes': {
    nome: 'Peixes',
    elemento: 'Água',
    modalidade: 'Mutável',
    regente: 'Netuno',
    palavrasChave: ['Intuição', 'Compaixão', 'Espiritualidade', 'Dissolução'],
    interpretacao: 'Energia intuitiva, compassiva e espiritual. Conexão com o transcendente.'
  }
};

/**
 * Gera interpretação dinâmica para um aspecto
 */
export function gerarInterpretacaoAspecto(
  aspecto: string,
  planeta1: string,
  planeta2: string,
  orbe: number,
  aplicativo: boolean
): InterpretacaoAspecto {
  const tipoAspecto = INTERPRETACOES_ASPECTOS[aspecto.toLowerCase()];
  const chaveAspecto = `${planeta1.toLowerCase()}-${planeta2.toLowerCase()}`;
  const chaveInversa = `${planeta2.toLowerCase()}-${planeta1.toLowerCase()}`;
  
  const interpretacao = tipoAspecto?.interpretacoes[chaveAspecto] || 
                       tipoAspecto?.interpretacoes[chaveInversa] || {
    titulo: `${planeta1} ${tipoAspecto?.simbolo || ''} ${planeta2}`,
    descricao: `${tipoAspecto?.descricao || 'Aspecto entre planetas'} - Orbe: ${orbe.toFixed(1)}°`,
    sugestoes: ['Observar as energias em ação', 'Meditar sobre o significado']
  };

  return {
    tipo: aspecto,
    planetas: [planeta1, planeta2],
    orbe,
    aplicativo,
    titulo: interpretacao.titulo,
    descricao: interpretacao.descricao,
    energia: tipoAspecto?.energia || 'neutro',
    duracao: aplicativo ? 'Aplicativo (se formando)' : 'Separativo (se desfazendo)',
    sugestoes: interpretacao.sugestoes || []
  };
}

/**
 * Gera interpretação para posição planetária
 */
export function gerarInterpretacaoTransito(
  planeta: string,
  signo: string,
  grau: number,
  dignidade?: string
): InterpretacaoTransito {
  const signoInfo = INTERPRETACOES_SIGNOS[signo.toLowerCase()];
  
  let interpretacao = `${planeta} em ${signo}`;
  if (dignidade) {
    interpretacao += ` (${dignidade})`;
  }
  interpretacao += ` - ${signoInfo?.interpretacao || 'Energia planetária em ação'}`;

  return {
    planeta,
    signo,
    grau,
    dignidade,
    interpretacao,
    palavrasChave: signoInfo?.palavrasChave || []
  };
}

/**
 * Gera análise completa do céu atual
 */
export function gerarAnaliseCompleta(
  posicoesPlanetarias: any[],
  aspectos: any[],
  mansaoLunar: string
): string {
  let analise = "🌟 **Análise do Céu Atual**\n\n";
  
  // Análise da Lua (mais importante para timing)
  const lua = posicoesPlanetarias.find(p => p.planeta.toLowerCase() === 'lua');
  if (lua) {
    analise += `🌙 **Energia Lunar Dominante**: A Lua em ${lua.signo} na mansão ${mansaoLunar} `;
    analise += `traz uma energia ${INTERPRETACOES_SIGNOS[lua.signo.toLowerCase()]?.palavrasChave[0] || 'especial'}. `;
    analise += `Este é um momento favorável para atividades relacionadas à ${INTERPRETACOES_SIGNOS[lua.signo.toLowerCase()]?.interpretacao || 'energia lunar'}.\n\n`;
  }

  // Análise dos aspectos mais importantes
  if (aspectos.length > 0) {
    analise += "⭐ **Aspectos Destacados**:\n";
    aspectos.slice(0, 3).forEach(aspecto => {
      const interpretacao = gerarInterpretacaoAspecto(
        aspecto.tipo,
        aspecto.planetas[0],
        aspecto.planetas[1],
        aspecto.orbe,
        aspecto.aplicativo
      );
      analise += `• ${interpretacao.titulo}: ${interpretacao.descricao}\n`;
    });
    analise += "\n";
  }

  // Recomendações gerais
  analise += "🔮 **Recomendações para Hoje**:\n";
  analise += "• Sintonize-se com as energias planetárias em ação\n";
  analise += "• Use os aspectos harmoniosos para manifestação\n";
  analise += "• Transforme os aspectos tensos em oportunidades de crescimento\n";
  analise += "• Conecte-se com a sabedoria da mansão lunar atual\n";

  return analise;
}


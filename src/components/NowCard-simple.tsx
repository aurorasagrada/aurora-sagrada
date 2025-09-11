/**
 * NowCard - Versão Simplificada
 * Mostra informações astrológicas básicas sem depender de cálculos complexos
 */

import React from 'react';
import { motion } from 'framer-motion';

interface SimpleAstroData {
  sol: { 
    signo: string; 
    grau: number; 
    interpretacao: string;
    correspondencias: {
      ervas: string[];
      cristais: string[];
      cores: string[];
      incensos: string[];
    };
    usosFavoraveis: string[];
    usosDesfavoraveis: string[];
  };
  lua: { 
    signo: string; 
    grau: number; 
    fase: string; 
    iluminacao: number; 
    interpretacao: string;
    correspondencias: {
      ervas: string[];
      cristais: string[];
      cores: string[];
      incensos: string[];
    };
    usosFavoraveis: string[];
    usosDesfavoraveis: string[];
  };
  planetas: { 
    nome: string; 
    simbolo: string; 
    signo: string; 
    grau: number; 
    retrogrado?: boolean; 
    interpretacao: string;
    correspondencias: {
      ervas: string[];
      cristais: string[];
      cores: string[];
      incensos: string[];
    };
    usosFavoraveis: string[];
    usosDesfavoraveis: string[];
  }[];
  mansaoLunar: string;
  planetasRetrogrados: string[];
}

const NowCard: React.FC = () => {
  // Dados simplificados para demonstração com interpretações expandidas da base de dados
  const astroData: SimpleAstroData = {
    sol: { 
      signo: 'Virgem', 
      grau: 18, 
      interpretacao: 'O Sol em Virgem no segundo decano (10°-20°) ativa as energias de Capricórnio e Saturno, trazendo disciplina meticulosa e perfecionismo construtivo. Este é um período de análise profunda, organização sistemática e refinamento de habilidades práticas. A energia virginiana busca a perfeição através do serviço dedicado e da atenção aos detalhes. É tempo de purificação, tanto física quanto espiritual, onde cada pequeno ajuste contribui para um resultado maior. A influência saturnina deste decano favorece o trabalho árduo, a paciência e a construção de bases sólidas para o futuro. Use este período para organizar sua vida, cuidar da saúde e desenvolver competências técnicas que servirão como ferramentas valiosas em sua jornada.',
      correspondencias: {
        ervas: ['Lavanda', 'Erva-cidreira', 'Camomila', 'Alecrim', 'Sálvia', 'Hortelã'],
        cristais: ['Amazonita', 'Sodalita', 'Fluorita', 'Ágata musgosa', 'Jaspe verde'],
        cores: ['Verde terra', 'Azul marinho', 'Marrom', 'Bege natural'],
        incensos: ['Sândalo', 'Cedro', 'Patchouli', 'Vetiver']
      },
      usosFavoraveis: [
        'Organização e limpeza profunda',
        'Estudos técnicos e análise detalhada',
        'Cuidados com a saúde e dieta',
        'Trabalhos de precisão e artesanato',
        'Rituais de purificação',
        'Planejamento financeiro'
      ],
      usosDesfavoraveis: [
        'Decisões impulsivas sem análise',
        'Projetos grandiosos sem base sólida',
        'Negligenciar detalhes importantes',
        'Excessos alimentares ou vícios'
      ]
    },
    lua: { 
      signo: 'Peixes', 
      grau: 23, 
      fase: 'Crescente', 
      iluminacao: 66, 
      interpretacao: 'A Lua Crescente em Peixes no terceiro decano (20°-30°) desperta as profundezas do inconsciente coletivo e ativa dons psíquicos latentes. Regida por Marte neste decano, esta posição combina a sensibilidade pisciana com uma força interior surpreendente. É um período de intuições poderosas, sonhos proféticos e conexões espirituais intensas. A água de Peixes dissolve as barreiras entre os mundos, permitindo acesso a dimensões superiores de consciência. Esta fase lunar favorece práticas meditativas, trabalhos de cura energética e rituais de purificação emocional. A crescente iluminação lunar (66%) amplifica a capacidade de manifestação através da visualização criativa e da fé inabalável. Confie em sua intuição, pois ela está especialmente aguçada neste momento.',
      correspondencias: {
        ervas: ['Jasmim', 'Lótus', 'Mirra', 'Eucalipto', 'Violeta', 'Lírio'],
        cristais: ['Ametista', 'Pedra da lua', 'Aquamarina', 'Fluorita roxa', 'Labradorita'],
        cores: ['Azul oceano', 'Violeta', 'Prata', 'Verde água', 'Branco pérola'],
        incensos: ['Sândalo branco', 'Jasmim', 'Mirra', 'Copal', 'Benjoim']
      },
      usosFavoraveis: [
        'Meditação e práticas espirituais',
        'Trabalhos de cura energética',
        'Desenvolvimento da intuição',
        'Rituais de purificação emocional',
        'Arte e expressão criativa',
        'Sonhos lúcidos e divinação'
      ],
      usosDesfavoraveis: [
        'Decisões baseadas apenas na lógica',
        'Ignorar sinais intuitivos',
        'Ambientes muito racionais ou frios',
        'Críticas excessivas ou julgamentos'
      ]
    },
    planetas: [
      { 
        nome: 'Mercúrio', 
        simbolo: '☿', 
        signo: 'Libra', 
        grau: 5, 
        retrogrado: false,
        interpretacao: 'Mercúrio em Libra no primeiro decano (0°-10°) harmoniza a mente com os princípios de justiça, beleza e equilíbrio. Regido por Vênus neste decano, o planeta da comunicação adquire refinamento estético e diplomacia natural. Este posicionamento favorece negociações elegantes, contratos justos e comunicações que buscam a harmonia entre as partes. A mente mercurial em Libra pesa cuidadosamente todas as opções antes de decidir, buscando sempre o ponto de equilíbrio perfeito. É um período excelente para mediações, trabalhos artísticos que envolvem comunicação, e para desenvolver relacionamentos baseados em compreensão mútua e respeito intelectual.',
        correspondencias: {
          ervas: ['Lavanda', 'Erva-doce', 'Menta', 'Eucalipto', 'Tomilho', 'Manjericão'],
          cristais: ['Citrino', 'Ágata', 'Topázio', 'Calcita amarela', 'Fluorita'],
          cores: ['Amarelo claro', 'Laranja suave', 'Verde menta', 'Azul claro'],
          incensos: ['Lavanda', 'Erva-doce', 'Menta', 'Eucalipto']
        },
        usosFavoraveis: [
          'Negociações e contratos',
          'Estudos e aprendizado',
          'Comunicação diplomática',
          'Viagens e deslocamentos',
          'Trabalhos intelectuais',
          'Mediação de conflitos'
        ],
        usosDesfavoraveis: [
          'Decisões precipitadas',
          'Comunicação agressiva',
          'Ignorar diferentes perspectivas',
          'Documentos mal elaborados'
        ]
      },
      { 
        nome: 'Vênus', 
        simbolo: '♀', 
        signo: 'Escorpião', 
        grau: 12, 
        retrogrado: false,
        interpretacao: 'Vênus em Escorpião no segundo decano (10°-20°) mergulha nas profundezas da paixão transformadora. Sob a regência de Netuno neste decano, o amor venusiano transcende o físico e alcança dimensões místicas e espirituais. Esta posição intensifica todos os relacionamentos, trazendo à tona verdades ocultas e promovendo transformações profundas através do amor. A beleza escorpiana não é superficial, mas sim magnética e hipnótica, capaz de curar ou destruir. É um período de regeneração emocional, onde relacionamentos superficiais são eliminados e conexões autênticas são fortalecidas. O poder de atração está no auge, mas deve ser usado com sabedoria e responsabilidade.',
        correspondencias: {
          ervas: ['Rosa vermelha', 'Jasmim', 'Ylang-ylang', 'Patchouli', 'Damiana', 'Hibisco'],
          cristais: ['Quartzo rosa', 'Esmeralda', 'Rodocrosita', 'Turmalina rosa', 'Jade verde'],
          cores: ['Rosa profundo', 'Verde esmeralda', 'Vermelho bordô', 'Dourado suave'],
          incensos: ['Rosa', 'Jasmim', 'Ylang-ylang', 'Sândalo rosa']
        },
        usosFavoraveis: [
          'Rituais de amor e relacionamentos',
          'Trabalhos de beleza e estética',
          'Arte e expressão criativa',
          'Harmonização de ambientes',
          'Cura emocional e do coração',
          'Atração e magnetismo pessoal'
        ],
        usosDesfavoraveis: [
          'Manipulação emocional',
          'Relacionamentos superficiais',
          'Vaidade excessiva',
          'Gastos impulsivos com luxo'
        ]
      },
      { 
        nome: 'Marte', 
        simbolo: '♂', 
        signo: 'Câncer', 
        grau: 28, 
        retrogrado: false,
        interpretacao: 'Marte em Câncer no terceiro decano (20°-30°) canaliza a energia guerreira através da proteção emocional e do cuidado familiar. Regido por Júpiter neste decano, a ação marcial se expande em generosidade protetiva e defesa dos vulneráveis. Esta posição transforma a agressividade em nutrição ativa, onde a força é usada para criar segurança e estabilidade emocional. O guerreiro canceriano luta pelo lar, pela família e pelas tradições ancestrais. É um período onde a intuição guia a ação, e onde a sensibilidade emocional se torna uma força poderosa para a transformação positiva do ambiente doméstico e das relações íntimas.'
      },
      { 
        nome: 'Júpiter', 
        simbolo: '♃', 
        signo: 'Gêmeos', 
        grau: 15, 
        retrogrado: false,
        interpretacao: 'Júpiter em Gêmeos no segundo decano (10°-20°) expande a mente através da diversidade de conhecimentos e experiências. Sob a regência de Vênus neste decano, a sabedoria jupiteriana se manifesta através da comunicação harmoniosa e do ensino inspirador. Este posicionamento favorece o aprendizado múltiplo, a curiosidade intelectual e a capacidade de conectar ideias aparentemente díspares em sínteses brilhantes. É um período de crescimento através da educação, viagens mentais e intercâmbios culturais. A expansão jupiteriana em Gêmeos democratiza o conhecimento, tornando a sabedoria acessível através de múltiplos canais de comunicação e formas criativas de expressão.'
      },
      { 
        nome: 'Saturno', 
        simbolo: '♄', 
        signo: 'Peixes', 
        grau: 19, 
        retrogrado: false,
        interpretacao: 'Saturno em Peixes no segundo decano (10°-20°) estrutura a espiritualidade através da disciplina compassiva e da sabedoria emocional madura. Regido pela Lua neste decano, o planeta da responsabilidade aprende a trabalhar com as marés emocionais e os ciclos naturais da alma. Esta posição ensina que a verdadeira força vem da vulnerabilidade consciente e da capacidade de estabelecer limites saudáveis sem perder a sensibilidade. É um período de maturação espiritual, onde antigas feridas emocionais são curadas através da aceitação e do perdão. A disciplina saturnina em Peixes se manifesta através de práticas espirituais regulares e do desenvolvimento da compaixão estruturada.'
      },
      { 
        nome: 'Urano', 
        simbolo: '♅', 
        signo: 'Touro', 
        grau: 27, 
        retrogrado: true,
        interpretacao: 'Urano Retrógrado em Touro no terceiro decano (20°-30°) promove uma revolução interior nos valores materiais e na relação com a segurança física. Sob a regência de Saturno neste decano, as mudanças uranianas são estruturadas e duradouras, não apenas disruptivas. O movimento retrógrado intensifica a necessidade de reavaliar completamente o que consideramos valioso e estável. É um período de libertação gradual de padrões materiais obsoletos e de descoberta de novas formas de segurança baseadas na autenticidade pessoal. A revolução taurina é lenta mas profunda, transformando fundamentalmente nossa relação com o mundo físico e os recursos naturais.'
      },
      { 
        nome: 'Netuno', 
        simbolo: '♆', 
        signo: 'Peixes', 
        grau: 29, 
        retrogrado: false,
        interpretacao: 'Netuno em Peixes no terceiro decano (20°-30°) atinge o ápice de sua expressão espiritual, dissolvendo completamente as barreiras entre o eu e o cosmos. Regido por Marte neste decano, a transcendência neptuniana ganha força ativa e capacidade de manifestação no mundo físico. Esta posição representa o místico guerreiro, aquele que luta pela elevação da consciência coletiva através da compaixão universal. É um período de revelações espirituais profundas, onde a intuição se torna uma força transformadora capaz de curar não apenas o indivíduo, mas toda a humanidade. A proximidade do final do signo intensifica a urgência da missão espiritual.'
      },
      { 
        nome: 'Plutão', 
        simbolo: '♇', 
        signo: 'Aquário', 
        grau: 1, 
        retrogrado: false,
        interpretacao: 'Plutão em Aquário no primeiro decano (0°-10°) inicia uma era de transformação coletiva através da revolução tecnológica e da renovação dos ideais humanitários. Regido por Urano neste decano, o poder plutoniano se manifesta através de mudanças súbitas e inovações que transformam fundamentalmente a estrutura social. Esta posição marca o início de uma nova era onde a tecnologia serve à evolução espiritual da humanidade. É um período de morte e renascimento dos sistemas coletivos, onde antigas hierarquias são dissolvidas para dar lugar a redes horizontais de cooperação. A transformação aquariana é democrática e inclusiva, buscando o bem comum através da inovação consciente.'
      }
    ],
    mansaoLunar: 'Al-Sharatain',
    planetasRetrogrados: ['Urano']
  };

  const eleicoesMagicas = [
    { nome: 'Amor', score: 75, status: 'Favorável' },
    { nome: 'Trabalho', score: 60, status: 'Neutro' },
    { nome: 'Beleza', score: 85, status: 'Excelente' },
    { nome: 'Prosperidade', score: 45, status: 'Desfavorável' },
    { nome: 'Justiça', score: 70, status: 'Favorável' },
    { nome: 'Contato Espiritual', score: 90, status: 'Excelente' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-aurora-gold';
    if (score >= 60) return 'text-aurora-silver';
    return 'text-aurora-copper';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return '⭐';
    if (score >= 60) return '✦';
    return '◦';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-aurora-dark-secondary/80 backdrop-blur-sm rounded-lg border border-aurora-purple/30 p-6"
    >
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="text-center border-b border-aurora-purple/20 pb-4">
          <h2 className="text-2xl font-bold text-aurora-gold mb-2">
            Céu Atual
          </h2>
          <p className="text-aurora-silver text-sm">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Informações Principais */}
        <div className="space-y-6">
          {/* Sol e Lua - Destaque com Interpretações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-aurora-dark-primary/50 rounded-lg border border-aurora-gold/30">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">☉</span>
                <div>
                  <p className="text-aurora-gold font-bold">Sol</p>
                  <p className="text-aurora-silver text-sm">
                    {astroData.sol.grau}° {astroData.sol.signo}
                  </p>
                </div>
                <span className="text-aurora-copper text-xs ml-auto">Dignidade</span>
              </div>
              <p className="text-aurora-copper text-base italic leading-relaxed mb-3">
                {astroData.sol.interpretacao}
              </p>
              
              {/* Correspondências do Sol */}
              <div className="space-y-2 border-t border-aurora-gold/20 pt-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-aurora-gold font-semibold">Ervas:</span>
                    <p className="text-aurora-silver">{astroData.sol.correspondencias.ervas.slice(0, 3).join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-aurora-gold font-semibold">Cristais:</span>
                    <p className="text-aurora-silver">{astroData.sol.correspondencias.cristais.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
                <div>
                  <span className="text-aurora-gold font-semibold text-xs">Favorável:</span>
                  <p className="text-aurora-silver text-xs">{astroData.sol.usosFavoraveis.slice(0, 3).join(' • ')}</p>
                </div>
                <div>
                  <span className="text-aurora-copper font-semibold text-xs">Evitar:</span>
                  <p className="text-aurora-copper text-xs">{astroData.sol.usosDesfavoraveis.slice(0, 2).join(' • ')}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-aurora-dark-primary/50 rounded-lg border border-aurora-silver/30">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">☽</span>
                <div>
                  <p className="text-aurora-silver font-bold">Lua</p>
                  <p className="text-aurora-silver text-sm">
                    {astroData.lua.grau}° {astroData.lua.signo}
                  </p>
                </div>
                <div className="text-right ml-auto">
                  <p className="text-aurora-copper text-xs">{astroData.lua.fase}</p>
                  <p className="text-aurora-copper text-xs">{astroData.lua.iluminacao}%</p>
                </div>
              </div>
              <p className="text-aurora-copper text-base italic leading-relaxed mb-3">
                {astroData.lua.interpretacao}
              </p>
              
              {/* Correspondências da Lua */}
              <div className="space-y-2 border-t border-aurora-silver/20 pt-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-aurora-silver font-semibold">Ervas:</span>
                    <p className="text-aurora-silver">{astroData.lua.correspondencias.ervas.slice(0, 3).join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-aurora-silver font-semibold">Cristais:</span>
                    <p className="text-aurora-silver">{astroData.lua.correspondencias.cristais.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
                <div>
                  <span className="text-aurora-silver font-semibold text-xs">Favorável:</span>
                  <p className="text-aurora-silver text-xs">{astroData.lua.usosFavoraveis.slice(0, 3).join(' • ')}</p>
                </div>
                <div>
                  <span className="text-aurora-copper font-semibold text-xs">Evitar:</span>
                  <p className="text-aurora-copper text-xs">{astroData.lua.usosDesfavoraveis.slice(0, 2).join(' • ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Todos os Planetas com Interpretações */}
          <div>
            <h3 className="text-aurora-gold font-semibold mb-3">Posições Planetárias & Interpretações</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {astroData.planetas.map((planeta, index) => (
                <div key={index} className="p-4 bg-aurora-dark-primary/30 rounded-lg border border-aurora-gold/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{planeta.simbolo}</span>
                    <div>
                      <p className="text-aurora-gold font-semibold">{planeta.nome}</p>
                      <p className="text-aurora-silver text-sm">
                        {planeta.grau}° {planeta.signo}
                        {planeta.retrogrado && ' ℞'}
                      </p>
                    </div>
                  </div>
                  <p className="text-aurora-copper text-base italic leading-relaxed mb-3">
                    {planeta.interpretacao}
                  </p>
                  
                  {/* Correspondências dos Planetas (apenas para Mercúrio e Vênus que têm dados) */}
                  {planeta.correspondencias && (
                    <div className="space-y-2 border-t border-aurora-gold/20 pt-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-aurora-gold font-semibold">Ervas:</span>
                          <p className="text-aurora-silver">{planeta.correspondencias.ervas.slice(0, 2).join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-gold font-semibold">Cristais:</span>
                          <p className="text-aurora-silver">{planeta.correspondencias.cristais.slice(0, 2).join(', ')}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-aurora-gold font-semibold text-xs">Favorável:</span>
                        <p className="text-aurora-silver text-xs">{planeta.usosFavoraveis.slice(0, 2).join(' • ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status e Mansão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-aurora-dark-primary/50 rounded-lg">
              <p className="text-aurora-gold font-semibold mb-2">Mansão Lunar</p>
              <p className="text-aurora-silver">{astroData.mansaoLunar}</p>
            </div>

            <div className="p-3 bg-aurora-dark-primary/50 rounded-lg">
              <p className="text-aurora-gold font-semibold mb-2">Status</p>
              <p className="text-aurora-silver">
                {astroData.planetasRetrogrados.length === 0 
                  ? 'Nenhum planeta retrógrado' 
                  : `${astroData.planetasRetrogrados.join(', ')} retrógrado${astroData.planetasRetrogrados.length > 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Eleições Mágicas */}
        <div>
          <h3 className="text-lg font-semibold text-aurora-gold mb-4">
            Eleições Mágicas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {eleicoesMagicas.map((eleicao) => (
              <motion.div
                key={eleicao.nome}
                whileHover={{ scale: 1.02 }}
                className="p-3 bg-aurora-dark-primary/30 rounded-lg border border-aurora-purple/20 hover:border-aurora-purple/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-aurora-silver text-sm font-medium">
                    {eleicao.nome}
                  </span>
                  <span className={`text-lg ${getScoreColor(eleicao.score)}`}>
                    {getScoreIcon(eleicao.score)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${getScoreColor(eleicao.score)}`}>
                    {eleicao.score}%
                  </span>
                  <span className={`text-xs ${getScoreColor(eleicao.score)}`}>
                    {eleicao.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nota sobre dados */}
        <div className="text-center pt-4 border-t border-aurora-purple/20">
          <p className="text-aurora-copper text-xs">
            Dados astronômicos em tempo real • São Paulo, Brasil
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NowCard;


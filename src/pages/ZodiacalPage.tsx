import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Crown, Eye, Compass, ChevronRight, ChevronDown, Flame, Droplets, Wind, Mountain, Sun, Moon, Zap, Sparkles, BookOpen } from 'lucide-react';

interface Decano {
  numero: number;
  graus: string;
  regente: string;
  nome_tradicional: string;
  imagem_magica: string;
  poder_principal: string;
  talisma: string;
  descricao_completa: string;
  correspondencias: {
    cores: string[];
    metais: string[];
    pedras: string[];
    ervas: string[];
    incensos: string[];
    numeros: number[];
  };
  rituais_recomendados: string[];
  horarios_favoraveis: string[];
}

interface Signo {
  nome: string;
  simbolo: string;
  elemento: string;
  modalidade: string;
  regente: string;
  exaltacao: string;
  detrimento: string;
  queda: string;
  graus: string;
  natureza_elementar: string;
  decanos: Decano[];
  poder_geral: string;
  correspondencias_gerais: {
    cores_principais: string[];
    metais_regentes: string[];
    pedras_principais: string[];
    ervas_sagradas: string[];
    incensos_tradicionais: string[];
  };
}

const ZodiacalPage: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [selectedSigno, setSelectedSigno] = useState<Signo | null>(null);
  const [selectedDecano, setSelectedDecano] = useState<Decano | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Dados dos signos (simulados - em produção viriam de arquivo JSON)
  const signos: Signo[] = [
    {
      nome: "Áries",
      simbolo: "♈",
      elemento: "Fogo",
      modalidade: "Cardinal",
      regente: "Marte",
      exaltacao: "Sol",
      detrimento: "Vênus",
      queda: "Saturno",
      graus: "0°-30°",
      natureza_elementar: "Quente e Seco",
      poder_geral: "Iniciação, Coragem, Liderança",
      correspondencias_gerais: {
        cores_principais: ["Vermelho", "Escarlate", "Carmesim"],
        metais_regentes: ["Ferro", "Aço"],
        pedras_principais: ["Rubi", "Diamante", "Hematita"],
        ervas_sagradas: ["Urtiga", "Cardo", "Gengibre"],
        incensos_tradicionais: ["Olíbano", "Sangue de Dragão", "Canela"]
      },
      decanos: [
        {
          numero: 1,
          graus: "0°-10°",
          regente: "Marte",
          nome_tradicional: "Decano do Guerreiro",
          imagem_magica: "Um homem negro de grande estatura, com olhos vermelhos como brasas, segurando uma espada flamejante na mão direita e vestido com roupas brancas bordadas em ouro.",
          poder_principal: "Força, coragem, liderança militar",
          talisma: "Para vencer inimigos, obter coragem em batalhas e superar obstáculos",
          descricao_completa: "O primeiro decano de Áries representa a força bruta e primitiva do fogo marciano em sua expressão mais pura. Aqui encontramos a energia primordial da criação através da destruição, o impulso inicial que quebra a inércia e inicia novos ciclos.",
          correspondencias: {
            cores: ["Vermelho escarlate", "Carmesim", "Bordô"],
            metais: ["Ferro", "Aço temperado"],
            pedras: ["Rubi", "Jaspe vermelho", "Hematita"],
            ervas: ["Urtiga", "Cardo santo", "Pimenta vermelha"],
            incensos: ["Sangue de dragão", "Canela", "Pimenta preta"],
            numeros: [1, 9, 27]
          },
          rituais_recomendados: ["Rituais de coragem", "Proteção contra inimigos", "Início de empreendimentos"],
          horarios_favoraveis: ["Terça-feira ao nascer do sol", "Hora de Marte"]
        },
        {
          numero: 2,
          graus: "10°-20°",
          regente: "Sol",
          nome_tradicional: "Decano do Rei",
          imagem_magica: "Um rei coroado sentado em um trono dourado, segurando um cetro solar, com um manto púrpura bordado com leões dourados.",
          poder_principal: "Autoridade, dignidade, comando",
          talisma: "Para obter posições de liderança, reconhecimento e honras",
          descricao_completa: "O segundo decano de Áries combina o fogo marciano com a dignidade solar, criando uma energia de liderança nobre e autoridade natural. É o decano dos reis e comandantes.",
          correspondencias: {
            cores: ["Dourado", "Laranja real", "Amarelo imperial"],
            metais: ["Ouro", "Bronze dourado"],
            pedras: ["Topázio imperial", "Citrino", "Âmbar"],
            ervas: ["Louro", "Girassol", "Calêndula"],
            incensos: ["Olíbano", "Copal dourado", "Benjoim"],
            numeros: [1, 6, 19]
          },
          rituais_recomendados: ["Rituais de liderança", "Obtenção de honras", "Autoridade"],
          horarios_favoraveis: ["Domingo ao meio-dia", "Hora do Sol"]
        },
        {
          numero: 3,
          graus: "20°-30°",
          regente: "Vênus",
          nome_tradicional: "Decano do Artista",
          imagem_magica: "Uma mulher bela vestida de verde e rosa, segurando uma lira dourada, com flores em seus cabelos e rodeada por pássaros cantores.",
          poder_principal: "Arte, beleza, harmonia criativa",
          talisma: "Para desenvolver talentos artísticos, atrair amor e criar beleza",
          descricao_completa: "O terceiro decano de Áries suaviza o fogo marciano com a graça venusiana, criando uma energia de criatividade apaixonada e arte inspirada.",
          correspondencias: {
            cores: ["Verde esmeralda", "Rosa", "Cobre"],
            metais: ["Cobre", "Bronze"],
            pedras: ["Esmeralda", "Quartzo rosa", "Malaquita"],
            ervas: ["Rosa", "Verbena", "Mirto"],
            incensos: ["Rosa", "Sândalo", "Ylang-ylang"],
            numeros: [6, 15, 24]
          },
          rituais_recomendados: ["Rituais de arte", "Atração amorosa", "Criatividade"],
          horarios_favoraveis: ["Sexta-feira ao entardecer", "Hora de Vênus"]
        }
      ]
    },
    // Adicionar mais signos aqui...
  ];

  const elementos = [
    { name: 'Fogo', icon: <Flame className="w-5 h-5" />, color: 'text-red-400', signos: ['Áries', 'Leão', 'Sagitário'] },
    { name: 'Terra', icon: <Mountain className="w-5 h-5" />, color: 'text-green-400', signos: ['Touro', 'Virgem', 'Capricórnio'] },
    { name: 'Ar', icon: <Wind className="w-5 h-5" />, color: 'text-blue-400', signos: ['Gêmeos', 'Libra', 'Aquário'] },
    { name: 'Água', icon: <Droplets className="w-5 h-5" />, color: 'text-cyan-400', signos: ['Câncer', 'Escorpião', 'Peixes'] }
  ];

  const filteredSignos = signos.filter(signo => {
    const matchesSearch = signo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         signo.poder_geral.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedElement === 'all') return matchesSearch;
    return matchesSearch && signo.elemento === selectedElement;
  });

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getElementIcon = (elemento: string) => {
    switch (elemento) {
      case 'Fogo': return <Flame className="w-4 h-4 text-red-400" />;
      case 'Terra': return <Mountain className="w-4 h-4 text-green-400" />;
      case 'Ar': return <Wind className="w-4 h-4 text-blue-400" />;
      case 'Água': return <Droplets className="w-4 h-4 text-cyan-400" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-aurora-gold mb-4">
          ⭐ Magia Zodiacal
        </h1>
        <p className="text-aurora-silver text-lg max-w-3xl mx-auto">
          Sistema completo de magia zodiacal baseado nos decanos tradicionais. Cada signo é dividido em três decanos 
          de 10 graus, cada um com suas próprias correspondências, imagens mágicas e poderes específicos.
        </p>
      </motion.div>

      {/* Controles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-aurora-dark-secondary/80 backdrop-blur-sm rounded-lg border border-aurora-purple/30 p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aurora-copper w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar signos por nome ou poder..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-aurora-dark-primary/50 border border-aurora-gold/20 rounded-lg text-aurora-silver placeholder-aurora-copper focus:outline-none focus:border-aurora-gold/50"
            />
          </div>

          {/* Filtro por Elemento */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aurora-copper w-5 h-5" />
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="pl-10 pr-8 py-3 bg-aurora-dark-primary/50 border border-aurora-gold/20 rounded-lg text-aurora-silver focus:outline-none focus:border-aurora-gold/50 appearance-none"
            >
              <option value="all">Todos os Elementos</option>
              {elementos.map(elemento => (
                <option key={elemento.name} value={elemento.name}>
                  {elemento.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-aurora-gold" />
            <span className="text-aurora-silver">
              {filteredSignos.length} signos • {filteredSignos.reduce((acc, s) => acc + s.decanos.length, 0)} decanos
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-aurora-gold" />
            <span className="text-aurora-silver">
              Sistema tradicional hermético
            </span>
          </div>
        </div>
      </motion.div>

      {/* Filtros por Elemento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
      >
        {elementos.map((elemento, index) => (
          <motion.button
            key={elemento.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedElement(selectedElement === elemento.name ? 'all' : elemento.name)}
            className={`
              p-4 rounded-lg border transition-all duration-300
              ${selectedElement === elemento.name 
                ? 'bg-aurora-purple/30 border-aurora-gold/50 text-aurora-gold' 
                : 'bg-aurora-dark-primary/30 border-aurora-purple/20 text-aurora-silver hover:border-aurora-gold/30'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={elemento.color}>
                {elemento.icon}
              </div>
              <span className="text-sm font-medium">
                {elemento.name}
              </span>
              <span className="text-xs text-aurora-copper">
                {elemento.signos.length} signos
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Lista de Signos */}
      <div className="space-y-4">
        {filteredSignos.map((signo, index) => (
          <motion.div
            key={signo.nome}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-aurora-dark-secondary/80 backdrop-blur-sm rounded-lg border border-aurora-purple/30 overflow-hidden"
          >
            {/* Cabeçalho do Signo */}
            <div 
              className="p-6 cursor-pointer hover:bg-aurora-purple/10 transition-colors"
              onClick={() => toggleSection(signo.nome)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{signo.simbolo}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-aurora-gold">{signo.nome}</h2>
                    <div className="flex items-center space-x-4 text-sm text-aurora-silver">
                      <div className="flex items-center space-x-1">
                        {getElementIcon(signo.elemento)}
                        <span>{signo.elemento}</span>
                      </div>
                      <span>•</span>
                      <span>{signo.modalidade}</span>
                      <span>•</span>
                      <span>Regente: {signo.regente}</span>
                    </div>
                    <p className="text-aurora-copper mt-1">{signo.poder_geral}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-aurora-silver text-sm">{signo.graus}</span>
                  {expandedSections.has(signo.nome) ? 
                    <ChevronDown className="w-5 h-5 text-aurora-gold" /> : 
                    <ChevronRight className="w-5 h-5 text-aurora-gold" />
                  }
                </div>
              </div>
            </div>

            {/* Conteúdo Expandido */}
            <AnimatePresence>
              {expandedSections.has(signo.nome) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-aurora-purple/20"
                >
                  <div className="p-6">
                    {/* Correspondências Gerais */}
                    <div className="mb-6">
                      <h3 className="text-aurora-gold font-semibold mb-3">Correspondências Gerais</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-aurora-copper">Cores:</span>
                          <p className="text-aurora-silver">{signo.correspondencias_gerais.cores_principais.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Metais:</span>
                          <p className="text-aurora-silver">{signo.correspondencias_gerais.metais_regentes.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Pedras:</span>
                          <p className="text-aurora-silver">{signo.correspondencias_gerais.pedras_principais.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Ervas:</span>
                          <p className="text-aurora-silver">{signo.correspondencias_gerais.ervas_sagradas.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Incensos:</span>
                          <p className="text-aurora-silver">{signo.correspondencias_gerais.incensos_tradicionais.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Decanos */}
                    <div>
                      <h3 className="text-aurora-gold font-semibold mb-4">Decanos Tradicionais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {signo.decanos.map((decano, decanoIndex) => (
                          <motion.div
                            key={decano.numero}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: decanoIndex * 0.1 }}
                            className="bg-aurora-dark-primary/30 rounded-lg p-4 border border-aurora-gold/20 hover:border-aurora-gold/40 transition-colors cursor-pointer"
                            onClick={() => setSelectedDecano(decano)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-aurora-gold font-semibold">
                                {decano.numero}º Decano
                              </h4>
                              <span className="text-aurora-copper text-sm">{decano.graus}</span>
                            </div>
                            <p className="text-aurora-silver text-sm mb-2">{decano.nome_tradicional}</p>
                            <p className="text-aurora-copper text-xs mb-3">{decano.poder_principal}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-aurora-silver text-xs">Regente: {decano.regente}</span>
                              <ChevronRight className="w-4 h-4 text-aurora-gold" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Modal do Decano Selecionado */}
      <AnimatePresence>
        {selectedDecano && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDecano(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-aurora-dark-primary border border-aurora-gold/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-aurora-gold">
                    {selectedDecano.nome_tradicional}
                  </h2>
                  <button
                    onClick={() => setSelectedDecano(null)}
                    className="p-2 hover:bg-aurora-purple/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-aurora-silver" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Informações Principais */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-aurora-gold font-semibold mb-2">Imagem Mágica</h3>
                      <p className="text-aurora-silver text-sm leading-relaxed">
                        {selectedDecano.imagem_magica}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-aurora-gold font-semibold mb-2">Descrição Completa</h3>
                      <p className="text-aurora-silver text-sm leading-relaxed">
                        {selectedDecano.descricao_completa}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-aurora-gold font-semibold mb-2">Poder Principal</h3>
                      <p className="text-aurora-silver">{selectedDecano.poder_principal}</p>
                    </div>

                    <div>
                      <h3 className="text-aurora-gold font-semibold mb-2">Talismã</h3>
                      <p className="text-aurora-silver text-sm">{selectedDecano.talisma}</p>
                    </div>
                  </div>

                  {/* Correspondências e Rituais */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-aurora-gold font-semibold mb-3">Correspondências</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-aurora-copper">Cores:</span>
                          <p className="text-aurora-silver">{selectedDecano.correspondencias.cores.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Metais:</span>
                          <p className="text-aurora-silver">{selectedDecano.correspondencias.metais.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Pedras:</span>
                          <p className="text-aurora-silver">{selectedDecano.correspondencias.pedras.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Ervas:</span>
                          <p className="text-aurora-silver">{selectedDecano.correspondencias.ervas.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Incensos:</span>
                          <p className="text-aurora-silver">{selectedDecano.correspondencias.incensos.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-aurora-copper">Números:</span>
                          <p className="text-aurora-silver">{selectedDecano.correspondencias.numeros.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-aurora-gold font-semibold mb-2">Rituais Recomendados</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDecano.rituais_recomendados.map((ritual, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-aurora-purple/20 text-aurora-silver text-xs rounded-full border border-aurora-purple/30"
                          >
                            {ritual}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-aurora-gold font-semibold mb-2">Horários Favoráveis</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDecano.horarios_favoraveis.map((horario, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-aurora-gold/20 text-aurora-gold text-xs rounded-full border border-aurora-gold/30"
                          >
                            {horario}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZodiacalPage;


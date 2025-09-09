import React, { useState } from 'react';
import { Search, Filter, Star, Crown, Eye, Compass, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Importar dados expandidos
const zodiacalExpandido = {
  signos: {
    aries: {
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
      decanos: [
        {
          numero: 1,
          graus: "0°-10°",
          regente: "Marte",
          nome_tradicional: "Decano do Guerreiro",
          imagem_magica: "Um homem negro de grande estatura, com olhos vermelhos como brasas, segurando uma espada flamejante na mão direita e vestido com roupas brancas bordadas em ouro. Sua face expressa determinação feroz e coragem inabalável.",
          poder_principal: "Força, coragem, liderança militar",
          talisma: "Para vencer inimigos, obter coragem em batalhas e superar obstáculos",
          descricao_completa: "O primeiro decano de Áries representa a força bruta e primitiva do fogo marciano em sua expressão mais pura. Aqui encontramos a energia primordial da criação através da destruição, o impulso inicial que quebra a inércia e inicia novos ciclos.",
          correspondencias: {
            cores: ["Vermelho escarlate", "Carmesim", "Bordô"],
            pedras: ["Rubi estrela", "Jaspe vermelho", "Hematita"],
            ervas: ["Urtiga maior", "Cardo santo", "Pimenta vermelha"],
            incensos: ["Sangue de dragão", "Pimenta preta", "Canela"],
            metais: ["Ferro puro", "Aço temperado"],
            animais: ["Carneiro", "Falcão peregrino", "Lobo"],
            anjos: ["Malchidael", "Machidiel", "Camael"],
            genios_arabes: ["Senacher", "Asentacer", "Vehuel"],
            deuses: ["Ares", "Marte", "Sekhmet", "Durga"]
          },
          usos_magicos: [
            "Rituais de coragem e bravura",
            "Superação de medos profundos",
            "Proteção contra inimigos",
            "Desenvolvimento de liderança"
          ],
          horas_favoraveis: ["Primeira hora após o nascer do sol", "Meio-dia solar"],
          dias_poder: ["Terça-feira", "Lua nova"],
          rituais_especificos: {
            talisma_coragem: "Gravar símbolo de Marte em ferro",
            ritual_lideranca: "Acender vela vermelha ao nascer do sol"
          }
        }
      ],
      faces: [
        {
          numero: 1,
          graus: "0°-10°",
          regente: "Marte",
          nome_tradicional: "Face da Força Bruta",
          significado: "Força primitiva, iniciativa pura, pioneirismo",
          descricao_detalhada: "A primeira face de Áries representa a energia marciana em sua forma mais pura e primitiva. É a força que rompe a inércia, que inicia movimentos e quebra barreiras.",
          uso_magico: "Rituais de coragem, iniciação e superação de obstáculos",
          correspondencias: {
            cores: ["Vermelho puro", "Escarlate"],
            pedras: ["Rubi", "Jaspe vermelho"],
            ervas: ["Urtiga", "Pimenta"],
            incensos: ["Sangue de dragão", "Canela"],
            horas: ["Primeira hora de Marte", "Aurora"],
            dias: ["Terça-feira", "Lua nova"]
          },
          rituais_especificos: [
            "Acender vela vermelha ao nascer do sol para coragem",
            "Carregar jaspe vermelho para proteção"
          ]
        }
      ]
    }
  }
};

interface Correspondencias {
  cores: string[];
  pedras: string[];
  ervas: string[];
  incensos: string[];
  metais: string[];
  animais: string[];
  anjos: string[];
  genios_arabes: string[];
  deuses: string[];
}

interface DecanoExpandido {
  numero: number;
  graus: string;
  regente: string;
  nome_tradicional: string;
  imagem_magica: string;
  poder_principal: string;
  talisma: string;
  descricao_completa: string;
  correspondencias: Correspondencias;
  usos_magicos: string[];
  horas_favoraveis: string[];
  dias_poder: string[];
  rituais_especificos: {
    [key: string]: string;
  };
}

interface FaceExpandida {
  numero: number;
  graus: string;
  regente: string;
  nome_tradicional: string;
  significado: string;
  descricao_detalhada: string;
  uso_magico: string;
  correspondencias: {
    cores: string[];
    pedras: string[];
    ervas: string[];
    incensos: string[];
    horas: string[];
    dias: string[];
  };
  rituais_especificos: string[];
}

interface SignoExpandido {
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
  decanos: DecanoExpandido[];
  faces: FaceExpandida[];
}

const ZodiacalMagic: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<string>('');
  const [selectedModality, setSelectedModality] = useState<string>('');
  const [selectedSign, setSelectedSign] = useState<SignoExpandido | null>(null);
  const [activeTab, setActiveTab] = useState<'decanos' | 'faces' | 'termos' | 'partes'>('decanos');
  const [expandedSection, setExpandedSection] = useState<string>('');

  // Dados dos signos (por enquanto só Áries expandido)
  const signos: SignoExpandido[] = [
    zodiacalExpandido.signos.aries as SignoExpandido
  ];

  const elementos = ['Fogo', 'Terra', 'Ar', 'Água'];
  const modalidades = ['Cardinal', 'Fixo', 'Mutável'];

  const filteredSignos = signos.filter(signo => {
    const matchesSearch = signo.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesElement = !selectedElement || signo.elemento === selectedElement;
    const matchesModality = !selectedModality || signo.modalidade === selectedModality;
    
    return matchesSearch && matchesElement && matchesModality;
  });

  const getElementColor = (elemento: string) => {
    const colors = {
      'Fogo': 'text-red-400',
      'Terra': 'text-green-400', 
      'Ar': 'text-yellow-400',
      'Água': 'text-blue-400'
    };
    return colors[elemento as keyof typeof colors] || 'text-gray-400';
  };

  const getElementBg = (elemento: string) => {
    const colors = {
      'Fogo': 'bg-red-500/20',
      'Terra': 'bg-green-500/20',
      'Ar': 'bg-yellow-500/20', 
      'Água': 'bg-blue-500/20'
    };
    return colors[elemento as keyof typeof colors] || 'bg-gray-500/20';
  };

  const getPlanetColor = (planeta: string) => {
    const colors = {
      'Marte': 'text-red-400',
      'Sol': 'text-yellow-400',
      'Vênus': 'text-pink-400',
      'Mercúrio': 'text-orange-400',
      'Júpiter': 'text-blue-400',
      'Saturno': 'text-purple-400'
    };
    return colors[planeta as keyof typeof colors] || 'text-gray-400';
  };

  const renderDecanos = (signo: SignoExpandido) => (
    <div className="space-y-6">
      <h3 className="text-xl font-cinzel text-aurora-gold mb-4">
        DECANOS DE {signo.nome.toUpperCase()}
      </h3>
      
      {signo.decanos.map((decano, index) => (
        <motion.div
          key={index}
          className="bg-aurora-wine/30 backdrop-blur-sm rounded-2xl p-6 border border-aurora-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-cinzel text-aurora-gold">
              {decano.numero}º DECANO ({decano.graus})
            </h4>
            <span className={`text-sm font-medium ${getPlanetColor(decano.regente)}`}>
              Regente: {decano.regente}
            </span>
          </div>
          
          <div className="mb-4">
            <h5 className="text-aurora-sage mb-2 font-medium">{decano.nome_tradicional}</h5>
            <p className="text-aurora-parchment/80 text-sm leading-relaxed mb-3">
              {decano.descricao_completa}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h6 className="text-aurora-gold text-sm font-medium mb-2">Imagem Mágica:</h6>
              <p className="text-aurora-parchment/70 text-sm italic">
                {decano.imagem_magica}
              </p>
            </div>
            <div>
              <h6 className="text-aurora-gold text-sm font-medium mb-2">Poder Principal:</h6>
              <p className="text-aurora-parchment/80 text-sm">
                {decano.poder_principal}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="text-aurora-gold text-sm font-medium mb-2">Talismã:</h6>
            <p className="text-aurora-parchment/80 text-sm">
              {decano.talisma}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h6 className="text-aurora-sage text-sm font-medium mb-2">Cores:</h6>
              <div className="flex flex-wrap gap-1">
                {decano.correspondencias.cores.map((cor, i) => (
                  <span key={i} className="text-xs bg-aurora-night/50 px-2 py-1 rounded text-aurora-parchment/70">
                    {cor}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h6 className="text-aurora-sage text-sm font-medium mb-2">Pedras:</h6>
              <div className="flex flex-wrap gap-1">
                {decano.correspondencias.pedras.map((pedra, i) => (
                  <span key={i} className="text-xs bg-aurora-night/50 px-2 py-1 rounded text-aurora-parchment/70">
                    {pedra}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h6 className="text-aurora-sage text-sm font-medium mb-2">Ervas:</h6>
              <div className="flex flex-wrap gap-1">
                {decano.correspondencias.ervas.map((erva, i) => (
                  <span key={i} className="text-xs bg-aurora-night/50 px-2 py-1 rounded text-aurora-parchment/70">
                    {erva}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={() => setExpandedSection(expandedSection === `decano-${index}` ? '' : `decano-${index}`)}
              className="flex items-center gap-2 text-aurora-gold hover:text-aurora-sage transition-colors"
            >
              {expandedSection === `decano-${index}` ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="text-sm font-medium">Ver Usos Mágicos e Rituais</span>
            </button>
            
            <AnimatePresence>
              {expandedSection === `decano-${index}` && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <h6 className="text-aurora-gold text-sm font-medium mb-2">Usos Mágicos:</h6>
                    <ul className="text-aurora-parchment/80 text-sm space-y-1">
                      {decano.usos_magicos.map((uso, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Star size={12} className="text-aurora-gold mt-1 flex-shrink-0" />
                          {uso}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-aurora-sage text-sm font-medium mb-2">Horas Favoráveis:</h6>
                      <ul className="text-aurora-parchment/70 text-sm space-y-1">
                        {decano.horas_favoraveis.map((hora, i) => (
                          <li key={i}>• {hora}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-aurora-sage text-sm font-medium mb-2">Dias de Poder:</h6>
                      <ul className="text-aurora-parchment/70 text-sm space-y-1">
                        {decano.dias_poder.map((dia, i) => (
                          <li key={i}>• {dia}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderFaces = (signo: SignoExpandido) => (
    <div className="space-y-6">
      <h3 className="text-xl font-cinzel text-aurora-gold mb-4">
        FACES DE {signo.nome.toUpperCase()}
      </h3>
      
      {signo.faces.map((face, index) => (
        <motion.div
          key={index}
          className="bg-aurora-wine/30 backdrop-blur-sm rounded-2xl p-6 border border-aurora-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-cinzel text-aurora-gold">
              {face.numero}ª FACE ({face.graus})
            </h4>
            <span className={`text-sm font-medium ${getPlanetColor(face.regente)}`}>
              Regente: {face.regente}
            </span>
          </div>
          
          <div className="mb-4">
            <h5 className="text-aurora-sage mb-2 font-medium">{face.nome_tradicional}</h5>
            <p className="text-aurora-parchment/80 text-sm leading-relaxed mb-3">
              {face.descricao_detalhada}
            </p>
          </div>

          <div className="mb-4">
            <h6 className="text-aurora-gold text-sm font-medium mb-2">Significado:</h6>
            <p className="text-aurora-parchment/80 text-sm">
              {face.significado}
            </p>
          </div>

          <div className="mb-4">
            <h6 className="text-aurora-gold text-sm font-medium mb-2">Uso Mágico:</h6>
            <p className="text-aurora-parchment/80 text-sm">
              {face.uso_magico}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h6 className="text-aurora-sage text-sm font-medium mb-2">Correspondências:</h6>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-aurora-gold">Cores: </span>
                  <span className="text-aurora-parchment/70">{face.correspondencias.cores.join(', ')}</span>
                </div>
                <div>
                  <span className="text-aurora-gold">Pedras: </span>
                  <span className="text-aurora-parchment/70">{face.correspondencias.pedras.join(', ')}</span>
                </div>
                <div>
                  <span className="text-aurora-gold">Ervas: </span>
                  <span className="text-aurora-parchment/70">{face.correspondencias.ervas.join(', ')}</span>
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-aurora-sage text-sm font-medium mb-2">Rituais Específicos:</h6>
              <ul className="text-aurora-parchment/70 text-xs space-y-1">
                {face.rituais_especificos.map((ritual, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <Star size={10} className="text-aurora-gold mt-1 flex-shrink-0" />
                    {ritual}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-aurora-wine via-aurora-night to-aurora-wine p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-cinzel text-aurora-gold mb-4">
            MAGIA ZODIACAL
          </h1>
          <p className="text-aurora-parchment/80 max-w-3xl mx-auto leading-relaxed">
            Sistema completo de magia zodiacal com decanos tradicionais, faces planetárias, 
            termos egípcios e partes árabes. Explore as correspondências herméticas e 
            aplicações rituais de cada divisão zodiacal.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-aurora-wine/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-aurora-gold/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aurora-gold" size={20} />
              <input
                type="text"
                placeholder="Buscar signos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-aurora-night/50 border border-aurora-gold/30 rounded-xl pl-10 pr-4 py-3 text-aurora-parchment placeholder-aurora-parchment/50 focus:outline-none focus:border-aurora-gold"
              />
            </div>

            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="bg-aurora-night/50 border border-aurora-gold/30 rounded-xl px-4 py-3 text-aurora-parchment focus:outline-none focus:border-aurora-gold"
            >
              <option value="">Todos os Elementos</option>
              {elementos.map(elemento => (
                <option key={elemento} value={elemento}>{elemento}</option>
              ))}
            </select>

            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="bg-aurora-night/50 border border-aurora-gold/30 rounded-xl px-4 py-3 text-aurora-parchment focus:outline-none focus:border-aurora-gold"
            >
              <option value="">Todas as Modalidades</option>
              {modalidades.map(modalidade => (
                <option key={modalidade} value={modalidade}>{modalidade}</option>
              ))}
            </select>

            <div className="text-aurora-parchment/70 flex items-center justify-center">
              {filteredSignos.length} signo{filteredSignos.length !== 1 ? 's' : ''} encontrado{filteredSignos.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Grid de Signos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSignos.map((signo, index) => (
            <motion.div
              key={signo.nome}
              className="bg-aurora-wine/30 backdrop-blur-sm rounded-2xl p-6 border border-aurora-gold/20 hover:border-aurora-gold/40 transition-all cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedSign(signo)}
            >
              <div className="text-center">
                <div className={`text-6xl mb-4 ${getElementColor(signo.elemento)} group-hover:scale-110 transition-transform`}>
                  {signo.simbolo}
                </div>
                <h3 className="text-xl font-cinzel text-aurora-gold mb-2">{signo.nome}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-aurora-parchment/70">{signo.graus}</span>
                    <span className={`${getElementColor(signo.elemento)} font-medium`}>{signo.elemento}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aurora-parchment/70">Modalidade:</span>
                    <span className="text-aurora-sage">{signo.modalidade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aurora-parchment/70">Regente:</span>
                    <span className={getPlanetColor(signo.regente)}>{signo.regente}</span>
                  </div>
                </div>
                <div className="mt-4 text-aurora-parchment/60 text-xs">
                  Clique para ver decanos, faces e termos
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal de Detalhes do Signo */}
        <AnimatePresence>
          {selectedSign && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSign(null)}
            >
              <motion.div
                className="bg-aurora-wine/90 backdrop-blur-md rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-aurora-gold/30"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header do Modal */}
                <div className="sticky top-0 bg-aurora-wine/95 backdrop-blur-md p-6 border-b border-aurora-gold/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl ${getElementColor(selectedSign.elemento)}`}>
                        {selectedSign.simbolo}
                      </div>
                      <div>
                        <h2 className="text-2xl font-cinzel text-aurora-gold">{selectedSign.nome}</h2>
                        <div className="flex gap-4 text-sm text-aurora-parchment/70">
                          <span>{selectedSign.elemento}</span>
                          <span>{selectedSign.modalidade}</span>
                          <span>{selectedSign.graus}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSign(null)}
                      className="text-aurora-gold hover:text-aurora-sage transition-colors"
                    >
                      ×
                    </button>
                  </div>

                  {/* Dignidades */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-xs text-aurora-parchment/60">Regente</div>
                      <div className={`font-medium ${getPlanetColor(selectedSign.regente)}`}>{selectedSign.regente}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-aurora-parchment/60">Exaltação</div>
                      <div className={`font-medium ${getPlanetColor(selectedSign.exaltacao)}`}>{selectedSign.exaltacao}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-aurora-parchment/60">Detrimento</div>
                      <div className={`font-medium ${getPlanetColor(selectedSign.detrimento)}`}>{selectedSign.detrimento}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-aurora-parchment/60">Queda</div>
                      <div className={`font-medium ${getPlanetColor(selectedSign.queda)}`}>{selectedSign.queda}</div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => setActiveTab('decanos')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'decanos'
                          ? 'bg-aurora-gold text-aurora-night'
                          : 'bg-aurora-night/50 text-aurora-parchment hover:bg-aurora-night/70'
                      }`}
                    >
                      <Crown size={16} className="inline mr-2" />
                      Decanos
                    </button>
                    <button
                      onClick={() => setActiveTab('faces')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'faces'
                          ? 'bg-aurora-gold text-aurora-night'
                          : 'bg-aurora-night/50 text-aurora-parchment hover:bg-aurora-night/70'
                      }`}
                    >
                      <Eye size={16} className="inline mr-2" />
                      Faces
                    </button>
                  </div>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'decanos' && (
                      <motion.div
                        key="decanos"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        {renderDecanos(selectedSign)}
                      </motion.div>
                    )}
                    {activeTab === 'faces' && (
                      <motion.div
                        key="faces"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        {renderFaces(selectedSign)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ZodiacalMagic;


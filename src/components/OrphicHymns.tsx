import React, { useState, useMemo } from 'react';
import { Search, Filter, Music, Sun, Moon, Star, Flame, Droplets, Wind, Mountain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrphicHymn {
  id: string;
  nome: string;
  planeta?: string;
  elemento?: string;
  categoria: 'planetario' | 'elemental' | 'lunar' | 'especial';
  texto: string;
  invocacao: string;
  correspondencias: {
    dia?: string;
    hora?: string;
    incenso?: string[];
    cores?: string[];
    pedras?: string[];
  };
  uso_ritual: string;
  traducao_adaptada: string;
}

const hinosOrficos: OrphicHymn[] = [
  {
    id: 'sol',
    nome: 'Hino ao Sol (Hélios)',
    planeta: 'Sol',
    elemento: 'Fogo',
    categoria: 'planetario',
    texto: 'Escuta, bendito Hélios, de olhos dourados, rei etéreo, Titã de natureza ígnea...',
    invocacao: 'Ó Hélios dourado, desperta em mim tua luz divina e ilumina meu caminho com tua sabedoria solar',
    correspondencias: {
      dia: 'Domingo',
      hora: '1ª e 8ª hora solar',
      incenso: ['Olíbano', 'Canela', 'Louro'],
      cores: ['Dourado', 'Amarelo', 'Laranja'],
      pedras: ['Topázio', 'Citrino', 'Âmbar']
    },
    uso_ritual: 'Invocação para liderança, sucesso, vitalidade e iluminação espiritual',
    traducao_adaptada: 'Salve, Hélios de luz dourada, senhor do fogo celestial, que trazes vida e energia a todos os seres. Concede-me tua força solar e tua sabedoria luminosa.'
  },
  {
    id: 'lua',
    nome: 'Hino à Lua (Selene)',
    planeta: 'Lua',
    elemento: 'Água',
    categoria: 'lunar',
    texto: 'Escuta, deusa de chifres dourados, Selene, touro lunar, rainha da noite...',
    invocacao: 'Ó Selene prateada, revela-me os mistérios da noite e guia-me através dos ciclos da vida',
    correspondencias: {
      dia: 'Segunda-feira',
      hora: '1ª e 8ª hora lunar',
      incenso: ['Jasmim', 'Sândalo branco', 'Mirra'],
      cores: ['Prateado', 'Branco', 'Azul pálido'],
      pedras: ['Pedra da Lua', 'Pérola', 'Selenita']
    },
    uso_ritual: 'Invocação para intuição, sonhos proféticos, magia lunar e ciclos femininos',
    traducao_adaptada: 'Salve, Selene de luz prateada, senhora dos mistérios noturnos, que governas as marés e os sonhos. Concede-me tua sabedoria lunar e tua proteção maternal.'
  },
  {
    id: 'mercurio',
    nome: 'Hino a Mercúrio (Hermes)',
    planeta: 'Mercúrio',
    elemento: 'Ar',
    categoria: 'planetario',
    texto: 'Hermes, intérprete de todos, que habitas nos caminhos aéreos...',
    invocacao: 'Ó Hermes veloz, abre minha mente à sabedoria e torna claras minhas palavras',
    correspondencias: {
      dia: 'Quarta-feira',
      hora: '1ª e 8ª hora mercurial',
      incenso: ['Benjoim', 'Lavanda', 'Menta'],
      cores: ['Amarelo', 'Violeta', 'Multicolorido'],
      pedras: ['Ágata', 'Sodalita', 'Fluorita']
    },
    uso_ritual: 'Invocação para comunicação, aprendizado, viagens e negócios',
    traducao_adaptada: 'Salve, Hermes mensageiro dos deuses, senhor dos caminhos e das palavras. Concede-me tua eloquência e tua sabedoria mercurial.'
  },
  {
    id: 'venus',
    nome: 'Hino a Vênus (Afrodite)',
    planeta: 'Vênus',
    elemento: 'Água',
    categoria: 'planetario',
    texto: 'Afrodite de muitos nomes, venerável deusa nascida do mar...',
    invocacao: 'Ó Afrodite dourada, desperta em mim o amor verdadeiro e a beleza interior',
    correspondencias: {
      dia: 'Sexta-feira',
      hora: '1ª e 8ª hora venusiana',
      incenso: ['Rosa', 'Sândalo', 'Ylang-ylang'],
      cores: ['Rosa', 'Verde', 'Azul celeste'],
      pedras: ['Quartzo rosa', 'Esmeralda', 'Turquesa']
    },
    uso_ritual: 'Invocação para amor, beleza, arte, harmonia e relacionamentos',
    traducao_adaptada: 'Salve, Afrodite nascida das espumas do mar, senhora do amor e da beleza. Concede-me tua graça venusiana e tua harmonia divina.'
  },
  {
    id: 'marte',
    nome: 'Hino a Marte (Ares)',
    planeta: 'Marte',
    elemento: 'Fogo',
    categoria: 'planetario',
    texto: 'Ares indomável, de força titânica, amante da guerra...',
    invocacao: 'Ó Ares guerreiro, concede-me coragem e força para vencer todos os obstáculos',
    correspondencias: {
      dia: 'Terça-feira',
      hora: '1ª e 8ª hora marcial',
      incenso: ['Sangue de dragão', 'Pimenta', 'Gengibre'],
      cores: ['Vermelho', 'Escarlate', 'Ferro'],
      pedras: ['Rubi', 'Granada', 'Hematita']
    },
    uso_ritual: 'Invocação para coragem, proteção, força física e superação de inimigos',
    traducao_adaptada: 'Salve, Ares de força indomável, senhor da guerra justa e da coragem. Concede-me tua força marcial e tua proteção guerreira.'
  },
  {
    id: 'jupiter',
    nome: 'Hino a Júpiter (Zeus)',
    planeta: 'Júpiter',
    elemento: 'Ar',
    categoria: 'planetario',
    texto: 'Zeus, rei dos deuses, senhor do raio flamejante...',
    invocacao: 'Ó Zeus todo-poderoso, concede-me sabedoria, justiça e abundância em minha vida',
    correspondencias: {
      dia: 'Quinta-feira',
      hora: '1ª e 8ª hora jovial',
      incenso: ['Cedro', 'Sálvia', 'Hissopo'],
      cores: ['Azul real', 'Púrpura', 'Dourado'],
      pedras: ['Safira', 'Lápis-lazúli', 'Ametista']
    },
    uso_ritual: 'Invocação para sabedoria, justiça, abundância, liderança e proteção divina',
    traducao_adaptada: 'Salve, Zeus rei dos céus, senhor da justiça e da sabedoria. Concede-me tua benevolência jovial e tua proteção real.'
  },
  {
    id: 'saturno',
    nome: 'Hino a Saturno (Cronos)',
    planeta: 'Saturno',
    elemento: 'Terra',
    categoria: 'planetario',
    texto: 'Cronos, pai do tempo, de vários nomes, semente imortal...',
    invocacao: 'Ó Cronos ancião, ensina-me a paciência e a sabedoria que vem com o tempo',
    correspondencias: {
      dia: 'Sábado',
      hora: '1ª e 8ª hora saturnina',
      incenso: ['Mirra', 'Cipreste', 'Patchouli'],
      cores: ['Preto', 'Marrom', 'Cinza escuro'],
      pedras: ['Ônix', 'Obsidiana', 'Jet']
    },
    uso_ritual: 'Invocação para disciplina, paciência, estrutura, ancestralidade e sabedoria anciã',
    traducao_adaptada: 'Salve, Cronos senhor do tempo, guardião da sabedoria ancestral. Concede-me tua disciplina saturnina e tua paciência eterna.'
  },
  {
    id: 'fogo',
    nome: 'Hino ao Fogo (Hefesto)',
    elemento: 'Fogo',
    categoria: 'elemental',
    texto: 'Hefesto, fogo indomável, luz eterna, elemento sagrado...',
    invocacao: 'Ó Fogo sagrado, purifica minha alma e acende em mim a chama da transformação',
    correspondencias: {
      incenso: ['Olíbano', 'Canela', 'Cravo'],
      cores: ['Vermelho', 'Laranja', 'Dourado'],
      pedras: ['Rubi', 'Cornalina', 'Jaspe vermelho']
    },
    uso_ritual: 'Invocação para purificação, transformação, energia e paixão',
    traducao_adaptada: 'Salve, Fogo divino, elemento da transformação e da purificação. Concede-me tua energia ígnea e tua força transformadora.'
  },
  {
    id: 'agua',
    nome: 'Hino à Água (Poseidon)',
    elemento: 'Água',
    categoria: 'elemental',
    texto: 'Poseidon, senhor das águas, que abraças a terra...',
    invocacao: 'Ó Água sagrada, flui através de mim trazendo cura e renovação',
    correspondencias: {
      incenso: ['Jasmim', 'Lótus', 'Eucalipto'],
      cores: ['Azul', 'Verde-água', 'Prateado'],
      pedras: ['Água-marinha', 'Turquesa', 'Pérola']
    },
    uso_ritual: 'Invocação para cura, purificação emocional, intuição e fluidez',
    traducao_adaptada: 'Salve, Água divina, elemento da vida e da cura. Concede-me tua fluidez aquática e tua sabedoria emocional.'
  },
  {
    id: 'ar',
    nome: 'Hino ao Ar (Éolo)',
    elemento: 'Ar',
    categoria: 'elemental',
    texto: 'Éolo, senhor dos ventos, que sopras pelos quatro cantos...',
    invocacao: 'Ó Ar sagrado, traz-me inspiração e clareza mental em todos os meus pensamentos',
    correspondencias: {
      incenso: ['Lavanda', 'Menta', 'Eucalipto'],
      cores: ['Amarelo', 'Branco', 'Azul claro'],
      pedras: ['Topázio', 'Quartzo claro', 'Fluorita']
    },
    uso_ritual: 'Invocação para clareza mental, comunicação, inspiração e liberdade',
    traducao_adaptada: 'Salve, Ar divino, elemento do pensamento e da comunicação. Concede-me tua clareza aérea e tua inspiração mental.'
  },
  {
    id: 'terra',
    nome: 'Hino à Terra (Gaia)',
    elemento: 'Terra',
    categoria: 'elemental',
    texto: 'Gaia, mãe de todos, fundamento sólido do cosmos...',
    invocacao: 'Ó Terra sagrada, concede-me estabilidade e conexão com a natureza',
    correspondencias: {
      incenso: ['Patchouli', 'Vetiver', 'Cedro'],
      cores: ['Verde', 'Marrom', 'Ocre'],
      pedras: ['Quartzo verde', 'Jaspe', 'Turmalina verde']
    },
    uso_ritual: 'Invocação para estabilidade, prosperidade, conexão com a natureza e enraizamento',
    traducao_adaptada: 'Salve, Terra divina, elemento da estabilidade e da abundância. Concede-me tua força telúrica e tua sabedoria natural.'
  }
];

export const OrphicHymns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('todos');
  const [selectedElement, setSelectedElement] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedHymn, setSelectedHymn] = useState<OrphicHymn | null>(null);

  // Filtrar hinos
  const filteredHymns = useMemo(() => {
    return hinosOrficos.filter(hymn => {
      const matchesSearch = hymn.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hymn.texto.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlanet = selectedPlanet === 'todos' || hymn.planeta === selectedPlanet;
      const matchesElement = selectedElement === 'todos' || hymn.elemento === selectedElement;
      const matchesCategory = selectedCategory === 'todos' || hymn.categoria === selectedCategory;
      
      return matchesSearch && matchesPlanet && matchesElement && matchesCategory;
    });
  }, [searchTerm, selectedPlanet, selectedElement, selectedCategory]);

  // Ícones por categoria
  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case 'planetario': return <Star className="w-4 h-4" />;
      case 'elemental': return <Flame className="w-4 h-4" />;
      case 'lunar': return <Moon className="w-4 h-4" />;
      default: return <Music className="w-4 h-4" />;
    }
  };

  // Ícones por elemento
  const getElementIcon = (elemento: string) => {
    switch (elemento) {
      case 'Fogo': return <Flame className="w-4 h-4 text-red-400" />;
      case 'Água': return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'Ar': return <Wind className="w-4 h-4 text-yellow-400" />;
      case 'Terra': return <Mountain className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aurora-vinho via-aurora-azul-noite to-aurora-vinho p-4">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-cinzel font-bold text-aurora-dourado mb-2">
            HINOS ÓRFICOS
          </h1>
          <p className="text-aurora-pergaminho/80 max-w-2xl mx-auto">
            Invocações sagradas aos planetas e elementos, baseadas nos antigos hinos órficos 
            adaptados para a prática mágica moderna
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="aurora-card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-aurora-dourado" />
            <h2 className="text-lg font-cinzel font-semibold text-aurora-dourado">
              Filtros
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-aurora-pergaminho/60" />
              <input
                type="text"
                placeholder="Buscar hinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-aurora-vinho/30 border border-aurora-dourado/30 rounded-lg text-aurora-pergaminho placeholder-aurora-pergaminho/60 focus:outline-none focus:border-aurora-dourado"
              />
            </div>

            {/* Filtro por Planeta */}
            <select
              value={selectedPlanet}
              onChange={(e) => setSelectedPlanet(e.target.value)}
              className="px-4 py-2 bg-aurora-vinho/30 border border-aurora-dourado/30 rounded-lg text-aurora-pergaminho focus:outline-none focus:border-aurora-dourado"
            >
              <option value="todos">Todos os Planetas</option>
              <option value="Sol">Sol</option>
              <option value="Lua">Lua</option>
              <option value="Mercúrio">Mercúrio</option>
              <option value="Vênus">Vênus</option>
              <option value="Marte">Marte</option>
              <option value="Júpiter">Júpiter</option>
              <option value="Saturno">Saturno</option>
            </select>

            {/* Filtro por Elemento */}
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="px-4 py-2 bg-aurora-vinho/30 border border-aurora-dourado/30 rounded-lg text-aurora-pergaminho focus:outline-none focus:border-aurora-dourado"
            >
              <option value="todos">Todos os Elementos</option>
              <option value="Fogo">Fogo</option>
              <option value="Água">Água</option>
              <option value="Ar">Ar</option>
              <option value="Terra">Terra</option>
            </select>

            {/* Filtro por Categoria */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-aurora-vinho/30 border border-aurora-dourado/30 rounded-lg text-aurora-pergaminho focus:outline-none focus:border-aurora-dourado"
            >
              <option value="todos">Todas as Categorias</option>
              <option value="planetario">Planetários</option>
              <option value="elemental">Elementais</option>
              <option value="lunar">Lunares</option>
              <option value="especial">Especiais</option>
            </select>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-aurora-pergaminho/70">
            {filteredHymns.length} hino{filteredHymns.length !== 1 ? 's' : ''} encontrado{filteredHymns.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Grid de Hinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredHymns.map((hymn, index) => (
              <motion.div
                key={hymn.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="aurora-card p-6 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedHymn(hymn)}
              >
                {/* Cabeçalho do card */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(hymn.categoria)}
                    <h3 className="font-cinzel font-semibold text-aurora-dourado text-lg">
                      {hymn.nome}
                    </h3>
                  </div>
                  {hymn.elemento && getElementIcon(hymn.elemento)}
                </div>

                {/* Informações */}
                <div className="space-y-2 mb-4">
                  {hymn.planeta && (
                    <div className="flex items-center gap-2 text-sm text-aurora-pergaminho">
                      <Sun className="w-3 h-3" />
                      <span>Planeta: {hymn.planeta}</span>
                    </div>
                  )}
                  {hymn.elemento && (
                    <div className="flex items-center gap-2 text-sm text-aurora-pergaminho">
                      {getElementIcon(hymn.elemento)}
                      <span>Elemento: {hymn.elemento}</span>
                    </div>
                  )}
                  {hymn.correspondencias.dia && (
                    <div className="text-sm text-aurora-pergaminho/80">
                      Dia: {hymn.correspondencias.dia}
                    </div>
                  )}
                </div>

                {/* Preview do texto */}
                <p className="text-sm text-aurora-pergaminho/90 line-clamp-3 italic">
                  {hymn.traducao_adaptada}
                </p>

                {/* Uso ritual */}
                <div className="mt-4 pt-4 border-t border-aurora-dourado/20">
                  <p className="text-xs text-aurora-salvia">
                    {hymn.uso_ritual}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal de Detalhes */}
        <AnimatePresence>
          {selectedHymn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedHymn(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="aurora-card max-w-4xl max-h-[90vh] overflow-y-auto p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cabeçalho do modal */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-cinzel font-bold text-aurora-dourado mb-2">
                      {selectedHymn.nome}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-aurora-pergaminho">
                      {selectedHymn.planeta && (
                        <span className="flex items-center gap-1">
                          <Sun className="w-4 h-4" />
                          {selectedHymn.planeta}
                        </span>
                      )}
                      {selectedHymn.elemento && (
                        <span className="flex items-center gap-1">
                          {getElementIcon(selectedHymn.elemento)}
                          {selectedHymn.elemento}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedHymn(null)}
                    className="text-aurora-pergaminho/60 hover:text-aurora-pergaminho text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Conteúdo do hino */}
                <div className="space-y-6">
                  {/* Texto original */}
                  <div>
                    <h3 className="text-lg font-cinzel font-semibold text-aurora-dourado mb-3">
                      Texto Clássico
                    </h3>
                    <p className="text-aurora-pergaminho italic leading-relaxed">
                      {selectedHymn.texto}
                    </p>
                  </div>

                  {/* Tradução adaptada */}
                  <div>
                    <h3 className="text-lg font-cinzel font-semibold text-aurora-dourado mb-3">
                      Tradução Adaptada
                    </h3>
                    <p className="text-aurora-pergaminho leading-relaxed">
                      {selectedHymn.traducao_adaptada}
                    </p>
                  </div>

                  {/* Invocação */}
                  <div>
                    <h3 className="text-lg font-cinzel font-semibold text-aurora-dourado mb-3">
                      Invocação Moderna
                    </h3>
                    <div className="bg-aurora-vinho/20 rounded-lg p-4">
                      <p className="text-aurora-pergaminho italic text-center leading-relaxed">
                        "{selectedHymn.invocacao}"
                      </p>
                    </div>
                  </div>

                  {/* Correspondências */}
                  <div>
                    <h3 className="text-lg font-cinzel font-semibold text-aurora-dourado mb-3">
                      Correspondências Rituais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedHymn.correspondencias.dia && (
                        <div>
                          <h4 className="font-semibold text-aurora-salvia mb-1">Dia:</h4>
                          <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.dia}</p>
                        </div>
                      )}
                      {selectedHymn.correspondencias.hora && (
                        <div>
                          <h4 className="font-semibold text-aurora-salvia mb-1">Hora:</h4>
                          <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.hora}</p>
                        </div>
                      )}
                      {selectedHymn.correspondencias.incenso && (
                        <div>
                          <h4 className="font-semibold text-aurora-salvia mb-1">Incensos:</h4>
                          <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.incenso.join(', ')}</p>
                        </div>
                      )}
                      {selectedHymn.correspondencias.cores && (
                        <div>
                          <h4 className="font-semibold text-aurora-salvia mb-1">Cores:</h4>
                          <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.cores.join(', ')}</p>
                        </div>
                      )}
                      {selectedHymn.correspondencias.pedras && (
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-aurora-salvia mb-1">Pedras:</h4>
                          <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.pedras.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Uso ritual */}
                  <div>
                    <h3 className="text-lg font-cinzel font-semibold text-aurora-dourado mb-3">
                      Uso Ritual
                    </h3>
                    <p className="text-aurora-pergaminho leading-relaxed">
                      {selectedHymn.uso_ritual}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrphicHymns;


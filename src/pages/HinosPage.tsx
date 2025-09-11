import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Music, Sun, Moon, Star, Flame, Droplets, Wind, Mountain, Sparkles, Heart, Eye, X, Play, Pause, Volume2, BookOpen, Crown, Zap, Languages, Clock, MapPin, Flower } from 'lucide-react';
import hinosCompletos from '../../data/hinos-orficos-completos.json';

interface OrphicHymn {
  numero: number;
  titulo: string;
  titulo_grego: string;
  pronuncia_titulo: string;
  invocacao: string;
  invocacao_grego: string;
  pronuncia_invocacao: string;
  hino: string;
  hino_grego: string;
  pronuncia_hino: string;
  pedido: string;
  pedido_grego: string;
  pronuncia_pedido: string;
  correspondencias: {
    dia: string;
    hora: string;
    incenso: string;
    cor: string;
    metal: string;
    pedra: string;
    ervas: string;
    oferendas: string;
    local: string;
  };
  contexto_ritualistico: {
    momento_ideal: string;
    preparacao: string;
    vestimenta: string;
    altar: string;
    gestual: string;
    respiracao: string;
    visualizacao: string;
    encerramento: string;
  };
  pronuncia_guia: {
    observacoes: string;
    dicas: string;
    ritmo: string;
    entonacao: string;
  };
  categoria: string;
  elemento: string;
  planeta: string;
  id: string;
}

interface HymnCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  hymns: OrphicHymn[];
}

const HinosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHymn, setSelectedHymn] = useState<OrphicHymn | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState<'invocacao' | 'hino' | 'pedido'>('invocacao');
  const [showGreek, setShowGreek] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [showRitualContext, setShowRitualContext] = useState(false);

  const hymns: OrphicHymn[] = hinosCompletos.hinos as OrphicHymn[];

  // Categorização dos hinos
  const categories: HymnCategory[] = [
    {
      name: 'Divindades Primordiais',
      icon: <Crown className="w-5 h-5" />,
      color: 'text-yellow-400',
      hymns: hymns.filter(h => h.categoria === 'Divindades Primordiais')
    },
    {
      name: 'Divindades Ctônicas',
      icon: <Mountain className="w-5 h-5" />,
      color: 'text-purple-400',
      hymns: hymns.filter(h => h.categoria === 'Divindades Ctônicas')
    },
    {
      name: 'Elementos Primordiais',
      icon: <Flame className="w-5 h-5" />,
      color: 'text-orange-400',
      hymns: hymns.filter(h => h.categoria === 'Elementos Primordiais')
    },
    {
      name: 'Divindades Protetoras',
      icon: <Star className="w-5 h-5" />,
      color: 'text-blue-400',
      hymns: hymns.filter(h => h.categoria === 'Divindades Protetoras')
    }
  ];

  const filteredHymns = hymns.filter(hymn => {
    const matchesSearch = hymn.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hymn.invocacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hymn.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    const category = categories.find(cat => cat.name === selectedCategory);
    return matchesSearch && category?.hymns.some(h => h.id === hymn.id);
  });

  const getCorrespondenceIcon = (type: string) => {
    switch (type) {
      case 'dia': return <Sun className="w-4 h-4" />;
      case 'hora': return <Clock className="w-4 h-4" />;
      case 'incenso': return <Flame className="w-4 h-4" />;
      case 'cor': return <Sparkles className="w-4 h-4" />;
      case 'metal': return <Mountain className="w-4 h-4" />;
      case 'pedra': return <Star className="w-4 h-4" />;
      case 'ervas': return <Flower className="w-4 h-4" />;
      case 'oferendas': return <Heart className="w-4 h-4" />;
      case 'local': return <MapPin className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCurrentText = () => {
    if (!selectedHymn) return '';
    
    const sectionKey = currentSection as keyof Pick<OrphicHymn, 'invocacao' | 'hino' | 'pedido'>;
    
    if (showGreek) {
      const greekKey = `${currentSection}_grego` as keyof OrphicHymn;
      return selectedHymn[greekKey] as string;
    } else if (showPronunciation) {
      const pronunciaKey = `pronuncia_${currentSection}` as keyof OrphicHymn;
      return selectedHymn[pronunciaKey] as string;
    } else {
      return selectedHymn[sectionKey];
    }
  };

  const playHymn = (hymn: OrphicHymn) => {
    setSelectedHymn(hymn);
    setCurrentSection('invocacao');
    setIsPlaying(true);
  };

  const nextSection = () => {
    if (currentSection === 'invocacao') setCurrentSection('hino');
    else if (currentSection === 'hino') setCurrentSection('pedido');
    else setCurrentSection('invocacao');
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
          🎵 Hinos Órficos
        </h1>
        <p className="text-aurora-silver text-lg max-w-3xl mx-auto">
          Coleção completa dos Hinos Órficos, cantos sagrados da tradição helênica dedicados às divindades, 
          elementos e forças cósmicas. Cada hino contém invocações, correspondências e instruções rituais.
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
              placeholder="Buscar hinos por título ou conteúdo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-aurora-dark-primary/50 border border-aurora-gold/20 rounded-lg text-aurora-silver placeholder-aurora-copper focus:outline-none focus:border-aurora-gold/50"
            />
          </div>

          {/* Filtro por Categoria */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aurora-copper w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 bg-aurora-dark-primary/50 border border-aurora-gold/20 rounded-lg text-aurora-silver focus:outline-none focus:border-aurora-gold/50 appearance-none"
            >
              <option value="all">Todas as Categorias</option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
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
              {filteredHymns.length} de {hymns.length} hinos
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Music className="w-4 h-4 text-aurora-gold" />
            <span className="text-aurora-silver">
              {categories.length} categorias
            </span>
          </div>
        </div>
      </motion.div>

      {/* Categorias */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
            className={`
              p-4 rounded-lg border transition-all duration-300
              ${selectedCategory === category.name 
                ? 'bg-aurora-purple/30 border-aurora-gold/50 text-aurora-gold' 
                : 'bg-aurora-dark-primary/30 border-aurora-purple/20 text-aurora-silver hover:border-aurora-gold/30'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={category.color}>
                {category.icon}
              </div>
              <span className="text-xs font-medium text-center">
                {category.name}
              </span>
              <span className="text-xs text-aurora-copper">
                {category.hymns.length} hinos
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Lista de Hinos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredHymns.map((hymn, index) => (
          <motion.div
            key={hymn.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-aurora-dark-secondary/80 backdrop-blur-sm rounded-lg border border-aurora-purple/30 p-4 hover:border-aurora-gold/50 transition-all duration-300"
          >
            {/* Cabeçalho do Hino */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-aurora-gold font-bold text-lg mb-1">
                  {hymn.numero}. {hymn.titulo}
                </h3>
                <p className="text-aurora-silver text-sm line-clamp-2">
                  {hymn.invocacao.substring(0, 100)}...
                </p>
              </div>
              <button
                onClick={() => playHymn(hymn)}
                className="ml-2 p-2 bg-aurora-purple/20 hover:bg-aurora-purple/40 rounded-full transition-colors"
              >
                <Play className="w-4 h-4 text-aurora-gold" />
              </button>
            </div>

            {/* Correspondências Resumidas */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center space-x-1">
                {getCorrespondenceIcon('dia')}
                <span className="text-aurora-copper">{hymn.correspondencias.dia}</span>
              </div>
              <div className="flex items-center space-x-1">
                {getCorrespondenceIcon('incenso')}
                <span className="text-aurora-copper">{hymn.correspondencias.incenso}</span>
              </div>
              <div className="flex items-center space-x-1">
                {getCorrespondenceIcon('cor')}
                <span className="text-aurora-copper">{hymn.correspondencias.cor}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal do Hino Selecionado */}
      <AnimatePresence>
        {selectedHymn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedHymn(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-aurora-dark-primary border border-aurora-gold/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="flex items-center justify-between p-6 border-b border-aurora-gold/20">
                <div>
                  <h2 className="text-2xl font-bold text-aurora-gold">
                    {selectedHymn.numero}. {selectedHymn.titulo}
                  </h2>
                  <p className="text-aurora-copper text-sm mt-1">
                    {selectedHymn.titulo_grego} • {selectedHymn.pronuncia_titulo}
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center space-x-2 px-3 py-1 bg-aurora-purple/20 rounded-full"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span className="text-sm">{isPlaying ? 'Pausar' : 'Recitar'}</span>
                    </button>
                    
                    {/* Controles de Idioma */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {setShowGreek(false); setShowPronunciation(false);}}
                        className={`px-2 py-1 text-xs rounded ${!showGreek && !showPronunciation ? 'bg-aurora-gold/20 text-aurora-gold' : 'bg-aurora-dark-secondary/50 text-aurora-silver'}`}
                      >
                        PT
                      </button>
                      <button
                        onClick={() => {setShowGreek(true); setShowPronunciation(false);}}
                        className={`px-2 py-1 text-xs rounded ${showGreek && !showPronunciation ? 'bg-aurora-gold/20 text-aurora-gold' : 'bg-aurora-dark-secondary/50 text-aurora-silver'}`}
                      >
                        ΕΛ
                      </button>
                      <button
                        onClick={() => {setShowGreek(false); setShowPronunciation(true);}}
                        className={`px-2 py-1 text-xs rounded ${showPronunciation ? 'bg-aurora-gold/20 text-aurora-gold' : 'bg-aurora-dark-secondary/50 text-aurora-silver'}`}
                      >
                        <Languages className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Volume2 className="w-4 h-4 text-aurora-copper" />
                      <span className="text-sm text-aurora-silver">Modo Ritual</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHymn(null)}
                  className="p-2 hover:bg-aurora-purple/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-aurora-silver" />
                </button>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Texto Principal */}
                  <div className="lg:col-span-2">
                    {/* Navegação de Seções */}
                    <div className="flex space-x-2 mb-4">
                      {['invocacao', 'hino', 'pedido'].map((section) => (
                        <button
                          key={section}
                          onClick={() => setCurrentSection(section as any)}
                          className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-colors
                            ${currentSection === section
                              ? 'bg-aurora-gold/20 text-aurora-gold border border-aurora-gold/30'
                              : 'bg-aurora-dark-secondary/50 text-aurora-silver hover:bg-aurora-purple/20'
                            }
                          `}
                        >
                          {section === 'invocacao' ? 'Invocação' : 
                           section === 'hino' ? 'Hino' : 'Pedido'}
                        </button>
                      ))}
                    </div>

                    {/* Texto da Seção */}
                    <motion.div
                      key={`${currentSection}-${showGreek}-${showPronunciation}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-aurora-dark-secondary/30 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-aurora-gold font-semibold capitalize">
                          {currentSection === 'invocacao' ? 'Invocação' : 
                           currentSection === 'hino' ? 'Hino' : 'Pedido'}
                          {showGreek && ' (Grego Antigo)'}
                          {showPronunciation && ' (Pronúncia)'}
                        </h3>
                        {showPronunciation && (
                          <div className="text-xs text-aurora-copper">
                            <Languages className="w-3 h-3 inline mr-1" />
                            Guia de Pronúncia
                          </div>
                        )}
                      </div>
                      <div className={`leading-relaxed whitespace-pre-line ${
                        showGreek ? 'text-aurora-gold font-serif text-lg' : 
                        showPronunciation ? 'text-aurora-copper font-mono' : 
                        'text-aurora-silver'
                      }`}>
                        {getCurrentText()}
                      </div>
                      
                      {/* Guia de Pronúncia */}
                      {showPronunciation && selectedHymn.pronuncia_guia && (
                        <div className="mt-4 p-3 bg-aurora-purple/10 rounded border border-aurora-purple/30">
                          <h4 className="text-aurora-gold text-sm font-semibold mb-2">Dicas de Pronúncia:</h4>
                          <div className="text-xs text-aurora-silver space-y-1">
                            <p><strong>Ritmo:</strong> {selectedHymn.pronuncia_guia.ritmo}</p>
                            <p><strong>Entonação:</strong> {selectedHymn.pronuncia_guia.entonacao}</p>
                            <p><strong>Dicas:</strong> {selectedHymn.pronuncia_guia.dicas}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Controles de Navegação */}
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={nextSection}
                        className="px-4 py-2 bg-aurora-purple/20 hover:bg-aurora-purple/40 rounded-lg text-aurora-silver transition-colors"
                      >
                        Próxima Seção
                      </button>
                      <button
                        onClick={() => setShowRitualContext(!showRitualContext)}
                        className="px-4 py-2 bg-aurora-gold/20 hover:bg-aurora-gold/40 rounded-lg text-aurora-gold transition-colors"
                      >
                        {showRitualContext ? 'Ocultar' : 'Mostrar'} Contexto Ritual
                      </button>
                    </div>
                  </div>

                  {/* Correspondências e Contexto Ritual */}
                  <div className="space-y-4">
                    <h3 className="text-aurora-gold font-semibold text-lg">Correspondências Rituais</h3>
                    
                    {Object.entries(selectedHymn.correspondencias).map(([key, value]) => (
                      <div key={key} className="bg-aurora-dark-secondary/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {getCorrespondenceIcon(key)}
                          <span className="text-aurora-gold font-medium capitalize">
                            {key === 'dia' ? 'Dia da Semana' :
                             key === 'hora' ? 'Hora Planetária' :
                             key === 'incenso' ? 'Incenso' :
                             key === 'cor' ? 'Cor Ritual' :
                             key === 'metal' ? 'Metal' :
                             key === 'pedra' ? 'Pedra' :
                             key === 'ervas' ? 'Ervas' :
                             key === 'oferendas' ? 'Oferendas' :
                             key === 'local' ? 'Local Ideal' : key}
                          </span>
                        </div>
                        <p className="text-aurora-silver">{value}</p>
                      </div>
                    ))}

                    {/* Contexto Ritual Expandido */}
                    <AnimatePresence>
                      {showRitualContext && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-4"
                        >
                          <h3 className="text-aurora-gold font-semibold text-lg">Contexto Ritualístico</h3>
                          
                          {Object.entries(selectedHymn.contexto_ritualistico).map(([key, value]) => (
                            <div key={key} className="bg-aurora-purple/10 rounded-lg p-4 border border-aurora-purple/30">
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="w-4 h-4 text-aurora-gold" />
                                <span className="text-aurora-gold font-medium capitalize">
                                  {key === 'momento_ideal' ? 'Momento Ideal' :
                                   key === 'preparacao' ? 'Preparação' :
                                   key === 'vestimenta' ? 'Vestimenta' :
                                   key === 'altar' ? 'Altar' :
                                   key === 'gestual' ? 'Gestual' :
                                   key === 'respiracao' ? 'Respiração' :
                                   key === 'visualizacao' ? 'Visualização' :
                                   key === 'encerramento' ? 'Encerramento' : key}
                                </span>
                              </div>
                              <p className="text-aurora-silver text-sm leading-relaxed">{value}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Dica Ritual */}
                    <div className="bg-aurora-purple/10 border border-aurora-purple/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-aurora-gold" />
                        <span className="text-aurora-gold font-medium">Dica Ritual</span>
                      </div>
                      <p className="text-aurora-silver text-sm">
                        Recite este hino durante o dia e hora correspondentes, usando o incenso indicado. 
                        Vista roupas da cor mencionada e tenha a pedra em suas mãos durante a invocação.
                      </p>
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

export default HinosPage;


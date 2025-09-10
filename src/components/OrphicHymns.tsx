import React, { useState, useMemo } from 'react';
import { Search, Filter, Music, Sun, Moon, Star, Flame, Droplets, Wind, Mountain, Sparkles, Heart, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import hinosOrficosData from '../../data/hinos-orficos.json';

interface OrphicHymn {
  numero: number;
  titulo: string;
  invocacao: string;
  hino: string;
  pedido: string;
  correspondencias: {
    dia: string;
    hora: string;
    incenso: string;
    cor: string;
    metal: string;
    pedra: string;
  };
  id: string;
}

interface HymnCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  hymns: OrphicHymn[];
}

const OrphicHymns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedHymn, setSelectedHymn] = useState<OrphicHymn | null>(null);

  // Organizar hinos por categoria usando dados reais
  const categories: HymnCategory[] = useMemo(() => {
    const planetarios = Object.entries(hinosOrficosData.hinos.planetarios).map(([key, hymn]) => ({
      ...hymn,
      id: key
    }));

    const elementais = Object.entries(hinosOrficosData.hinos.elementais).map(([key, hymn]) => ({
      ...hymn,
      id: key
    }));

    const lunares = Object.entries(hinosOrficosData.hinos.lunares).map(([key, hymn]) => ({
      ...hymn,
      id: key
    }));

    const especiais = Object.entries(hinosOrficosData.hinos.especiais).map(([key, hymn]) => ({
      ...hymn,
      id: key
    }));

    return [
      {
        name: 'Planetários',
        icon: <Sun className="w-5 h-5" />,
        color: 'text-aurora-dourado',
        hymns: planetarios
      },
      {
        name: 'Elementais',
        icon: <Flame className="w-5 h-5" />,
        color: 'text-aurora-vinho',
        hymns: elementais
      },
      {
        name: 'Lunares',
        icon: <Moon className="w-5 h-5" />,
        color: 'text-aurora-azul',
        hymns: lunares
      },
      {
        name: 'Especiais',
        icon: <Sparkles className="w-5 h-5" />,
        color: 'text-aurora-salvia',
        hymns: especiais
      }
    ];
  }, []);

  // Filtrar hinos baseado na busca e categoria
  const filteredHymns = useMemo(() => {
    let allHymns: OrphicHymn[] = [];
    
    if (selectedCategory === 'todos') {
      allHymns = categories.flatMap(cat => cat.hymns);
    } else {
      const category = categories.find(cat => cat.name.toLowerCase() === selectedCategory);
      allHymns = category ? category.hymns : [];
    }

    if (searchTerm) {
      return allHymns.filter(hymn => 
        hymn.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hymn.hino.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allHymns;
  }, [categories, selectedCategory, searchTerm]);

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'planetários': return <Sun className="w-4 h-4" />;
      case 'elementais': return <Flame className="w-4 h-4" />;
      case 'lunares': return <Moon className="w-4 h-4" />;
      case 'especiais': return <Sparkles className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aurora-azul via-aurora-vinho to-aurora-azul p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3 mb-4"
          >
            <Music className="w-8 h-8 text-aurora-dourado" />
            <h1 className="text-4xl font-cinzel text-aurora-dourado">
              Hinos Órficos
            </h1>
          </motion.div>
          <p className="text-aurora-pergaminho/80 font-alice text-lg">
            Invocações planetárias e elementais da tradição órfica
          </p>
        </div>

        {/* Controles de Busca e Filtro */}
        <div className="mb-8 space-y-4">
          {/* Barra de Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-aurora-dourado/60" />
            <input
              type="text"
              placeholder="Buscar hinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-aurora-vinho/20 border border-aurora-dourado/30 rounded-lg text-aurora-pergaminho placeholder-aurora-pergaminho/60 focus:outline-none focus:border-aurora-dourado/60"
            />
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-4 py-2 rounded-lg font-alice transition-colors ${
                selectedCategory === 'todos'
                  ? 'bg-aurora-dourado text-aurora-azul'
                  : 'bg-aurora-vinho/20 text-aurora-pergaminho hover:bg-aurora-vinho/30'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name.toLowerCase())}
                className={`px-4 py-2 rounded-lg font-alice transition-colors flex items-center space-x-2 ${
                  selectedCategory === category.name.toLowerCase()
                    ? 'bg-aurora-dourado text-aurora-azul'
                    : 'bg-aurora-vinho/20 text-aurora-pergaminho hover:bg-aurora-vinho/30'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Hinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHymns.map((hymn, index) => (
            <motion.div
              key={hymn.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-aurora-vinho/20 backdrop-blur-sm border border-aurora-dourado/30 rounded-lg p-6 hover:bg-aurora-vinho/30 transition-colors cursor-pointer"
              onClick={() => setSelectedHymn(hymn)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-cinzel text-aurora-dourado">
                  {hymn.titulo}
                </h3>
                <span className="text-sm text-aurora-pergaminho/60 bg-aurora-azul/20 px-2 py-1 rounded">
                  #{hymn.numero}
                </span>
              </div>
              
              <p className="text-aurora-pergaminho/80 font-alice mb-4 line-clamp-3">
                {hymn.invocacao}
              </p>

              <div className="flex items-center justify-between text-sm text-aurora-pergaminho/60">
                <span>{hymn.correspondencias.dia}</span>
                <span>{hymn.correspondencias.hora}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHymns.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-aurora-dourado/40 mx-auto mb-4" />
            <p className="text-aurora-pergaminho/60 font-alice text-lg">
              Nenhum hino encontrado
            </p>
          </div>
        )}

        {/* Modal de Hino Detalhado */}
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
                className="bg-aurora-azul border border-aurora-dourado/30 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-cinzel text-aurora-dourado mb-2">
                      {selectedHymn.titulo}
                    </h2>
                    <span className="text-aurora-pergaminho/60 bg-aurora-vinho/20 px-3 py-1 rounded">
                      Hino #{selectedHymn.numero}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedHymn(null)}
                    className="p-2 hover:bg-aurora-vinho/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-aurora-pergaminho" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Invocação */}
                  <div>
                    <h3 className="text-lg font-cinzel text-aurora-dourado mb-3">
                      Invocação
                    </h3>
                    <p className="text-aurora-pergaminho font-alice italic">
                      "{selectedHymn.invocacao}"
                    </p>
                  </div>

                  {/* Hino Completo */}
                  <div>
                    <h3 className="text-lg font-cinzel text-aurora-dourado mb-3">
                      Hino Completo
                    </h3>
                    <div className="bg-aurora-vinho/20 rounded-lg p-4">
                      <pre className="text-aurora-pergaminho font-alice whitespace-pre-wrap">
                        {selectedHymn.hino}
                      </pre>
                    </div>
                  </div>

                  {/* Pedido */}
                  <div>
                    <h3 className="text-lg font-cinzel text-aurora-dourado mb-3">
                      Pedido Final
                    </h3>
                    <p className="text-aurora-pergaminho font-alice italic">
                      "{selectedHymn.pedido}"
                    </p>
                  </div>

                  {/* Correspondências */}
                  <div>
                    <h3 className="text-lg font-cinzel text-aurora-dourado mb-3">
                      Correspondências Mágicas
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-aurora-vinho/20 rounded-lg p-3">
                        <span className="text-aurora-dourado font-alice font-semibold">Dia:</span>
                        <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.dia}</p>
                      </div>
                      <div className="bg-aurora-vinho/20 rounded-lg p-3">
                        <span className="text-aurora-dourado font-alice font-semibold">Hora:</span>
                        <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.hora}</p>
                      </div>
                      <div className="bg-aurora-vinho/20 rounded-lg p-3">
                        <span className="text-aurora-dourado font-alice font-semibold">Incenso:</span>
                        <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.incenso}</p>
                      </div>
                      <div className="bg-aurora-vinho/20 rounded-lg p-3">
                        <span className="text-aurora-dourado font-alice font-semibold">Metal:</span>
                        <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.metal}</p>
                      </div>
                      <div className="bg-aurora-vinho/20 rounded-lg p-3">
                        <span className="text-aurora-dourado font-alice font-semibold">Pedra:</span>
                        <p className="text-aurora-pergaminho">{selectedHymn.correspondencias.pedra}</p>
                      </div>
                      <div className="bg-aurora-vinho/20 rounded-lg p-3 flex items-center">
                        <span className="text-aurora-dourado font-alice font-semibold mr-2">Cor:</span>
                        <div 
                          className="w-6 h-6 rounded-full border border-aurora-dourado/30"
                          style={{ backgroundColor: selectedHymn.correspondencias.cor }}
                        />
                      </div>
                    </div>
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


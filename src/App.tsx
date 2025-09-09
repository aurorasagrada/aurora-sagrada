import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, Sparkles, Settings, Sun, Moon } from 'lucide-react';

// Componentes principais
import RitualPage from './pages/RitualPage';
import CalendarioPage from './pages/CalendarioPage';
import EstudoPage from './pages/EstudoPage';
import { OrphicHymns } from './components/OrphicHymns';
import ZodiacalMagic from './components/ZodiacalMagic';

type AppMode = 'ritual' | 'calendario' | 'estudo' | 'hinos' | 'zodiacal';

interface TabConfig {
  id: AppMode;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: 'ritual',
    name: 'Ritual',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'O que fazer agora'
  },
  {
    id: 'calendario',
    name: 'Calendário',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Planejar o futuro'
  },
  {
    id: 'estudo',
    name: 'Estudo',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Conhecimento profundo'
  },
  {
    id: 'hinos',
    name: 'Hinos',
    icon: <Sun className="w-5 h-5" />,
    description: 'Hinos Órficos'
  },
  {
    id: 'zodiacal',
    name: 'Zodiacal',
    icon: <Moon className="w-5 h-5" />,
    description: 'Magia Zodiacal'
  }
];

function App() {
  const [activeMode, setActiveMode] = useState<AppMode>('ritual');
  const [parchmentMode, setParchmentMode] = useState(false);
  const [hemisphere, setHemisphere] = useState<'norte' | 'sul'>('sul');
  const [density, setDensity] = useState<'compacta' | 'confortavel'>('confortavel');

  const renderActivePage = () => {
    switch (activeMode) {
      case 'ritual':
        return <RitualPage density={density} />;
      case 'calendario':
        return <CalendarioPage hemisphere={hemisphere} />;
      case 'estudo':
        return <EstudoPage />;
      case 'hinos':
        return <OrphicHymns />;
      case 'zodiacal':
        return <ZodiacalMagic />;
      default:
        return <RitualPage density={density} />;
    }
  };

  return (
    <div className={`min-h-screen aurora-starfield ${parchmentMode ? 'parchment-mode' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#661D48]/80 border-b border-[#DAA520]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DAA520] to-[#B2D1B1] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#0B1836]" />
              </div>
              <h1 className="aurora-title text-xl">Aurora Sagrada</h1>
            </motion.div>

            {/* Navigation Tabs */}
            <nav className="flex items-center space-x-1 bg-[#0B1836]/50 rounded-xl p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMode(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                    ${activeMode === tab.id 
                      ? 'bg-[#DAA520] text-[#0B1836] shadow-lg' 
                      : 'text-[#F2EAFF] hover:bg-[#661D48]/50'
                    }
                  `}
                  title={tab.description}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Hemisphere Toggle */}
              <button
                onClick={() => setHemisphere(hemisphere === 'norte' ? 'sul' : 'norte')}
                className="aurora-btn p-2"
                title={`Hemisfério ${hemisphere === 'norte' ? 'Norte' : 'Sul'}`}
              >
                {hemisphere === 'norte' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Parchment Mode Toggle */}
              <button
                onClick={() => setParchmentMode(!parchmentMode)}
                className={`
                  p-2 rounded-lg transition-all duration-200
                  ${parchmentMode 
                    ? 'bg-[#F2EAFF] text-[#661D48]' 
                    : 'bg-[#661D48]/50 text-[#F2EAFF] hover:bg-[#661D48]'
                  }
                `}
                title="Modo Pergaminho"
              >
                <BookOpen className="w-4 h-4" />
              </button>

              {/* Settings */}
              <button
                onClick={() => setDensity(density === 'compacta' ? 'confortavel' : 'compacta')}
                className="aurora-btn p-2"
                title={`Densidade ${density}`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="aurora-divider mb-6"></div>
          <div className="text-center">
            <p className="aurora-text-muted text-sm">
              Aurora Sagrada © 2024 • Guia Astromágico em Tempo Real
            </p>
            <p className="aurora-text-muted text-xs mt-2">
              Hemisfério {hemisphere === 'norte' ? 'Norte' : 'Sul'} • 
              Modo {parchmentMode ? 'Pergaminho' : 'Noturno'} • 
              Densidade {density}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


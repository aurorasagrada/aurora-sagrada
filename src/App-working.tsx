import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, Sparkles, Settings, Sun, Moon } from 'lucide-react';

type AppMode = 'ritual' | 'calendario' | 'estudo' | 'hinos' | 'zodiacal';

interface TabConfig {
  id: AppMode;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const tabs: TabConfig[] = [
  { id: 'ritual', label: 'Ritual', icon: <Sparkles size={16} />, color: 'bg-yellow-600' },
  { id: 'calendario', label: 'Calendário', icon: <Calendar size={16} />, color: 'bg-blue-600' },
  { id: 'estudo', label: 'Estudo', icon: <BookOpen size={16} />, color: 'bg-purple-600' },
  { id: 'hinos', label: 'Hinos', icon: <Sun size={16} />, color: 'bg-green-600' },
  { id: 'zodiacal', label: 'Zodiacal', icon: <Moon size={16} />, color: 'bg-cyan-600' }
];

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AppMode>('ritual');
  const [hemisphere, setHemisphere] = useState<'norte' | 'sul'>('sul');
  const [parchmentMode, setParchmentMode] = useState(false);
  const [essentialMode, setEssentialMode] = useState(false);

  const renderActivePage = () => {
    switch (activeMode) {
      case 'ritual':
        return <RitualPage />;
      case 'calendario':
        return <CalendarioPage />;
      case 'estudo':
        return <EstudoPage />;
      case 'hinos':
        return <HinosPage />;
      case 'zodiacal':
        return <ZodiacalPage />;
      default:
        return <RitualPage />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      parchmentMode 
        ? 'bg-gradient-to-br from-amber-50 to-orange-100 text-wine-800' 
        : 'bg-gradient-to-br from-wine-900 via-night-900 to-wine-800 text-parchment-100'
    }`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-wine-900/80 border-b border-gold-500/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-gold-400 text-2xl">🌙</div>
              <h1 className="text-xl font-cinzel font-bold text-gold-400">
                AURORA SAGRADA
              </h1>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMode(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    activeMode === tab.id
                      ? `${tab.color} text-white shadow-lg`
                      : 'text-parchment-300 hover:bg-wine-800/50'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setHemisphere(hemisphere === 'norte' ? 'sul' : 'norte')}
                className="p-2 rounded-lg bg-wine-800/50 text-parchment-300 hover:bg-wine-700/50 transition-colors"
                title={`Hemisfério ${hemisphere === 'norte' ? 'Norte' : 'Sul'}`}
              >
                🌍
              </button>
              <button
                onClick={() => setParchmentMode(!parchmentMode)}
                className="p-2 rounded-lg bg-wine-800/50 text-parchment-300 hover:bg-wine-700/50 transition-colors"
                title="Modo Pergaminho"
              >
                📜
              </button>
              <button
                onClick={() => setEssentialMode(!essentialMode)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  essentialMode
                    ? 'bg-gold-600 text-wine-900'
                    : 'bg-wine-800/50 text-parchment-300 hover:bg-wine-700/50'
                }`}
              >
                Só o Essencial
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
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
    </div>
  );
};

// Componentes de página simplificados
const RitualPage: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">
        RITUAL • AGORA
      </h2>
      <p className="text-parchment-300">Dashboard mágico em tempo real</p>
    </div>

    {/* Seção Agora */}
    <div className="bg-wine-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20">
      <h3 className="text-xl font-cinzel text-gold-400 mb-4">AGORA</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Sun className="text-yellow-400" size={24} />
            <div>
              <p className="text-yellow-400 font-semibold">Sol</p>
              <p className="text-parchment-200">18° Virgem</p>
              <p className="text-sm text-parchment-400">Dignidade</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Moon className="text-blue-300" size={24} />
            <div>
              <p className="text-blue-300 font-semibold">Lua</p>
              <p className="text-parchment-200">23° Peixes</p>
              <p className="text-sm text-parchment-400">Crescente 66%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-parchment-300">
          <span className="text-purple-400">Mansão Lunar:</span> Al-Sharatain
        </p>
        <p className="text-parchment-300">
          <span className="text-green-400">Status:</span> Nenhum planeta retrógrado
        </p>
      </div>
    </div>

    {/* Eleições Mágicas */}
    <div className="bg-wine-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20">
      <h3 className="text-xl font-cinzel text-gold-400 mb-4">ELEIÇÕES MÁGICAS</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { tema: 'Amor', score: 75, status: 'Favorável', color: 'bg-pink-600' },
          { tema: 'Trabalho', score: 60, status: 'Neutro', color: 'bg-orange-600' },
          { tema: 'Beleza', score: 85, status: 'Excelente', color: 'bg-purple-600' },
          { tema: 'Prosperidade', score: 45, status: 'Desfavorável', color: 'bg-green-600' },
          { tema: 'Justiça', score: 70, status: 'Favorável', color: 'bg-blue-600' },
          { tema: 'Contato Espiritual', score: 90, status: 'Excelente', color: 'bg-indigo-600' }
        ].map((eleicao) => (
          <div key={eleicao.tema} className="bg-wine-700/30 rounded-xl p-4">
            <div className={`w-full h-2 rounded-full bg-wine-600/30 mb-3`}>
              <div 
                className={`h-full rounded-full ${eleicao.color}`}
                style={{ width: `${eleicao.score}%` }}
              />
            </div>
            <h4 className="font-semibold text-parchment-100">{eleicao.tema}</h4>
            <p className="text-sm text-parchment-300">{eleicao.status}</p>
            <p className="text-xs text-parchment-400">{eleicao.score}%</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CalendarioPage: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">
        CALENDÁRIO MÁGICO
      </h2>
      <p className="text-parchment-300">Eleições astrológicas por tema</p>
    </div>

    <div className="bg-wine-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20">
      <div className="text-center text-parchment-200">
        <p className="text-lg">🗓️ Calendário Mágico em Desenvolvimento</p>
        <p className="mt-2">Sistema completo de eleições por tema será implementado aqui</p>
      </div>
    </div>
  </div>
);

const EstudoPage: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">
        ESTUDO
      </h2>
      <p className="text-parchment-300">Base de conhecimento astrológico</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { nome: 'Glossário', itens: 127, cor: 'bg-blue-600', icone: '📚' },
        { nome: 'Mansões Lunares', itens: 28, cor: 'bg-purple-600', icone: '🌙' },
        { nome: 'Dignidades Planetárias', itens: 84, cor: 'bg-yellow-600', icone: '☉' },
        { nome: 'Estrelas Fixas', itens: 50, cor: 'bg-indigo-600', icone: '⭐' },
        { nome: 'Asteroides', itens: 15, cor: 'bg-green-600', icone: '☄️' },
        { nome: 'Alquimia', itens: 21, cor: 'bg-red-600', icone: '⚗️' },
        { nome: 'Correspondências', itens: 365, cor: 'bg-pink-600', icone: '🎨' },
        { nome: 'Roda do Ano', itens: 8, cor: 'bg-orange-600', icone: '🗓️' }
      ].map((secao) => (
        <div key={secao.nome} className="bg-wine-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20">
          <div className="text-center">
            <div className="text-3xl mb-3">{secao.icone}</div>
            <h3 className="font-cinzel font-bold text-parchment-100 mb-2">{secao.nome}</h3>
            <p className="text-parchment-300 mb-4">{secao.itens} itens</p>
            <button className={`px-4 py-2 rounded-lg ${secao.cor} text-white font-medium hover:opacity-90 transition-opacity`}>
              Explorar
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HinosPage: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">
        HINOS ÓRFICOS
      </h2>
      <p className="text-parchment-300">Invocações planetárias e elementais</p>
    </div>

    <div className="bg-wine-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20">
      <div className="text-center text-parchment-200">
        <p className="text-lg">🎵 Hinos Órficos em Desenvolvimento</p>
        <p className="mt-2">11 hinos planetários e elementais serão disponibilizados aqui</p>
      </div>
    </div>
  </div>
);

const ZodiacalPage: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">
        MAGIA ZODIACAL
      </h2>
      <p className="text-parchment-300">Decanos, faces, termos e partes árabes</p>
    </div>

    <div className="bg-wine-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20">
      <div className="text-center text-parchment-200">
        <p className="text-lg">♈ Magia Zodiacal em Desenvolvimento</p>
        <p className="mt-2">Sistema completo de decanos, faces e termos egípcios será implementado aqui</p>
      </div>
    </div>
  </div>
);

export default App;


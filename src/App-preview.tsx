import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Star, Calendar, BookOpen, Music, 
  Compass, Settings, Globe, Eye, Palette 
} from 'lucide-react';

type AppMode = 'ritual' | 'calendario' | 'estudo' | 'hinos' | 'zodiacal';

const AppPreview: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AppMode>('ritual');
  const [hemisphere, setHemisphere] = useState<'norte' | 'sul'>('sul');
  const [parchmentMode, setParchmentMode] = useState(false);
  const [density, setDensity] = useState<'compacta' | 'confortavel'>('confortavel');
  const [essentialMode, setEssentialMode] = useState(false);

  const modes = [
    { id: 'ritual' as AppMode, label: 'Ritual', icon: Star },
    { id: 'calendario' as AppMode, label: 'Calendário', icon: Calendar },
    { id: 'estudo' as AppMode, label: 'Estudo', icon: BookOpen },
    { id: 'hinos' as AppMode, label: 'Hinos', icon: Music },
    { id: 'zodiacal' as AppMode, label: 'Zodiacal', icon: Compass },
  ];

  const renderRitualPage = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel text-aurora-gold mb-2">
          RITUAL • AGORA
        </h2>
        <div className="text-aurora-parchment/70 text-sm">
          <span className="mr-4">🕐 12:06</span>
          <span>Hemisfério {hemisphere === 'sul' ? 'Sul' : 'Norte'}</span>
        </div>
      </div>

      {/* NowCard */}
      <div className="bg-aurora-wine/30 backdrop-blur-sm rounded-2xl p-6 border border-aurora-gold/20">
        <h3 className="text-xl font-cinzel text-aurora-gold mb-4 text-center">AGORA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-aurora-wine/40 rounded-xl p-4 text-center">
            <Sun className="text-aurora-gold mx-auto mb-2" size={32} />
            <h4 className="text-aurora-gold font-medium">Sol</h4>
            <p className="text-aurora-parchment">18° Virgem</p>
            <p className="text-aurora-parchment/70 text-sm">Dignidade</p>
          </div>
          <div className="bg-aurora-night/40 rounded-xl p-4 text-center">
            <Moon className="text-aurora-sage mx-auto mb-2" size={32} />
            <h4 className="text-aurora-sage font-medium">Lua</h4>
            <p className="text-aurora-parchment">23° Peixes</p>
            <p className="text-aurora-parchment/70 text-sm">Crescente (66%)</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-aurora-parchment/80 text-sm">
            <span className="text-aurora-gold">Mansão Lunar:</span> Al-Sharatain
          </p>
          <p className="text-aurora-parchment/80 text-sm">
            <span className="text-aurora-gold">Fase:</span> Crescente (66%)
          </p>
          <p className="text-aurora-parchment/70 text-sm mt-2">
            📈 Nenhum planeta retrógrado
          </p>
        </div>
      </div>

      {/* ElectionChips */}
      <div className="bg-aurora-wine/20 backdrop-blur-sm rounded-2xl p-6 border border-aurora-gold/20">
        <h3 className="text-xl font-cinzel text-aurora-gold mb-4 text-center">
          ELEIÇÕES MÁGICAS
        </h3>
        <p className="text-aurora-parchment/70 text-sm text-center mb-6">
          Favorabilidade atual para cada tema
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { tema: 'Amor', score: 75, status: 'Favorável', cor: 'text-pink-400', bg: 'bg-pink-500/20' },
            { tema: 'Trabalho', score: 60, status: 'Neutro', cor: 'text-orange-400', bg: 'bg-orange-500/20' },
            { tema: 'Beleza', score: 85, status: 'Excelente', cor: 'text-purple-400', bg: 'bg-purple-500/20' },
            { tema: 'Prosperidade', score: 45, status: 'Desfavorável', cor: 'text-green-400', bg: 'bg-green-500/20' },
            { tema: 'Justiça', score: 70, status: 'Favorável', cor: 'text-blue-400', bg: 'bg-blue-500/20' },
            { tema: 'Contato Espiritual', score: 90, status: 'Excelente', cor: 'text-indigo-400', bg: 'bg-indigo-500/20' }
          ].map((item, index) => (
            <div key={index} className={`${item.bg} rounded-xl p-4 border border-aurora-gold/10`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium ${item.cor}`}>{item.tema}</h4>
                <span className="text-aurora-parchment/70 text-sm">{item.score}%</span>
              </div>
              <p className="text-aurora-parchment/80 text-sm">{item.status}</p>
              <div className="mt-2 bg-aurora-night/30 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${item.cor.replace('text-', 'bg-')}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TransitBoard */}
      <div className="bg-aurora-wine/20 backdrop-blur-sm rounded-2xl p-6 border border-aurora-gold/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-cinzel text-aurora-gold">TRÂNSITOS ATUAIS</h3>
          <span className="text-aurora-parchment/70 text-sm">5 de 8</span>
        </div>
        
        <div className="space-y-3">
          {[
            { aspecto: 'Sol ∆ Lua', tipo: 'Trígono', orbe: '2.4°', status: 'Aplicativo', cor: 'text-green-400' },
            { aspecto: 'Vênus ☌ Mercúrio', tipo: 'Conjunção', orbe: '1.2°', status: 'Exato', cor: 'text-yellow-400' },
            { aspecto: 'Marte □ Júpiter', tipo: 'Quadratura', orbe: '3.8°', status: 'Separativo', cor: 'text-red-400' },
            { aspecto: 'Lua ⚹ Saturno', tipo: 'Sextil', orbe: '0.9°', status: 'Aplicativo', cor: 'text-blue-400' },
            { aspecto: 'Sol ☍ Netuno', tipo: 'Oposição', orbe: '5.1°', status: 'Separativo', cor: 'text-purple-400' }
          ].map((transito, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-aurora-night/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${transito.cor.replace('text-', 'bg-')}`} />
                <span className="text-aurora-parchment font-medium">{transito.aspecto}</span>
              </div>
              <div className="text-right">
                <p className="text-aurora-parchment/80 text-sm">{transito.tipo}</p>
                <p className="text-aurora-parchment/60 text-xs">
                  Orbe: {transito.orbe} • {transito.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 text-aurora-gold hover:text-aurora-sage transition-colors text-sm">
          Ver todos os trânsitos
        </button>
      </div>
    </div>
  );

  const renderCalendarioPage = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel text-aurora-gold mb-2">
          CALENDÁRIO MÁGICO
        </h2>
        <p className="text-aurora-parchment/70">
          Navegue pelas eleições mágicas e trânsitos mensais
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-aurora-wine/20 backdrop-blur-sm rounded-2xl p-6 border border-aurora-gold/20">
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { tema: 'Amor', cor: 'bg-pink-500/20 text-pink-400', count: 10 },
            { tema: 'Trabalho', cor: 'bg-orange-500/20 text-orange-400', count: 11 },
            { tema: 'Beleza', cor: 'bg-purple-500/20 text-purple-400', count: 8 },
            { tema: 'Prosperidade', cor: 'bg-green-500/20 text-green-400', count: 7 },
            { tema: 'Justiça', cor: 'bg-blue-500/20 text-blue-400', count: 9 },
            { tema: 'Contato Espiritual', cor: 'bg-indigo-500/20 text-indigo-400', count: 12 }
          ].map((filtro, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${filtro.cor} border border-current/20 hover:bg-opacity-30 transition-all`}
            >
              {filtro.tema} {filtro.count}
            </button>
          ))}
        </div>
      </div>

      {/* Calendário */}
      <div className="bg-aurora-wine/30 backdrop-blur-sm rounded-2xl p-6 border border-aurora-gold/20">
        <div className="flex items-center justify-between mb-6">
          <button className="text-aurora-gold hover:text-aurora-sage">‹</button>
          <h3 className="text-xl font-cinzel text-aurora-gold">SETEMBRO 2025</h3>
          <button className="text-aurora-gold hover:text-aurora-sage">›</button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
            <div key={dia} className="text-center text-aurora-parchment/70 text-sm py-2">
              {dia}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(dia => (
            <button
              key={dia}
              className={`aspect-square rounded-lg border border-aurora-gold/20 hover:border-aurora-gold/40 transition-all text-sm ${
                dia === 9 ? 'bg-aurora-gold/20 text-aurora-gold' : 
                dia % 7 === 0 ? 'bg-green-500/20 text-green-400' :
                dia % 5 === 0 ? 'bg-pink-500/20 text-pink-400' :
                'bg-aurora-wine/20 text-aurora-parchment hover:bg-aurora-wine/30'
              }`}
            >
              {dia}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500/20 border border-green-400/30" />
            <span className="text-aurora-parchment/70">Excelente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-pink-500/20 border border-pink-400/30" />
            <span className="text-aurora-parchment/70">Bom</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-aurora-wine/20 border border-aurora-gold/30" />
            <span className="text-aurora-parchment/70">Neutro</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEstudoPage = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel text-aurora-gold mb-2">
          ESTUDO
        </h2>
        <p className="text-aurora-parchment/70">
          Explore o conhecimento astrológico e mágico
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { titulo: 'Glossário', items: 127, cor: 'text-blue-400', bg: 'bg-blue-500/20', icon: BookOpen },
          { titulo: 'Mansões Lunares', items: 28, cor: 'text-purple-400', bg: 'bg-purple-500/20', icon: Moon },
          { titulo: 'Dignidades Planetárias', items: 84, cor: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Sun },
          { titulo: 'Estrelas Fixas', items: 50, cor: 'text-indigo-400', bg: 'bg-indigo-500/20', icon: Star },
          { titulo: 'Asteroides', items: 15, cor: 'text-green-400', bg: 'bg-green-500/20', icon: Compass },
          { titulo: 'Alquimia', items: 21, cor: 'text-red-400', bg: 'bg-red-500/20', icon: Settings },
          { titulo: 'Correspondências', items: 365, cor: 'text-pink-400', bg: 'bg-pink-500/20', icon: Palette },
          { titulo: 'Roda do Ano', items: 8, cor: 'text-orange-400', bg: 'bg-orange-500/20', icon: Calendar }
        ].map((secao, index) => (
          <div key={index} className={`${secao.bg} rounded-2xl p-6 border border-aurora-gold/20 hover:border-aurora-gold/40 transition-all cursor-pointer group`}>
            <div className="text-center">
              <secao.icon className={`${secao.cor} mx-auto mb-4 group-hover:scale-110 transition-transform`} size={32} />
              <h3 className="text-lg font-cinzel text-aurora-gold mb-2">{secao.titulo}</h3>
              <p className="text-aurora-parchment/70 text-sm mb-4">
                {secao.items} itens disponíveis
              </p>
              <button className={`${secao.cor} text-sm hover:opacity-80 transition-opacity`}>
                Explorar →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHinosPage = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel text-aurora-gold mb-2">
          HINOS ÓRFICOS
        </h2>
        <p className="text-aurora-parchment/70">
          Invocações planetárias e elementais da tradição órfica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { nome: 'Sol (Hélios)', elemento: 'Fogo', dia: 'Domingo', cor: 'text-yellow-400', bg: 'bg-yellow-500/20' },
          { nome: 'Lua (Selene)', elemento: 'Água', dia: 'Segunda', cor: 'text-blue-400', bg: 'bg-blue-500/20' },
          { nome: 'Mercúrio (Hermes)', elemento: 'Ar', dia: 'Quarta', cor: 'text-orange-400', bg: 'bg-orange-500/20' },
          { nome: 'Vênus (Afrodite)', elemento: 'Água', dia: 'Sexta', cor: 'text-pink-400', bg: 'bg-pink-500/20' },
          { nome: 'Marte (Ares)', elemento: 'Fogo', dia: 'Terça', cor: 'text-red-400', bg: 'bg-red-500/20' },
          { nome: 'Júpiter (Zeus)', elemento: 'Ar', dia: 'Quinta', cor: 'text-purple-400', bg: 'bg-purple-500/20' }
        ].map((hino, index) => (
          <div key={index} className={`${hino.bg} rounded-2xl p-6 border border-aurora-gold/20 hover:border-aurora-gold/40 transition-all cursor-pointer group`}>
            <div className="text-center">
              <Star className={`${hino.cor} mx-auto mb-4 group-hover:scale-110 transition-transform`} size={32} />
              <h3 className="text-lg font-cinzel text-aurora-gold mb-2">{hino.nome}</h3>
              <div className="space-y-1 text-sm text-aurora-parchment/70">
                <p>Elemento: {hino.elemento}</p>
                <p>Dia: {hino.dia}</p>
              </div>
              <button className={`${hino.cor} text-sm mt-4 hover:opacity-80 transition-opacity`}>
                Ver Hino →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderZodiacalPage = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel text-aurora-gold mb-2">
          MAGIA ZODIACAL
        </h2>
        <p className="text-aurora-parchment/70">
          Sistema completo com decanos, faces, termos egípcios e partes árabes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { signo: 'Áries', simbolo: '♈', elemento: 'Fogo', modalidade: 'Cardinal', regente: 'Marte', cor: 'text-red-400', bg: 'bg-red-500/20' },
          { signo: 'Touro', simbolo: '♉', elemento: 'Terra', modalidade: 'Fixo', regente: 'Vênus', cor: 'text-green-400', bg: 'bg-green-500/20' }
        ].map((signo, index) => (
          <div key={index} className={`${signo.bg} rounded-2xl p-6 border border-aurora-gold/20 hover:border-aurora-gold/40 transition-all cursor-pointer group`}>
            <div className="text-center">
              <div className={`text-4xl ${signo.cor} mb-4 group-hover:scale-110 transition-transform`}>
                {signo.simbolo}
              </div>
              <h3 className="text-lg font-cinzel text-aurora-gold mb-2">{signo.signo}</h3>
              <div className="space-y-1 text-sm text-aurora-parchment/70">
                <p>{signo.elemento} • {signo.modalidade}</p>
                <p>Regente: {signo.regente}</p>
              </div>
              <button className={`${signo.cor} text-sm mt-4 hover:opacity-80 transition-opacity`}>
                Ver Decanos →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivePage = () => {
    switch (activeMode) {
      case 'ritual': return renderRitualPage();
      case 'calendario': return renderCalendarioPage();
      case 'estudo': return renderEstudoPage();
      case 'hinos': return renderHinosPage();
      case 'zodiacal': return renderZodiacalPage();
      default: return renderRitualPage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aurora-wine via-aurora-night to-aurora-wine">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-aurora-wine/90 backdrop-blur-md border-b border-aurora-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌙</div>
              <h1 className="text-xl font-cinzel text-aurora-gold">
                AURORA SAGRADA
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex gap-2">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeMode === mode.id
                      ? 'bg-aurora-gold text-aurora-night'
                      : 'text-aurora-parchment hover:bg-aurora-wine/50'
                  }`}
                >
                  <mode.icon size={16} />
                  {mode.label}
                </button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHemisphere(hemisphere === 'norte' ? 'sul' : 'norte')}
                className="p-2 rounded-lg bg-aurora-night/50 text-aurora-parchment hover:bg-aurora-night/70 transition-colors"
                title={`Hemisfério ${hemisphere === 'norte' ? 'Norte' : 'Sul'}`}
              >
                <Globe size={16} />
              </button>
              
              <button
                onClick={() => setParchmentMode(!parchmentMode)}
                className="p-2 rounded-lg bg-aurora-night/50 text-aurora-parchment hover:bg-aurora-night/70 transition-colors"
                title="Modo Pergaminho"
              >
                <Eye size={16} />
              </button>
              
              <button
                onClick={() => setEssentialMode(!essentialMode)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  essentialMode
                    ? 'bg-aurora-sage/20 text-aurora-sage'
                    : 'bg-aurora-night/50 text-aurora-parchment hover:bg-aurora-night/70'
                }`}
              >
                Só o Essencial
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
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

export default AppPreview;


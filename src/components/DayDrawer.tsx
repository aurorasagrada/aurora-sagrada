import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Moon, 
  Star, 
  Eye, 
  Gem, 
  Leaf, 
  Flame, 
  Droplets, 
  Wind,
  Crown,
  Heart,
  Briefcase,
  Sparkles,
  DollarSign,
  Scale,
  Zap
} from 'lucide-react';

interface LunarMansion {
  numero: number;
  nome: string;
  nomeArabico: string;
  espiritoToscano: string;
  natureza: string;
  regente: string;
  significado: string;
  usosMagicos: string[];
  favoravel: string[];
  desfavoravel: string[];
  correspondencias: {
    ervas: string[];
    pedras: string[];
    cores: string[];
    incensos: string[];
    metais: string[];
    animais: string[];
    deusas: string[];
  };
  simbolo: string;
  selo: string;
  invocacao: string;
  hinoOrfico?: string;
  operacaoAlquimica: string;
  parteCorpo: string;
  elementoAssociado: string;
}

interface DayData {
  date: Date;
  score: Record<string, number>;
  highlights: string[];
  warnings: string[];
  lunarPhase: string;
  lunarMansion: number;
  lunarMansionData?: LunarMansion;
  aspects: string[];
  retrogrades: string[];
  voidOfCourse: boolean;
  eclipse?: boolean;
}

interface DayDrawerProps {
  dayData: DayData;
  isOpen: boolean;
  onClose: () => void;
}

const ELECTION_THEMES = [
  { id: 'amor', name: 'Amor', icon: Heart, color: '#FF69B4' },
  { id: 'trabalho', name: 'Trabalho', icon: Briefcase, color: '#FF8C00' },
  { id: 'beleza', name: 'Beleza', icon: Sparkles, color: '#FFB6C1' },
  { id: 'prosperidade', name: 'Prosperidade', icon: DollarSign, color: '#32CD32' },
  { id: 'justica', name: 'Justiça', icon: Scale, color: '#4169E1' },
  { id: 'contato', name: 'Contato Espiritual', icon: Zap, color: '#9370DB' }
];

const LUNAR_PHASES = {
  'nova': { name: 'Nova', symbol: '🌑', color: '#2F2F2F' },
  'crescente': { name: 'Crescente', symbol: '🌒', color: '#4A5568' },
  'cheia': { name: 'Cheia', symbol: '🌕', color: '#F7FAFC' },
  'minguante': { name: 'Minguante', symbol: '🌘', color: '#718096' }
};

const ELEMENT_ICONS = {
  'Fogo': Flame,
  'Água': Droplets,
  'Ar': Wind,
  'Terra': Gem
};

const DayDrawer: React.FC<DayDrawerProps> = ({ dayData, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-aurora-dourado';
    if (score >= 60) return 'text-aurora-salvia';
    if (score >= 40) return 'text-aurora-azul';
    return 'text-aurora-vinho';
  };

  const getScoreBackground = (score: number): string => {
    if (score >= 80) return 'bg-aurora-dourado';
    if (score >= 60) return 'bg-aurora-salvia';
    if (score >= 40) return 'bg-aurora-azul';
    return 'bg-aurora-vinho';
  };

  const ElementIcon = dayData.lunarMansionData ? 
    ELEMENT_ICONS[dayData.lunarMansionData.elementoAssociado as keyof typeof ELEMENT_ICONS] || Star : 
    Star;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-aurora-azul/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-aurora-dourado/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-aurora-vinho/20 p-6 border-b border-aurora-dourado/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-cinzel text-aurora-dourado">
                {dayData.date.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {LUNAR_PHASES[dayData.lunarPhase as keyof typeof LUNAR_PHASES]?.symbol}
                  </span>
                  <span className="text-sm text-aurora-pergaminho/80">
                    {LUNAR_PHASES[dayData.lunarPhase as keyof typeof LUNAR_PHASES]?.name}
                  </span>
                </div>
                {dayData.voidOfCourse && (
                  <div className="flex items-center space-x-1 text-aurora-dourado/60">
                    <span>⚬</span>
                    <span className="text-xs">Lua Vazia de Curso</span>
                  </div>
                )}
                {dayData.eclipse && (
                  <div className="flex items-center space-x-1 text-aurora-vinho">
                    <span>🌑</span>
                    <span className="text-xs">Eclipse</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-aurora-vinho/20 hover:bg-aurora-vinho/30 transition-colors"
            >
              <X className="w-6 h-6 text-aurora-dourado" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-8">
            
            {/* Mansão Lunar */}
            {dayData.lunarMansionData && (
              <div className="space-y-6">
                <div className="bg-aurora-vinho/20 rounded-xl p-6 border border-aurora-dourado/20">
                  <div className="flex items-start space-x-4">
                    <div className="bg-aurora-dourado/20 p-3 rounded-lg">
                      <Moon className="w-8 h-8 text-aurora-dourado" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-cinzel text-aurora-dourado">
                          {dayData.lunarMansionData.nome}
                        </h3>
                        <span className="text-sm text-aurora-pergaminho/60">
                          ({dayData.lunarMansionData.nomeArabico})
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-aurora-salvia" />
                          <span className="text-sm text-aurora-pergaminho">
                            Espírito: <strong>{dayData.lunarMansionData.espiritoToscano}</strong>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ElementIcon className="w-4 h-4 text-aurora-salvia" />
                          <span className="text-sm text-aurora-pergaminho">
                            {dayData.lunarMansionData.natureza} • {dayData.lunarMansionData.elementoAssociado}
                          </span>
                        </div>
                      </div>
                      <p className="text-aurora-pergaminho/90 mb-4">
                        {dayData.lunarMansionData.significado}
                      </p>
                      
                      {/* Regente e Operação Alquímica */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-aurora-dourado">Regente:</span>
                          <p className="text-aurora-pergaminho">{dayData.lunarMansionData.regente}</p>
                        </div>
                        <div>
                          <span className="text-sm text-aurora-dourado">Operação Alquímica:</span>
                          <p className="text-aurora-pergaminho">{dayData.lunarMansionData.operacaoAlquimica}</p>
                        </div>
                      </div>

                      {/* Usos Mágicos */}
                      <div className="mb-4">
                        <h4 className="text-sm font-cinzel text-aurora-dourado mb-2">Usos Mágicos</h4>
                        <div className="flex flex-wrap gap-2">
                          {dayData.lunarMansionData.usosMagicos.map((uso, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-aurora-dourado/20 text-aurora-pergaminho text-sm rounded-lg border border-aurora-dourado/30"
                            >
                              {uso}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Favorável vs Desfavorável */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-cinzel text-aurora-salvia mb-3 flex items-center space-x-2">
                            <span>✓</span>
                            <span>Favorável para</span>
                          </h4>
                          <ul className="space-y-2">
                            {dayData.lunarMansionData.favoravel.map((item, index) => (
                              <li key={index} className="text-sm text-aurora-pergaminho/90 flex items-start space-x-2">
                                <span className="text-aurora-salvia mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-cinzel text-aurora-vinho mb-3 flex items-center space-x-2">
                            <span>✗</span>
                            <span>Evitar</span>
                          </h4>
                          <ul className="space-y-2">
                            {dayData.lunarMansionData.desfavoravel.map((item, index) => (
                              <li key={index} className="text-sm text-aurora-pergaminho/90 flex items-start space-x-2">
                                <span className="text-aurora-vinho mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Correspondências Detalhadas */}
                <div className="bg-aurora-azul/20 rounded-xl p-6 border border-aurora-dourado/20">
                  <h3 className="text-lg font-cinzel text-aurora-dourado mb-4 flex items-center space-x-2">
                    <Gem className="w-5 h-5" />
                    <span>Correspondências Mágicas</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Ervas */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Leaf className="w-4 h-4 text-aurora-salvia" />
                        <h4 className="text-sm font-cinzel text-aurora-salvia">Ervas</h4>
                      </div>
                      <div className="space-y-1">
                        {dayData.lunarMansionData.correspondencias.ervas.map((erva, index) => (
                          <div key={index} className="text-sm text-aurora-pergaminho/90">
                            {erva}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pedras */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Gem className="w-4 h-4 text-aurora-salvia" />
                        <h4 className="text-sm font-cinzel text-aurora-salvia">Pedras</h4>
                      </div>
                      <div className="space-y-1">
                        {dayData.lunarMansionData.correspondencias.pedras.map((pedra, index) => (
                          <div key={index} className="text-sm text-aurora-pergaminho/90">
                            {pedra}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Incensos */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Flame className="w-4 h-4 text-aurora-salvia" />
                        <h4 className="text-sm font-cinzel text-aurora-salvia">Incensos</h4>
                      </div>
                      <div className="space-y-1">
                        {dayData.lunarMansionData.correspondencias.incensos.map((incenso, index) => (
                          <div key={index} className="text-sm text-aurora-pergaminho/90">
                            {incenso}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Animais */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Eye className="w-4 h-4 text-aurora-salvia" />
                        <h4 className="text-sm font-cinzel text-aurora-salvia">Animais</h4>
                      </div>
                      <div className="space-y-1">
                        {dayData.lunarMansionData.correspondencias.animais.map((animal, index) => (
                          <div key={index} className="text-sm text-aurora-pergaminho/90">
                            {animal}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deusas */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Crown className="w-4 h-4 text-aurora-salvia" />
                        <h4 className="text-sm font-cinzel text-aurora-salvia">Deusas</h4>
                      </div>
                      <div className="space-y-1">
                        {dayData.lunarMansionData.correspondencias.deusas.map((deusa, index) => (
                          <div key={index} className="text-sm text-aurora-pergaminho/90">
                            {deusa}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metais */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Star className="w-4 h-4 text-aurora-salvia" />
                        <h4 className="text-sm font-cinzel text-aurora-salvia">Metais</h4>
                      </div>
                      <div className="space-y-1">
                        {dayData.lunarMansionData.correspondencias.metais.map((metal, index) => (
                          <div key={index} className="text-sm text-aurora-pergaminho/90">
                            {metal}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invocação */}
                {dayData.lunarMansionData.invocacao && (
                  <div className="bg-aurora-vinho/20 rounded-xl p-6 border border-aurora-dourado/20">
                    <h3 className="text-lg font-cinzel text-aurora-dourado mb-4">Invocação do Espírito</h3>
                    <div className="bg-aurora-azul/20 rounded-lg p-4 border-l-4 border-aurora-dourado">
                      <p className="text-aurora-pergaminho italic leading-relaxed">
                        "{dayData.lunarMansionData.invocacao}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Hino Órfico */}
                {dayData.lunarMansionData.hinoOrfico && (
                  <div className="bg-aurora-azul/20 rounded-xl p-6 border border-aurora-dourado/20">
                    <h3 className="text-lg font-cinzel text-aurora-dourado mb-4">Hino Órfico</h3>
                    <div className="bg-aurora-vinho/20 rounded-lg p-4 border-l-4 border-aurora-salvia">
                      <p className="text-aurora-pergaminho italic leading-relaxed">
                        {dayData.lunarMansionData.hinoOrfico}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Eleições do Dia */}
            <div className="space-y-4">
              <h3 className="text-xl font-cinzel text-aurora-dourado">Eleições Mágicas do Dia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ELECTION_THEMES.map(theme => {
                  const IconComponent = theme.icon;
                  const score = dayData.score[theme.id];
                  return (
                    <div
                      key={theme.id}
                      className="bg-aurora-vinho/20 rounded-lg p-4 border border-aurora-dourado/20"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-aurora-dourado/20">
                            <IconComponent className="w-5 h-5 text-aurora-dourado" />
                          </div>
                          <div>
                            <h4 className="font-alice text-aurora-pergaminho">{theme.name}</h4>
                            <p className={`text-sm ${getScoreColor(score)}`}>
                              {score >= 80 ? 'Excelente' :
                               score >= 60 ? 'Favorável' :
                               score >= 40 ? 'Neutro' : 'Desfavorável'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                            {score}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Barra de progresso */}
                      <div className="w-full bg-aurora-azul/30 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getScoreBackground(score)}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Aspectos */}
              <div className="bg-aurora-azul/20 rounded-xl p-4 border border-aurora-dourado/20">
                <h4 className="text-lg font-cinzel text-aurora-dourado mb-3">Aspectos Atuais</h4>
                <div className="space-y-2">
                  {dayData.aspects.map((aspect, index) => (
                    <div key={index} className="text-sm text-aurora-pergaminho/90 flex items-center space-x-2">
                      <Star className="w-3 h-3 text-aurora-salvia" />
                      <span>{aspect}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alertas Especiais */}
              <div className="bg-aurora-vinho/20 rounded-xl p-4 border border-aurora-dourado/20">
                <h4 className="text-lg font-cinzel text-aurora-dourado mb-3">Alertas Especiais</h4>
                <div className="space-y-2">
                  {dayData.voidOfCourse && (
                    <div className="text-sm text-aurora-pergaminho/90 flex items-center space-x-2">
                      <span className="text-aurora-dourado">⚬</span>
                      <span>Lua Vazia de Curso - Evitar decisões importantes</span>
                    </div>
                  )}
                  {dayData.eclipse && (
                    <div className="text-sm text-aurora-vinho flex items-center space-x-2">
                      <span>🌑</span>
                      <span>Eclipse - Desfavorável para magia</span>
                    </div>
                  )}
                  {dayData.retrogrades.length > 0 && (
                    <div className="text-sm text-aurora-pergaminho/90 flex items-center space-x-2">
                      <span className="text-aurora-azul">↺</span>
                      <span>Planetas retrógrados: {dayData.retrogrades.join(', ')}</span>
                    </div>
                  )}
                  {!dayData.voidOfCourse && !dayData.eclipse && dayData.retrogrades.length === 0 && (
                    <div className="text-sm text-aurora-salvia flex items-center space-x-2">
                      <span>✓</span>
                      <span>Dia favorável para trabalhos mágicos</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DayDrawer;


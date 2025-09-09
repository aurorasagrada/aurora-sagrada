import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Briefcase, Sparkles, DollarSign, Scale, Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ElectionChipsProps {
  compact?: boolean;
  showScores?: boolean;
  onThemeClick?: (theme: string) => void;
}

interface ElectionScore {
  theme: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  reason: string;
}

const ELECTION_THEMES = [
  {
    id: 'amor',
    name: 'Amor',
    icon: <Heart className="w-4 h-4" />,
    color: 'bg-red-500/20 border-red-500/30 text-red-300',
    description: 'Relacionamentos, romance, paixão'
  },
  {
    id: 'trabalho',
    name: 'Trabalho',
    icon: <Briefcase className="w-4 h-4" />,
    color: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
    description: 'Carreira, negócios, projetos'
  },
  {
    id: 'beleza',
    name: 'Beleza',
    icon: <Sparkles className="w-4 h-4" />,
    color: 'bg-pink-500/20 border-pink-500/30 text-pink-300',
    description: 'Estética, cuidados, autoestima'
  },
  {
    id: 'prosperidade',
    name: 'Prosperidade',
    icon: <DollarSign className="w-4 h-4" />,
    color: 'bg-green-500/20 border-green-500/30 text-green-300',
    description: 'Finanças, abundância, riqueza'
  },
  {
    id: 'justica',
    name: 'Justiça',
    icon: <Scale className="w-4 h-4" />,
    color: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
    description: 'Legalidade, equilíbrio, verdade'
  },
  {
    id: 'contato',
    name: 'Contato Espiritual',
    icon: <Zap className="w-4 h-4" />,
    color: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
    description: 'Meditação, rituais, conexão'
  }
];

export default function ElectionChips({ compact = false, showScores = true, onThemeClick }: ElectionChipsProps) {
  const [scores, setScores] = useState<ElectionScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      setIsLoading(true);
      
      // Simula carregamento de scores
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const currentScores: ElectionScore[] = ELECTION_THEMES.map(theme => {
        const score = Math.random() * 100;
        const trend = Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable';
        
        return {
          theme: theme.id,
          score,
          trend,
          reason: generateReason(theme.id, score, trend)
        };
      });
      
      setScores(currentScores);
      setIsLoading(false);
    };

    loadScores();
  }, []);

  const generateReason = (theme: string, score: number, trend: string): string => {
    const reasons: Record<string, string[]> = {
      amor: ['Vênus em aspecto harmonioso', 'Lua em signo de água', 'Júpiter favorável ao romance'],
      trabalho: ['Mercúrio direto favorece negócios', 'Sol bem aspectado', 'Saturno em posição estável'],
      beleza: ['Vênus exaltada', 'Lua crescente favorável', 'Aspectos harmoniosos'],
      prosperidade: ['Júpiter em casa financeira', 'Trígono Sol-Júpiter', 'Lua em Touro'],
      justica: ['Libra ascendente', 'Saturno bem aspectado', 'Mercúrio em Virgem'],
      contato: ['Netuno inspirador', 'Lua em Peixes', 'Júpiter espiritual']
    };
    
    const themeReasons = reasons[theme] || ['Influências planetárias favoráveis'];
    return themeReasons[Math.floor(Math.random() * themeReasons.length)];
  };

  const getBestTheme = (): string => {
    if (scores.length === 0) return '';
    const best = scores.reduce((prev, current) => 
      current.score > prev.score ? current : prev
    );
    const theme = ELECTION_THEMES.find(t => t.id === best.theme);
    return theme?.name || '';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-400" />;
      default: return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 70) return 'Favorável';
    if (score >= 40) return 'Neutro';
    return 'Desfavorável';
  };

  if (isLoading) {
    return (
      <div className="aurora-card p-6 animate-pulse">
        <div className="h-6 bg-[#661D48]/30 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-20 bg-[#661D48]/20 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="aurora-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="aurora-title text-lg">Eleições Mágicas</h3>
        <span className="aurora-text-muted text-sm">
          Favorabilidade atual para cada tema
        </span>
      </div>

      {/* Grid Responsivo Corrigido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {ELECTION_THEMES.map((theme, index) => {
          const themeScore = scores.find(s => s.theme === theme.id);
          const score = themeScore?.score || 0;
          const trend = themeScore?.trend || 'stable';
          const reason = themeScore?.reason || '';

          return (
            <motion.button
              key={theme.id}
              className={`
                ${theme.color} relative group
                p-4 rounded-xl border transition-all duration-300
                hover:scale-105 hover:shadow-lg
                flex flex-col items-start text-left
                min-h-[100px] w-full
                backdrop-blur-sm
              `}
              onClick={() => onThemeClick?.(theme.id)}
              title={`${theme.description} - ${reason}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between w-full mb-3">
                <div className="flex items-center space-x-2">
                  {theme.icon}
                  <span className="aurora-title text-sm font-medium">
                    {theme.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                    {Math.round(score)}%
                  </span>
                  {getTrendIcon(trend)}
                </div>
              </div>
              
              {/* Status */}
              <div className="w-full mb-2">
                <div className={`text-xs font-medium mb-1 ${getScoreColor(score)}`}>
                  {getScoreLabel(score)}
                </div>
                <div className="aurora-text-muted text-xs leading-tight">
                  {theme.description}
                </div>
              </div>

              {/* Reason */}
              {!compact && (
                <div className="aurora-text-muted text-xs opacity-75">
                  {reason}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Melhor tema atual */}
      {scores.length > 0 && (
        <div className="pt-4 border-t border-[#DAA520]/20">
          <div className="flex items-center justify-between">
            <span className="aurora-text text-sm">Melhor agora:</span>
            <span className="aurora-title text-sm text-[#DAA520]">
              {getBestTheme()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


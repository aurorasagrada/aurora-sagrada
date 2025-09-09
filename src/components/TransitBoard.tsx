import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Eye, MoreHorizontal, AlertTriangle, CheckCircle } from 'lucide-react';

interface Transit {
  id: string;
  type: 'aspect' | 'retrograde' | 'ingress' | 'eclipse';
  planet1: string;
  planet2?: string;
  aspect?: string;
  sign?: string;
  exact_time: Date;
  orb: number;
  applying: boolean;
  significance: 'high' | 'medium' | 'low';
  description: string;
  effects: string[];
}

interface TransitBoardProps {
  limit?: number;
  compact?: boolean;
  onShowAll?: () => void;
}

const ASPECT_COLORS: Record<string, string> = {
  'conjuncao': 'aurora-aspect-conjuncao',
  'sextil': 'aurora-aspect-sextil',
  'quadratura': 'aurora-aspect-quadratura',
  'trigono': 'aurora-aspect-trigono',
  'oposicao': 'aurora-aspect-oposicao'
};

const ASPECT_SYMBOLS: Record<string, string> = {
  'conjuncao': '☌',
  'sextil': '⚹',
  'quadratura': '□',
  'trigono': '△',
  'oposicao': '☍'
};

export default function TransitBoard({ limit = 5, compact = false, onShowAll }: TransitBoardProps) {
  const [transits, setTransits] = useState<Transit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    const loadTransits = async () => {
      setIsLoading(true);
      
      // Simula carregamento de trânsitos atuais
      const currentTransits: Transit[] = [
        {
          id: '1',
          type: 'aspect',
          planet1: 'Sol',
          planet2: 'Lua',
          aspect: 'trigono',
          exact_time: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas
          orb: 2.5,
          applying: true,
          significance: 'high',
          description: 'Harmonia entre consciência e emoções',
          effects: ['Equilíbrio emocional', 'Clareza mental', 'Boa para decisões']
        },
        {
          id: '2',
          type: 'aspect',
          planet1: 'Vênus',
          planet2: 'Marte',
          aspect: 'sextil',
          exact_time: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 horas
          orb: 1.8,
          applying: true,
          significance: 'medium',
          description: 'Energia criativa e amorosa',
          effects: ['Relacionamentos', 'Criatividade', 'Paixão equilibrada']
        },
        {
          id: '3',
          type: 'retrograde',
          planet1: 'Mercúrio',
          exact_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
          orb: 0,
          applying: false,
          significance: 'high',
          description: 'Mercúrio retrógrado em Gêmeos',
          effects: ['Revisão de comunicação', 'Cuidado com contratos', 'Reflexão']
        },
        {
          id: '4',
          type: 'aspect',
          planet1: 'Júpiter',
          planet2: 'Saturno',
          aspect: 'quadratura',
          exact_time: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 horas
          orb: 3.2,
          applying: true,
          significance: 'medium',
          description: 'Tensão entre expansão e limitação',
          effects: ['Desafios estruturais', 'Crescimento através de obstáculos']
        },
        {
          id: '5',
          type: 'ingress',
          planet1: 'Lua',
          sign: 'Peixes',
          exact_time: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 horas
          orb: 0,
          applying: true,
          significance: 'low',
          description: 'Lua entra em Peixes',
          effects: ['Intuição elevada', 'Sensibilidade', 'Espiritualidade']
        },
        {
          id: '6',
          type: 'aspect',
          planet1: 'Marte',
          planet2: 'Plutão',
          aspect: 'oposicao',
          exact_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
          orb: 4.1,
          applying: true,
          significance: 'high',
          description: 'Intensidade e transformação forçada',
          effects: ['Conflitos intensos', 'Transformação', 'Poder vs força']
        }
      ];
      
      setTransits(currentTransits);
      setIsLoading(false);
    };

    loadTransits();
  }, []);

  const formatTimeUntil = (date: Date): string => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
    const minutes = Math.abs(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    
    if (diff < 0) {
      if (hours === 0) return `${minutes}min atrás`;
      return `${hours}h atrás`;
    } else {
      if (hours === 0) return `em ${minutes}min`;
      return `em ${hours}h`;
    }
  };

  const getSignificanceColor = (significance: string): string => {
    switch (significance) {
      case 'high': return 'text-[#DAA520]';
      case 'medium': return 'text-[#B2D1B1]';
      default: return 'text-[#F2EAFF]';
    }
  };

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'high': return <AlertTriangle className="w-3 h-3" />;
      case 'medium': return <CheckCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const renderTransit = (transit: Transit, index: number) => {
    const isExpanded = showDetails === transit.id;
    
    return (
      <motion.div
        key={transit.id}
        className={`
          aurora-card p-4 cursor-pointer hover:scale-[1.02] transition-all duration-200
          ${compact ? 'p-3' : 'p-4'}
        `}
        onClick={() => setShowDetails(isExpanded ? null : transit.id)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-2">
              <div className={getSignificanceColor(transit.significance)}>
                {getSignificanceIcon(transit.significance)}
              </div>
              
              {transit.type === 'aspect' && transit.aspect && (
                <span className={`aurora-aspect-badge ${ASPECT_COLORS[transit.aspect]}`}>
                  {ASPECT_SYMBOLS[transit.aspect]} {transit.aspect}
                </span>
              )}
              
              {transit.type === 'retrograde' && (
                <span className="aurora-aspect-badge bg-red-500/20 text-red-400 border-red-500/50">
                  ℞ Retrógrado
                </span>
              )}
              
              {transit.type === 'ingress' && (
                <span className="aurora-aspect-badge bg-blue-500/20 text-blue-400 border-blue-500/50">
                  → Ingresso
                </span>
              )}
            </div>

            {/* Planets/Description */}
            <div className="mb-2">
              <h4 className="aurora-text font-medium text-sm">
                {transit.type === 'aspect' 
                  ? `${transit.planet1} ${ASPECT_SYMBOLS[transit.aspect!]} ${transit.planet2}`
                  : transit.type === 'ingress'
                  ? `${transit.planet1} → ${transit.sign}`
                  : `${transit.planet1} Retrógrado`
                }
              </h4>
              <p className="aurora-text-muted text-xs mt-1">
                {transit.description}
              </p>
            </div>

            {/* Timing */}
            <div className="flex items-center space-x-3 text-xs aurora-text-muted">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeUntil(transit.exact_time)}</span>
              </div>
              
              {transit.orb > 0 && (
                <div>
                  Orbe: {transit.orb.toFixed(1)}°
                </div>
              )}
              
              {transit.applying && (
                <div className="text-[#B2D1B1]">
                  Aplicativo
                </div>
              )}
            </div>
          </div>

          <button className="aurora-text-muted hover:aurora-text p-1">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <motion.div
            className="mt-4 pt-4 border-t border-[#DAA520]/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h5 className="aurora-title text-sm mb-2">Efeitos Esperados:</h5>
            <ul className="space-y-1">
              {transit.effects.map((effect, i) => (
                <li key={i} className="aurora-text-muted text-xs flex items-center space-x-2">
                  <span className="w-1 h-1 bg-[#DAA520] rounded-full"></span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="aurora-card p-6">
        <h3 className="aurora-title text-lg mb-4">Trânsitos Atuais</h3>
        <div className="space-y-3">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="animate-pulse aurora-card p-4">
              <div className="h-4 bg-[#661D48]/30 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-[#661D48]/20 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayedTransits = transits.slice(0, limit);
  const hasMore = transits.length > limit;

  return (
    <div className="aurora-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="aurora-title text-lg">Trânsitos Atuais</h3>
        <div className="flex items-center space-x-2">
          <span className="aurora-text-muted text-sm">
            {displayedTransits.length} de {transits.length}
          </span>
          {hasMore && onShowAll && (
            <button
              onClick={onShowAll}
              className="aurora-btn-secondary text-xs px-3 py-1"
            >
              <MoreHorizontal className="w-3 h-3 mr-1" />
              Ver todos
            </button>
          )}
        </div>
      </div>

      <div className={`space-y-${compact ? '2' : '3'}`}>
        {displayedTransits.map((transit, index) => renderTransit(transit, index))}
      </div>

      {displayedTransits.length === 0 && (
        <div className="text-center py-8">
          <TrendingUp className="w-8 h-8 aurora-text-muted mx-auto mb-2" />
          <p className="aurora-text-muted">Nenhum trânsito significativo no momento</p>
        </div>
      )}
    </div>
  );
}


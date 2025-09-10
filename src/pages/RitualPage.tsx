import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Moon, Sparkles, ChevronRight } from 'lucide-react';

// Componentes
import NowCard from '../components/NowCard-simple';
import ElectionChips from '../components/ElectionChips';
import TransitBoard from '../components/TransitBoard';
import LunarSection from '../components/LunarSection';
import DeusaDoDia from '../components/DeusaDoDia';
import { InterpretacaoTransitos } from '../components/InterpretacaoTransitos';

interface RitualPageProps {
  density: 'compacta' | 'confortavel';
}

export default function RitualPage({ density }: RitualPageProps) {
  const [essentialMode, setEssentialMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento inicial
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const spacing = density === 'compacta' ? 'space-y-4' : 'space-y-6';
  const padding = density === 'compacta' ? 'px-4 py-4' : 'px-4 py-6';

  if (isLoading) {
    return (
      <div className={`max-w-7xl mx-auto ${padding}`}>
        <div className={spacing}>
          {/* Skeleton Loading */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aurora-card p-6 animate-pulse">
              <div className="h-4 bg-[#661D48]/30 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-[#661D48]/20 rounded w-3/4"></div>
                <div className="h-3 bg-[#661D48]/20 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto ${padding}`}>
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="aurora-title text-2xl">Ritual • Agora</h2>
          <div className="flex items-center space-x-2 text-sm aurora-text-muted">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: 'America/Sao_Paulo'
            })}</span>
          </div>
        </div>
        
        <button
          onClick={() => setEssentialMode(!essentialMode)}
          className={`
            aurora-btn text-sm
            ${essentialMode ? 'aurora-btn-primary' : 'aurora-btn-secondary'}
          `}
        >
          {essentialMode ? 'Modo Completo' : 'Só o Essencial'}
        </button>
      </div>

      <div className={spacing}>
        {/* Linha 1: NowCard - Sempre fixo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NowCard compact={density === 'compacta'} />
        </motion.div>

        {/* Linha 2: ElectionChips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ElectionChips 
            showScores={!essentialMode}
            compact={density === 'compacta'}
          />
        </motion.div>

        {/* Linha 3: TransitBoard */}
        {!essentialMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TransitBoard 
              limit={5}
              compact={density === 'compacta'}
            />
          </motion.div>
        )}

        {/* Linha 3.5: Interpretações Detalhadas dos Trânsitos */}
        {/* Temporariamente removido para debug
        {!essentialMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <InterpretacaoTransitos />
          </motion.div>
        )}
        */}

        {/* Linha 4: LunarSection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LunarSection 
            mode={essentialMode ? 'summary' : 'detailed'}
            compact={density === 'compacta'}
          />
        </motion.div>

        {/* Rodapé: Deusa do Dia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DeusaDoDia 
            showCorrespondences={!essentialMode}
            compact={density === 'compacta'}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="aurora-card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="aurora-title text-lg mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="aurora-btn-secondary flex items-center justify-between p-3">
              <span>Melhores Horários</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="aurora-btn-secondary flex items-center justify-between p-3">
              <span>Próximos Esbats</span>
              <Moon className="w-4 h-4" />
            </button>
            <button className="aurora-btn-secondary flex items-center justify-between p-3">
              <span>Aspectos Hoje</span>
              <TrendingUp className="w-4 h-4" />
            </button>
            <button className="aurora-btn-secondary flex items-center justify-between p-3">
              <span>Rituais Sugeridos</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


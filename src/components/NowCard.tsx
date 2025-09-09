import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Clock, TrendingUp } from 'lucide-react';

interface NowCardProps {
  compact?: boolean;
}

export default function NowCard({ compact = false }: NowCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simula carregamento
    setTimeout(() => setIsLoading(false), 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="aurora-card p-6 animate-pulse">
        <div className="h-6 bg-[#661D48]/30 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-[#661D48]/20 rounded"></div>
          <div className="h-16 bg-[#661D48]/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`aurora-card ${compact ? 'p-4' : 'p-6'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="aurora-title text-lg">Agora</h3>
        <div className="flex items-center space-x-2 text-sm aurora-text-muted">
          <Clock className="w-4 h-4" />
          <span>
            {currentTime.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: 'America/Sao_Paulo'
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sol */}
        <div className="flex items-center space-x-3 p-3 bg-[#DAA520]/10 rounded-lg border border-[#DAA520]/20">
          <Sun className="w-8 h-8 text-[#DAA520]" />
          <div>
            <div className="aurora-text font-medium">Sol</div>
            <div className="aurora-text-muted text-sm">15° Virgem</div>
            <div className="aurora-text-muted text-xs">Direto</div>
          </div>
        </div>

        {/* Lua */}
        <div className="flex items-center space-x-3 p-3 bg-[#B2D1B1]/10 rounded-lg border border-[#B2D1B1]/20">
          <Moon className="w-8 h-8 text-[#B2D1B1]" />
          <div>
            <div className="aurora-text font-medium">Lua</div>
            <div className="aurora-text-muted text-sm">22° Peixes</div>
            <div className="aurora-text-muted text-xs">Crescente</div>
          </div>
        </div>
      </div>

      {/* Informações adicionais */}
      {!compact && (
        <div className="mt-4 pt-4 border-t border-[#DAA520]/20">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="aurora-text-muted">Mansão Lunar:</span>
              <div className="aurora-text">Al-Sharatain</div>
            </div>
            <div>
              <span className="aurora-text-muted">Fase:</span>
              <div className="aurora-text">Crescente (65%)</div>
            </div>
          </div>
        </div>
      )}

      {/* Retrogradações ativas */}
      <div className="mt-4 flex items-center space-x-2">
        <TrendingUp className="w-4 h-4 text-orange-400" />
        <span className="aurora-text-muted text-sm">
          Nenhum planeta retrógrado
        </span>
      </div>
    </motion.div>
  );
}


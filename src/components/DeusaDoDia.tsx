import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, ChevronRight, Gem, Leaf, Palette } from 'lucide-react';

interface DeusaDoDiaProps {
  showCorrespondences?: boolean;
  compact?: boolean;
  onMore?: () => void;
}

interface DeusaData {
  nome: string;
  origem: string;
  dominio: string[];
  invocacao: string;
  correspondencias: {
    cristais: string[];
    ervas: string[];
    cores: string[];
    incensos: string[];
  };
  dicaMagicka: string;
}

export default function DeusaDoDia({ showCorrespondences = true, compact = false, onMore }: DeusaDoDiaProps) {
  const [deusaData, setDeusaData] = useState<DeusaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDeusaData = async () => {
      setIsLoading(true);
      
      // Simula carregamento da deusa do dia
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockData: DeusaData = {
        nome: 'Ísis',
        origem: 'Egípcia',
        dominio: ['Magia', 'Cura', 'Proteção', 'Maternidade'],
        invocacao: 'Grande Ísis, mãe de todas as magias, concede-me tua sabedoria e proteção.',
        correspondencias: {
          cristais: ['Lápis-lazúli', 'Turquesa', 'Cornalina'],
          ervas: ['Mirra', 'Cedro', 'Lótus'],
          cores: ['Azul real', 'Dourado', 'Branco'],
          incensos: ['Mirra', 'Olíbano', 'Sândalo']
        },
        dicaMagicka: 'Hoje é ideal para rituais de cura e proteção. Acenda uma vela azul e medite sobre a sabedoria ancestral.'
      };
      
      setDeusaData(mockData);
      setIsLoading(false);
    };

    loadDeusaData();
  }, []);

  if (isLoading) {
    return (
      <div className="aurora-card p-6 animate-pulse">
        <div className="h-6 bg-[#661D48]/30 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-[#661D48]/20 rounded w-3/4"></div>
          <div className="h-4 bg-[#661D48]/20 rounded w-1/2"></div>
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Crown className="w-6 h-6 text-[#DAA520]" />
          <h3 className="aurora-title text-lg">Deusa do Dia</h3>
        </div>
        {onMore && (
          <button
            onClick={onMore}
            className="aurora-btn-secondary text-xs px-3 py-1"
          >
            Ver mais
            <ChevronRight className="w-3 h-3 ml-1" />
          </button>
        )}
      </div>

      {/* Deusa Info */}
      <div className="mb-4">
        <h4 className="aurora-title text-xl mb-2">{deusaData?.nome}</h4>
        <div className="flex items-center space-x-4 text-sm aurora-text-muted mb-3">
          <span>Origem: {deusaData?.origem}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {deusaData?.dominio.map((dom, index) => (
            <span key={index} className="aurora-domain-tag">
              {dom}
            </span>
          ))}
        </div>

        <blockquote className="aurora-text italic text-sm border-l-2 border-[#DAA520] pl-3 mb-4">
          "{deusaData?.invocacao}"
        </blockquote>
      </div>

      {/* Correspondências */}
      {showCorrespondences && !compact && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Gem className="w-4 h-4 text-[#B2D1B1]" />
                <span className="aurora-title text-xs">Cristais</span>
              </div>
              <div className="space-y-1">
                {deusaData?.correspondencias.cristais.map((cristal, index) => (
                  <div key={index} className="aurora-text text-xs">{cristal}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="w-4 h-4 text-green-400" />
                <span className="aurora-title text-xs">Ervas</span>
              </div>
              <div className="space-y-1">
                {deusaData?.correspondencias.ervas.map((erva, index) => (
                  <div key={index} className="aurora-text text-xs">{erva}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <span className="aurora-title text-xs">Cores</span>
              </div>
              <div className="space-y-1">
                {deusaData?.correspondencias.cores.map((cor, index) => (
                  <div key={index} className="aurora-text text-xs">{cor}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="aurora-title text-xs">Incensos</span>
              </div>
              <div className="space-y-1">
                {deusaData?.correspondencias.incensos.map((incenso, index) => (
                  <div key={index} className="aurora-text text-xs">{incenso}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dica Mágica */}
      <div className="mt-4 pt-4 border-t border-[#DAA520]/20">
        <h5 className="aurora-title text-sm mb-2 flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-[#DAA520]" />
          Dica Mágica
        </h5>
        <p className="aurora-text text-sm leading-relaxed">
          {deusaData?.dicaMagicka}
        </p>
      </div>
    </motion.div>
  );
}


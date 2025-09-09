import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, ChevronDown, ChevronUp, Scissors, Leaf, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';

interface LunarSectionProps {
  mode?: 'summary' | 'detailed';
  compact?: boolean;
}

interface LunarData {
  phase: string;
  mansion: string;
  illumination: number;
  voidOfCourse: boolean;
  eclipse: boolean;
  favorability: {
    invasive_procedures: boolean;
    hair_cut: boolean;
    nail_cut: boolean;
    beard_cut: boolean;
    depilation: boolean;
    planting: boolean;
    harvesting: boolean;
  };
  magicalUses: string[];
  astrologicalUses: string[];
  herbs: string[];
  paracelsus: string;
}

const TABS = [
  { id: 'magicka', name: 'Mágicka', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'astrologica', name: 'Astrológica', icon: <Moon className="w-4 h-4" /> },
  { id: 'ervas', name: 'Ervas/Paracelso', icon: <Leaf className="w-4 h-4" /> }
];

export default function LunarSection({ mode = 'detailed', compact = false }: LunarSectionProps) {
  const [activeTab, setActiveTab] = useState('magicka');
  const [isExpanded, setIsExpanded] = useState(mode === 'detailed');
  const [lunarData, setLunarData] = useState<LunarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLunarData = async () => {
      setIsLoading(true);
      
      // Simula carregamento de dados lunares
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData: LunarData = {
        phase: 'Crescente',
        mansion: 'Al-Sharatain (Os Chifres)',
        illumination: 65,
        voidOfCourse: Math.random() > 0.8,
        eclipse: Math.random() > 0.95,
        favorability: {
          invasive_procedures: Math.random() > 0.6,
          hair_cut: Math.random() > 0.4,
          nail_cut: Math.random() > 0.3,
          beard_cut: Math.random() > 0.4,
          depilation: Math.random() > 0.5,
          planting: Math.random() > 0.7,
          harvesting: Math.random() > 0.3
        },
        magicalUses: [
          'Rituais de crescimento e expansão',
          'Magias de atração e manifestação',
          'Trabalhos de cura e regeneração',
          'Encantamentos de proteção'
        ],
        astrologicalUses: [
          'Início de novos projetos',
          'Plantio e cultivo',
          'Trabalhos de construção',
          'Investimentos e crescimento financeiro'
        ],
        herbs: [
          'Manjericão (folhas)',
          'Alecrim (ramos)',
          'Lavanda (flores)',
          'Sálvia (folhas)'
        ],
        paracelsus: 'Lua crescente favorece a coleta de folhas e partes aéreas das plantas, quando a seiva sobe e concentra-se nas partes superiores.'
      };
      
      setLunarData(mockData);
      setIsLoading(false);
    };

    loadLunarData();
  }, []);

  const renderFavorabilityGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {lunarData && Object.entries(lunarData.favorability).map(([activity, favorable]) => (
        <div key={activity} className="flex items-center justify-between p-2 bg-[#0B1836]/30 rounded">
          <span className="aurora-text text-xs capitalize">
            {activity.replace('_', ' ')}
          </span>
          {favorable ? (
            <CheckCircle className="w-4 h-4 text-[#B2D1B1]" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          )}
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    if (!lunarData) return null;

    switch (activeTab) {
      case 'magicka':
        return (
          <div className="space-y-3">
            <ul className="space-y-2">
              {lunarData.magicalUses.map((use, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-[#DAA520] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="aurora-text text-sm">{use}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'astrologica':
        return (
          <div className="space-y-3">
            <ul className="space-y-2">
              {lunarData.astrologicalUses.map((use, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-[#B2D1B1] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="aurora-text text-sm">{use}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'ervas':
        return (
          <div className="space-y-4">
            <div>
              <h5 className="aurora-title text-sm mb-2">Ervas Favoráveis:</h5>
              <div className="flex flex-wrap gap-2">
                {lunarData.herbs.map((herb, index) => (
                  <span key={index} className="aurora-herb-tag">
                    {herb}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="aurora-title text-sm mb-2">Segundo Paracelso:</h5>
              <p className="aurora-text text-sm leading-relaxed">
                {lunarData.paracelsus}
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="aurora-card p-6 animate-pulse">
        <div className="h-6 bg-[#661D48]/30 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-[#661D48]/20 rounded w-3/4"></div>
          <div className="h-4 bg-[#661D48]/20 rounded w-1/2"></div>
          <div className="h-4 bg-[#661D48]/20 rounded w-2/3"></div>
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
        <h3 className="aurora-title text-lg">Seção Lunar</h3>
        {mode === 'summary' && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="aurora-btn p-2"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Informações básicas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <Moon className="w-8 h-8 text-[#B2D1B1] mx-auto mb-2" />
          <div className="aurora-text text-sm font-medium">{lunarData?.phase}</div>
          <div className="aurora-text-muted text-xs">{lunarData?.illumination}% iluminada</div>
        </div>
        
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-[#DAA520] mx-auto mb-2" />
          <div className="aurora-text text-sm font-medium">Mansão</div>
          <div className="aurora-text-muted text-xs">{lunarData?.mansion}</div>
        </div>
        
        {lunarData?.voidOfCourse && (
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="aurora-text text-sm font-medium text-red-400">Fora de Curso</div>
            <div className="aurora-text-muted text-xs">Evitar decisões</div>
          </div>
        )}
        
        {lunarData?.eclipse && (
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-[#DAA520] mx-auto mb-2" />
            <div className="aurora-text text-sm font-medium text-[#DAA520]">Eclipse</div>
            <div className="aurora-text-muted text-xs">Evitar magia</div>
          </div>
        )}
      </div>

      {/* Favorabilidade para atividades */}
      <div className="mb-6">
        <h4 className="aurora-title text-sm mb-3 flex items-center">
          <Scissors className="w-4 h-4 mr-2" />
          Favorabilidade para Atividades
        </h4>
        {renderFavorabilityGrid()}
      </div>

      {/* Conteúdo expandido */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tabs */}
            <div className="flex space-x-1 mb-4 bg-[#0B1836]/50 rounded-lg p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-[#DAA520] text-[#0B1836]'
                      : 'text-[#F2EAFF] hover:bg-[#661D48]/50'
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[120px]">
              {renderTabContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Star, Gem, Beaker, Leaf, Calendar as CalendarIcon, Globe } from 'lucide-react';

interface StudySection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: number;
}

const STUDY_SECTIONS: StudySection[] = [
  {
    id: 'glossario',
    title: 'Glossário',
    description: 'Termos astrológicos e mágicos',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-[#DAA520]/20 border-[#DAA520]/50',
    items: 127
  },
  {
    id: 'mansoes',
    title: 'Mansões Lunares',
    description: '28 mansões árabes com selos',
    icon: <Star className="w-6 h-6" />,
    color: 'bg-[#B2D1B1]/20 border-[#B2D1B1]/50',
    items: 28
  },
  {
    id: 'dignidades',
    title: 'Dignidades Planetárias',
    description: 'Domicílio, exaltação, detrimento, queda',
    icon: <Globe className="w-6 h-6" />,
    color: 'bg-purple-500/20 border-purple-500/50',
    items: 84
  },
  {
    id: 'estrelas',
    title: 'Estrelas Fixas',
    description: 'Estrelas principais e suas naturezas',
    icon: <Star className="w-6 h-6" />,
    color: 'bg-blue-500/20 border-blue-500/50',
    items: 50
  },
  {
    id: 'asteroides',
    title: 'Asteroides',
    description: 'Quíron, Ceres, Pallas, Juno, Vesta',
    icon: <Gem className="w-6 h-6" />,
    color: 'bg-indigo-500/20 border-indigo-500/50',
    items: 15
  },
  {
    id: 'alquimia',
    title: 'Alquimia',
    description: 'Operações, cores, tria prima',
    icon: <Beaker className="w-6 h-6" />,
    color: 'bg-orange-500/20 border-orange-500/50',
    items: 21
  },
  {
    id: 'correspondencias',
    title: 'Correspondências',
    description: 'Ervas, cristais, cores, incensos',
    icon: <Leaf className="w-6 h-6" />,
    color: 'bg-green-500/20 border-green-500/50',
    items: 365
  },
  {
    id: 'roda-ano',
    title: 'Roda do Ano',
    description: 'Sabbaths e festivais sazonais',
    icon: <CalendarIcon className="w-6 h-6" />,
    color: 'bg-red-500/20 border-red-500/50',
    items: 8
  }
];

export default function EstudoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const filteredSections = STUDY_SECTIONS.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="aurora-title text-2xl mb-2">Estudo</h2>
          <p className="aurora-text-muted">Conhecimento profundo em astrologia e magia</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 aurora-text-muted" />
          <input
            type="text"
            placeholder="Buscar seções..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="aurora-input pl-10"
          />
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`
              aurora-card p-6 text-left hover:scale-105 transition-all duration-200
              ${section.color}
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedSection(section.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-[#DAA520]">
                {section.icon}
              </div>
              <span className="text-xs aurora-text-muted bg-[#0B1836]/50 px-2 py-1 rounded-full">
                {section.items} itens
              </span>
            </div>
            
            <h3 className="aurora-title text-lg mb-2">{section.title}</h3>
            <p className="aurora-text-muted text-sm leading-relaxed">
              {section.description}
            </p>
            
            <div className="mt-4 flex items-center text-[#DAA520] text-sm">
              <span>Explorar</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Empty State */}
      {filteredSections.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BookOpen className="w-12 h-12 aurora-text-muted mx-auto mb-4" />
          <h3 className="aurora-title text-lg mb-2">Nenhuma seção encontrada</h3>
          <p className="aurora-text-muted">
            Tente buscar por outros termos ou explore todas as seções disponíveis.
          </p>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div
        className="mt-12 aurora-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="aurora-title text-lg mb-4">Estatísticas do Conhecimento</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="aurora-title text-2xl text-[#DAA520] mb-1">
              {STUDY_SECTIONS.reduce((sum, section) => sum + section.items, 0)}
            </div>
            <div className="aurora-text-muted text-sm">Total de Itens</div>
          </div>
          <div className="text-center">
            <div className="aurora-title text-2xl text-[#B2D1B1] mb-1">
              {STUDY_SECTIONS.length}
            </div>
            <div className="aurora-text-muted text-sm">Seções</div>
          </div>
          <div className="text-center">
            <div className="aurora-title text-2xl text-[#DAA520] mb-1">28</div>
            <div className="aurora-text-muted text-sm">Mansões Lunares</div>
          </div>
          <div className="text-center">
            <div className="aurora-title text-2xl text-[#B2D1B1] mb-1">365</div>
            <div className="aurora-text-muted text-sm">Correspondências</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Updates */}
      <motion.div
        className="mt-6 aurora-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="aurora-title text-lg mb-4">Atualizações Recentes</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-[#0B1836]/30 rounded-lg">
            <Star className="w-4 h-4 text-[#DAA520]" />
            <div>
              <div className="aurora-text text-sm font-medium">Mansões Lunares expandidas</div>
              <div className="aurora-text-muted text-xs">Adicionados selos mágicos tradicionais</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-[#0B1836]/30 rounded-lg">
            <Beaker className="w-4 h-4 text-[#B2D1B1]" />
            <div>
              <div className="aurora-text text-sm font-medium">Correspondências alquímicas</div>
              <div className="aurora-text-muted text-xs">Tria Prima e cores alquímicas completas</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-[#0B1836]/30 rounded-lg">
            <Leaf className="w-4 h-4 text-green-400" />
            <div>
              <div className="aurora-text text-sm font-medium">Base de ervas planetárias</div>
              <div className="aurora-text-muted text-xs">Receitas tradicionais de incensos</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


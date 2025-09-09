import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, Globe } from 'lucide-react';

// Componentes
import MagickCalendar from '../components/MagickCalendar';
import DayDrawer from '../components/DayDrawer';

interface CalendarioPageProps {
  hemisphere: 'norte' | 'sul';
}

export default function CalendarioPage({ hemisphere }: CalendarioPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="aurora-title text-2xl">Calendário Mágico</h2>
          <div className="flex items-center space-x-2 text-sm aurora-text-muted">
            <Globe className="w-4 h-4" />
            <span>Hemisfério {hemisphere === 'norte' ? 'Norte' : 'Sul'}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
            className="aurora-btn"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {viewMode === 'month' ? 'Visão Semanal' : 'Visão Mensal'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MagickCalendar 
            hemisphere={hemisphere}
            viewMode={viewMode}
            onDateSelect={setSelectedDate}
            activeFilters={activeFilters}
            onFiltersChange={setActiveFilters}
          />
        </motion.div>
      </div>

      {/* Day Drawer */}
      <DayDrawer 
        date={selectedDate}
        isOpen={selectedDate !== null}
        onClose={() => setSelectedDate(null)}
        hemisphere={hemisphere}
      />
    </div>
  );
}


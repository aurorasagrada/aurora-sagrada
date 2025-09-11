import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, Globe } from 'lucide-react';

// Componentes
import CalendarioFuncional from '../components/CalendarioFuncional';

interface CalendarioPageProps {
  hemisphere: 'norte' | 'sul';
}

export default function CalendarioPage({ hemisphere }: CalendarioPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="aurora-title text-2xl">Calendário Astromágico</h2>
          <div className="flex items-center space-x-2 text-sm aurora-text-muted">
            <Globe className="w-4 h-4" />
            <span>Hemisfério {hemisphere === 'norte' ? 'Norte' : 'Sul'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CalendarioFuncional />
        </motion.div>
      </div>
    </div>
  );
}


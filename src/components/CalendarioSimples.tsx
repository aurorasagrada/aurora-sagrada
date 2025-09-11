import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DayData {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  runa: string;
  tarot: string;
  mantra: string;
  eleicoes: Record<string, number>;
}

interface CalendarioSimplesProps {
  hemisphere: 'norte' | 'sul';
  compactMode?: boolean;
}

const CalendarioSimples: React.FC<CalendarioSimplesProps> = ({ hemisphere, compactMode = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<DayData[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const RUNAS = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ'];
  const TAROT = ['O Mago', 'A Sacerdotisa', 'A Imperatriz', 'O Imperador', 'O Hierofante', 'Os Amantes', 'A Carruagem'];
  const MANTRAS = ['Om Mani Padme Hum', 'So Hum', 'Om Gam Ganapataye Namaha', 'Om Namah Shivaya'];

  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: DayData[] = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayOfYear = Math.floor((currentDay.getTime() - new Date(currentDay.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      
      days.push({
        date: new Date(currentDay),
        dayNumber: currentDay.getDate(),
        isCurrentMonth: currentDay.getMonth() === month,
        isToday: currentDay.toDateString() === new Date().toDateString(),
        runa: RUNAS[dayOfYear % RUNAS.length],
        tarot: TAROT[dayOfYear % TAROT.length],
        mantra: MANTRAS[dayOfYear % MANTRAS.length],
        eleicoes: {
          amor: 50 + Math.random() * 50,
          trabalho: 50 + Math.random() * 50,
          prosperidade: 50 + Math.random() * 50,
          contato: 50 + Math.random() * 50,
          justica: 50 + Math.random() * 50
        }
      });
      
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    setCalendarDays(days);
  };

  useEffect(() => {
    generateCalendarData();
  }, [currentDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getElectionColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getElectionLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bom';
    if (score >= 40) return 'Neutro';
    return 'Desfavorável';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Cabeçalho do Calendário */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-aurora-accent" />
          <h2 className="text-2xl font-bold text-aurora-text">
            CALENDÁRIO MÁGICKO
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg bg-aurora-card hover:bg-aurora-card-hover transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-aurora-text" />
          </button>
          
          <h3 className="text-xl font-semibold text-aurora-text min-w-[200px] text-center">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg bg-aurora-card hover:bg-aurora-card-hover transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-aurora-text" />
          </button>
        </div>
      </div>

      {/* Dias da Semana */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className="text-center py-2 text-aurora-text-secondary font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendário */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <motion.div
            key={index}
            className={`
              relative p-3 rounded-lg border cursor-pointer transition-all duration-200
              ${day.isCurrentMonth 
                ? 'bg-aurora-card border-aurora-border hover:bg-aurora-card-hover' 
                : 'bg-aurora-bg border-aurora-border/30 opacity-50'
              }
              ${day.isToday ? 'ring-2 ring-aurora-accent' : ''}
            `}
            onClick={() => setSelectedDay(day)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Número do Dia */}
            <div className="text-lg font-bold text-aurora-text mb-2">
              {day.dayNumber}
            </div>
            
            {/* Runa do Dia */}
            <div className="text-2xl text-aurora-accent mb-1 text-center">
              {day.runa}
            </div>
            
            {/* Eleição Principal */}
            <div className="text-xs text-center">
              <div className={`font-medium ${getElectionColor(day.eleicoes.contato)}`}>
                Contato: {Math.round(day.eleicoes.contato)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Detalhes do Dia */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-aurora-card rounded-xl p-6 max-w-md w-full border border-aurora-border"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-aurora-text mb-4">
                {selectedDay.date.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </h3>
              
              {/* Runa */}
              <div className="mb-4">
                <h4 className="text-aurora-accent font-semibold mb-2">Runa do Dia</h4>
                <div className="text-3xl text-aurora-accent text-center mb-2">{selectedDay.runa}</div>
                <p className="text-aurora-text-secondary text-sm">Símbolo de proteção e orientação</p>
              </div>
              
              {/* Tarot */}
              <div className="mb-4">
                <h4 className="text-aurora-accent font-semibold mb-2">Carta do Tarot</h4>
                <p className="text-aurora-text">{selectedDay.tarot}</p>
              </div>
              
              {/* Mantra */}
              <div className="mb-4">
                <h4 className="text-aurora-accent font-semibold mb-2">Mantra</h4>
                <p className="text-aurora-text italic">{selectedDay.mantra}</p>
              </div>
              
              {/* Eleições Mágicas */}
              <div className="mb-4">
                <h4 className="text-aurora-accent font-semibold mb-2">Eleições Mágicas</h4>
                <div className="space-y-2">
                  {Object.entries(selectedDay.eleicoes).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-aurora-text capitalize">{key}:</span>
                      <span className={`font-medium ${getElectionColor(value)}`}>
                        {Math.round(value)}% - {getElectionLabel(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setSelectedDay(null)}
                className="w-full py-2 bg-aurora-accent text-aurora-bg rounded-lg font-medium hover:bg-aurora-accent/90 transition-colors"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarioSimples;


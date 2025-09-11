import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Moon, Sun } from 'lucide-react';

const CalendarioFuncional: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Dias vazios do mês anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  
  const getRandomRune = () => {
    const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];
    return runes[Math.floor(Math.random() * runes.length)];
  };
  
  const getRandomScore = () => Math.floor(Math.random() * 100);
  
  const days = getDaysInMonth(currentDate);
  
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
      {/* Cabeçalho do Calendário */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-purple-300" />
        </button>
        
        <h2 className="text-xl font-bold text-purple-100">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-purple-300" />
        </button>
      </div>
      
      {/* Filtros Temáticos */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['Amor', 'Trabalho', 'Beleza', 'Prosperidade', 'Justiça', 'Contato Espiritual'].map((tema) => (
          <button
            key={tema}
            className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-200 text-sm hover:bg-purple-600/40 transition-colors"
          >
            {tema} {getRandomScore()}%
          </button>
        ))}
      </div>
      
      {/* Cabeçalho dos Dias */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-purple-300 font-medium py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Grade do Calendário */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square flex flex-col items-center justify-center p-1 rounded-lg
              ${day ? 'bg-purple-800/30 hover:bg-purple-700/40 cursor-pointer border border-purple-600/20' : ''}
              ${day === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() && 
                currentDate.getFullYear() === new Date().getFullYear() 
                ? 'ring-2 ring-yellow-400' : ''}
              transition-all duration-200
            `}
          >
            {day && (
              <>
                <span className="text-purple-100 font-medium text-sm">{day}</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-purple-300">{getRandomRune()}</span>
                  {day % 7 === 0 && <Moon className="w-3 h-3 text-blue-300" />}
                  {day % 5 === 0 && <Star className="w-3 h-3 text-yellow-300" />}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Legenda */}
      <div className="mt-4 text-xs text-purple-300 space-y-1">
        <div className="flex items-center gap-2">
          <Moon className="w-3 h-3 text-blue-300" />
          <span>Fase Lunar Especial</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-3 h-3 text-yellow-300" />
          <span>Eleição Mágica Favorável</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarioFuncional;


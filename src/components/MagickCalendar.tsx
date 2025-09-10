import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Filter, 
  Heart, 
  Briefcase, 
  Sparkles, 
  DollarSign, 
  Scale, 
  Zap,
  Moon,
  Star,
  Eye,
  Gem
} from 'lucide-react';

// Importar dados das mansões lunares expandidas
import mansoesLunaresData from '../../data/mansoes-lunares-expandido.json';
import eleicoesData from '../../data/eleicoes-magickas.json';
import { calcularEleicoesMagicas } from '../astro/eleicoes';
import { obterFaseLunar } from '../astro/engine-efemerides';
import { calcularMansaoLunar } from '../astro/mansoes-lunares';


interface ElectionTheme {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface LunarMansion {
  numero: number;
  nome: string;
  nomeArabico: string;
  espiritoToscano: string;
  natureza: string;
  regente: string;
  significado: string;
  usosMagicos: string[];
  favoravel: string[];
  desfavoravel: string[];
  correspondencias: {
    ervas: string[];
    pedras: string[];
    cores: string[];
    incensos: string[];
    metais: string[];
    animais: string[];
    deusas: string[];
  };
  simbolo: string;
  selo: string;
  invocacao: string;
  hinoOrfico?: string;
  operacaoAlquimica: string;
  parteCorpo: string;
  elementoAssociado: string;
}

interface DayData {
  date: Date;
  score: Record<string, number>;
  highlights: string[];
  warnings: string[];
  lunarPhase: string;
  lunarMansion: number;
  lunarMansionData?: LunarMansion;
  aspects: string[];
  retrogrades: string[];
  voidOfCourse: boolean;
  eclipse?: boolean;
}

const ELECTION_THEMES: ElectionTheme[] = [
  {
    id: 'amor',
    name: 'Amor',
    icon: <Heart className="w-4 h-4" />,
    color: 'aurora-election-amor',
    description: 'Relacionamentos, romance, harmonia'
  },
  {
    id: 'trabalho',
    name: 'Trabalho',
    icon: <Briefcase className="w-4 h-4" />,
    color: 'aurora-election-trabalho',
    description: 'Carreira, negócios, projetos'
  },
  {
    id: 'beleza',
    name: 'Beleza',
    icon: <Sparkles className="w-4 h-4" />,
    color: 'aurora-election-beleza',
    description: 'Estética, autoestima, cuidados'
  },
  {
    id: 'prosperidade',
    name: 'Prosperidade',
    icon: <DollarSign className="w-4 h-4" />,
    color: 'aurora-election-prosperidade',
    description: 'Abundância, riqueza, crescimento'
  },
  {
    id: 'justica',
    name: 'Justiça',
    icon: <Scale className="w-4 h-4" />,
    color: 'aurora-election-justica',
    description: 'Equilíbrio, direitos, resolução'
  },
  {
    id: 'contato',
    name: 'Contato Espiritual',
    icon: <Zap className="w-4 h-4" />,
    color: 'aurora-election-contato',
    description: 'Mediunidade, rituais, conexão'
  }
];

const LUNAR_PHASES = {
  'nova': { name: 'Nova', symbol: '🌑', color: '#2F2F2F' },
  'crescente': { name: 'Crescente', symbol: '🌒', color: '#4A5568' },
  'cheia': { name: 'Cheia', symbol: '🌕', color: '#F7FAFC' },
  'minguante': { name: 'Minguante', symbol: '🌘', color: '#718096' }
};

interface MagickCalendarProps {
  hemisphere: 'norte' | 'sul';
  compactMode: boolean;
}

const MagickCalendar: React.FC<MagickCalendarProps> = ({ hemisphere, compactMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [showDayDrawer, setShowDayDrawer] = useState(false);

  // Função para obter dados da mansão lunar
  const getLunarMansionData = (mansionNumber: number): LunarMansion | undefined => {
    const mansionData = mansoesLunaresData.mansoes[mansionNumber.toString()];
    return mansionData as LunarMansion;
  };

  // Função para calcular mansão lunar baseada na data
  const calculateLunarMansion = (date: Date): number => {
    try {
      return calcularMansaoLunar(date);
    } catch (error) {
      // Fallback para cálculo simplificado
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      return ((dayOfYear - 1) % 28) + 1;
    }
  };

  // Função para calcular fase lunar
  const calculateLunarPhase = (date: Date): string => {
    try {
      const faseData = obterFaseLunar(date);
      return faseData.fase.toLowerCase();
    } catch (error) {
      // Fallback para cálculo simplificado
      const dayOfMonth = date.getDate();
      if (dayOfMonth <= 7) return 'nova';
      if (dayOfMonth <= 14) return 'crescente';
      if (dayOfMonth <= 21) return 'cheia';
      return 'minguante';
    }
  };

  // Função para calcular score de eleição baseado na mansão lunar
  const calculateElectionScore = (mansionData: LunarMansion, theme: string): number => {
    if (!mansionData) return 50;

    let score = 50;
    const favorableKeywords = mansionData.favoravel.join(' ').toLowerCase();
    const unfavorableKeywords = mansionData.desfavoravel.join(' ').toLowerCase();
    const magicalUses = mansionData.usosMagicos.join(' ').toLowerCase();

    // Mapear temas para palavras-chave
    const themeKeywords: Record<string, string[]> = {
      'amor': ['amor', 'relacionamento', 'harmonia', 'casamento', 'união'],
      'trabalho': ['trabalho', 'carreira', 'negócio', 'projeto', 'empreendimento'],
      'beleza': ['beleza', 'estética', 'arte', 'criatividade', 'autoestima'],
      'prosperidade': ['prosperidade', 'riqueza', 'abundância', 'crescimento', 'fortuna'],
      'justica': ['justiça', 'equilíbrio', 'direito', 'resolução', 'lei'],
      'contato': ['espiritual', 'ritual', 'magia', 'conexão', 'místico']
    };

    const keywords = themeKeywords[theme] || [];

    // Verificar correspondências favoráveis
    keywords.forEach(keyword => {
      if (favorableKeywords.includes(keyword) || magicalUses.includes(keyword)) {
        score += 20;
      }
      if (unfavorableKeywords.includes(keyword)) {
        score -= 30;
      }
    });

    // Ajustar baseado na natureza da mansão
    const natureBonus: Record<string, Record<string, number>> = {
      'amor': { 'Venusiana': 25, 'Lunar': 15, 'Marcial': -10 },
      'trabalho': { 'Mercurial': 20, 'Solar': 15, 'Saturnina': 10 },
      'beleza': { 'Venusiana': 25, 'Lunar': 15, 'Solar': 10 },
      'prosperidade': { 'Jupiteriana': 25, 'Solar': 15, 'Venusiana': 10 },
      'justica': { 'Jupiteriana': 20, 'Saturnina': 15, 'Solar': 10 },
      'contato': { 'Lunar': 25, 'Mercurial': 15, 'Neptuniana': 20 }
    };

    const bonus = natureBonus[theme]?.[mansionData.natureza] || 0;
    score += bonus;

    return Math.max(0, Math.min(100, score));
  };

  // Gerar dados do calendário para o mês atual
  const [calendarData, setCalendarData] = useState({ days: [], startingDayOfWeek: 0 });

  useEffect(() => {
    const generateCalendarData = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days: DayData[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const mansionNumber = calculateLunarMansion(date);
      const mansionData = getLunarMansionData(mansionNumber);
      const lunarPhase = calculateLunarPhase(date);
      
      // Calcular eleições mágicas usando dados reais
      const elections: Record<string, number> = {};
      ELECTION_THEMES.forEach(theme => {
        try {
          // Usar função real de cálculo de eleições
          const electionData = calcularEleicoesMagicas(date, theme.id);
          elections[theme.id] = electionData.score || calculateElectionScore(mansionData, theme.id);
        } catch (error) {
          elections[theme.id] = calculateElectionScore(mansionData, theme.id);
        }
      });

      const electionsData = await calcularEleicoesMagicas(date);

      days.push({
        date: day,
        fullDate: date,
        lunarMansion: mansionNumber,
        lunarPhase,
        score: electionsData,
        mansion: mansionData,
        aspects: [], // Será implementado com dados reais dos aspectos
        retrogrades: [], // Será implementado com dados reais das retrogradações
        voidOfCourse: false, // Será implementado com cálculo real
        eclipse: false // Será implementado com detecção real de eclipses
      });
    }

    setCalendarData({ days, startingDayOfWeek });
    };

    generateCalendarData();
  }, [currentDate]);

  // Filtrar dias baseado nos filtros selecionados
  const filteredDays = useMemo(() => {
    if (selectedFilters.length === 0) return calendarData.days;
    
    return calendarData.days.filter(day => {
      return selectedFilters.some(filter => day.score[filter] >= 70);
    });
  }, [calendarData.days, selectedFilters]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
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

  const openDayDrawer = (dayData: DayData) => {
    setSelectedDay(dayData);
    setShowDayDrawer(true);
  };

  const getDayColor = (day: DayData): string => {
    if (selectedFilters.length === 0) {
      const avgScore = Object.values(day.score).reduce((a, b) => a + b, 0) / Object.values(day.score).length;
      if (avgScore >= 80) return 'bg-aurora-dourado/20 border-aurora-dourado/40';
      if (avgScore >= 60) return 'bg-aurora-salvia/20 border-aurora-salvia/40';
      if (avgScore >= 40) return 'bg-aurora-azul/20 border-aurora-azul/40';
      return 'bg-aurora-vinho/20 border-aurora-vinho/40';
    }

    const maxScore = Math.max(...selectedFilters.map(filter => day.score[filter]));
    if (maxScore >= 80) return 'bg-aurora-dourado/20 border-aurora-dourado/40';
    if (maxScore >= 60) return 'bg-aurora-salvia/20 border-aurora-salvia/40';
    if (maxScore >= 40) return 'bg-aurora-azul/20 border-aurora-azul/40';
    return 'bg-aurora-vinho/20 border-aurora-vinho/40';
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="space-y-6">
      {/* Header do Calendário */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Calendar className="w-6 h-6 text-aurora-dourado" />
          <h2 className="text-2xl font-cinzel text-aurora-dourado">
            Calendário Mágicko
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg bg-aurora-vinho/20 hover:bg-aurora-vinho/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-aurora-dourado" />
          </button>
          
          <h3 className="text-xl font-alice text-aurora-pergaminho min-w-[200px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg bg-aurora-vinho/20 hover:bg-aurora-vinho/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-aurora-dourado" />
          </button>
        </div>
      </div>

      {/* Filtros Temáticos */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-aurora-dourado" />
          <span className="text-sm font-alice text-aurora-pergaminho/80">
            Filtrar por tema:
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {ELECTION_THEMES.map(theme => (
            <motion.button
              key={theme.id}
              onClick={() => toggleFilter(theme.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-alice
                transition-all duration-200 backdrop-blur-sm
                ${selectedFilters.includes(theme.id)
                  ? 'bg-aurora-dourado/30 text-aurora-pergaminho border-aurora-dourado/50'
                  : 'bg-aurora-vinho/20 text-aurora-pergaminho/80 border-aurora-vinho/30 hover:bg-aurora-vinho/30'
                }
                border
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme.icon}
              <span>{theme.name}</span>
              <span className="text-xs opacity-60">
                {filteredDays.filter(day => day.score[theme.id] >= 70).length}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid do Calendário */}
      <div className="bg-aurora-vinho/10 backdrop-blur-sm rounded-2xl p-6 border border-aurora-dourado/20">
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-alice text-aurora-dourado/80 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Dias do calendário */}
        <div className="grid grid-cols-7 gap-2">
          {/* Espaços vazios para o início do mês */}
          {Array.from({ length: calendarData.startingDayOfWeek }, (_, i) => (
            <div key={`empty-${i}`} className="h-20" />
          ))}

          {/* Dias do mês */}
          {calendarData.days.map(day => (
            <motion.div
              key={day.date.getDate()}
              onClick={() => openDayDrawer(day)}
              className={`
                h-20 p-2 rounded-lg border cursor-pointer
                transition-all duration-200 backdrop-blur-sm
                ${getDayColor(day)}
                hover:scale-105 hover:shadow-lg
              `}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-alice text-aurora-pergaminho">
                    {day.date.getDate()}
                  </span>
                  <div className="flex items-center space-x-1">
                    {LUNAR_PHASES[day.lunarPhase as keyof typeof LUNAR_PHASES] && (
                      <span className="text-xs">
                        {LUNAR_PHASES[day.lunarPhase as keyof typeof LUNAR_PHASES].symbol}
                      </span>
                    )}
                    {day.voidOfCourse && (
                      <span className="text-xs text-aurora-dourado/60" title="Lua Vazia de Curso">
                        ⚬
                      </span>
                    )}
                    {day.eclipse && (
                      <span className="text-xs text-aurora-vinho" title="Eclipse">
                        🌑
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  {day.lunarMansionData && (
                    <div className="text-center">
                      <div className="text-xs font-alice text-aurora-dourado/80 mb-1">
                        {day.lunarMansionData.espiritoToscano}
                      </div>
                      <div className="text-xs text-aurora-pergaminho/60">
                        {day.lunarMansionData.nome}
                      </div>
                    </div>
                  )}
                </div>

                {/* Scores dos temas selecionados */}
                {selectedFilters.length > 0 && (
                  <div className="flex justify-center space-x-1 mt-1">
                    {selectedFilters.slice(0, 3).map(filter => (
                      <div
                        key={filter}
                        className={`
                          w-2 h-2 rounded-full
                          ${day.score[filter] >= 80 ? 'bg-aurora-dourado' :
                            day.score[filter] >= 60 ? 'bg-aurora-salvia' :
                            day.score[filter] >= 40 ? 'bg-aurora-azul' :
                            'bg-aurora-vinho'}
                        `}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-center space-x-6 text-sm font-alice">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-aurora-dourado"></div>
          <span className="text-aurora-pergaminho/80">Excelente</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-aurora-salvia"></div>
          <span className="text-aurora-pergaminho/80">Bom</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-aurora-azul"></div>
          <span className="text-aurora-pergaminho/80">Neutro</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-aurora-vinho"></div>
          <span className="text-aurora-pergaminho/80">Desfavorável</span>
        </div>
      </div>

      {/* Day Drawer */}
      <AnimatePresence>
        {showDayDrawer && selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDayDrawer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-aurora-azul/90 backdrop-blur-xl rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-aurora-dourado/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                {/* Header do Drawer */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-cinzel text-aurora-dourado">
                    {selectedDay.date.toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <button
                    onClick={() => setShowDayDrawer(false)}
                    className="p-2 rounded-lg bg-aurora-vinho/20 hover:bg-aurora-vinho/30 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Informações da Mansão Lunar */}
                {selectedDay.lunarMansionData && (
                  <div className="bg-aurora-vinho/20 rounded-xl p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Moon className="w-6 h-6 text-aurora-dourado" />
                      <div>
                        <h4 className="text-lg font-cinzel text-aurora-dourado">
                          {selectedDay.lunarMansionData.nome} - {selectedDay.lunarMansionData.espiritoToscano}
                        </h4>
                        <p className="text-sm text-aurora-pergaminho/80">
                          {selectedDay.lunarMansionData.nomeArabico} • {selectedDay.lunarMansionData.natureza}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-cinzel text-aurora-dourado mb-2">Significado</h5>
                        <p className="text-sm text-aurora-pergaminho/80">
                          {selectedDay.lunarMansionData.significado}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-sm font-cinzel text-aurora-dourado mb-2">Regente</h5>
                        <p className="text-sm text-aurora-pergaminho/80">
                          {selectedDay.lunarMansionData.regente} • {selectedDay.lunarMansionData.elementoAssociado}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-cinzel text-aurora-dourado mb-2">Usos Mágicos</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedDay.lunarMansionData.usosMagicos.slice(0, 5).map((uso, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-aurora-dourado/20 text-aurora-pergaminho text-xs rounded-lg"
                          >
                            {uso}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-cinzel text-aurora-salvia mb-2">Favorável para</h5>
                        <ul className="text-xs text-aurora-pergaminho/80 space-y-1">
                          {selectedDay.lunarMansionData.favoravel.slice(0, 3).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-cinzel text-aurora-vinho mb-2">Evitar</h5>
                        <ul className="text-xs text-aurora-pergaminho/80 space-y-1">
                          {selectedDay.lunarMansionData.desfavoravel.slice(0, 3).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Correspondências */}
                    <div className="space-y-3">
                      <h5 className="text-sm font-cinzel text-aurora-dourado">Correspondências</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-aurora-salvia">Ervas:</span>
                          <p className="text-aurora-pergaminho/80">
                            {selectedDay.lunarMansionData.correspondencias.ervas.slice(0, 2).join(', ')}
                          </p>
                        </div>
                        <div>
                          <span className="text-aurora-salvia">Pedras:</span>
                          <p className="text-aurora-pergaminho/80">
                            {selectedDay.lunarMansionData.correspondencias.pedras.slice(0, 2).join(', ')}
                          </p>
                        </div>
                        <div>
                          <span className="text-aurora-salvia">Incensos:</span>
                          <p className="text-aurora-pergaminho/80">
                            {selectedDay.lunarMansionData.correspondencias.incensos.slice(0, 2).join(', ')}
                          </p>
                        </div>
                        <div>
                          <span className="text-aurora-salvia">Deusas:</span>
                          <p className="text-aurora-pergaminho/80">
                            {selectedDay.lunarMansionData.correspondencias.deusas.slice(0, 2).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Invocação */}
                    {selectedDay.lunarMansionData.invocacao && (
                      <div className="bg-aurora-azul/20 rounded-lg p-3">
                        <h5 className="text-sm font-cinzel text-aurora-dourado mb-2">Invocação</h5>
                        <p className="text-sm text-aurora-pergaminho/90 italic">
                          "{selectedDay.lunarMansionData.invocacao}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Scores por Tema */}
                <div className="space-y-3">
                  <h4 className="text-lg font-cinzel text-aurora-dourado">Eleições do Dia</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ELECTION_THEMES.map(theme => (
                      <div
                        key={theme.id}
                        className="bg-aurora-vinho/20 rounded-lg p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          {theme.icon}
                          <span className="text-sm font-alice text-aurora-pergaminho">
                            {theme.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-aurora-azul/30 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                selectedDay.score[theme.id] >= 80 ? 'bg-aurora-dourado' :
                                selectedDay.score[theme.id] >= 60 ? 'bg-aurora-salvia' :
                                selectedDay.score[theme.id] >= 40 ? 'bg-aurora-azul' :
                                'bg-aurora-vinho'
                              }`}
                              style={{ width: `${selectedDay.score[theme.id]}%` }}
                            />
                          </div>
                          <span className="text-xs text-aurora-pergaminho/80 min-w-[30px]">
                            {selectedDay.score[theme.id]}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="text-sm font-cinzel text-aurora-dourado">Fase Lunar</h5>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {LUNAR_PHASES[selectedDay.lunarPhase as keyof typeof LUNAR_PHASES]?.symbol}
                      </span>
                      <span className="text-sm text-aurora-pergaminho/80">
                        {LUNAR_PHASES[selectedDay.lunarPhase as keyof typeof LUNAR_PHASES]?.name}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-cinzel text-aurora-dourado">Status Especiais</h5>
                    <div className="space-y-1">
                      {selectedDay.voidOfCourse && (
                        <div className="flex items-center space-x-2 text-xs text-aurora-pergaminho/80">
                          <span>⚬</span>
                          <span>Lua Vazia de Curso</span>
                        </div>
                      )}
                      {selectedDay.eclipse && (
                        <div className="flex items-center space-x-2 text-xs text-aurora-vinho">
                          <span>🌑</span>
                          <span>Eclipse - Evitar magia</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagickCalendar;


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
  Gem,
  Leaf,
  BookOpen,
  Compass,
  Flame,
  Waves,
  Mountain,
  Wind
} from 'lucide-react';

// Importar dados
import mansoesLunaresData from '../../data/mansoes-lunares-expandido.json';
import { calcularEleicoesMagicas } from '../astro/eleicoes';
import { obterFaseLunar, calcularPosicoesPlanetarias } from '../astro/engine-efemerides';
import { calcularMansaoLunar } from '../astro/mansoes-lunares';

interface DayCompleteData {
  date: Date;
  dayNumber: number;
  
  // Informações Lunares
  lunarPhase: string;
  lunarMansion: number;
  lunarMansionData: any;
  
  // Eleições Mágicas
  electionScores: Record<string, number>;
  
  // Correspondências do Dia
  mantra: string;
  runa: {
    nome: string;
    simbolo: string;
    significado: string;
    elemento: string;
  };
  tarot: {
    carta: string;
    arcano: string;
    significado: string;
    conselho: string;
  };
  
  // Correspondências Naturais
  ervas: string[];
  cristais: string[];
  cores: string[];
  incensos: string[];
  elementos: string[];
  
  // Informações Astrológicas
  planetasEmDestaque: string[];
  aspectosImportantes: string[];
  transitosAtivos: string[];
  retrogradacoes: string[];
  
  // Usos Mágicos
  favoravel: string[];
  desfavoravel: string[];
  ritualRecomendado: string;
  
  // Status Especiais
  voidOfCourse: boolean;
  eclipse: boolean;
  sabbat?: string;
  esbat?: boolean;
}

// Dados das Runas
const RUNAS = [
  { nome: 'Fehu', simbolo: 'ᚠ', significado: 'Riqueza, gado, prosperidade', elemento: 'Terra' },
  { nome: 'Uruz', simbolo: 'ᚢ', significado: 'Força, vitalidade, coragem', elemento: 'Terra' },
  { nome: 'Thurisaz', simbolo: 'ᚦ', significado: 'Gigante, proteção, força', elemento: 'Fogo' },
  { nome: 'Ansuz', simbolo: 'ᚨ', significado: 'Deus, comunicação, sabedoria', elemento: 'Ar' },
  { nome: 'Raidho', simbolo: 'ᚱ', significado: 'Viagem, movimento, progresso', elemento: 'Ar' },
  { nome: 'Kenaz', simbolo: 'ᚲ', significado: 'Tocha, conhecimento, criatividade', elemento: 'Fogo' },
  { nome: 'Gebo', simbolo: 'ᚷ', significado: 'Presente, parceria, equilíbrio', elemento: 'Ar' },
  { nome: 'Wunjo', simbolo: 'ᚹ', significado: 'Alegria, harmonia, sucesso', elemento: 'Terra' },
  { nome: 'Hagalaz', simbolo: 'ᚺ', significado: 'Granizo, destruição, mudança', elemento: 'Água' },
  { nome: 'Nauthiz', simbolo: 'ᚾ', significado: 'Necessidade, resistência, força interior', elemento: 'Fogo' },
  { nome: 'Isa', simbolo: 'ᛁ', significado: 'Gelo, pausa, concentração', elemento: 'Água' },
  { nome: 'Jera', simbolo: 'ᛃ', significado: 'Ano, colheita, ciclos', elemento: 'Terra' },
  { nome: 'Eihwaz', simbolo: 'ᛇ', significado: 'Teixo, proteção, transformação', elemento: 'Terra' },
  { nome: 'Perthro', simbolo: 'ᛈ', significado: 'Destino, mistério, sorte', elemento: 'Água' },
  { nome: 'Algiz', simbolo: 'ᛉ', significado: 'Proteção, conexão divina', elemento: 'Ar' },
  { nome: 'Sowilo', simbolo: 'ᛊ', significado: 'Sol, sucesso, vitalidade', elemento: 'Fogo' },
  { nome: 'Tiwaz', simbolo: 'ᛏ', significado: 'Tyr, justiça, coragem', elemento: 'Fogo' },
  { nome: 'Berkano', simbolo: 'ᛒ', significado: 'Bétula, crescimento, fertilidade', elemento: 'Terra' },
  { nome: 'Ehwaz', simbolo: 'ᛖ', significado: 'Cavalo, parceria, progresso', elemento: 'Terra' },
  { nome: 'Mannaz', simbolo: 'ᛗ', significado: 'Homem, humanidade, cooperação', elemento: 'Ar' },
  { nome: 'Laguz', simbolo: 'ᛚ', significado: 'Água, intuição, fluxo', elemento: 'Água' },
  { nome: 'Ingwaz', simbolo: 'ᛜ', significado: 'Ing, fertilidade, potencial', elemento: 'Terra' },
  { nome: 'Othala', simbolo: 'ᛟ', significado: 'Herança, lar, tradição', elemento: 'Terra' },
  { nome: 'Dagaz', simbolo: 'ᛞ', significado: 'Dia, despertar, transformação', elemento: 'Fogo' }
];

// Dados do Tarot
const TAROT_ARCANOS = [
  { carta: 'O Louco', arcano: 'Arcano Maior 0', significado: 'Novos começos, espontaneidade', conselho: 'Confie na jornada' },
  { carta: 'O Mago', arcano: 'Arcano Maior I', significado: 'Manifestação, poder pessoal', conselho: 'Use suas habilidades' },
  { carta: 'A Sacerdotisa', arcano: 'Arcano Maior II', significado: 'Intuição, mistério', conselho: 'Ouça sua voz interior' },
  { carta: 'A Imperatriz', arcano: 'Arcano Maior III', significado: 'Fertilidade, abundância', conselho: 'Nutra seus projetos' },
  { carta: 'O Imperador', arcano: 'Arcano Maior IV', significado: 'Autoridade, estrutura', conselho: 'Seja disciplinado' },
  { carta: 'O Hierofante', arcano: 'Arcano Maior V', significado: 'Tradição, ensino', conselho: 'Busque orientação' },
  { carta: 'Os Amantes', arcano: 'Arcano Maior VI', significado: 'Escolhas, relacionamentos', conselho: 'Siga seu coração' },
  { carta: 'O Carro', arcano: 'Arcano Maior VII', significado: 'Determinação, controle', conselho: 'Mantenha o foco' },
  { carta: 'A Força', arcano: 'Arcano Maior VIII', significado: 'Coragem interior, paciência', conselho: 'Use a gentileza' },
  { carta: 'O Eremita', arcano: 'Arcano Maior IX', significado: 'Introspecção, sabedoria', conselho: 'Busque respostas dentro' },
  { carta: 'A Roda da Fortuna', arcano: 'Arcano Maior X', significado: 'Ciclos, destino', conselho: 'Aceite as mudanças' },
  { carta: 'A Justiça', arcano: 'Arcano Maior XI', significado: 'Equilíbrio, verdade', conselho: 'Seja justo e honesto' },
  { carta: 'O Enforcado', arcano: 'Arcano Maior XII', significado: 'Sacrifício, nova perspectiva', conselho: 'Mude seu ponto de vista' },
  { carta: 'A Morte', arcano: 'Arcano Maior XIII', significado: 'Transformação, fim de ciclo', conselho: 'Permita a renovação' },
  { carta: 'A Temperança', arcano: 'Arcano Maior XIV', significado: 'Moderação, alquimia', conselho: 'Encontre o equilíbrio' },
  { carta: 'O Diabo', arcano: 'Arcano Maior XV', significado: 'Tentação, limitações', conselho: 'Liberte-se das amarras' },
  { carta: 'A Torre', arcano: 'Arcano Maior XVI', significado: 'Mudança súbita, revelação', conselho: 'Aceite a transformação' },
  { carta: 'A Estrela', arcano: 'Arcano Maior XVII', significado: 'Esperança, inspiração', conselho: 'Mantenha a fé' },
  { carta: 'A Lua', arcano: 'Arcano Maior XVIII', significado: 'Ilusão, intuição', conselho: 'Confie na intuição' },
  { carta: 'O Sol', arcano: 'Arcano Maior XIX', significado: 'Sucesso, vitalidade', conselho: 'Celebre suas conquistas' },
  { carta: 'O Julgamento', arcano: 'Arcano Maior XX', significado: 'Renascimento, chamado', conselho: 'Responda ao chamado' },
  { carta: 'O Mundo', arcano: 'Arcano Maior XXI', significado: 'Completude, realização', conselho: 'Celebre o sucesso' }
];

// Mantras por elemento/energia
const MANTRAS = [
  'Om Gam Ganapataye Namaha', // Ganesha - Remoção de obstáculos
  'Om Namah Shivaya', // Shiva - Transformação
  'Om Shri Dhanvantre Namaha', // Dhanvantari - Cura
  'Om Shri Lakshmi Namaha', // Lakshmi - Prosperidade
  'Om Aim Saraswatyai Namaha', // Saraswati - Sabedoria
  'Om Dum Durgayei Namaha', // Durga - Proteção
  'Om Hrim Chandikayai Namaha', // Chandi - Poder feminino
  'Om Klim Krishnaya Namaha', // Krishna - Amor divino
  'Om Ram Ramaya Namaha', // Rama - Retidão
  'Om Hraum Mitraya Namaha', // Mitra - Amizade
  'Om Shram Shreem Shroum Sah Suryaya Namaha', // Surya - Energia solar
  'Om Som Somaya Namaha', // Soma - Energia lunar
  'Om Bum Budhaya Namaha', // Budha - Comunicação
  'Om Shum Shukraya Namaha', // Shukra - Amor e beleza
  'Om Kram Krim Kraum Sah Bhaumaya Namaha', // Mangal - Energia marcial
  'Om Brim Brihaspataye Namaha', // Júpiter - Sabedoria
  'Om Pram Prim Praum Sah Shanaye Namaha', // Saturno - Disciplina
  'Om Hrim Hraum Hrim Glaum Gam Ganapataye Vara Varada Sarva Janam Me Vashamanaya Svaha',
  'Gate Gate Paragate Parasamgate Bodhi Svaha', // Mantra do Coração
  'Om Mani Padme Hum', // Compaixão
  'So Hum', // Eu sou
  'Sat Nam', // Verdade é meu nome
  'Om Shanti Shanti Shanti', // Paz
  'Lokah Samastah Sukhino Bhavantu', // Que todos sejam felizes
  'Om Tare Tuttare Ture Svaha', // Tara Verde - Proteção
  'Om Ah Hum Vajra Guru Padma Siddhi Hum', // Guru Rinpoche
  'Om Hreem Shreem Kleem Maha Lakshmi Namaha', // Grande Lakshmi
  'Om Gam Shreem Maha Ganapataye Namaha' // Grande Ganesha
];

const ELECTION_THEMES = [
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

interface CalendarioCompletoProps {
  hemisphere: 'norte' | 'sul';
  compactMode?: boolean;
}

const CalendarioCompleto: React.FC<CalendarioCompletoProps> = ({ hemisphere, compactMode = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayCompleteData | null>(null);
  const [showDayDrawer, setShowDayDrawer] = useState(false);
  const [calendarData, setCalendarData] = useState<{ days: DayCompleteData[], startingDayOfWeek: number }>({ days: [], startingDayOfWeek: 0 });

  // Função para gerar dados completos do dia
  const generateDayData = async (date: Date): Promise<DayCompleteData> => {
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    // Calcular mansão lunar
    const lunarMansion = calcularMansaoLunar(date);
    const lunarMansionData = mansoesLunaresData.mansoes[lunarMansion.toString()];
    
    // Calcular fase lunar
    const lunarPhase = obterFaseLunar(date).fase.toLowerCase();
    
    // Calcular eleições mágicas
    const electionScores: Record<string, number> = {};
    for (const theme of ELECTION_THEMES) {
      try {
        const electionData = await calcularEleicoesMagicas(date, theme.id);
        electionScores[theme.id] = electionData.score || 50;
      } catch (error) {
        electionScores[theme.id] = 50 + Math.random() * 40; // Fallback
      }
    }
    
    // Selecionar runa do dia (baseado no dia do ano)
    const runaIndex = dayOfYear % RUNAS.length;
    const runa = RUNAS[runaIndex];
    
    // Selecionar carta de tarot (baseado no dia do ano)
    const tarotIndex = dayOfYear % TAROT_ARCANOS.length;
    const tarot = TAROT_ARCANOS[tarotIndex];
    
    // Selecionar mantra (baseado na mansão lunar)
    const mantraIndex = lunarMansion % MANTRAS.length;
    const mantra = MANTRAS[mantraIndex];
    
    // Correspondências baseadas na mansão lunar
    const ervas = lunarMansionData?.correspondencias?.ervas || ['Sálvia', 'Alecrim'];
    const cristais = lunarMansionData?.correspondencias?.pedras || ['Quartzo', 'Ametista'];
    const cores = lunarMansionData?.correspondencias?.cores || ['Branco', 'Dourado'];
    const incensos = lunarMansionData?.correspondencias?.incensos || ['Sândalo', 'Mirra'];
    
    // Calcular posições planetárias para trânsitos
    let planetasEmDestaque: string[] = [];
    let aspectosImportantes: string[] = [];
    let transitosAtivos: string[] = [];
    let retrogradacoes: string[] = [];
    
    try {
      const posicoes = calcularPosicoesPlanetarias(date);
      // Processar dados planetários aqui
      planetasEmDestaque = ['Sol', 'Lua', 'Mercúrio']; // Placeholder
      aspectosImportantes = ['Sol trígono Lua', 'Vênus sextil Marte']; // Placeholder
      transitosAtivos = ['Lua em Peixes', 'Mercúrio em Virgem']; // Placeholder
      retrogradacoes = []; // Placeholder
    } catch (error) {
      // Fallback com dados simulados
      planetasEmDestaque = ['Sol', 'Lua'];
      aspectosImportantes = ['Configuração harmoniosa'];
      transitosAtivos = ['Energia lunar favorável'];
    }
    
    return {
      date,
      dayNumber: date.getDate(),
      lunarPhase,
      lunarMansion,
      lunarMansionData,
      electionScores,
      mantra,
      runa,
      tarot,
      ervas,
      cristais,
      cores,
      incensos,
      elementos: [runa.elemento],
      planetasEmDestaque,
      aspectosImportantes,
      transitosAtivos,
      retrogradacoes,
      favoravel: lunarMansionData?.favoravel || ['Meditação', 'Reflexão'],
      desfavoravel: lunarMansionData?.desfavoravel || ['Decisões impulsivas'],
      ritualRecomendado: lunarMansionData?.usosMagicos?.[0] || 'Ritual de harmonização',
      voidOfCourse: Math.random() < 0.1, // 10% de chance
      eclipse: false, // Será calculado com dados reais
      esbat: lunarPhase === 'cheia'
    };
  };

  // Gerar dados do calendário
  useEffect(() => {
    const generateCalendarData = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1);
      const startingDayOfWeek = firstDayOfMonth.getDay();

      // Primeiro, criar estrutura básica das datas para exibição imediata
      const basicDays: DayCompleteData[] = [];
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        
        // Dados básicos para exibição imediata
        const runaIndex = dayOfYear % RUNAS.length;
        const runa = RUNAS[runaIndex];
        
        const basicDayData: DayCompleteData = {
          date,
          dayNumber: day,
          lunarPhase: 'nova',
          lunarMansion: 1,
          lunarMansionData: { nome: 'Carregando...' },
          electionScores: {
            amor: 50,
            trabalho: 50,
            beleza: 50,
            prosperidade: 50,
            justica: 50,
            contato: 50
          },
          mantra: 'Om Mani Padme Hum',
          runa,
          tarot: TAROT_ARCANOS[dayOfYear % TAROT_ARCANOS.length],
          ervas: ['Sálvia', 'Alecrim'],
          cristais: ['Quartzo', 'Ametista'],
          cores: ['Branco', 'Dourado'],
          incensos: ['Sândalo', 'Mirra'],
          elementos: [runa.elemento],
          planetasEmDestaque: ['Sol', 'Lua'],
          aspectosImportantes: ['Configuração harmoniosa'],
          transitosAtivos: ['Energia favorável'],
          retrogradacoes: [],
          favoravel: ['Meditação', 'Reflexão'],
          desfavoravel: ['Decisões impulsivas'],
          ritualRecomendado: 'Ritual de harmonização',
          voidOfCourse: false,
          eclipse: false,
          esbat: false
        };
        
        basicDays.push(basicDayData);
      }

      // Definir dados básicos imediatamente
      setCalendarData({ days: basicDays, startingDayOfWeek });

      // Depois, calcular dados completos em segundo plano
      const completeDays: DayCompleteData[] = [];
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        try {
          const dayData = await generateDayData(date);
          completeDays.push(dayData);
        } catch (error) {
          console.warn(`Erro ao gerar dados para ${day}/${month + 1}:`, error);
          completeDays.push(basicDays[day - 1]); // Usar dados básicos como fallback
        }
      }

      // Atualizar com dados completos
      setCalendarData({ days: completeDays, startingDayOfWeek });
    };

    generateCalendarData();
  }, [currentDate]);

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

  const openDayDrawer = (dayData: DayCompleteData) => {
    setSelectedDay(dayData);
    setShowDayDrawer(true);
  };

  const getDayColor = (day: DayCompleteData): string => {
    const avgScore = Object.values(day.electionScores).reduce((a, b) => a + b, 0) / Object.values(day.electionScores).length;
    if (avgScore >= 80) return 'bg-aurora-dourado/20 border-aurora-dourado/40';
    if (avgScore >= 60) return 'bg-aurora-salvia/20 border-aurora-salvia/40';
    if (avgScore >= 40) return 'bg-aurora-azul/20 border-aurora-azul/40';
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
            Calendário Astromágicko Completo
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
            <div key={`empty-${i}`} className="h-24" />
          ))}

          {/* Dias do mês */}
          {calendarData.days.map(day => (
            <motion.div
              key={day.dayNumber}
              onClick={() => openDayDrawer(day)}
              className={`
                h-24 p-2 rounded-lg border cursor-pointer
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
                    {day.dayNumber}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">
                      {LUNAR_PHASES[day.lunarPhase as keyof typeof LUNAR_PHASES]?.symbol}
                    </span>
                    {day.esbat && (
                      <span className="text-xs text-aurora-dourado" title="Esbat - Lua Cheia">
                        ✨
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="text-lg mb-1" title={`Runa: ${day.runa.nome}`}>
                    {day.runa.simbolo}
                  </div>
                  <div className="text-xs text-aurora-pergaminho/60 text-center">
                    {day.lunarMansionData?.nome || `Mansão ${day.lunarMansion}`}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Day Drawer Completo */}
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
              className="bg-aurora-azul/90 backdrop-blur-xl rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-aurora-dourado/30"
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

                {/* Grid Principal de Informações */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Coluna Esquerda - Informações Astrológicas */}
                  <div className="space-y-4">
                    
                    {/* Mansão Lunar */}
                    <div className="bg-aurora-vinho/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Moon className="w-6 h-6 text-aurora-dourado" />
                        <h4 className="text-lg font-cinzel text-aurora-dourado">
                          Mansão Lunar {selectedDay.lunarMansion}
                        </h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-aurora-pergaminho">
                          <strong>{selectedDay.lunarMansionData?.nome}</strong> - {selectedDay.lunarMansionData?.espiritoToscano}
                        </p>
                        <p className="text-xs text-aurora-pergaminho/80">
                          {selectedDay.lunarMansionData?.significado}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-aurora-salvia">Fase:</span>
                          <span className="text-xs text-aurora-pergaminho">
                            {LUNAR_PHASES[selectedDay.lunarPhase as keyof typeof LUNAR_PHASES]?.name} 
                            {LUNAR_PHASES[selectedDay.lunarPhase as keyof typeof LUNAR_PHASES]?.symbol}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Runa do Dia */}
                    <div className="bg-aurora-vinho/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Compass className="w-6 h-6 text-aurora-dourado" />
                        <h4 className="text-lg font-cinzel text-aurora-dourado">Runa do Dia</h4>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-4xl text-aurora-dourado">{selectedDay.runa.simbolo}</div>
                        <p className="text-sm font-alice text-aurora-pergaminho">
                          <strong>{selectedDay.runa.nome}</strong>
                        </p>
                        <p className="text-xs text-aurora-pergaminho/80">
                          {selectedDay.runa.significado}
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-xs text-aurora-salvia">Elemento:</span>
                          <span className="text-xs text-aurora-pergaminho">{selectedDay.runa.elemento}</span>
                        </div>
                      </div>
                    </div>

                    {/* Carta de Tarot */}
                    <div className="bg-aurora-vinho/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Eye className="w-6 h-6 text-aurora-dourado" />
                        <h4 className="text-lg font-cinzel text-aurora-dourado">Tarot do Dia</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-alice text-aurora-pergaminho">
                          <strong>{selectedDay.tarot.carta}</strong>
                        </p>
                        <p className="text-xs text-aurora-salvia">{selectedDay.tarot.arcano}</p>
                        <p className="text-xs text-aurora-pergaminho/80">
                          {selectedDay.tarot.significado}
                        </p>
                        <div className="bg-aurora-azul/20 rounded-lg p-2">
                          <p className="text-xs text-aurora-pergaminho italic">
                            <strong>Conselho:</strong> {selectedDay.tarot.conselho}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mantra do Dia */}
                    <div className="bg-aurora-vinho/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <BookOpen className="w-6 h-6 text-aurora-dourado" />
                        <h4 className="text-lg font-cinzel text-aurora-dourado">Mantra do Dia</h4>
                      </div>
                      <div className="bg-aurora-azul/20 rounded-lg p-3 text-center">
                        <p className="text-sm text-aurora-pergaminho font-alice italic">
                          "{selectedDay.mantra}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita - Correspondências e Usos */}
                  <div className="space-y-4">
                    
                    {/* Correspondências Naturais */}
                    <div className="bg-aurora-vinho/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Leaf className="w-6 h-6 text-aurora-dourado" />
                        <h4 className="text-lg font-cinzel text-aurora-dourado">Correspondências</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-aurora-salvia font-semibold">Ervas:</span>
                          <p className="text-aurora-pergaminho/80">
                            {selectedDay.ervas.slice(0, 3).join(', ')}
                          </p>
                        </div>
                        <div>
                          <span className="text-aurora-salvia font-semibold">Cristais:</span>
                          <p className="text-aurora-pergaminho/80">
                            {selectedDay.cristais.slice(0, 3).join(', ')}
                          </p>
                        </div>
                        <div>
                          <span className="text-aurora-salvia font-semibold">Cores:</span>
                          <p className="text-aurora-pergaminho/80">
                            {selectedDay.cores.slice(0, 3).join(', ')}
                          </p>
                        </div>
                        <div>
                          <span className="text-aurora-salvia font-semibold">Incensos:</span>
                          <p className="text-aurora-pergaminho/80">
                            {selectedDay.incensos.slice(0, 3).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Usos Mágicos */}
                    <div className="bg-aurora-vinho/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Sparkles className="w-6 h-6 text-aurora-dourado" />
                        <h4 className="text-lg font-cinzel text-aurora-dourado">Usos Mágicos</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-cinzel text-aurora-salvia mb-2">Favorável para:</h5>
                          <div className="flex flex-wrap gap-1">
                            {selectedDay.favoravel.slice(0, 4).map((item, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-aurora-salvia/20 text-aurora-pergaminho text-xs rounded-lg"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-cinzel text-aurora-vinho mb-2">Evitar:</h5>
                          <div className="flex flex-wrap gap-1">
                            {selectedDay.desfavoravel.slice(0, 4).map((item, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-aurora-vinho/20 text-aurora-pergaminho text-xs rounded-lg"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-aurora-azul/20 rounded-lg p-3">
                          <h5 className="text-sm font-cinzel text-aurora-dourado mb-1">Ritual Recomendado:</h5>
                          <p className="text-xs text-aurora-pergaminho/90">
                            {selectedDay.ritualRecomendado}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Trânsitos Astrológicos */}
                    <div className="bg-aurora-vinho/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Star className="w-6 h-6 text-aurora-dourado" />
                        <h4 className="text-lg font-cinzel text-aurora-dourado">Trânsitos Atuais</h4>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-sm font-cinzel text-aurora-salvia mb-1">Planetas em Destaque:</h5>
                          <p className="text-xs text-aurora-pergaminho/80">
                            {selectedDay.planetasEmDestaque.join(', ')}
                          </p>
                        </div>
                        <div>
                          <h5 className="text-sm font-cinzel text-aurora-salvia mb-1">Aspectos Importantes:</h5>
                          <ul className="text-xs text-aurora-pergaminho/80 space-y-1">
                            {selectedDay.aspectosImportantes.map((aspecto, index) => (
                              <li key={index}>• {aspecto}</li>
                            ))}
                          </ul>
                        </div>
                        {selectedDay.retrogradacoes.length > 0 && (
                          <div>
                            <h5 className="text-sm font-cinzel text-aurora-vinho mb-1">Retrogradações:</h5>
                            <p className="text-xs text-aurora-pergaminho/80">
                              {selectedDay.retrogradacoes.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Eleições do Dia */}
                    <div className="bg-aurora-vinho/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Scale className="w-6 h-6 text-aurora-dourado" />
                        <h4 className="text-lg font-cinzel text-aurora-dourado">Eleições do Dia</h4>
                      </div>
                      <div className="space-y-2">
                        {ELECTION_THEMES.map(theme => (
                          <div
                            key={theme.id}
                            className="flex items-center justify-between p-2 bg-aurora-azul/20 rounded-lg"
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
                                    selectedDay.electionScores[theme.id] >= 80 ? 'bg-aurora-dourado' :
                                    selectedDay.electionScores[theme.id] >= 60 ? 'bg-aurora-salvia' :
                                    selectedDay.electionScores[theme.id] >= 40 ? 'bg-aurora-azul' :
                                    'bg-aurora-vinho'
                                  }`}
                                  style={{ width: `${selectedDay.electionScores[theme.id]}%` }}
                                />
                              </div>
                              <span className="text-xs text-aurora-pergaminho/80 min-w-[30px]">
                                {Math.round(selectedDay.electionScores[theme.id])}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invocação da Mansão Lunar */}
                {selectedDay.lunarMansionData?.invocacao && (
                  <div className="bg-gradient-to-r from-aurora-azul/20 to-aurora-vinho/20 rounded-xl p-4 border border-aurora-dourado/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <Flame className="w-6 h-6 text-aurora-dourado" />
                      <h4 className="text-lg font-cinzel text-aurora-dourado">Invocação da Mansão</h4>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-aurora-pergaminho/90 italic font-alice">
                        "{selectedDay.lunarMansionData.invocacao}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarioCompleto;


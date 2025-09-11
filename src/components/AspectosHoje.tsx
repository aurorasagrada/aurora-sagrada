import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Circle, Triangle, Square, Star, Clock } from 'lucide-react';

interface Aspecto {
  planeta1: string;
  simbolo1: string;
  planeta2: string;
  simbolo2: string;
  aspecto: string;
  simboloAspecto: string;
  orbe: number;
  exato: string;
  duracao: string;
  intensidade: 'Forte' | 'Moderada' | 'Fraca';
  natureza: 'Harmonioso' | 'Tenso' | 'Neutro';
  interpretacao: string;
  usosMagicos: string[];
}

const AspectosHoje: React.FC = () => {
  // Dados dos aspectos atuais (simulados - em produção viriam do engine)
  const aspectosAtuais: Aspecto[] = [
    {
      planeta1: 'Sol',
      simbolo1: '☉',
      planeta2: 'Lua',
      simbolo2: '☽',
      aspecto: 'Trígono',
      simboloAspecto: '△',
      orbe: 2.3,
      exato: '14:30',
      duracao: '6 horas',
      intensidade: 'Forte',
      natureza: 'Harmonioso',
      interpretacao: 'Harmonia perfeita entre consciência e emoções. Este é um dos aspectos mais favoráveis, trazendo equilíbrio interno, clareza emocional e facilidade para manifestar intenções. A energia solar ilumina as emoções lunares de forma construtiva.',
      usosMagicos: ['Rituais de equilíbrio', 'Manifestação de desejos', 'Cura emocional', 'Trabalhos de harmonia']
    },
    {
      planeta1: 'Vênus',
      simbolo1: '♀',
      planeta2: 'Marte',
      simbolo2: '♂',
      aspecto: 'Sextil',
      simboloAspecto: '⚹',
      orbe: 1.8,
      exato: '18:45',
      duracao: '4 horas',
      intensidade: 'Moderada',
      natureza: 'Harmonioso',
      interpretacao: 'Energia criativa e amorosa em perfeita sintonia. O amor e a paixão se equilibram, criando oportunidades para relacionamentos harmoniosos e expressão artística. Excelente para trabalhos que envolvem beleza e ação.',
      usosMagicos: ['Rituais de amor', 'Arte mágica', 'Atração', 'Criatividade']
    },
    {
      planeta1: 'Mercúrio',
      simbolo1: '☿',
      planeta2: 'Júpiter',
      simbolo2: '♃',
      aspecto: 'Conjunção',
      simboloAspecto: '☌',
      orbe: 0.5,
      exato: '21:15',
      duracao: '2 horas',
      intensidade: 'Forte',
      natureza: 'Neutro',
      interpretacao: 'Expansão da mente e comunicação. Pensamentos grandiosos e visão ampla se combinam com habilidade comunicativa. Período excelente para estudos, ensino, publicações e trabalhos intelectuais de grande alcance.',
      usosMagicos: ['Estudos esotéricos', 'Comunicação mágica', 'Expansão mental', 'Sabedoria']
    },
    {
      planeta1: 'Saturno',
      simbolo1: '♄',
      planeta2: 'Urano',
      simbolo2: '♅',
      aspecto: 'Quadratura',
      simboloAspecto: '□',
      orbe: 3.2,
      exato: 'Amanhã 08:30',
      duracao: '12 horas',
      intensidade: 'Forte',
      natureza: 'Tenso',
      interpretacao: 'Tensão entre tradição e inovação. Conflito entre estruturas estabelecidas e necessidade de mudança. Pode gerar frustrações, mas também oportunidades de crescimento através da superação de limitações.',
      usosMagicos: ['Quebra de padrões', 'Libertação', 'Transformação estrutural', 'Superação de limites']
    }
  ];

  const getAspectoIcon = (aspecto: string) => {
    switch (aspecto) {
      case 'Conjunção': return <Circle className="w-4 h-4" />;
      case 'Trígono': return <Triangle className="w-4 h-4" />;
      case 'Quadratura': return <Square className="w-4 h-4" />;
      case 'Sextil': return <Star className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getNaturezaColor = (natureza: string) => {
    switch (natureza) {
      case 'Harmonioso': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Tenso': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    }
  };

  const getIntensidadeColor = (intensidade: string) => {
    switch (intensidade) {
      case 'Forte': return 'text-aurora-gold';
      case 'Moderada': return 'text-aurora-silver';
      default: return 'text-aurora-copper';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-aurora-dark-secondary/80 backdrop-blur-sm rounded-lg border border-aurora-purple/30 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="w-6 h-6 text-aurora-gold" />
        <h2 className="text-xl font-bold text-aurora-gold">Aspectos de Hoje</h2>
        <div className="flex items-center space-x-1 text-aurora-silver text-sm">
          <Clock className="w-4 h-4" />
          <span>Tempo Real</span>
        </div>
      </div>

      <div className="space-y-4">
        {aspectosAtuais.map((aspecto, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-aurora-dark-primary/50 rounded-lg border border-aurora-gold/20"
          >
            {/* Cabeçalho do Aspecto */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{aspecto.simbolo1}</span>
                <span className="text-aurora-gold font-semibold">{aspecto.planeta1}</span>
                <div className="flex items-center space-x-1">
                  {getAspectoIcon(aspecto.aspecto)}
                  <span className="text-lg text-aurora-silver">{aspecto.simboloAspecto}</span>
                </div>
                <span className="text-aurora-gold font-semibold">{aspecto.planeta2}</span>
                <span className="text-2xl">{aspecto.simbolo2}</span>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs border ${getNaturezaColor(aspecto.natureza)}`}>
                {aspecto.natureza}
              </div>
            </div>

            {/* Detalhes Técnicos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
              <div>
                <span className="text-aurora-copper">Aspecto:</span>
                <p className="text-aurora-silver font-semibold">{aspecto.aspecto}</p>
              </div>
              <div>
                <span className="text-aurora-copper">Orbe:</span>
                <p className="text-aurora-silver">{aspecto.orbe}°</p>
              </div>
              <div>
                <span className="text-aurora-copper">Exato:</span>
                <p className="text-aurora-silver">{aspecto.exato}</p>
              </div>
              <div>
                <span className="text-aurora-copper">Duração:</span>
                <p className={getIntensidadeColor(aspecto.intensidade)}>{aspecto.duracao}</p>
              </div>
            </div>

            {/* Interpretação */}
            <div className="mb-3">
              <p className="text-aurora-silver text-sm leading-relaxed">
                {aspecto.interpretacao}
              </p>
            </div>

            {/* Usos Mágicos */}
            <div>
              <span className="text-aurora-gold font-semibold text-sm">Usos Mágicos:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {aspecto.usosMagicos.map((uso, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-aurora-purple/20 text-aurora-silver text-xs rounded-full border border-aurora-purple/30"
                  >
                    {uso}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resumo */}
      <div className="mt-6 p-4 bg-aurora-dark-primary/30 rounded-lg border border-aurora-silver/20">
        <h3 className="text-aurora-gold font-semibold mb-2">Resumo Energético</h3>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-green-400 font-bold">
              {aspectosAtuais.filter(a => a.natureza === 'Harmonioso').length}
            </p>
            <p className="text-aurora-silver">Harmoniosos</p>
          </div>
          <div>
            <p className="text-red-400 font-bold">
              {aspectosAtuais.filter(a => a.natureza === 'Tenso').length}
            </p>
            <p className="text-aurora-silver">Tensos</p>
          </div>
          <div>
            <p className="text-yellow-400 font-bold">
              {aspectosAtuais.filter(a => a.natureza === 'Neutro').length}
            </p>
            <p className="text-aurora-silver">Neutros</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AspectosHoje;


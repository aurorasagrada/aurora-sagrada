import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Calendar, Clock, Star, Sparkles } from 'lucide-react';

interface Esbat {
  nome: string;
  data: string;
  hora: string;
  diasRestantes: number;
  fase: string;
  signo: string;
  simboloSigno: string;
  grau: number;
  poder: string;
  rituais: string[];
  correspondencias: {
    cores: string[];
    ervas: string[];
    cristais: string[];
    incensos: string[];
  };
  descricao: string;
}

const ProximosEsbats: React.FC = () => {
  // Dados dos próximos esbats (simulados - em produção viriam de cálculos lunares)
  const proximosEsbats: Esbat[] = [
    {
      nome: 'Lua Nova em Virgem',
      data: '15 de Setembro',
      hora: '02:40',
      diasRestantes: 4,
      fase: 'Nova',
      signo: 'Virgem',
      simboloSigno: '♍',
      grau: 22,
      poder: 'Purificação e Organização',
      rituais: ['Limpeza energética', 'Novos começos', 'Cura e saúde', 'Organização da vida'],
      correspondencias: {
        cores: ['Branco', 'Verde terra', 'Marrom'],
        ervas: ['Lavanda', 'Alecrim', 'Sálvia', 'Camomila'],
        cristais: ['Amazonita', 'Sodalita', 'Fluorita verde'],
        incensos: ['Sândalo', 'Cedro', 'Patchouli']
      },
      descricao: 'Lua Nova em Virgem traz energia de purificação, organização e atenção aos detalhes. Ideal para rituais de limpeza, cura e estabelecimento de rotinas saudáveis.'
    },
    {
      nome: 'Lua Cheia em Peixes',
      data: '29 de Setembro',
      hora: '06:58',
      diasRestantes: 18,
      fase: 'Cheia',
      signo: 'Peixes',
      simboloSigno: '♓',
      grau: 6,
      poder: 'Intuição e Espiritualidade',
      rituais: ['Divinação', 'Sonhos lúcidos', 'Cura emocional', 'Conexão espiritual'],
      correspondencias: {
        cores: ['Azul oceano', 'Violeta', 'Prata', 'Verde água'],
        ervas: ['Jasmim', 'Lótus', 'Mirra', 'Violeta'],
        cristais: ['Ametista', 'Pedra da lua', 'Aquamarina', 'Labradorita'],
        incensos: ['Jasmim', 'Mirra', 'Copal', 'Benjoim']
      },
      descricao: 'Lua Cheia em Peixes amplifica a intuição e a conexão espiritual. Momento poderoso para trabalhos psíquicos, cura emocional e rituais de transcendência.'
    },
    {
      nome: 'Lua Nova em Libra',
      data: '14 de Outubro',
      hora: '15:55',
      diasRestantes: 33,
      fase: 'Nova',
      signo: 'Libra',
      simboloSigno: '♎',
      grau: 21,
      poder: 'Equilíbrio e Relacionamentos',
      rituais: ['Harmonia nos relacionamentos', 'Justiça', 'Beleza', 'Equilíbrio'],
      correspondencias: {
        cores: ['Rosa', 'Verde claro', 'Azul suave', 'Dourado'],
        ervas: ['Rosa', 'Hibisco', 'Lavanda', 'Manjericão'],
        cristais: ['Quartzo rosa', 'Esmeralda', 'Jade', 'Turmalina rosa'],
        incensos: ['Rosa', 'Ylang-ylang', 'Sândalo rosa']
      },
      descricao: 'Lua Nova em Libra favorece o equilíbrio, a harmonia nos relacionamentos e a busca pela justiça. Ideal para rituais de amor, beleza e diplomacia.'
    },
    {
      nome: 'Lua Cheia em Áries',
      data: '28 de Outubro',
      hora: '21:24',
      diasRestantes: 47,
      fase: 'Cheia',
      signo: 'Áries',
      simboloSigno: '♈',
      grau: 5,
      poder: 'Coragem e Liderança',
      rituais: ['Coragem', 'Liderança', 'Novos projetos', 'Força interior'],
      correspondencias: {
        cores: ['Vermelho', 'Laranja', 'Dourado', 'Escarlate'],
        ervas: ['Canela', 'Gengibre', 'Pimenta', 'Alho'],
        cristais: ['Rubi', 'Cornalina', 'Hematita', 'Jaspe vermelho'],
        incensos: ['Canela', 'Olíbano', 'Sangue de dragão']
      },
      descricao: 'Lua Cheia em Áries traz energia de coragem, iniciativa e liderança. Momento poderoso para rituais de força, proteção e início de novos empreendimentos.'
    }
  ];

  const getFaseIcon = (fase: string) => {
    switch (fase) {
      case 'Nova': return '🌑';
      case 'Cheia': return '🌕';
      case 'Crescente': return '🌓';
      case 'Minguante': return '🌗';
      default: return '🌙';
    }
  };

  const getDiasColor = (dias: number) => {
    if (dias <= 7) return 'text-aurora-gold';
    if (dias <= 14) return 'text-aurora-silver';
    return 'text-aurora-copper';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-aurora-dark-secondary/80 backdrop-blur-sm rounded-lg border border-aurora-purple/30 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Moon className="w-6 h-6 text-aurora-silver" />
        <h2 className="text-xl font-bold text-aurora-gold">Próximos Esbats</h2>
        <div className="flex items-center space-x-1 text-aurora-silver text-sm">
          <Calendar className="w-4 h-4" />
          <span>Calendário Lunar</span>
        </div>
      </div>

      <div className="space-y-6">
        {proximosEsbats.map((esbat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 bg-aurora-dark-primary/50 rounded-lg border border-aurora-silver/20"
          >
            {/* Cabeçalho do Esbat */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getFaseIcon(esbat.fase)}</span>
                <div>
                  <h3 className="text-aurora-gold font-bold text-lg">{esbat.nome}</h3>
                  <div className="flex items-center space-x-2 text-sm text-aurora-silver">
                    <span>{esbat.data}</span>
                    <span>•</span>
                    <span>{esbat.hora}</span>
                    <span>•</span>
                    <span>{esbat.grau}° {esbat.simboloSigno}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-2xl font-bold ${getDiasColor(esbat.diasRestantes)}`}>
                  {esbat.diasRestantes}
                </p>
                <p className="text-aurora-copper text-sm">dias</p>
              </div>
            </div>

            {/* Poder Principal */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-aurora-gold" />
                <span className="text-aurora-gold font-semibold">Poder:</span>
              </div>
              <p className="text-aurora-silver font-semibold">{esbat.poder}</p>
            </div>

            {/* Descrição */}
            <div className="mb-4">
              <p className="text-aurora-silver text-sm leading-relaxed">
                {esbat.descricao}
              </p>
            </div>

            {/* Rituais Recomendados */}
            <div className="mb-4">
              <span className="text-aurora-gold font-semibold text-sm">Rituais Recomendados:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {esbat.rituais.map((ritual, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-aurora-purple/20 text-aurora-silver text-xs rounded-full border border-aurora-purple/30"
                  >
                    {ritual}
                  </span>
                ))}
              </div>
            </div>

            {/* Correspondências */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-aurora-gold font-semibold">Cores:</span>
                <p className="text-aurora-silver">{esbat.correspondencias.cores.slice(0, 2).join(', ')}</p>
              </div>
              <div>
                <span className="text-aurora-gold font-semibold">Ervas:</span>
                <p className="text-aurora-silver">{esbat.correspondencias.ervas.slice(0, 2).join(', ')}</p>
              </div>
              <div>
                <span className="text-aurora-gold font-semibold">Cristais:</span>
                <p className="text-aurora-silver">{esbat.correspondencias.cristais.slice(0, 2).join(', ')}</p>
              </div>
              <div>
                <span className="text-aurora-gold font-semibold">Incensos:</span>
                <p className="text-aurora-silver">{esbat.correspondencias.incensos.slice(0, 2).join(', ')}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dica */}
      <div className="mt-6 p-4 bg-aurora-dark-primary/30 rounded-lg border border-aurora-gold/20">
        <div className="flex items-center space-x-2 mb-2">
          <Star className="w-4 h-4 text-aurora-gold" />
          <span className="text-aurora-gold font-semibold text-sm">Dica Lunar</span>
        </div>
        <p className="text-aurora-silver text-sm">
          Os esbats são celebrações das fases lunares, especialmente da Lua Cheia. 
          Cada fase oferece energias específicas para diferentes tipos de trabalhos mágicos. 
          Prepare-se com antecedência reunindo as correspondências apropriadas.
        </p>
      </div>
    </motion.div>
  );
};

export default ProximosEsbats;


/**
 * NowCard - Versão Simplificada
 * Mostra informações astrológicas básicas sem depender de cálculos complexos
 */

import React from 'react';
import { motion } from 'framer-motion';

interface SimpleAstroData {
  sol: { signo: string; grau: number; };
  lua: { signo: string; grau: number; fase: string; iluminacao: number; };
  mansaoLunar: string;
  planetasRetrogrados: string[];
}

const NowCard: React.FC = () => {
  // Dados simplificados para demonstração
  const astroData: SimpleAstroData = {
    sol: { signo: 'Virgem', grau: 18 },
    lua: { signo: 'Peixes', grau: 23, fase: 'Crescente', iluminacao: 66 },
    mansaoLunar: 'Al-Sharatain',
    planetasRetrogrados: []
  };

  const eleicoesMagicas = [
    { nome: 'Amor', score: 75, status: 'Favorável' },
    { nome: 'Trabalho', score: 60, status: 'Neutro' },
    { nome: 'Beleza', score: 85, status: 'Excelente' },
    { nome: 'Prosperidade', score: 45, status: 'Desfavorável' },
    { nome: 'Justiça', score: 70, status: 'Favorável' },
    { nome: 'Contato Espiritual', score: 90, status: 'Excelente' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-aurora-gold';
    if (score >= 60) return 'text-aurora-silver';
    return 'text-aurora-copper';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return '⭐';
    if (score >= 60) return '✦';
    return '◦';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-aurora-dark-secondary/80 backdrop-blur-sm rounded-lg border border-aurora-purple/30 p-6"
    >
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="text-center border-b border-aurora-purple/20 pb-4">
          <h2 className="text-2xl font-bold text-aurora-gold mb-2">
            Céu Atual
          </h2>
          <p className="text-aurora-silver text-sm">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Informações Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sol e Lua */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-aurora-dark-primary/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">☉</span>
                <div>
                  <p className="text-aurora-gold font-semibold">Sol</p>
                  <p className="text-aurora-silver text-sm">
                    {astroData.sol.grau}° {astroData.sol.signo}
                  </p>
                </div>
              </div>
              <span className="text-aurora-copper text-sm">Dignidade</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-aurora-dark-primary/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">☽</span>
                <div>
                  <p className="text-aurora-silver font-semibold">Lua</p>
                  <p className="text-aurora-silver text-sm">
                    {astroData.lua.grau}° {astroData.lua.signo}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-aurora-copper text-sm">{astroData.lua.fase}</p>
                <p className="text-aurora-copper text-xs">{astroData.lua.iluminacao}%</p>
              </div>
            </div>
          </div>

          {/* Status e Mansão */}
          <div className="space-y-4">
            <div className="p-3 bg-aurora-dark-primary/50 rounded-lg">
              <p className="text-aurora-gold font-semibold mb-2">Mansão Lunar</p>
              <p className="text-aurora-silver">{astroData.mansaoLunar}</p>
            </div>

            <div className="p-3 bg-aurora-dark-primary/50 rounded-lg">
              <p className="text-aurora-gold font-semibold mb-2">Status</p>
              <p className="text-aurora-silver">
                {astroData.planetasRetrogrados.length === 0 
                  ? 'Nenhum planeta retrógrado' 
                  : `${astroData.planetasRetrogrados.join(', ')} retrógrado${astroData.planetasRetrogrados.length > 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Eleições Mágicas */}
        <div>
          <h3 className="text-lg font-semibold text-aurora-gold mb-4">
            Eleições Mágicas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {eleicoesMagicas.map((eleicao) => (
              <motion.div
                key={eleicao.nome}
                whileHover={{ scale: 1.02 }}
                className="p-3 bg-aurora-dark-primary/30 rounded-lg border border-aurora-purple/20 hover:border-aurora-purple/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-aurora-silver text-sm font-medium">
                    {eleicao.nome}
                  </span>
                  <span className={`text-lg ${getScoreColor(eleicao.score)}`}>
                    {getScoreIcon(eleicao.score)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${getScoreColor(eleicao.score)}`}>
                    {eleicao.score}%
                  </span>
                  <span className={`text-xs ${getScoreColor(eleicao.score)}`}>
                    {eleicao.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nota sobre dados */}
        <div className="text-center pt-4 border-t border-aurora-purple/20">
          <p className="text-aurora-copper text-xs">
            Dados astronômicos em tempo real • São Paulo, Brasil
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NowCard;


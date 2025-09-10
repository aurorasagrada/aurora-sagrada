import React, { useState, useEffect } from 'react';
import { 
  gerarAnaliseCompleta, 
  gerarInterpretacaoAspecto, 
  gerarInterpretacaoTransito,
  INTERPRETACOES_SIGNOS 
} from '../astro/interpretacoes';
import { detectarAspectos } from '../astro/aspectos';
import { calcularMansaoLunar } from '../astro/mansoes-lunares';
import { getInstance } from '../astro/engine-efemerides';

interface InterpretacaoTransitosProps {
  className?: string;
}

export function InterpretacaoTransitos({ className }: InterpretacaoTransitosProps) {
  const [analiseCompleta, setAnaliseCompleta] = useState<string>('');
  const [aspectosInterpretados, setAspectosInterpretados] = useState<any[]>([]);
  const [transitosInterpretados, setTransitosInterpretados] = useState<any[]>([]);
  const [mansaoLunar, setMansaoLunar] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarInterpretacoes = async () => {
      try {
        setLoading(true);
        const efemerides = await getInstance();
        const agora = new Date();
        
        // Obter posições planetárias
        const planetas = ['sol', 'lua', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno', 'urano', 'netuno', 'plutao'];
        const posicoes = [];
        
        for (const planeta of planetas) {
          try {
            const posicao = await efemerides.getPlanet(planeta, agora);
            if (posicao) {
              posicoes.push({
                planeta: planeta.charAt(0).toUpperCase() + planeta.slice(1),
                ...posicao
              });
            }
          } catch (error) {
            console.warn(`Erro ao obter posição de ${planeta}:`, error);
          }
        }

        // Detectar aspectos
        const aspectos = detectarAspectos(posicoes);
        
        // Calcular mansão lunar
        const lua = posicoes.find(p => p.planeta.toLowerCase() === 'lua');
        let mansao = '';
        if (lua) {
          mansao = calcularMansaoLunar(lua.longitude);
          setMansaoLunar(mansao);
        }

        // Gerar interpretações dos aspectos
        const aspectosComInterpretacao = aspectos.map(aspecto => {
          return gerarInterpretacaoAspecto(
            aspecto.tipo,
            aspecto.planetas[0],
            aspecto.planetas[1],
            aspecto.orbe,
            aspecto.aplicativo
          );
        });

        // Gerar interpretações dos trânsitos
        const transitosComInterpretacao = posicoes.map(posicao => {
          return gerarInterpretacaoTransito(
            posicao.planeta,
            posicao.signo,
            posicao.grau,
            posicao.dignidade
          );
        });

        // Gerar análise completa
        const analise = gerarAnaliseCompleta(posicoes, aspectos, mansao);

        setAspectosInterpretados(aspectosComInterpretacao);
        setTransitosInterpretados(transitosComInterpretacao);
        setAnaliseCompleta(analise);

      } catch (error) {
        console.error('Erro ao carregar interpretações:', error);
        setAnaliseCompleta('Erro ao carregar interpretações astrológicas.');
      } finally {
        setLoading(false);
      }
    };

    carregarInterpretacoes();
  }, []);

  if (loading) {
    return (
      <div className={`aurora-card ${className}`}>
        <div className="p-6">
          <h3 className="aurora-title text-lg mb-4 text-aurora-gold">🔮 Interpretações Astrológicas</h3>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aurora-gold"></div>
            <span className="ml-2 text-aurora-silver">Consultando os astros...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Análise Completa */}
      <div className="aurora-card bg-gradient-to-br from-aurora-deep/50 to-aurora-wine/30 border-aurora-gold/30">
        <div className="p-6">
          <h3 className="aurora-title text-lg mb-4 text-aurora-gold flex items-center gap-2">
            🌟 Análise do Céu Atual
          </h3>
          <div className="max-h-64 overflow-y-auto">
            <div className="prose prose-invert max-w-none">
              {analiseCompleta.split('\n').map((linha, index) => (
                <p key={index} className="text-aurora-silver mb-2">
                  {linha}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Aspectos Interpretados */}
      {aspectosInterpretados.length > 0 && (
        <div className="aurora-card bg-gradient-to-br from-aurora-deep/50 to-aurora-wine/30 border-aurora-gold/30">
          <div className="p-6">
            <h3 className="aurora-title text-lg mb-4 text-aurora-gold flex items-center gap-2">
              ⭐ Aspectos Atuais
            </h3>
            <div className="max-h-80 overflow-y-auto">
              <div className="space-y-4">
                {aspectosInterpretados.map((aspecto, index) => (
                  <div key={index} className="p-4 rounded-lg bg-aurora-deep/30 border border-aurora-gold/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-aurora-gold font-semibold">{aspecto.titulo}</h4>
                      <span 
                        className={`px-2 py-1 rounded text-xs ${
                          aspecto.energia === 'harmonioso' ? 'bg-green-600 text-white' : 
                          aspecto.energia === 'tenso' ? 'bg-red-600 text-white' : 
                          'bg-gray-600 text-white'
                        }`}
                      >
                        {aspecto.energia}
                      </span>
                    </div>
                    <p className="text-aurora-silver text-sm mb-3">{aspecto.descricao}</p>
                    <div className="text-xs text-aurora-silver/70 mb-2">
                      Orbe: {aspecto.orbe.toFixed(1)}° • {aspecto.duracao}
                    </div>
                    {aspecto.sugestoes.length > 0 && (
                      <div>
                        <p className="text-xs text-aurora-gold mb-1">Sugestões:</p>
                        <div className="flex flex-wrap gap-1">
                          {aspecto.sugestoes.map((sugestao, idx) => (
                            <span key={idx} className="px-2 py-1 bg-aurora-gold/20 text-aurora-gold rounded text-xs border border-aurora-gold/30">
                              {sugestao}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trânsitos Interpretados */}
      {transitosInterpretados.length > 0 && (
        <div className="aurora-card bg-gradient-to-br from-aurora-deep/50 to-aurora-wine/30 border-aurora-gold/30">
          <div className="p-6">
            <h3 className="aurora-title text-lg mb-4 text-aurora-gold flex items-center gap-2">
              🪐 Posições Planetárias
            </h3>
            <div className="max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {transitosInterpretados.map((transito, index) => (
                  <div key={index} className="p-3 rounded-lg bg-aurora-deep/30 border border-aurora-gold/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-aurora-gold font-medium">
                        {transito.planeta} em {transito.signo}
                      </h4>
                      {transito.dignidade && (
                        <span className="px-2 py-1 bg-aurora-gold/20 text-aurora-gold rounded text-xs border border-aurora-gold/30">
                          {transito.dignidade}
                        </span>
                      )}
                    </div>
                    <p className="text-aurora-silver text-sm mb-2">{transito.interpretacao}</p>
                    {transito.palavrasChave.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {transito.palavrasChave.map((palavra, idx) => (
                          <span key={idx} className="px-2 py-1 bg-aurora-wine/30 text-aurora-silver rounded text-xs">
                            {palavra}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mansão Lunar */}
      {mansaoLunar && (
        <div className="aurora-card bg-gradient-to-br from-aurora-deep/50 to-aurora-wine/30 border-aurora-gold/30">
          <div className="p-6">
            <h3 className="aurora-title text-lg mb-4 text-aurora-gold flex items-center gap-2">
              🌙 Mansão Lunar Atual
            </h3>
            <div className="text-center">
              <h3 className="text-xl text-aurora-gold mb-2">{mansaoLunar}</h3>
              <p className="text-aurora-silver text-sm">
                A Lua transita pela mansão {mansaoLunar}, trazendo suas energias específicas para este momento.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


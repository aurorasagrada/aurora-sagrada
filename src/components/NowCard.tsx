import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  RotateCcw,
  Star,
  Zap,
  Eye,
  AlertTriangle,
  Calendar,
  MapPin,
  BookOpen,
  Sparkles
} from 'lucide-react';

// Importar dados das bases astronômicas
import { obterPosicaoPlaneta, obterFaseLunar } from '../astro/engine-efemerides';
import { calcularMansaoLunar } from '../astro/mansoes-lunares';
import { detectarAspectos } from '../astro/aspectos';
import mansoesData from '../../data/mansoes-lunares-expandido.json';
import ExpandableSection from './ExpandableSection';

interface PlanetInfo {
  name: string;
  symbol: string;
  position: {
    sign: string;
    degree: number;
    retrograde: boolean;
    speed: number;
  };
  icon: React.ReactNode;
}

interface AspectInfo {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
  applying: boolean;
}

interface NowCardProps {
  compact?: boolean;
}

export default function NowCard({ compact = false }: NowCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [planetData, setPlanetData] = useState<PlanetInfo[]>([]);
  const [lunarData, setLunarData] = useState<any>(null);
  const [mansionData, setMansionData] = useState<any>(null);
  const [aspects, setAspects] = useState<AspectInfo[]>([]);
  const [retrogrades, setRetrogrades] = useState<string[]>([]);
  const [voidOfCourse, setVoidOfCourse] = useState(false);

  // Símbolos planetários
  const planetSymbols: Record<string, string> = {
    'sol': '☉',
    'lua': '☽',
    'mercurio': '☿',
    'venus': '♀',
    'marte': '♂',
    'jupiter': '♃',
    'saturno': '♄',
    'urano': '♅',
    'netuno': '♆',
    'plutao': '♇'
  };

  // Símbolos dos signos
  const signSymbols: Record<string, string> = {
    'Áries': '♈',
    'Touro': '♉',
    'Gêmeos': '♊',
    'Câncer': '♋',
    'Leão': '♌',
    'Virgem': '♍',
    'Libra': '♎',
    'Escorpião': '♏',
    'Sagitário': '♐',
    'Capricórnio': '♑',
    'Aquário': '♒',
    'Peixes': '♓'
  };

  useEffect(() => {
    const updateAstronomicalData = async () => {
      try {
        const now = new Date();
        
        // Calcular posições planetárias
        const planets = ['sol', 'lua', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno'];
        const planetPositions: PlanetInfo[] = [];
        const retrogradeList: string[] = [];

        for (const planet of planets) {
          try {
            const position = await obterPosicaoPlaneta(planet, now);
            
            if (position.retrograde) {
              retrogradeList.push(planet);
            }

            planetPositions.push({
              name: planet.charAt(0).toUpperCase() + planet.slice(1),
              symbol: planetSymbols[planet] || '●',
              position: {
                sign: position.sign,
                degree: Math.floor(position.degree),
                retrograde: position.retrograde,
                speed: position.speed
              },
              icon: planet === 'sol' ? <Sun className="w-4 h-4" /> : 
                    planet === 'lua' ? <Moon className="w-4 h-4" /> : 
                    <Star className="w-4 h-4" />
            });
          } catch (error) {
            console.error(`Erro ao calcular ${planet}:`, error);
          }
        }

        setPlanetData(planetPositions);
        setRetrogrades(retrogradeList);

        // Calcular dados lunares
        try {
          const lunarInfo = await obterFaseLunar(now);
          setLunarData(lunarInfo);
        } catch (error) {
          console.error('Erro ao calcular fase lunar:', error);
        }

        // Calcular mansão lunar
        try {
          const mansionNumber = calcularMansaoLunar(now);
          const mansion = mansoesData.mansoes[mansionNumber.toString()];
          setMansionData({ number: mansionNumber, ...mansion });
        } catch (error) {
          console.error('Erro ao calcular mansão lunar:', error);
        }

        // Detectar aspectos importantes
        try {
          const currentAspects = await detectarAspectos(planetPositions, now);
          setAspects(currentAspects.slice(0, 5)); // Mostrar apenas os 5 mais importantes
        } catch (error) {
          console.error('Erro ao detectar aspectos:', error);
        }

        // Verificar Lua Vazia de Curso (simplificado)
        const lunaPosition = planetPositions.find(p => p.name === 'Lua');
        if (lunaPosition && Math.abs(lunaPosition.position.speed) < 0.5) {
          setVoidOfCourse(true);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao atualizar dados astronômicos:', error);
        setIsLoading(false);
      }
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Atualizar dados astronômicos a cada 5 minutos
    updateAstronomicalData();
    const astroTimer = setInterval(updateAstronomicalData, 5 * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(astroTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="aurora-card p-6 animate-pulse">
        <div className="h-6 bg-aurora-vinho/30 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-aurora-vinho/20 rounded"></div>
          <div className="h-16 bg-aurora-vinho/20 rounded"></div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-aurora-vinho/20 rounded w-3/4"></div>
          <div className="h-4 bg-aurora-vinho/20 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const formatDegree = (degree: number) => {
    return `${degree}°`;
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase?.toLowerCase()) {
      case 'nova': return '🌑';
      case 'crescente': return '🌒';
      case 'cheia': return '🌕';
      case 'minguante': return '🌘';
      default: return '🌙';
    }
  };

  return (
    <motion.div 
      className={`aurora-card ${compact ? 'p-4' : 'p-6'} space-y-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header com Tempo Atual */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-cinzel text-aurora-dourado">Céu Agora</h3>
        <div className="flex items-center space-x-2 text-sm text-aurora-pergaminho/80">
          <Clock className="w-4 h-4" />
          <span>
            {currentTime.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
          <MapPin className="w-4 h-4 ml-2" />
          <span>São Paulo</span>
        </div>
      </div>

      {/* Alertas Importantes */}
      {(voidOfCourse || retrogrades.length > 0) && (
        <div className="bg-aurora-vinho/30 border border-aurora-dourado/40 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-aurora-dourado" />
            <span className="font-cinzel text-aurora-dourado">Alertas Astrológicos</span>
          </div>
          {voidOfCourse && (
            <p className="text-sm text-aurora-pergaminho/90 mb-1">
              🌙 Lua Vazia de Curso - Evite iniciar projetos importantes
            </p>
          )}
          {retrogrades.length > 0 && (
            <p className="text-sm text-aurora-pergaminho/90">
              <RotateCcw className="w-4 h-4 inline mr-1" />
              Retrógrados: {retrogrades.map(p => planetSymbols[p] || p).join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Posições Planetárias Principais */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sol */}
        {planetData.find(p => p.name === 'Sol') && (
          <div className="bg-aurora-dourado/20 border border-aurora-dourado/40 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="w-5 h-5 text-aurora-dourado" />
              <span className="font-cinzel text-aurora-dourado">Sol</span>
            </div>
            <div className="text-aurora-pergaminho">
              <p className="text-lg font-alice">
                {signSymbols[planetData.find(p => p.name === 'Sol')?.position.sign || '']} {planetData.find(p => p.name === 'Sol')?.position.sign}
              </p>
              <p className="text-sm opacity-80">
                {formatDegree(planetData.find(p => p.name === 'Sol')?.position.degree || 0)}
              </p>
            </div>
          </div>
        )}

        {/* Lua */}
        {planetData.find(p => p.name === 'Lua') && lunarData && (
          <div className="bg-aurora-azul/20 border border-aurora-azul/40 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Moon className="w-5 h-5 text-aurora-azul" />
              <span className="font-cinzel text-aurora-azul">Lua</span>
            </div>
            <div className="text-aurora-pergaminho">
              <p className="text-lg font-alice">
                {signSymbols[planetData.find(p => p.name === 'Lua')?.position.sign || '']} {planetData.find(p => p.name === 'Lua')?.position.sign}
              </p>
              <p className="text-sm opacity-80">
                {formatDegree(planetData.find(p => p.name === 'Lua')?.position.degree || 0)}
              </p>
              <p className="text-xs opacity-70 mt-1">
                {getPhaseIcon(lunarData.fase)} {lunarData.fase} {Math.round(lunarData.iluminacao)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mansão Lunar */}
      {mansionData && (
        <div className="bg-aurora-salvia/20 border border-aurora-salvia/40 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-aurora-salvia" />
            <span className="font-cinzel text-aurora-salvia">Mansão Lunar</span>
          </div>
          <div className="text-aurora-pergaminho">
            <p className="font-alice text-lg">
              {mansionData.number}ª - {mansionData.nome}
            </p>
            <p className="text-sm opacity-80">
              {mansionData.nomeArabico}
            </p>
            <p className="text-xs opacity-70 mt-2">
              {mansionData.significado?.slice(0, 100)}...
            </p>
          </div>
        </div>
      )}

      {/* Outros Planetas */}
      <div className="grid grid-cols-3 gap-3">
        {planetData.filter(p => !['Sol', 'Lua'].includes(p.name)).map((planet) => (
          <div key={planet.name} className="bg-aurora-vinho/20 border border-aurora-vinho/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-cinzel text-aurora-dourado">
                {planet.symbol} {planet.name}
              </span>
              {planet.position.retrograde && (
                <RotateCcw className="w-3 h-3 text-aurora-vinho" />
              )}
            </div>
            <div className="text-aurora-pergaminho text-xs">
              <p>{signSymbols[planet.position.sign]} {planet.position.sign}</p>
              <p className="opacity-70">{formatDegree(planet.position.degree)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Aspectos Importantes */}
      {aspects.length > 0 && (
        <div className="bg-aurora-azul/20 border border-aurora-azul/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-5 h-5 text-aurora-azul" />
            <span className="font-cinzel text-aurora-azul">Aspectos Ativos</span>
          </div>
          <div className="space-y-2">
            {aspects.map((aspect, index) => (
              <div key={index} className="flex items-center justify-between text-sm text-aurora-pergaminho">
                <span>
                  {planetSymbols[aspect.planet1.toLowerCase()]} {aspect.aspect} {planetSymbols[aspect.planet2.toLowerCase()]}
                </span>
                <span className="text-xs opacity-70">
                  {aspect.applying ? 'Aplicando' : 'Separando'} ({aspect.orb.toFixed(1)}°)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximos Eventos */}
      <div className="bg-aurora-pergaminho/10 border border-aurora-pergaminho/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-5 h-5 text-aurora-pergaminho" />
          <span className="font-cinzel text-aurora-pergaminho">Próximos Eventos</span>
        </div>
        <div className="space-y-1 text-sm text-aurora-pergaminho/80">
          {lunarData && (
            <p>🌙 Próxima {lunarData.proximaFase}: {lunarData.diasProximaFase} dias</p>
          )}
          <p>⭐ Próximo Eclipse: Verificando...</p>
          <p>🔄 Próxima Retrogradação: Calculando...</p>
        </div>
      </div>

      {/* Seções Expandíveis com Textos Completos */}
      <div className="space-y-4">
        {/* Mansão Lunar Detalhada */}
        {mansionData && (
          <ExpandableSection
            title={`${mansionData.number}ª Mansão: ${mansionData.nome}`}
            summary={mansionData.significado || 'Mansão lunar com propriedades mágicas específicas'}
            fullContent={
              <div className="space-y-4">
                <div>
                  <h4 className="font-cinzel text-aurora-dourado mb-2">Nome Arábico</h4>
                  <p>{mansionData.nomeArabico}</p>
                </div>
                
                <div>
                  <h4 className="font-cinzel text-aurora-dourado mb-2">Natureza e Regência</h4>
                  <p><strong>Natureza:</strong> {mansionData.natureza}</p>
                  <p><strong>Regente:</strong> {mansionData.regente}</p>
                </div>

                <div>
                  <h4 className="font-cinzel text-aurora-dourado mb-2">Usos Mágicos</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {mansionData.usosMagicos?.map((uso: string, index: number) => (
                      <li key={index}>{uso}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-cinzel text-aurora-salvia mb-2">Favorável Para</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {mansionData.favoravel?.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-aurora-vinho mb-2">Desfavorável Para</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {mansionData.desfavoravel?.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {mansionData.correspondencias && (
                  <div>
                    <h4 className="font-cinzel text-aurora-dourado mb-2">Correspondências Mágicas</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Ervas:</strong> {mansionData.correspondencias.ervas?.join(', ')}</p>
                      <p><strong>Pedras:</strong> {mansionData.correspondencias.pedras?.join(', ')}</p>
                      <p><strong>Cores:</strong> {mansionData.correspondencias.cores?.join(', ')}</p>
                      <p><strong>Incensos:</strong> {mansionData.correspondencias.incensos?.join(', ')}</p>
                      <p><strong>Metais:</strong> {mansionData.correspondencias.metais?.join(', ')}</p>
                      <p><strong>Animais:</strong> {mansionData.correspondencias.animais?.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            }
            icon={<Star className="w-5 h-5" />}
            category="Mansão Lunar"
            metadata={{
              'Número': mansionData.number,
              'Natureza': mansionData.natureza,
              'Regente': mansionData.regente
            }}
          />
        )}

        {/* Fase Lunar Detalhada */}
        {lunarData && (
          <ExpandableSection
            title={`Lua ${lunarData.fase} - ${Math.round(lunarData.iluminacao)}%`}
            summary={`A Lua está ${lunarData.fase.toLowerCase()} com ${Math.round(lunarData.iluminacao)}% de iluminação`}
            fullContent={
              <div className="space-y-4">
                <div>
                  <h4 className="font-cinzel text-aurora-dourado mb-2">Significado da Fase</h4>
                  <p>
                    {lunarData.fase === 'nova' && 'Tempo de novos começos, plantio de sementes, intenções e projetos. Energia introspectiva e de renovação.'}
                    {lunarData.fase === 'crescente' && 'Período de crescimento, desenvolvimento e manifestação. Energia expansiva para construir e desenvolver projetos.'}
                    {lunarData.fase === 'cheia' && 'Momento de culminação, realização e poder máximo. Energia intensa para rituais de manifestação e gratidão.'}
                    {lunarData.fase === 'minguante' && 'Tempo de liberação, limpeza e banimento. Energia para soltar o que não serve mais e fazer limpezas.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-cinzel text-aurora-dourado mb-2">Práticas Recomendadas</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {lunarData.fase === 'nova' && (
                      <>
                        <li>Meditação e introspecção</li>
                        <li>Definição de intenções e metas</li>
                        <li>Rituais de renovação</li>
                        <li>Planejamento de novos projetos</li>
                      </>
                    )}
                    {lunarData.fase === 'crescente' && (
                      <>
                        <li>Trabalhos de atração e crescimento</li>
                        <li>Desenvolvimento de habilidades</li>
                        <li>Rituais de prosperidade</li>
                        <li>Fortalecimento de relacionamentos</li>
                      </>
                    )}
                    {lunarData.fase === 'cheia' && (
                      <>
                        <li>Rituais de manifestação</li>
                        <li>Trabalhos de cura e proteção</li>
                        <li>Celebrações e gratidão</li>
                        <li>Carregamento de cristais e ferramentas</li>
                      </>
                    )}
                    {lunarData.fase === 'minguante' && (
                      <>
                        <li>Rituais de banimento e limpeza</li>
                        <li>Liberação de vícios e padrões</li>
                        <li>Trabalhos de proteção</li>
                        <li>Organização e simplificação</li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-cinzel text-aurora-dourado mb-2">Correspondências Lunares</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Elemento:</strong> Água</p>
                    <p><strong>Metal:</strong> Prata</p>
                    <p><strong>Pedras:</strong> Pedra da Lua, Pérola, Selenita</p>
                    <p><strong>Cores:</strong> Branco, Prateado, Azul pálido</p>
                    <p><strong>Ervas:</strong> Jasmim, Sândalo branco, Mirra</p>
                    <p><strong>Dia:</strong> Segunda-feira</p>
                  </div>
                </div>
              </div>
            }
            icon={<Moon className="w-5 h-5" />}
            category="Fase Lunar"
            metadata={{
              'Fase': lunarData.fase,
              'Iluminação': `${Math.round(lunarData.iluminacao)}%`,
              'Próxima Fase': lunarData.proximaFase
            }}
          />
        )}

        {/* Posições Planetárias Detalhadas */}
        {planetData.length > 0 && (
          <ExpandableSection
            title="Posições Planetárias Completas"
            summary={`${planetData.length} planetas mapeados com suas posições e dignidades atuais`}
            fullContent={
              <div className="space-y-4">
                {planetData.map((planet) => (
                  <div key={planet.name} className="bg-aurora-vinho/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-cinzel text-aurora-dourado flex items-center space-x-2">
                        {planet.icon}
                        <span>{planet.symbol} {planet.name}</span>
                      </h4>
                      {planet.position.retrograde && (
                        <span className="text-xs bg-aurora-vinho/40 text-aurora-pergaminho px-2 py-1 rounded">
                          Retrógrado
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Signo:</strong> {planet.position.sign}</p>
                        <p><strong>Grau:</strong> {formatDegree(planet.position.degree)}</p>
                        <p><strong>Velocidade:</strong> {planet.position.speed.toFixed(2)}°/dia</p>
                      </div>
                      <div>
                        <p><strong>Status:</strong> {planet.position.retrograde ? 'Retrógrado' : 'Direto'}</p>
                        <p><strong>Elemento:</strong> {getElementBySign(planet.position.sign)}</p>
                        <p><strong>Modalidade:</strong> {getModalityBySign(planet.position.sign)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
            icon={<Sparkles className="w-5 h-5" />}
            category="Posições Planetárias"
            metadata={{
              'Total Planetas': planetData.length,
              'Retrógrados': retrogrades.length,
              'Diretos': planetData.length - retrogrades.length
            }}
          />
        )}
      </div>

      {/* Timestamp da Última Atualização */}
      <div className="text-center text-xs text-aurora-pergaminho/60">
        Última atualização: {currentTime.toLocaleString('pt-BR')}
      </div>
    </motion.div>
  );

  // Funções auxiliares
  function getElementBySign(sign: string): string {
    const elements: Record<string, string> = {
      'Áries': 'Fogo', 'Leão': 'Fogo', 'Sagitário': 'Fogo',
      'Touro': 'Terra', 'Virgem': 'Terra', 'Capricórnio': 'Terra',
      'Gêmeos': 'Ar', 'Libra': 'Ar', 'Aquário': 'Ar',
      'Câncer': 'Água', 'Escorpião': 'Água', 'Peixes': 'Água'
    };
    return elements[sign] || 'Desconhecido';
  }

  function getModalityBySign(sign: string): string {
    const modalities: Record<string, string> = {
      'Áries': 'Cardinal', 'Câncer': 'Cardinal', 'Libra': 'Cardinal', 'Capricórnio': 'Cardinal',
      'Touro': 'Fixo', 'Leão': 'Fixo', 'Escorpião': 'Fixo', 'Aquário': 'Fixo',
      'Gêmeos': 'Mutável', 'Virgem': 'Mutável', 'Sagitário': 'Mutável', 'Peixes': 'Mutável'
    };
    return modalities[sign] || 'Desconhecido';
  }
}


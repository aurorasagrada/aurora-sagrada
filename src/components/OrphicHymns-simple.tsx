import React from 'react';
import { Music, Sun } from 'lucide-react';

const OrphicHymnsSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-aurora-azul via-aurora-vinho to-aurora-azul p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Music className="w-8 h-8 text-aurora-dourado" />
            <h1 className="text-4xl font-cinzel text-aurora-dourado">
              Hinos Órficos
            </h1>
          </div>
          <p className="text-aurora-pergaminho/80 font-alice text-lg">
            Invocações planetárias e elementais da tradição órfica
          </p>
        </div>

        {/* Teste de Hino */}
        <div className="bg-aurora-vinho/20 backdrop-blur-sm border border-aurora-dourado/30 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-cinzel text-aurora-dourado">
              Hino ao Sol (Hélios)
            </h3>
            <span className="text-sm text-aurora-pergaminho/60 bg-aurora-azul/20 px-2 py-1 rounded">
              #8
            </span>
          </div>
          
          <p className="text-aurora-pergaminho/80 font-alice mb-4">
            "Escuta, ó Hélio de olhos dourados, rei etéreo da luz..."
          </p>

          <div className="flex items-center justify-between text-sm text-aurora-pergaminho/60">
            <span>Domingo</span>
            <span>Meio-dia</span>
          </div>
        </div>

        <div className="mt-6 text-center text-aurora-pergaminho/60">
          <p>✨ Componente OrphicHymns carregado com sucesso!</p>
        </div>
      </div>
    </div>
  );
};

export default OrphicHymnsSimple;


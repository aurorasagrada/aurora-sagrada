import React, { useState } from 'react';
import { Download, FileText, Calendar, Loader2 } from 'lucide-react';

interface PDFExporterProps {
  selectedDate?: Date;
  className?: string;
}

export const PDFExporter: React.FC<PDFExporterProps> = ({ 
  selectedDate = new Date(), 
  className = "" 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Formatar data para o formato esperado pelo Python
      const dateStr = selectedDate.toISOString().split('T')[0];
      
      // Chamar API ou endpoint que executa o gerador Python
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateStr,
          format: 'daily-report'
        })
      });

      if (response.ok) {
        // Baixar o PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aurora_sagrada_${dateStr}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setLastGenerated(new Date().toLocaleTimeString());
      } else {
        throw new Error('Erro ao gerar PDF');
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar relatório PDF. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`aurora-card p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-aurora-dourado" />
        <h3 className="text-lg font-cinzel font-semibold text-aurora-dourado">
          Exportar Relatório
        </h3>
      </div>

      <div className="space-y-4">
        {/* Data selecionada */}
        <div className="flex items-center gap-2 text-aurora-pergaminho">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {formatDate(selectedDate)}
          </span>
        </div>

        {/* Descrição */}
        <p className="text-sm text-aurora-pergaminho/80 leading-relaxed">
          Gere um relatório completo em PDF com todas as informações astrológicas 
          e mágicas do dia, incluindo mansão lunar, deusa do dia, eleições mágicas 
          e correspondências.
        </p>

        {/* Conteúdo do relatório */}
        <div className="bg-aurora-vinho/20 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-aurora-dourado mb-2">
            Conteúdo do Relatório:
          </h4>
          <ul className="text-xs text-aurora-pergaminho/90 space-y-1">
            <li>• Informações astrológicas gerais</li>
            <li>• Mansão lunar e espírito toscano</li>
            <li>• Deusa do dia e correspondências</li>
            <li>• Fase lunar e significados</li>
            <li>• Eleições mágicas por tema</li>
            <li>• Correspondências (cores, cristais, ervas)</li>
            <li>• Invocações e rituais sugeridos</li>
          </ul>
        </div>

        {/* Botão de geração */}
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="w-full aurora-button-primary flex items-center justify-center gap-2 py-3"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Gerando Relatório...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Gerar PDF
            </>
          )}
        </button>

        {/* Status da última geração */}
        {lastGenerated && (
          <p className="text-xs text-aurora-salvia text-center">
            Último relatório gerado às {lastGenerated}
          </p>
        )}

        {/* Informações técnicas */}
        <div className="text-xs text-aurora-pergaminho/60 space-y-1 pt-2 border-t border-aurora-dourado/20">
          <p>• Formato: PDF A4 com design Aurora Sagrada</p>
          <p>• Conecta-se automaticamente às bases de dados</p>
          <p>• Inclui ícones planetários e selos mágicos</p>
        </div>
      </div>
    </div>
  );
};

export default PDFExporter;


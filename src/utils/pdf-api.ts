/**
 * AURORA SAGRADA - API DE INTEGRAÇÃO COM GERADOR DE PDF
 * Interface TypeScript para comunicação com o gerador Python
 */

export interface PDFGenerationRequest {
  date: string; // YYYY-MM-DD format
  format: 'daily-report' | 'weekly-summary' | 'monthly-overview';
  options?: {
    includeHymns?: boolean;
    includeMansions?: boolean;
    includeCorrespondences?: boolean;
    language?: 'pt-BR' | 'en-US';
    hemisphere?: 'north' | 'south';
  };
}

export interface PDFGenerationResponse {
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
  generatedAt?: string;
}

export class AuroraPDFAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Gera relatório PDF para uma data específica
   */
  async generateDailyReport(
    date: Date,
    options?: PDFGenerationRequest['options']
  ): Promise<PDFGenerationResponse> {
    const dateStr = date.toISOString().split('T')[0];
    
    const request: PDFGenerationRequest = {
      date: dateStr,
      format: 'daily-report',
      options: {
        includeHymns: true,
        includeMansions: true,
        includeCorrespondences: true,
        language: 'pt-BR',
        hemisphere: 'south',
        ...options
      }
    };

    try {
      const response = await fetch(`${this.baseUrl}/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Baixa PDF gerado
   */
  async downloadPDF(filename: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/download-pdf/${filename}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao baixar PDF: ${response.statusText}`);
    }

    return await response.blob();
  }

  /**
   * Gera e baixa PDF em uma única operação
   */
  async generateAndDownload(
    date: Date, 
    options?: PDFGenerationRequest['options']
  ): Promise<void> {
    // Gerar PDF
    const result = await this.generateDailyReport(date, options);
    
    if (!result.success || !result.filename) {
      throw new Error(result.error || 'Erro ao gerar PDF');
    }

    // Baixar PDF
    const blob = await this.downloadPDF(result.filename);
    
    // Criar download automático
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  /**
   * Verifica status do serviço de geração
   */
  async checkStatus(): Promise<{ available: boolean; version?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/pdf-status`);
      if (response.ok) {
        return await response.json();
      }
      return { available: false };
    } catch {
      return { available: false };
    }
  }
}

// Instância singleton para uso global
export const auroraPDFAPI = new AuroraPDFAPI();

// Hook React para uso em componentes
export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [lastError, setLastError] = React.useState<string | null>(null);

  const generatePDF = async (
    date: Date,
    options?: PDFGenerationRequest['options']
  ) => {
    setIsGenerating(true);
    setLastError(null);

    try {
      await auroraPDFAPI.generateAndDownload(date, options);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setLastError(errorMessage);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePDF,
    isGenerating,
    lastError,
    clearError: () => setLastError(null)
  };
};

// Utilitários para formatação
export const formatDateForPDF = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getDefaultPDFOptions = (hemisphere: 'north' | 'south' = 'south'): PDFGenerationRequest['options'] => {
  return {
    includeHymns: true,
    includeMansions: true,
    includeCorrespondences: true,
    language: 'pt-BR',
    hemisphere
  };
};


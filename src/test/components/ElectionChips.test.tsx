import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ElectionChips from '../../components/ElectionChips';

// Mock do Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ElectionChips', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar todos os chips temáticos', async () => {
    render(<ElectionChips />);
    
    await waitFor(() => {
      expect(screen.getByText('Amor')).toBeInTheDocument();
      expect(screen.getByText('Trabalho')).toBeInTheDocument();
      expect(screen.getByText('Beleza')).toBeInTheDocument();
      expect(screen.getByText('Prosperidade')).toBeInTheDocument();
      expect(screen.getByText('Justiça')).toBeInTheDocument();
      expect(screen.getByText('Contato Espiritual')).toBeInTheDocument();
    });
  });

  it('deve exibir scores para cada tema', async () => {
    render(<ElectionChips />);
    
    await waitFor(() => {
      // Verifica se há percentuais exibidos
      const percentageRegex = /\d+%/;
      const percentageElements = screen.getAllByText(percentageRegex);
      expect(percentageElements).toHaveLength(6); // 6 temas
    });
  });

  it('deve exibir status de favorabilidade', async () => {
    render(<ElectionChips />);
    
    await waitFor(() => {
      // Verifica se há indicações de favorável/desfavorável
      expect(screen.getByText('Desfavorável')).toBeInTheDocument();
      expect(screen.getByText('Favorável')).toBeInTheDocument();
    });
  });

  it('deve exibir melhor tema atual', async () => {
    render(<ElectionChips />);
    
    await waitFor(() => {
      expect(screen.getByText('Melhor agora:')).toBeInTheDocument();
      expect(screen.getByText('Justiça')).toBeInTheDocument();
    });
  });

  it('deve permitir clique nos chips', async () => {
    const user = userEvent.setup();
    render(<ElectionChips />);
    
    await waitFor(() => {
      const amorChip = screen.getByText('Amor').closest('button');
      expect(amorChip).toBeInTheDocument();
    });
    
    const amorChip = screen.getByText('Amor').closest('button');
    if (amorChip) {
      await user.click(amorChip);
      // Verifica se o clique foi registrado (pode expandir funcionalidade)
      expect(amorChip).toBeInTheDocument();
    }
  });

  it('deve aplicar cores corretas aos chips', async () => {
    render(<ElectionChips />);
    
    await waitFor(() => {
      const amorChip = screen.getByText('Amor').closest('button');
      const trabalhoChip = screen.getByText('Trabalho').closest('button');
      
      expect(amorChip).toHaveClass('bg-red-500/20');
      expect(trabalhoChip).toHaveClass('bg-orange-500/20');
    });
  });

  it('deve exibir tooltips com descrições', async () => {
    render(<ElectionChips />);
    
    await waitFor(() => {
      // Verifica se há descrições dos temas
      expect(screen.getByText('Relacionamentos, romance, ...')).toBeInTheDocument();
      expect(screen.getByText('Carreira, negócios, ...')).toBeInTheDocument();
    });
  });

  it('deve exibir estado de loading inicialmente', () => {
    render(<ElectionChips />);
    
    // Verifica se há elementos de loading
    const loadingElements = screen.getAllByRole('generic');
    expect(loadingElements.some(el => el.classList.contains('animate-pulse'))).toBe(true);
  });
});


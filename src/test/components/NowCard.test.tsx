import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import NowCard from '../../components/NowCard';

// Mock do Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('NowCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o componente corretamente', async () => {
    render(<NowCard />);
    
    // Verifica se o título está presente
    expect(screen.getByText('Agora')).toBeInTheDocument();
    
    // Aguarda o carregamento dos dados
    await waitFor(() => {
      expect(screen.getByText('Sol')).toBeInTheDocument();
      expect(screen.getByText('Lua')).toBeInTheDocument();
    });
  });

  it('deve exibir informações do Sol e da Lua', async () => {
    render(<NowCard />);
    
    await waitFor(() => {
      // Verifica informações do Sol
      expect(screen.getByText('Sol')).toBeInTheDocument();
      expect(screen.getByText('15° Virgem')).toBeInTheDocument();
      expect(screen.getByText('Direto')).toBeInTheDocument();
      
      // Verifica informações da Lua
      expect(screen.getByText('Lua')).toBeInTheDocument();
      expect(screen.getByText('22° Peixes')).toBeInTheDocument();
      expect(screen.getByText('Crescente')).toBeInTheDocument();
    });
  });

  it('deve exibir mansão lunar e fase quando não compacto', async () => {
    render(<NowCard compact={false} />);
    
    await waitFor(() => {
      expect(screen.getByText('Mansão Lunar:')).toBeInTheDocument();
      expect(screen.getByText('Al-Sharatain')).toBeInTheDocument();
      expect(screen.getByText('Fase:')).toBeInTheDocument();
      expect(screen.getByText('Crescente (65%)')).toBeInTheDocument();
    });
  });

  it('deve ocultar informações adicionais quando compacto', async () => {
    render(<NowCard compact={true} />);
    
    await waitFor(() => {
      expect(screen.queryByText('Mansão Lunar:')).not.toBeInTheDocument();
      expect(screen.queryByText('Fase:')).not.toBeInTheDocument();
    });
  });

  it('deve exibir estado de loading inicialmente', () => {
    render(<NowCard />);
    
    // Verifica se há elementos de loading
    const loadingElements = screen.getAllByRole('generic');
    expect(loadingElements.some(el => el.classList.contains('animate-pulse'))).toBe(true);
  });

  it('deve exibir horário atual', async () => {
    render(<NowCard />);
    
    await waitFor(() => {
      // Verifica se há um elemento com horário (formato HH:MM)
      const timeRegex = /\d{2}:\d{2}/;
      expect(screen.getByText(timeRegex)).toBeInTheDocument();
    });
  });

  it('deve exibir informações sobre retrogradações', async () => {
    render(<NowCard />);
    
    await waitFor(() => {
      expect(screen.getByText('Nenhum planeta retrógrado')).toBeInTheDocument();
    });
  });
});


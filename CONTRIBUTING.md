# Guia de Contribuição - Aurora Sagrada ✨

Obrigado por seu interesse em contribuir com o Aurora Sagrada! Este guia vai te ajudar a contribuir de forma efetiva.

## 🌟 Princípios Fundamentais

### **Preservação das Bases Canônicas**
- ❌ **NUNCA** altere `efemerides-completas-integrais.js`
- ❌ **NUNCA** altere `BasedeDadosdoguiaLunar.js`
- ✅ **SEMPRE** mantenha encoding UTF-8
- ✅ **SEMPRE** preserve estruturas de chaves existentes

### **Expansibilidade**
- ✅ Adicione novos campos, nunca remova existentes
- ✅ Use versionamento semântico para mudanças
- ✅ Documente todas as expansões
- ✅ Mantenha compatibilidade retroativa

## 🚀 Como Contribuir

### **1. Setup do Ambiente**
```bash
# Fork e clone o repositório
git clone https://github.com/seu-usuario/aurora-sagrada.git
cd aurora-sagrada

# Instale dependências
npm install

# Execute testes
npm run test

# Inicie desenvolvimento
npm run dev
```

### **2. Tipos de Contribuição**

#### **🔮 Novas Funcionalidades Astrológicas**
- Novos tipos de aspectos
- Cálculos astronômicos adicionais
- Sistemas de dignidades expandidos
- Métodos de eleição alternativos

#### **🎨 Melhorias de Interface**
- Novos componentes visuais
- Animações e microinterações
- Responsividade aprimorada
- Acessibilidade (WAI-ARIA)

#### **📚 Expansão de Dados**
- Novas correspondências
- Asteroides adicionais
- Estrelas fixas
- Tradições culturais

#### **🧪 Testes e Qualidade**
- Testes unitários
- Testes de integração
- Documentação de código
- Performance

### **3. Estrutura de Branch**
```
main                 # Produção estável
├── develop         # Desenvolvimento ativo
├── feature/nome    # Novas funcionalidades
├── fix/nome        # Correções de bugs
└── docs/nome       # Documentação
```

## 📋 Checklist de Contribuição

### **Antes de Submeter**
- [ ] Código segue padrões do projeto
- [ ] Testes passam (`npm run test`)
- [ ] Build funciona (`npm run build`)
- [ ] Documentação atualizada
- [ ] Bases de dados preservadas
- [ ] Commit messages descritivos

### **Pull Request**
- [ ] Título claro e descritivo
- [ ] Descrição detalhada das mudanças
- [ ] Screenshots se aplicável
- [ ] Referência a issues relacionadas
- [ ] Testes adicionados/atualizados

## 🔧 Padrões de Código

### **TypeScript**
```typescript
// ✅ Bom
interface PlanetPosition {
  longitude: number;
  latitude: number;
  sign: string;
  degree: number;
  retrograde: boolean;
}

// ❌ Evitar
const pos: any = getPlanetPosition();
```

### **React Components**
```tsx
// ✅ Bom
interface ComponentProps {
  data: PlanetData;
  compact?: boolean;
  onSelect?: (planet: string) => void;
}

export default function Component({ data, compact = false, onSelect }: ComponentProps) {
  // ...
}
```

### **CSS/Tailwind**
```css
/* ✅ Use classes Aurora Sagrada */
.aurora-card { /* ... */ }
.aurora-title { /* ... */ }
.aurora-text { /* ... */ }

/* ❌ Evite cores hardcoded */
.my-component {
  background: #ff0000; /* Use bg-red-500 ou aurora-bg */
}
```

## 📊 Expandindo Bases de Dados

### **Adicionando Correspondências**
```json
// data/correspondencias-expandido.json
{
  "version": "1.1.0",
  "novas_correspondencias": {
    "ervas_planetarias": {
      "sol": {
        "novas": ["girassol", "camomila_dourada"],
        "propriedades": {
          "girassol": {
            "parte_usada": "pétalas",
            "timing": "meio-dia",
            "preparo": "infusão solar"
          }
        }
      }
    }
  }
}
```

### **Novos Asteroides**
```json
// data/asteroides.json
{
  "version": "1.2.0",
  "asteroides": {
    "hygiea": {
      "numero": 10,
      "nome": "Hygiea",
      "natureza": "Virgem/Saturno",
      "significado": "Saúde, higiene, cura preventiva",
      "correspondencias": {
        "ervas": ["alecrim", "eucalipto"],
        "cristais": ["quartzo_verde", "fluorita"],
        "cores": ["#90EE90", "#228B22"]
      },
      "usos_magicos": [
        "Rituais de cura",
        "Limpeza energética",
        "Prevenção de doenças"
      ]
    }
  }
}
```

## 🧪 Escrevendo Testes

### **Testes de Componentes**
```typescript
// src/test/components/NovoComponente.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NovoComponente from '../../components/NovoComponente';

describe('NovoComponente', () => {
  it('deve renderizar corretamente', () => {
    render(<NovoComponente data={mockData} />);
    expect(screen.getByText('Título Esperado')).toBeInTheDocument();
  });
});
```

### **Testes de Funções Astrológicas**
```typescript
// src/test/astro/nova-funcao.test.ts
import { describe, it, expect } from 'vitest';
import { calcularNovaFuncao } from '../../astro/nova-funcao';

describe('calcularNovaFuncao', () => {
  it('deve calcular corretamente para data específica', () => {
    const data = new Date('2025-01-01T12:00:00-03:00');
    const resultado = calcularNovaFuncao(data);
    
    expect(resultado).toHaveProperty('valor');
    expect(resultado.valor).toBeGreaterThan(0);
  });
});
```

## 📝 Documentação

### **Comentários de Código**
```typescript
/**
 * Calcula a posição de um planeta para uma data específica
 * @param planetName Nome do planeta (Sol, Lua, Mercúrio, etc.)
 * @param date Data para o cálculo
 * @returns Posição do planeta com longitude, latitude e signo
 * @throws Error se o planeta não for encontrado
 */
export async function getPlanet(planetName: string, date: Date): Promise<PlanetPosition> {
  // ...
}
```

### **README de Módulos**
Cada módulo complexo deve ter seu próprio README:
```markdown
# src/astro/README.md

## Módulo Astrológico

Este módulo contém todos os cálculos astrológicos...

### Funções Principais
- `getSun()` - Posição do Sol
- `getMoon()` - Posição da Lua
- `getAspects()` - Aspectos entre planetas
```

## 🐛 Reportando Bugs

### **Template de Issue**
```markdown
**Descrição do Bug**
Descrição clara do que está acontecendo.

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente**
- OS: [ex: Windows 10]
- Browser: [ex: Chrome 91]
- Versão: [ex: 1.0.0]
```

## 🎯 Roadmap de Contribuições

### **Prioridade Alta** 🔥
- [ ] Testes de cobertura completa
- [ ] Documentação de APIs
- [ ] Otimização de performance
- [ ] Acessibilidade WCAG 2.1

### **Prioridade Média** ⭐
- [ ] Novos asteroides (Pallas, Juno, Vesta)
- [ ] Estrelas fixas expandidas
- [ ] Sistema de favoritos
- [ ] Exportação PDF

### **Prioridade Baixa** 💡
- [ ] Modo offline (PWA)
- [ ] Múltiplos idiomas
- [ ] Temas personalizáveis
- [ ] API externa

## 💬 Comunicação

### **Canais**
- **Issues**: Bugs e solicitações de features
- **Discussions**: Perguntas gerais e ideias
- **Pull Requests**: Revisão de código
- **Wiki**: Documentação detalhada

### **Etiqueta**
- Seja respeitoso e construtivo
- Use linguagem clara e objetiva
- Forneça contexto suficiente
- Seja paciente com revisões

## 🏆 Reconhecimento

Contribuidores são reconhecidos:
- **README**: Lista de contribuidores
- **CHANGELOG**: Créditos por versão
- **GitHub**: Contributor graph
- **Releases**: Menções especiais

---

**Obrigado por contribuir com o Aurora Sagrada!** ✨

Sua contribuição ajuda a manter viva a tradição astrológica no mundo digital.


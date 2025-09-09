# Aurora Sagrada ✨

**Guia Astromágicko em Tempo Real**

Um webapp completo de astrologia e magia com design whimsigoth gótico-celestial, oferecendo trânsitos planetários em tempo real, mansões lunares, calendário mágico com sistema de eleições e correspondências completas.

![Aurora Sagrada](https://img.shields.io/badge/Aurora-Sagrada-661D48?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjREFBNTIwIi8+Cjwvc3ZnPgo=)

## 🌟 Características Principais

### ⭐ **Três Modos de Uso**
- **🔮 Ritual** - Dashboard com informações em tempo real
- **📅 Calendário** - Planejamento mágico mensal com filtros
- **📚 Estudo** - Base de conhecimento astrológico expandível

### 🎨 **Design Aurora Sagrada**
- **Paleta Whimsigoth**: Vinho profundo (#661D48), Azul-noite (#0B1836), Dourado alquímico (#DAA520)
- **Tipografia Medieval**: Cinzel Decorative + Alice
- **Efeitos Visuais**: Vidro arcano, backdrop-blur, microanimações suaves
- **Responsividade Total**: Desktop, tablet e mobile

### 🔮 **Funcionalidades Mágicas**

#### **Agora (Tempo Real)**
- Posições do Sol e Lua (signo, grau, movimento)
- Mansão lunar atual com significados
- Fase lunar e porcentagem de iluminação
- Retrogradações ativas
- Aspectos exatos em formação

#### **Eleições Mágicas**
- **6 Temas**: Amor, Trabalho, Beleza, Prosperidade, Justiça, Contato Espiritual
- **Sistema de Scoring**: Algoritmo que considera dignidades, fases lunares, aspectos
- **Indicadores Visuais**: Chips coloridos com scores e tendências
- **Melhor Momento**: Identificação automática do tema mais favorável

#### **Calendário Mágico**
- **Filtros Temáticos**: Visualizar eleições por tema específico
- **Cores Inteligentes**: Dias coloridos por favorabilidade
- **Day Drawer**: Painel detalhado ao clicar em qualquer data
- **Navegação Fluida**: Meses e semanas com transições suaves

#### **Seção Lunar Completa**
- **Favorabilidade para Procedimentos**: Invasivos, cortes, depilação, plantio, colheita
- **Lua Vazia de Curso**: Detecção automática com alertas
- **Eclipses**: Identificação e alertas para magia
- **Esbats**: Luas cheias com nomes tradicionais por hemisfério
- **Correspondências**: Ervas, cristais, cores por fase lunar

#### **Deusa do Dia**
- **365 Deusas**: Uma para cada dia do ano
- **Correspondências Completas**: Ervas, cristais, cores, incensos, domínios
- **Invocações**: Textos tradicionais e dicas práticas
- **Culturas Diversas**: Tradições de todo o mundo

#### **Roda do Ano**
- **Sabbaths**: 8 festivais sazonais com significados
- **Hemisférios**: Adaptação automática Norte/Sul
- **Countdown**: Contagem regressiva para próximo sabbath
- **Correspondências**: Cores, ervas, rituais por festival

### 🧠 **Base de Conhecimento**

#### **Glossário Completo** (127+ termos)
- Aspectos astrológicos (sextil, quadratura, trígono, etc.)
- Conceitos mágicos (retrogradação, combustão, orbe)
- Terminologia lunar (mansões, esbats, void of course)

#### **Mansões Lunares** (28 mansões)
- Nomes árabes tradicionais
- Significados e usos mágicos
- Selos e símbolos
- Correspondências por mansão

#### **Dignidades Planetárias** (84+ combinações)
- Domicílio, exaltação, detrimento, queda
- Sistema de scoring para eleições
- Correspondências alquímicas

#### **Correspondências Expandidas** (365+ itens)
- Ervas planetárias e lunares
- Cristais e pedras preciosas
- Cores, incensos, óleos essenciais
- Animais, plantas, metais

## 🚀 Instalação e Uso

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/aurora-sagrada.git
cd aurora-sagrada

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Scripts Disponíveis**
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run test         # Executar testes
npm run test:ui      # Interface de testes
npm run typecheck    # Verificação de tipos
npm run lint         # Linting do código
```

## 🏗️ Arquitetura Técnica

### **Stack Tecnológico**
- **Frontend**: React 18 + TypeScript
- **Build**: Vite 4
- **Styling**: Tailwind CSS + CSS personalizado
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Testes**: Vitest + Testing Library
- **Timezone**: America/Sao_Paulo (configurável)

### **Estrutura de Arquivos**
```
aurora-sagrada/
├── data/                           # Bases de dados canônicas
│   ├── efemerides-completas-integrais.js    # Sistema astronômico
│   ├── BasedeDadosdoguiaLunar.js           # Deusas e correspondências
│   ├── eleicoes-magickas.json              # Sistema de scoring
│   ├── esbats.json                         # Luas cheias por hemisfério
│   └── ...                                 # Outras bases expansíveis
├── src/
│   ├── astro/                      # Wrappers astrológicos
│   │   ├── engine-efemerides.ts    # Wrapper para efemérides
│   │   ├── mansoes-lunares.ts      # Cálculo de mansões
│   │   ├── fases-lunares.ts        # Fases e void of course
│   │   ├── aspectos.ts             # Detecção de aspectos
│   │   ├── eleicoes.ts             # Sistema de scoring
│   │   └── paracelso.ts            # Partes da planta
│   ├── components/                 # Componentes React
│   │   ├── NowCard.tsx             # Informações tempo real
│   │   ├── ElectionChips.tsx       # Chips temáticos
│   │   ├── MagickCalendar.tsx      # Calendário mágico
│   │   ├── LunarSection.tsx        # Seção lunar completa
│   │   ├── DeusaDoDia.tsx          # Deusa e correspondências
│   │   └── ...                     # Outros componentes
│   ├── pages/                      # Páginas principais
│   │   ├── RitualPage.tsx          # Dashboard ritual
│   │   ├── CalendarioPage.tsx      # Página do calendário
│   │   └── EstudoPage.tsx          # Base de conhecimento
│   ├── db/                         # Conectores de dados
│   ├── lib/                        # Utilitários
│   └── styles/                     # Estilos Aurora Sagrada
└── ...
```

## 🔧 Configuração Avançada

### **Timezone e Localização**
```typescript
// src/lib/date.ts
export const DEFAULT_TIMEZONE = 'America/Sao_Paulo';
export const DEFAULT_HEMISPHERE = 'sul';
```

### **Orbes Planetários**
```json
// data/config.json
{
  "orbes": {
    "sol": { "conjuncao": 8, "oposicao": 8, "quadratura": 6, "trigono": 6, "sextil": 4 },
    "lua": { "conjuncao": 6, "oposicao": 6, "quadratura": 4, "trigono": 4, "sextil": 3 }
  }
}
```

### **Modo Magia**
- **Ignora Horário de Verão**: Para cálculos de horas planetárias tradicionais
- **Regras Específicas**: Configurações especiais para práticas mágicas

## 📚 Expandindo as Bases de Dados

### **Princípios de Expansão**
1. **Preservar Integridade**: Nunca alterar estruturas existentes
2. **Manter Encoding**: UTF-8 sempre
3. **Versioning**: Adicionar campos `version` para compatibilidade
4. **Documentar**: Registrar todas as mudanças

### **Adicionando Novas Deusas**
```javascript
// data/BasedeDadosdoguiaLunar.js
export const deusasDoDia = {
  // ... deusas existentes
  "366": {  // Para anos bissextos
    "nome": "Nova Deusa",
    "cultura": "Tradição",
    "dominios": ["domínio1", "domínio2"],
    "correspondencias": {
      "ervas": ["erva1", "erva2"],
      "cristais": ["cristal1", "cristal2"],
      "cores": ["#cor1", "#cor2"]
    }
  }
};
```

### **Expandindo Asteroides**
```json
// data/asteroides.json
{
  "version": "1.1.0",
  "asteroides": {
    "novo_asteroide": {
      "numero": 12345,
      "nome": "Novo Asteroide",
      "natureza": "Vênus/Lua",
      "significado": "Descrição do significado",
      "correspondencias": {
        "ervas": ["erva1"],
        "cristais": ["cristal1"]
      }
    }
  }
}
```

## 🧪 Testes e Qualidade

### **Cobertura de Testes**
- **Componentes React**: Renderização, props, interações
- **Wrappers Astrológicos**: Cálculos, validações, edge cases
- **Utilitários**: Funções matemáticas, formatação, timezone

### **Executando Testes**
```bash
npm run test          # Modo watch
npm run test:run      # Execução única
npm run test:coverage # Com cobertura
npm run test:ui       # Interface gráfica
```

### **Qualidade de Código**
- **TypeScript**: Tipagem forte em todo o projeto
- **ESLint**: Linting configurado
- **Prettier**: Formatação automática
- **Husky**: Git hooks para qualidade

## 🚀 Deploy e Produção

### **Build de Produção**
```bash
npm run build    # Gera pasta /dist
npm run preview  # Testa build localmente
```

### **GitHub Pages**
1. Configure GitHub Pages para usar `/dist`
2. Execute `npm run build`
3. Commit e push da pasta `dist`

### **Outras Plataformas**
- **Vercel**: Deploy automático via Git
- **Netlify**: Arraste e solte pasta `dist`
- **Servidor Próprio**: Sirva arquivos estáticos da pasta `dist`

## 📄 Licença

MIT License - Veja [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### **Diretrizes de Contribuição**
- Mantenha a integridade das bases de dados
- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Documente mudanças no README

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- **Issues**: Use o sistema de issues do GitHub
- **Discussões**: Participe das discussões da comunidade
- **Wiki**: Consulte a wiki para documentação detalhada

---

**Aurora Sagrada** © 2024 • Desenvolvido com ✨ e 🌙

*"A magia está na intersecção entre conhecimento antigo e tecnologia moderna"*


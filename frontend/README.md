# TourFi Frontend

Interface de usuário da plataforma TourFi - Agência de viagens Web3

## Sobre

Este é o frontend do projeto TourFi, uma agência de viagens Web3 construída na rede BNB. A interface foi desenvolvida com React e oferece uma experiência completa para os viajantes, integrando recursos de blockchain para tornar as viagens internacionais mais econômicas e inteligentes.

## Funcionalidades

- Busca Inteligente: Interface para busca de voos e hotéis com IA
- Cartão Cripto: Solicite e gerencie seu cartão cripto internacional
- Guia Comunitário Web3: Crie, compartilhe e explore roteiros de viagem
- Reservas: Sistema completo de reservas e pagamentos em cripto
- Wallet: Integração com carteiras Web3 (MetaMask)
- Multilíngue: Suporte para múltiplos idiomas

## Tecnologias

- Framework: React 19
- Renderização: Vite
- Estilização: TailwindCSS
- Roteamento: React Router
- Estado Global: React Context
- Web3: ethers.js, wagmi, viem
- Internacionalização: i18next
- Notificações: React Hot Toast
- Requisições: Axios, TanStack Query

## Como Começar

```
# Instalar dependências
yarn install

# Iniciar servidor de desenvolvimento
yarn dev

# Construir para produção
yarn build

# Visualizar build de produção
yarn preview
```

## Estrutura do Projeto

O projeto está organizado em pastas que incluem componentes, páginas, contextos, hooks e integrações com smart contracts. A principal estrutura inclui:

- assets: Imagens e recursos estáticos
- components: Componentes reutilizáveis
- context: Contextos React (Web3, Tema, etc.)
- pages: Páginas da aplicação
- Contract: Integrações com smart contracts
- hooks: Custom hooks
- i18n: Configurações de internacionalização
- lib: Utilitários e funções auxiliares
- api: Serviços e chamadas de API
- data: Dados estáticos e mockups

## Páginas Principais

O frontend possui várias páginas, incluindo home, resultados de busca, reservas, solicitação de cartão cripto, e guias comunitários. A interface suporta temas claro e escuro, e está disponível em português, inglês

TourFi


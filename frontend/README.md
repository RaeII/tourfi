<div align="center">
  <img src="./public/images/tourfi_logo_azul.png" alt="TourFi Logo" width="200"/>
  <h1>TourFi Frontend</h1>
  <p>Interface de usuário da plataforma TourFi - Agência de viagens Web3</p>
</div>

## 📱 Sobre

Este é o frontend do projeto TourFi, uma agência de viagens Web3 construída na rede BNB. A interface foi desenvolvida com React e oferece uma experiência completa para os viajantes, integrando recursos de blockchain para tornar as viagens internacionais mais econômicas e inteligentes.

## ✨ Funcionalidades

- **Busca Inteligente**: Interface para busca de voos e hotéis com IA
- **Cartão Cripto**: Solicite e gerencie seu cartão cripto internacional
- **Guia Comunitário Web3**: Crie, compartilhe e explore roteiros de viagem
- **Reservas**: Sistema completo de reservas e pagamentos em cripto
- **Wallet**: Integração com carteiras Web3 (MetaMask)
- **Multilíngue**: Suporte para múltiplos idiomas

## 🔧 Tecnologias

- **Framework**: React 19
- **Renderização**: Vite
- **Estilização**: TailwindCSS
- **Roteamento**: React Router
- **Estado Global**: React Context
- **Web3**: ethers.js, wagmi, viem
- **Internacionalização**: i18next
- **Notificações**: React Hot Toast
- **Requisições**: Axios, TanStack Query

## 📂 Estrutura do Projeto

```
src/
├── assets/       # Imagens e recursos estáticos
├── components/   # Componentes reutilizáveis
├── context/      # Contextos React (Web3, Tema, etc.)
├── pages/        # Páginas da aplicação
├── Contract/     # Integrações com smart contracts
├── hooks/        # Custom hooks
├── i18n/         # Configurações de internacionalização
├── lib/          # Utilitários e funções auxiliares
├── api/          # Serviços e chamadas de API
└── data/         # Dados estáticos e mockups
```

## 🚀 Como Começar

```bash
# Instalar dependências
yarn install

# Iniciar servidor de desenvolvimento
yarn dev

# Construir para produção
yarn build

# Visualizar build de produção
yarn preview
```

## 📱 Páginas Principais

- **Home**: Página inicial com busca de voos e hotéis
- **Search Results**: Resultados de busca com filtros e ordenação
- **Booking**: Página de reserva e pagamento
- **My Bookings**: Gerenciamento de reservas do usuário
- **Card Application**: Solicitação de cartão cripto
- **Community Guide**: Exploração de guias de viagem da comunidade
- **Create Guide**: Criação de guias e roteiros de viagem
- **Guide Detail**: Detalhes de um guia específico

## 🔗 Integração Blockchain

O frontend integra-se com os smart contracts na rede BNB para:
- Processamento de pagamentos em cripto
- Emissão de NFTs para roteiros de viagem
- Verificação de propriedade e identidade
- Sistema de reputação e recompensas

## 🌐 Internacionalização

A aplicação suporta múltiplos idiomas usando i18next, com detecção automática do idioma do navegador. Atualmente suporta:
- Português (Brasil)
- Inglês
- Espanhol

## 🎨 Temas

A aplicação suporta temas claro e escuro, com preferência salvada localmente.

## 🧩 Componentes

Utilizamos um conjunto de componentes UI reutilizáveis baseados em Radix UI e Tailwind, proporcionando uma experiência consistente e acessível em toda a aplicação.

---

<div align="center">
  <p>TourFi 🛫 - Revolucionando o turismo com blockchain</p>
</div>


# HookahManager - Sistema de Gestão Premium

Sistema profissional e moderno para gestão de bares, tabacarias, lounges de narguilé, lanchonetes e pequenos comércios.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Estilização moderna e responsiva
- **Supabase** - Banco de dados PostgreSQL com autenticação
- **Lucide React** - Ícones modernos e elegantes

## 🎨 Identidade Visual

Design premium focado em desktop com:

- **Cores Principais:**
  - Fundo escuro: `#070707`
  - Laranja neon: `#FF8A00`
  - Laranja principal: `#FF6A00`
  - Texto: `#FAFAFA`

- **Fontes:**
  - Títulos: `Sora`
  - Textos: `Inter`

## 🔐 Segurança

### Tela de Senha

O sistema possui autenticação por senha antes de acessar o conteúdo:

- Senha configurada via variável de ambiente `NEXT_PUBLIC_APP_PASSWORD`
- Sessão temporária salva no `localStorage`
- Tela moderna e responsiva com validação visual de erro

### Supabase

Banco de dados seguro com:

- Row Level Security (RLS) ativado em todas as tabelas
- Policies restritivas permitindo apenas usuários autenticados
- UUIDs como chaves primárias
- Índices otimizados para performance
- Triggers para atualização automática de timestamps
- Audit trail completo de alterações em pedidos

## 📁 Estrutura do Projeto

```
hookah-manager/
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globais e temas
│   │   ├── layout.tsx       # Layout root com AuthProvider
│   │   └── page.tsx         # Página principal com auth
│   ├── components/
│   │   ├── PasswordScreen.tsx   # Tela de login por senha
│   │   ├── Sidebar.tsx          # Menu lateral navegável
│   │   ├── Charts.tsx           # Componentes de gráficos
│   │   └── StatsCards.tsx       # Cards de estatísticas
│   ├── contexts/
│   │   └── AuthContext.tsx      # Contexto de autenticação
│   ├── lib/
│   │   └── supabase.ts          # Cliente Supabase
│   └── types/
│       └── index.ts             # Tipos TypeScript
├── supabase/
│   ├── schema.sql               # Schema completo do banco
│   └── seed.sql                 # Dados de exemplo
├── .env.example                 # Variáveis de ambiente
├── .gitignore                   # Arquivos ignorados
└── README.md                    # Este arquivo
```

## 🗄️ Banco de Dados

### Tabelas Principais

1. **clients** - Cadastro de clientes com programa de fidelidade
2. **categories** - Categorias de produtos/menu
3. **menu_items** - Cardápio completo com preços e custos
4. **menu_item_costs** - Detalhamento de custos por ingrediente
5. **orders** - Pedidos com status e pagamento
6. **order_items** - Itens dos pedidos
7. **daily_history** - Histórico diário de vendas
8. **stock_movements** - Movimentações de estoque
9. **order_logs** - Logs de auditoria de pedidos
10. **system_settings** - Configurações do sistema

### Recursos do Schema

- ✅ UUIDs como chave primária
- ✅ Campos `created_at` e `updated_at` automáticos
- ✅ Índices em colunas frequentemente consultadas
- ✅ RLS (Row Level Security) ativado
- ✅ Policies seguras para todos os usuários autenticados
- ✅ Triggers para logs automáticos
- ✅ Funções para geração de números de pedido

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd hookah-manager
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
NEXT_PUBLIC_APP_PASSWORD=suasenha
```

### 4. Configure o banco de dados

No painel do Supabase:

1. Vá até o **SQL Editor**
2. Execute o conteúdo do arquivo `supabase/schema.sql`
3. Execute o conteúdo do arquivo `supabase/seed.sql` (opcional, dados de exemplo)

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🚢 Deploy

### Cloudflare Pages

1. Conecte seu repositório GitHub ao Cloudflare Pages
2. Configure as variáveis de ambiente no painel
3. Defina o comando de build: `npm run build`
4. Deploy automático a cada push na branch main

### Variáveis no Cloudflare Pages

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_PASSWORD`

## 🔒 Boas Práticas de Segurança

### Frontend

- ✅ Não usar `service_role` no navegador
- ✅ Usar apenas `NEXT_PUBLIC_SUPABASE_ANON_KEY` no client
- ✅ localStorage apenas para preferências visuais e sessão temporária
- ✅ Verificação `typeof window !== "undefined"` para evitar erros SSR

### Backend (Supabase)

- ✅ RLS ativado em todas as tabelas
- ✅ Policies restritivas baseadas em autenticação
- ✅ Audit trail de alterações críticas
- ✅ Validações no nível do banco (CHECK constraints)

## 📱 Responsividade

- **Desktop:** Sidebar fixa, área ampla, cards grandes, tabelas completas
- **Mobile:** Bottom navigation, menu hambúrguer, layout adaptativo

## 🎯 Funcionalidades

- [x] Autenticação por senha
- [x] Dashboard com indicadores
- [x] Gestão de clientes
- [x] Cardápio completo
- [x] Controle de custos
- [x] Pedidos com status
- [x] Histórico diário
- [x] Movimentações de estoque
- [x] Logs de auditoria
- [x] Configurações do sistema

## 📝 Licença

Este projeto é proprietário. Todos os direitos reservados.

---

**HookahManager** - Gestão inteligente para o seu negócio! 🚀

# TaskFlow - Gestão Inteligente de Tarefas

![TaskFlow Header](https://raw.githubusercontent.com/TFS-Data/listas-tarefas/main/public/og-image.png)

TaskFlow é uma aplicação moderna de lista de tarefas desenvolvida com uma estética **Dark Glassmorphism**, focada em produtividade, elegância e eficiência. O projeto utiliza as tecnologias mais recentes do ecossistema Web para entregar uma experiência de usuário premium.

## 🚀 Tecnologias

- **Frontend:** React 19 + TypeScript + Vite
- **Estilização:** Tailwind CSS (Design System customizado)
- **Animações:** Framer Motion (Micro-interações suaves)
- **Backend & Auth:** Supabase (PostgreSQL + RLS + Auth)
- **Ícones:** Lucide React
- **Datas:** date-fns

## ✨ Funcionalidades

- [x] **Autenticação Segura:** Login e cadastro de usuários integrados ao Supabase Auth.
- [x] **Gestão de Tarefas (CRUD):** Criação, edição, conclusão e exclusão de tarefas.
- [x] **Organização Avançada:** Categorização (Trabalho, Pessoal, Estudo) e níveis de Prioridade (Alta, Média, Baixa).
- [x] **Visualização de Análises:** Dashboard com estatísticas de desempenho e taxa de conclusão.
- [x] **Calendário Interativo:** Visualize prazos e compromissos em uma interface de calendário mensal.
- [x] **Privacidade (RLS):** Garantia de que cada usuário acesse apenas seus próprios dados.
- [x] **Design Premium:** Interface responsiva com efeitos de vidro, desfoque e gradientes dinâmicos.

## 🛠️ Configuração Local

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/TFS-Data/listas-tarefas.git
   cd listas-tarefas
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
   ```env
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 📦 Estrutura do Projeto

- `/src/components`: Componentes modulares e reutilizáveis.
- `/src/hooks`: Lógica de negócio e integração com Supabase.
- `/src/lib`: Configurações de bibliotecas externas.
- `/src/types`: Definições de tipos TypeScript.
- `/src/index.css`: Design System e utilitários globais.

## 🔒 Segurança

O projeto utiliza **Row Level Security (RLS)** do Supabase, garantindo que as políticas de acesso sejam aplicadas diretamente na camada do banco de dados. Nenhuma chave sensível está exposta no código-fonte, utilizando variáveis de ambiente para configuração.

---
Desenvolvido com ❤️ por Antigravity.

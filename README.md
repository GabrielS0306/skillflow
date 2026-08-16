# SkillFlow

Plataforma pessoal para organização, acompanhamento e construção de conhecimento — transforme objetivos de aprendizado em trilhas estruturadas, registre o que aprendeu e acompanhe sua evolução visualmente.

> Transforme seus objetivos de aprendizado em um mapa visual de conhecimento e acompanhe sua evolução.

## 🔗 Demo

Acesse o sistema em produção: [skillflow-8ixd.onrender.com/login](https://skillflow-8ixd.onrender.com/login)

> ⚠️ Hospedado em plano gratuito — o primeiro acesso após um período de inatividade pode levar alguns segundos para carregar.

## 🚀 Tecnologias

- **Back-end:** Laravel
- **Front-end:** React
- **Integração:** Inertia.js (SPA sem API REST separada)
- **CSS Framework:** Tailwind CSS
- **Banco de dados:** PostgreSQL (Supabase)
- **Autenticação:** Laravel Breeze
- **Hospedagem:** Render (Docker)
- **Versionamento:** Git/GitHub com branch por fase (`fase-N-nome`)

## 💡 Sobre o projeto

O SkillFlow nasce da ideia de que aprender por conta própria costuma ficar fragmentado entre cadernos, favoritos do navegador, vídeos salvos e listas de tarefas soltas. O produto concentra esse fluxo em um único lugar: **planejar → estudar → anotar → guardar referências → concluir → acompanhar progresso**.

O diferencial não é ser mais uma lista de tarefas — é funcionar como uma segunda memória de estudos, unindo estrutura de aprendizado, registro de conhecimento e visualização da evolução.

## 🧩 Conceito

```
Usuário
↓
Trilhas
↓
Tópicos
├── Anotações
├── Recursos
├── Dependências
└── Sessões de estudo
```

Uma **trilha** representa um objetivo maior (ex: "Dominando Laravel"). Cada trilha se divide em **tópicos** estudáveis, que acumulam **anotações**, **recursos** externos, podem ter **dependências** entre si e registram **sessões de estudo** com tempo dedicado.

## ⚙️ Funcionalidades

### Trilhas
- CRUD completo, com status (planejado, em andamento, pausado, concluído, arquivado)
- Progresso calculado automaticamente por tópicos concluídos
- Busca e filtro por status

### Tópicos
- CRUD completo com ordenação explícita
- Toggle de conclusão sem recarregar a página
- Dependências entre tópicos, com validação de ciclo e bloqueio de conclusão

### Anotações
- Múltiplas anotações por tópico, com opção de fixar as mais importantes
- Consulta via drawer lateral sem sair da página da trilha
- Busca global entre todas as anotações, com contexto de trilha/tópico

### Recursos
- Vínculo de referências externas por tópico (documentação, artigos, vídeos, repositórios)

### Sessões de estudo
- Início e término de sessão por tópico, com apenas uma sessão ativa por vez
- Bloqueio de sessão em tópicos dependentes não concluídos

### Dashboard
- Indicadores gerais: trilhas, tópicos concluídos, progresso geral, anotações
- Tempo total estudado, sequência de dias consecutivos, trilha mais estudada
- Gráfico de minutos estudados nos últimos 7 dias

### Sistema
- Autenticação com Laravel Breeze
- Autorização via Policies (usuário só acessa seus próprios dados)
- Interface responsiva com modais, drawers, toasts e loading states
- Validações no frontend e no backend

## 🗄️ Banco de Dados

Entidades principais: `users`, `tracks`, `topics`, `notes`, `resources`, `study_sessions`, `topic_dependencies`.

```
User 1—N Track
Track 1—N Topic
Topic 1—N Note
Topic 1—N Resource
Topic 1—N StudySession
Topic N—N Topic (dependencies)
```

## 🔧 Como rodar localmente

1. Clone o repositório:
```bash
git clone https://github.com/GabrielS0306/skillflow.git
cd skillflow
```

2. Instale as dependências:
```bash
composer install
npm install
```

3. Configure o ambiente:
```bash
cp .env.example .env
php artisan key:generate
```

4. Ajuste as credenciais do PostgreSQL no `.env` e rode as migrations:
```bash
php artisan migrate
```

5. Suba o projeto:
```bash
composer run dev
```

6. Acesse: `http://127.0.0.1:8000`

## 📁 Estrutura do projeto

```
skillflow/
├── app/
│ ├── Models/
│ ├── Http/Controllers/
│ └── Policies/
├── database/
│ └── migrations/
├── resources/
│ └── js/
│ ├── Pages/
│ ├── Components/
│ └── Layouts/
├── routes/
└── Dockerfile
```

## 🔮 Próximas funcionalidades

- Visualização em árvore/grafo do mapa de dependências entre tópicos

## Licença

Projeto pessoal desenvolvido para portfólio.
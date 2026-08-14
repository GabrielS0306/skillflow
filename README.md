# SkillFlow

Plataforma pessoal para organização, acompanhamento e construção de conhecimento — transforme objetivos de aprendizado em trilhas estruturadas, registre o que aprendeu e acompanhe sua evolução visualmente.

## 🔗 Demo

🚧 Em desenvolvimento — link será adicionado após o deploy.

## 📸 Screenshots

🚧 Screenshots serão adicionadas conforme as telas forem implementadas (Fase 5 — UX).

## 🚀 Tecnologias

- **Back-end:** Laravel
- **Front-end:** React
- **Integração:** Inertia.js (SPA sem API REST separada)
- **CSS Framework:** Tailwind CSS
- **Banco de dados:** MySQL
- **Autenticação:** Laravel Breeze
- **Versionamento:** Git/GitHub com branch por fase (`fase-N-nome`)

## 💡 Conceito

Plataforma pessoal para organizar trilhas de aprendizado, registrar anotações e acompanhar progresso.

> Transforme seus objetivos de aprendizado em um mapa visual de conhecimento e acompanhe sua evolução.

## Sobre o projeto

O SkillFlow nasce da ideia de que aprender por conta própria costuma ficar fragmentado entre cadernos, favoritos do navegador, vídeos salvos e listas de tarefas soltas. O produto concentra esse fluxo em um único lugar: **planejar → estudar → anotar → guardar referências → concluir → acompanhar progresso**.

O diferencial não é ser mais uma lista de tarefas — é funcionar como uma segunda memória de estudos, unindo estrutura de aprendizado, registro de conhecimento e visualização da evolução.

## Stack

- **Backend:** Laravel
- **Frontend:** React
- **Integração:** Inertia.js
- **Estilo:** Tailwind CSS
- **Banco:** MySQL
- **Autenticação:** Laravel Breeze

## Conceito

```
Usuário
↓
Trilhas
↓
Tópicos
├── Anotações
└── Recursos
```

Uma **trilha** representa um objetivo maior (ex: "Dominando Laravel"). Cada trilha se divide em **tópicos** estudáveis, que acumulam **anotações** (conteúdo produzido pelo usuário) e **recursos** (referências externas como documentação, artigos e vídeos).

O diferencial não é ser mais um gerenciador de tarefas — é funcionar como uma segunda memória de estudos, unindo estrutura de aprendizado, registro de conhecimento e visualização da evolução.

## ⚙️ Funcionalidades

### Trilhas
- CRUD completo de trilhas
- Status (planejado, em andamento, pausado, concluído, arquivado)
- Progresso calculado automaticamente por tópicos concluídos

### Tópicos
- CRUD completo com ordenação explícita
- Toggle de conclusão sem recarregar a página
- Vínculo direto com a trilha

### Anotações
- Múltiplas anotações por tópico (resumo, exemplos, dúvidas)
- Fixar anotações importantes
- Consulta via drawer lateral sem sair da página da trilha
- Busca global entre anotações *(planejado)*

### Recursos
- Vínculo de referências externas por tópico (documentação, artigos, vídeos, repositórios)

### Sistema
- Autenticação com Laravel Breeze
- Autorização via Policies (usuário só acessa seus próprios dados)
- Dashboard com indicadores (trilhas ativas, tópicos concluídos, progresso geral)
- Interface responsiva com modais, drawers e toasts
- Validações no frontend e no backend

## 🗄️ Banco de Dados

Entidades principais: `users`, `tracks`, `topics`, `notes`, `resources`.

```
User 1—N Track
Track 1—N Topic
Topic 1—N Note
Topic 1—N Resource
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

4. Ajuste as credenciais do MySQL no `.env` e rode as migrations:
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
└── tests/
```

## 🗺️ Roadmap

- [x] **Fase 1 — Fundação**: setup Laravel + Breeze + React + Inertia + Tailwind
- [x] **Fase 2 — Banco e domínio**: migrations, models, relacionamentos, policies
- [ ] **Fase 3 — Core**: CRUD de trilhas/tópicos, cálculo de progresso
- [ ] **Fase 4 — Conhecimento**: anotações, drawer, recursos
- [ ] **Fase 5 — UX**: modais, toasts, empty/loading states
- [ ] **Fase 6 — Inteligência de acompanhamento**: busca, filtros, sessões de estudo
- [ ] **Fase 7 — Roadmaps**: dependências entre tópicos, mapa de conhecimento

## 🔮 Próximas funcionalidades

- Sessões de estudo com registro de tempo
- Gráficos de evolução e sequência de dias estudados
- Mapa de conhecimento em árvore/grafo

Uma **trilha** representa um objetivo maior (ex: "Dominando Laravel"). Cada trilha se divide em **tópicos** estudáveis, que por sua vez acumulam **anotações** (conteúdo produzido pelo usuário) e **recursos** (referências externas).

## Status do desenvolvimento

Progresso seguindo o roadmap de 7 fases:

- [x] **Fase 1 — Fundação**: setup Laravel + Breeze + React + Inertia + Tailwind
- [x] **Fase 2 — Banco e domínio**: migrations, models, relacionamentos Eloquent, policies
- [ ] **Fase 3 — Core**: CRUD de trilhas/tópicos, toggle de conclusão, cálculo de progresso
- [ ] **Fase 4 — Conhecimento**: notas por tópico, drawer de notas, recursos externos
- [ ] **Fase 5 — UX**: modais, toasts, empty/loading states
- [ ] **Fase 6 — Inteligência de acompanhamento**: busca, filtros, sessões de estudo
- [ ] **Fase 7 — Roadmaps**: dependências entre tópicos, mapa de conhecimento

## Instalação local

```bash
git clone https://github.com/GabrielS0306/skillflow.git
cd skillflow
composer install
npm install
cp .env.example .env
php artisan key:generate
```

Configure o banco no `.env` e rode:

```bash
php artisan migrate
composer run dev
```

## Licença

Projeto pessoal em desenvolvimento.

# SkillFlow

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
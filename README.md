# WAYN (Where Are You Now) — MVP Frontend

Минималистичное mobile-first веб-приложение для навигации по жизненным состояниям: фиксация точки, интерпретация, выбор направления и проверка выбора. В MVP нет ИИ, рекомендаций или сложной аналитики.

## Быстрый старт

```bash
npm install
npm run dev
```

После запуска Vite покажет локальный адрес (обычно `http://localhost:5173/`).

## Backend (локальный API)

```bash
npm run server
```

API поднимается на `http://localhost:5050` и проксируется из Vite через `/api`.

## Основные маршруты MVP

- `/` — Dashboard (Where Are You Now)
- `/auth` — Авторизация
- `/checkpoint` — Фиксация текущей точки
- `/directions` — Выборы
- `/directions/new` — Новый выбор
- `/directions/review` — Проверка выбора
- `/history` — История и динамика
- `/pricing` — Тарифы (заглушка)

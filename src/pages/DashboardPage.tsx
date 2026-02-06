import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { lifeAreas } from '../data/lifeAreas';
import { calculateAreaSummary, formatAreaLabels, formatDate, useAppData } from '../data/appData';

const DashboardPage = () => {
  const { state } = useAppData();
  const latestCheckpoint = state.checkpoints[0] ?? null;
  const summary = calculateAreaSummary(latestCheckpoint);
  const strongLabels = summary ? formatAreaLabels(summary.strong) : 'Нет данных';
  const weakLabels = summary ? formatAreaLabels(summary.weak) : 'Нет данных';
  const balanceGap = summary
    ? Math.max(
        ...Object.values(latestCheckpoint?.areas ?? {}).map((area) => area.score),
      ) -
      Math.min(...Object.values(latestCheckpoint?.areas ?? {}).map((area) => area.score))
    : null;
  const activeDirections = state.directions.filter((direction) => direction.status !== 'Завершено').slice(0, 2);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="relative overflow-hidden">
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-accent/30 blur-2xl" />
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Where are you now</p>
          <h1 className="mt-3 text-2xl font-semibold text-app md:text-3xl">
            Точка навигации за сегодня
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Зафиксируй текущее состояние, чтобы видеть перекосы, динамику и готовность к новому выбору.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/checkpoint" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-glow">
              Новый чекпоинт
            </Link>
            <Link to="/history" className="rounded-full border border-white/15 px-5 py-2 text-sm text-app opacity-80">
              Сравнить с прошлой неделей
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Сильные зоны</p>
              <p className="mt-2 text-sm font-semibold text-app">{strongLabels}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Слабые зоны</p>
              <p className="mt-2 text-sm font-semibold text-app">{weakLabels}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Перекос</p>
              <p className="mt-2 text-sm font-semibold text-app">
                {balanceGap !== null ? `Разрыв ${balanceGap.toFixed(1)}` : 'Нет данных'}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Интерпретация</p>
              <h2 className="mt-2 text-xl font-semibold text-app">Карта баланса</h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <Icon icon="solar:radar-2-bold-duotone" width={22} />
            </div>
          </div>
          <div className="flex-1 rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/10 p-6">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="relative h-44 w-44">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-5 rounded-full border border-white/15" />
                <div className="absolute inset-10 rounded-full border border-white/20" />
                <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">Визуальная карта</p>
              <p className="mt-1 text-sm text-app">Без советов — только сигналы</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted">
            <p>Разрыв зон &gt; 3 → подсветка.</p>
            <p>Зона &lt; 4 → предупреждение.</p>
            <p>Рост/падение &gt; 1 → динамика.</p>
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Жизненные области</p>
              <h2 className="mt-2 text-xl font-semibold text-app">Текущие оценки</h2>
            </div>
            <button className="rounded-full border border-white/15 px-4 py-2 text-xs text-muted">
              Обновить
            </button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {lifeAreas.map((area, index) => {
              const score = latestCheckpoint?.areas[area.id]?.score ?? 0;
              const width = latestCheckpoint ? Math.min(100, score * 10) : 20;
              return (
              <div key={area.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-app">{area.label}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted">{score || '–'}</span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-accent to-accent-strong"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-muted">
                  {latestCheckpoint?.areas[area.id]?.note ? `Комментарий: ${latestCheckpoint.areas[area.id].note}` : 'Комментарий отсутствует'}
                </p>
              </div>
              );
            })}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Выборы</p>
                <h2 className="mt-2 text-xl font-semibold text-app">Активные направления</h2>
              </div>
              <Link to="/directions/new" className="rounded-full bg-white/10 px-3 py-2 text-xs text-app">
                Новый выбор
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {activeDirections.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-xs text-muted">
                  Пока нет активных направлений. Создайте первый выбор.
                </div>
              ) : (
                activeDirections.map((direction) => (
                <div key={direction.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-app">{direction.title}</p>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-[11px] text-accent">
                      {direction.period}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted">{direction.status}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                    <Icon icon="solar:clock-circle-bold-duotone" width={16} />
                    Проверка {formatDate(direction.reviewAt)}
                  </div>
                </div>
                ))
              )}
              <Link to="/directions" className="block rounded-full border border-white/15 px-4 py-2 text-center text-xs text-muted">
                Все направления
              </Link>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Повестка</p>
                <h3 className="mt-2 text-lg font-semibold text-app">Ближайшие точки</h3>
              </div>
              <Icon icon="solar:bell-bing-bold-duotone" width={20} />
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-muted">
                <div>
                  <p className="text-sm text-app">Следующий чекпоинт</p>
                  <p className="mt-1">Любой момент</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1">Сегодня</span>
              </div>
              {activeDirections.slice(0, 1).map((direction) => (
                <div key={direction.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-muted">
                  <div>
                    <p className="text-sm text-app">{direction.title}</p>
                    <p className="mt-1">Проверка {formatDate(direction.reviewAt)}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1">План</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;

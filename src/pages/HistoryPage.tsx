import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { lifeAreas } from '../data/lifeAreas';
import { formatDate, useAppData } from '../data/appData';

const HistoryPage = () => {
  const { state } = useAppData();
  const [current, previous] = state.checkpoints;

  const changes = lifeAreas.map((area) => {
    const currentScore = current?.areas[area.id]?.score ?? null;
    const previousScore = previous?.areas[area.id]?.score ?? null;
    const diff = currentScore !== null && previousScore !== null ? currentScore - previousScore : null;
    return {
      id: area.id,
      label: area.label,
      currentScore,
      diff,
    };
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">История</p>
          <h1 className="text-2xl font-semibold text-app">Динамика по зонам</h1>
          <p className="text-sm text-muted">Сравнивайте изменения по каждой области за недели.</p>
        </div>
        <Link to="/checkpoint" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-glow">
          Новый чекпоинт
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">График</p>
              <h2 className="mt-2 text-xl font-semibold text-app">Баланс за 6 недель</h2>
            </div>
            <Icon icon="solar:chart-2-bold-duotone" width={24} />
          </div>
          {state.checkpoints.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/10 p-6">
              <div className="flex h-48 items-center justify-center text-center text-sm text-muted">
                Добавьте первый чекпоинт, чтобы видеть динамику.
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {state.checkpoints.slice(0, 3).map((checkpoint) => (
                <div key={checkpoint.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-app">Чекпоинт {formatDate(checkpoint.createdAt)}</p>
                    <span className="text-xs text-muted">{Object.keys(checkpoint.areas).length} зон</span>
                  </div>
                  <div className="mt-3 grid gap-2 text-xs text-muted">
                    {lifeAreas.map((area) => (
                      <div key={area.id} className="flex items-center justify-between">
                        <span>{area.label}</span>
                        <span className="rounded-full bg-white/10 px-2 py-1">{checkpoint.areas[area.id]?.score ?? 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Последние изменения</p>
          <div className="mt-6 space-y-4">
            {changes.map((area) => (
              <div key={area.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm text-app">{area.label}</p>
                {area.diff === null ? (
                  <span className="text-xs text-muted">нет данных</span>
                ) : (
                  <span className={`text-xs ${area.diff >= 0 ? 'text-accent' : 'text-rose-300'}`}>
                    {area.diff >= 0 ? '+' : ''}
                    {area.diff.toFixed(1)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default HistoryPage;

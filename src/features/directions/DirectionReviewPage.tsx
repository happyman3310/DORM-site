import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import GlassCard from '../../shared/components/GlassCard';
import { formatDate, useAppData } from '../../data/appData';

const DirectionReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, updateDirection } = useAppData();
  const direction = useMemo(
    () => state.directions.find((item) => item.id === id) ?? state.directions[0] ?? null,
    [id, state.directions],
  );
  const [actuals, setActuals] = useState<Record<string, number>>(() => {
    if (!direction) return {};
    return Object.fromEntries(
      Object.entries(direction.criteria).map(([key, value]) => [key, value.actual ?? value.expected]),
    );
  });

  const handleSubmit = () => {
    if (!direction) return;
    updateDirection(direction.id, {
      status: 'Завершено',
      criteria: Object.fromEntries(
        Object.entries(direction.criteria).map(([key, value]) => [
          key,
          { ...value, actual: actuals[key] ?? value.expected },
        ]),
      ),
    });
    navigate('/history');
  };

  if (!direction) {
    return (
      <GlassCard>
        <div className="space-y-3 text-sm text-muted">
          <p>Нет направлений для проверки.</p>
          <Link to="/directions" className="inline-flex rounded-full bg-accent px-5 py-2 text-xs font-semibold text-white shadow-glow">
            Перейти к направлениям
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Проверка выбора</p>
        <h1 className="text-2xl font-semibold text-app">Сравнение ожиданий и реальности</h1>
        <p className="text-sm text-muted">Это ключевая точка: увидеть расхождение и скорректировать путь.</p>
      </header>

      <GlassCard>
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-app">Направление: {direction.title}</p>
            <p className="mt-2 text-xs text-muted">
              Срок проверки: {direction.period} · {formatDate(direction.reviewAt)}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(direction.criteria).map(([criterion, values]) => (
              <div key={criterion} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-app">{criterion}</p>
                <div className="mt-4 grid gap-3 text-xs text-muted">
                  <div className="flex items-center justify-between">
                    <span>Ожидание</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">{values.expected}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Реальность</span>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-accent">
                      {actuals[criterion] ?? values.expected}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div
                      className="h-1.5 rounded-full bg-accent"
                      style={{ width: `${((actuals[criterion] ?? values.expected) / 10) * 100}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={actuals[criterion] ?? values.expected}
                    onChange={(event) =>
                      setActuals((prev) => ({ ...prev, [criterion]: Number(event.target.value) }))
                    }
                    className="accent-accent"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
            Разница между ожиданием и реальностью показывает, насколько выбор оказался жизнеспособным.
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow"
            >
              Завершить проверку
            </button>
            <Link to="/history" className="rounded-full border border-white/15 px-6 py-2 text-sm text-muted">
              Смотреть динамику
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DirectionReviewPage;

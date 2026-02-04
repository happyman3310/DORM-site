import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { lifeAreas } from '../data/lifeAreas';

const CheckpointPage = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Чекпоинт</p>
        <h1 className="text-2xl font-semibold text-app">Фиксация текущей точки</h1>
        <p className="text-sm text-muted">
          Оцените каждую область по шкале 0–10 и добавьте короткий комментарий.
        </p>
      </header>

      <GlassCard>
        <form className="space-y-6">
          {lifeAreas.map((area) => (
            <div key={area.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-app">{area.label}</p>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-white/10 px-3 py-1">7</span>
                  <span>из 10</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <input type="range" min="0" max="10" className="accent-accent" />
                <textarea
                  rows={2}
                  maxLength={300}
                  placeholder="Короткий комментарий (до 300 символов)"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
                />
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow">
              Сохранить чекпоинт
            </Link>
            <Link to="/history" className="rounded-full border border-white/15 px-6 py-2 text-sm text-muted">
              История
            </Link>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default CheckpointPage;

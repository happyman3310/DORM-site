import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { lifeAreas } from '../data/lifeAreas';

const HistoryPage = () => {
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
          <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/10 p-6">
            <div className="flex h-48 items-center justify-center text-center text-sm text-muted">
              Здесь будет линейный график по зонам
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Последние изменения</p>
          <div className="mt-6 space-y-4">
            {lifeAreas.map((area, index) => (
              <div key={area.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm text-app">{area.label}</p>
                <span className={`text-xs ${index % 2 === 0 ? 'text-accent' : 'text-app opacity-70'}`}>
                  {index % 2 === 0 ? '+1.2' : '-0.6'}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default HistoryPage;

import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const DirectionReviewPage = () => {
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
            <p className="text-sm font-semibold text-app">Направление: Запуск проекта</p>
            <p className="mt-2 text-xs text-muted">Срок проверки: 1 месяц</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {['Интерес', 'Энергия', 'Реальность', 'Сложность'].map((criterion) => (
              <div key={criterion} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-app">{criterion}</p>
                <div className="mt-4 grid gap-3 text-xs text-muted">
                  <div className="flex items-center justify-between">
                    <span>Ожидание</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Реальность</span>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-accent">6</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div className="h-1.5 w-2/3 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
            Разница между ожиданием и реальностью показывает, насколько выбор оказался жизнеспособным.
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/directions" className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow">
              Завершить проверку
            </Link>
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

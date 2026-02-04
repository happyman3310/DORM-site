import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const PricingPage = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Монетизация</p>
        <h1 className="text-2xl font-semibold text-app">Тарифы</h1>
        <p className="text-sm text-muted">В MVP — заглушки без оплаты.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Free</p>
          <h2 className="text-2xl font-semibold text-app">Базовый трекер</h2>
          <p className="text-sm text-muted">Для первого цикла «фиксировать → проверять».</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>• До 3 активных выборов</li>
            <li>• История за 30 дней</li>
            <li>• Базовая интерпретация</li>
          </ul>
          <Link to="/auth" className="rounded-full border border-white/15 px-6 py-2 text-sm text-app">
            Текущий план
          </Link>
        </GlassCard>

        <GlassCard className="space-y-4 border border-accent/40">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Pro (заглушка)</p>
          <h2 className="text-2xl font-semibold text-app">Расширенная навигация</h2>
          <p className="text-sm text-muted">Историческая динамика и больше сценариев.</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>• Неограниченные выборы</li>
            <li>• История за 12 месяцев</li>
            <li>• Сравнение сценариев</li>
          </ul>
          <Link to="/auth" className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow">
            Ожидается
          </Link>
        </GlassCard>
      </div>

      <GlassCard>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Сравнение</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { label: 'Активные выборы', free: 'до 3', pro: 'без ограничений' },
            { label: 'История', free: '30 дней', pro: '12 месяцев' },
            { label: 'Сценарии', free: '1 путь', pro: 'несколько' },
          ].map((row) => (
            <div key={row.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{row.label}</p>
              <p className="mt-3 text-sm text-app">Free: {row.free}</p>
              <p className="mt-1 text-sm text-app">Pro: {row.pro}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default PricingPage;

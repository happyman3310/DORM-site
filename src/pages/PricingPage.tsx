import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { useAppData } from '../data/appData';

const PricingPage = () => {
  const { state, setPlan } = useAppData();
  const [error, setError] = useState('');

  if (!state.user) {
    return (
      <GlassCard>
        <div className="space-y-3 text-sm text-muted">
          <p>Для выбора тарифа войдите в профиль.</p>
          <Link to="/auth" className="inline-flex rounded-full bg-accent px-5 py-2 text-xs font-semibold text-white shadow-glow">
            Перейти к авторизации
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Монетизация</p>
        <h1 className="text-2xl font-semibold text-app">Тарифы</h1>
        <p className="text-sm text-muted">В MVP — заглушки без оплаты.</p>
      </header>
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}

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
          {state.plan === 'Free' ? (
            <span className="inline-flex rounded-full border border-white/15 px-6 py-2 text-sm text-app">
              Текущий план
            </span>
          ) : (
            <button
              type="button"
              onClick={async () => {
                try {
                  setError('');
                  await setPlan('Free');
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Не удалось сменить план');
                }
              }}
              className="rounded-full border border-white/15 px-6 py-2 text-sm text-app"
            >
              Выбрать Free
            </button>
          )}
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
          {state.plan === 'Pro' ? (
            <span className="inline-flex rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow">
              Текущий план
            </span>
          ) : (
            <button
              type="button"
              onClick={async () => {
                try {
                  setError('');
                  await setPlan('Pro');
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Не удалось сменить план');
                }
              }}
              className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow"
            >
              Активировать Pro
            </button>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default PricingPage;

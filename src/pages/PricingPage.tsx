import { useEffect, useState } from 'react';
import GlassCard from '../components/GlassCard';
import { profileApi, type Plan } from '../shared/api';

const PricingPage = () => {
  const [plan, setPlan] = useState<Plan>('Free');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlan = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await profileApi.getProfile();
        setPlan(response.plan);
      } catch {
        setError('Не удалось загрузить тариф.');
      } finally {
        setIsLoading(false);
      }
    };
    void fetchPlan();
  }, []);

  const handlePlanChange = async (nextPlan: Plan) => {
    setIsUpdating(true);
    setError('');
    try {
      const response = await profileApi.updatePlan(nextPlan);
      setPlan(response.plan);
    } catch {
      setError('Не удалось обновить тариф.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <GlassCard>Загрузка тарифов...</GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error ? (
        <GlassCard className="border border-rose-300/40 text-sm text-rose-200">
          {error}
        </GlassCard>
      ) : null}
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
          {plan === 'Free' ? (
            <span className="inline-flex rounded-full border border-white/15 px-6 py-2 text-sm text-app">
              Текущий план
            </span>
          ) : (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handlePlanChange('Free')}
              className="rounded-full border border-white/15 px-6 py-2 text-sm text-app"
            >
              {isUpdating ? 'Обновление...' : 'Выбрать Free'}
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
          {plan === 'Pro' ? (
            <span className="inline-flex rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow">
              Текущий план
            </span>
          ) : (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handlePlanChange('Pro')}
              className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow"
            >
              {isUpdating ? 'Обновление...' : 'Активировать Pro'}
            </button>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default PricingPage;

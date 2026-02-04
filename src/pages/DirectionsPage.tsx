import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const DirectionsPage = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Выбор направления</p>
          <h1 className="text-2xl font-semibold text-app">Текущие выборы</h1>
          <p className="text-sm text-muted">Сравнивайте ожидания и реальность по каждому направлению.</p>
        </div>
        <Link to="/directions/new" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-glow">
          Новый выбор
        </Link>
      </header>

      <div className="flex flex-wrap gap-3 text-xs text-muted">
        {['Все', 'В процессе', 'Ожидает проверки', 'Завершено'].map((filter) => (
          <button key={filter} className="rounded-full border border-white/15 px-4 py-2">
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[
          {
            title: 'Поступление в магистратуру',
            period: '1 месяц',
            status: 'Ожидает проверки',
            criteria: ['Интерес 8', 'Энергия 6', 'Реальность 7'],
          },
          {
            title: 'Запуск проекта',
            period: '2 недели',
            status: 'В процессе',
            criteria: ['Интерес 9', 'Энергия 7', 'Сложность 6'],
          },
          {
            title: 'Изучение дизайна',
            period: '3 месяца',
            status: 'В процессе',
            criteria: ['Интерес 7', 'Реальность 5', 'Энергия 6'],
          },
        ].map((direction) => (
          <GlassCard key={direction.title} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-app">{direction.title}</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted">{direction.period}</span>
            </div>
            <p className="text-sm text-muted">
              Ожидаемый результат: чёткое понимание, подходит ли направление в долгую.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-muted">
              {direction.criteria.map((item) => (
                <span key={item} className="rounded-full border border-white/15 px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="flex items-center gap-2">
                <Icon icon="solar:clock-circle-bold-duotone" width={16} />
                {direction.status}
              </span>
              <Link to="/directions/review" className="rounded-full border border-white/15 px-4 py-2 text-xs text-app">
                Проверить
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default DirectionsPage;

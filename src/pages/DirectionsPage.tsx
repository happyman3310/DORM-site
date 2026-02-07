import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GlassCard from '../components/GlassCard';
import { directionsApi, type Direction } from '../shared/api';
import { formatDate } from '../shared/utils/formatting';

const DirectionsPage = () => {
  const [directions, setDirections] = useState<Direction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDirections = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await directionsApi.listDirections();
        setDirections(response);
      } catch {
        setError('Не удалось загрузить направления.');
      } finally {
        setIsLoading(false);
      }
    };
    void fetchDirections();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <GlassCard>Загрузка направлений...</GlassCard>
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

      {directions.length === 0 ? (
        <GlassCard>
          <div className="space-y-3 text-sm text-muted">
            <p>Пока нет созданных направлений.</p>
            <Link to="/directions/new" className="inline-flex rounded-full bg-accent px-5 py-2 text-xs font-semibold text-white shadow-glow">
              Создать первый выбор
            </Link>
          </div>
        </GlassCard>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {directions.map((direction) => (
            <GlassCard key={direction.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-app">{direction.title}</h2>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted">{direction.period}</span>
              </div>
              <p className="text-sm text-muted">{direction.expectedOutcome}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted">
                {Object.entries(direction.criteria).slice(0, 3).map(([criterion, values]) => (
                  <span key={criterion} className="rounded-full border border-white/15 px-3 py-1">
                    {criterion} {values.expected}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-2">
                  <Icon icon="solar:clock-circle-bold-duotone" width={16} />
                  Проверка {formatDate(direction.reviewAt)}
                </span>
                <Link to={`/directions/review/${direction.id}`} className="rounded-full border border-white/15 px-4 py-2 text-xs text-app">
                  Проверить
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectionsPage;

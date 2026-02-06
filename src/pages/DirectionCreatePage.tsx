import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { useAppData } from '../data/appData';

const criteriaList = ['Интерес', 'Сложность', 'Энергия', 'Соответствие ожиданиям', 'Реальность'];
const periodOptions = ['2 недели', '1 месяц', '3 месяца'];

const DirectionCreatePage = () => {
  const navigate = useNavigate();
  const { state, addDirection } = useAppData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [period, setPeriod] = useState(periodOptions[1]);
  const [criteria, setCriteria] = useState<Record<string, number>>(
    criteriaList.reduce((acc, item) => ({ ...acc, [item]: 7 }), {}),
  );
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !expectedOutcome) {
      setError('Заполните название и ожидаемый результат.');
      return;
    }
    try {
      setError('');
      await addDirection({
        title,
        description,
        expectedOutcome,
        period,
        criteria: Object.fromEntries(
          Object.entries(criteria).map(([key, value]) => [key, { expected: value }]),
        ),
      });
      navigate('/directions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить выбор');
    }
  };

  if (!state.user) {
    return (
      <GlassCard>
        <div className="space-y-3 text-sm text-muted">
          <p>Для создания выбора нужно войти в профиль.</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Создание выбора</p>
        <h1 className="text-2xl font-semibold text-app">Новое направление</h1>
        <p className="text-sm text-muted">Опишите, что именно вы проверяете и в какой срок.</p>
      </header>

      <GlassCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-xs text-muted">
            Название
            <input
              type="text"
              placeholder="Например, смена специальности"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-muted">
            Описание
            <textarea
              rows={3}
              placeholder="Почему это важно и что будет считаться успехом"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-muted">
            Ожидаемый результат
            <input
              type="text"
              placeholder="Чёткое понимание, подходит ли направление"
              value={expectedOutcome}
              onChange={(event) => setExpectedOutcome(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-muted">
            Срок проверки
            <div className="flex flex-wrap gap-3">
              {periodOptions.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setPeriod(label)}
                  className={`rounded-full border border-white/15 px-4 py-2 text-xs ${
                    period === label ? 'bg-white/10 text-app' : 'text-app/80'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </label>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Критерии проверки</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {criteriaList.map((criterion) => (
                <div key={criterion} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-app">{criterion}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={criteria[criterion]}
                      onChange={(event) =>
                        setCriteria((prev) => ({ ...prev, [criterion]: Number(event.target.value) }))
                      }
                      className="flex-1 accent-accent"
                    />
                    <span className="rounded-full bg-white/10 px-3 py-1">{criteria[criterion]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {error ? <p className="text-xs text-rose-300">{error}</p> : null}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow"
            >
              Сохранить выбор
            </button>
            <Link to="/directions" className="rounded-full border border-white/15 px-6 py-2 text-sm text-muted">
              Отменить
            </Link>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default DirectionCreatePage;

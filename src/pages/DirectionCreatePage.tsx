import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const DirectionCreatePage = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Создание выбора</p>
        <h1 className="text-2xl font-semibold text-app">Новое направление</h1>
        <p className="text-sm text-muted">Опишите, что именно вы проверяете и в какой срок.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <form className="space-y-6">
            <label className="flex flex-col gap-2 text-xs text-muted">
              Название
              <input
                type="text"
                placeholder="Например, смена специальности"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted">
              Описание
              <textarea
                rows={3}
                placeholder="Почему это важно и что будет считаться успехом"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted">
              Ожидаемый результат
              <input
                type="text"
                placeholder="Чёткое понимание, подходит ли направление"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted">
              Срок проверки
              <div className="flex flex-wrap gap-3">
                {['2 недели', '1 месяц', '3 месяца'].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={`rounded-full border px-4 py-2 text-xs ${
                      label === '1 месяц'
                        ? 'border-accent bg-accent/20 text-accent'
                        : 'border-white/15 text-app/80'
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
                {['Интерес', 'Сложность', 'Энергия', 'Соответствие ожиданиям', 'Реальность'].map((criterion) => (
                  <div key={criterion} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-app">{criterion}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                      <input type="range" min="0" max="10" className="flex-1 accent-accent" />
                      <span className="rounded-full bg-white/10 px-3 py-1">7</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/directions" className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-glow">
                Сохранить выбор
              </Link>
              <Link to="/directions" className="rounded-full border border-white/15 px-6 py-2 text-sm text-muted">
                Отменить
              </Link>
            </div>
          </form>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Превью выбора</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
              <p className="text-sm text-app">Смена специальности</p>
              <p className="mt-2">Срок: 1 месяц</p>
              <p className="mt-1">Ожидаемый результат: ясность и готовность к решению.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {['Интерес 7', 'Энергия 6', 'Реальность 5', 'Сложность 6'].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 px-3 py-1 text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Подсказки</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Формулируйте выбор как гипотезу, которую можно проверить.</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Добавьте критерий «реальность» — он снимает иллюзии.</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Не больше 5 критериев — иначе сложно сравнивать.</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DirectionCreatePage;

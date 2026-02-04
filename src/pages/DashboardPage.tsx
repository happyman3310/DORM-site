import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { interpretationThresholds } from '../config/wayn';
import { checkpoints as checkpointHistory, directions, getLatestCheckpoint, getPreviousCheckpoint } from '../data/mockData';
import { calculateDynamics, calculateGap, findLowZones } from '../utils/interpretation';

const currentCheckpoint = getLatestCheckpoint();
const previousCheckpoint = getPreviousCheckpoint();
const gapValue = calculateGap(currentCheckpoint);
const lowZones = findLowZones(currentCheckpoint);
const dynamics = calculateDynamics(currentCheckpoint, previousCheckpoint);

const metrics = [
  {
    label: 'Сильные зоны',
    value: currentCheckpoint.areas
      .filter((area) => area.score >= 7)
      .map((area) => area.label.split('/')[0].trim())
      .slice(0, 2)
      .join(', '),
  },
  {
    label: 'Слабые зоны',
    value: lowZones.map((area) => area.label.split('/')[0].trim()).join(', ') || 'Нет',
  },
  { label: 'Перекос', value: `Разрыв ${gapValue}` },
];

const agenda = [
  { time: '09:00', title: 'Проверить чекпоинт', tag: 'Сегодня' },
  { time: '12:30', title: 'Встретиться с ментором', tag: 'Среда' },
  { time: '18:00', title: 'Обзор направлений', tag: 'Пятница' },
];

const signals = [
  {
    label: `Разрыв зон > ${interpretationThresholds.gapHighlight}`,
    value: gapValue.toString(),
    tone: 'text-accent',
  },
  {
    label: `Зона ниже ${interpretationThresholds.lowZoneWarning}`,
    value: lowZones[0]?.label.split('/')[0].trim() ?? 'Нет',
    tone: 'text-rose-300',
  },
  {
    label: `Рост недели > ${interpretationThresholds.dynamicsDelta}`,
    value: `${dynamics.delta > 0 ? '+' : ''}${dynamics.delta}`,
    tone: 'text-emerald-300',
  },
];

const checkpoints = checkpointHistory;

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="relative overflow-hidden">
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-accent/30 blur-2xl" />
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Where are you now</p>
          <h1 className="mt-3 text-2xl font-semibold text-app md:text-3xl">
            Точка навигации за сегодня
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Зафиксируй текущее состояние, чтобы видеть перекосы, динамику и готовность к новому выбору.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/checkpoint" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-glow">
              Новый чекпоинт
            </Link>
            <Link to="/history" className="rounded-full border border-white/15 px-5 py-2 text-sm text-app opacity-80">
              Сравнить с прошлой неделей
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{metric.label}</p>
                <p className="mt-2 text-sm font-semibold text-app">{metric.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Интерпретация</p>
              <h2 className="mt-2 text-xl font-semibold text-app">Карта баланса</h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <Icon icon="solar:radar-2-bold-duotone" width={22} />
            </div>
          </div>
          <div className="flex-1 rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/10 p-6">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="relative h-44 w-44">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-5 rounded-full border border-white/15" />
                <div className="absolute inset-10 rounded-full border border-white/20" />
                <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">Визуальная карта</p>
              <p className="mt-1 text-sm text-app">Без советов — только сигналы</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted">
            <p>Разрыв зон &gt; {interpretationThresholds.gapHighlight} → подсветка.</p>
            <p>Зона &lt; {interpretationThresholds.lowZoneWarning} → предупреждение.</p>
            <p>Рост/падение &gt; {interpretationThresholds.dynamicsDelta} → динамика.</p>
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Жизненные области</p>
              <h2 className="mt-2 text-xl font-semibold text-app">Текущие оценки</h2>
            </div>
            <button className="rounded-full border border-white/15 px-4 py-2 text-xs text-muted">
              Обновить
            </button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {currentCheckpoint.areas.map((area) => (
              <div key={area.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-app">{area.label}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted">{area.score}</span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-accent to-accent-strong"
                    style={{ width: `${area.score * 10}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-muted">{area.comment}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Выборы</p>
                <h2 className="mt-2 text-xl font-semibold text-app">Активные направления</h2>
              </div>
              <Link to="/directions/new" className="rounded-full bg-white/10 px-3 py-2 text-xs text-app">
                Новый выбор
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {directions.map((direction) => (
                <div key={direction.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-app">{direction.title}</p>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-[11px] text-accent">
                      {direction.period}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted">{direction.status}</p>
                  <p className="mt-2 text-xs text-muted">{direction.criteria.join(' • ')}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                    <Icon icon="solar:clock-circle-bold-duotone" width={16} />
                    Следующая проверка через {direction.nextReviewInDays} дней
                  </div>
                </div>
              ))}
              <Link to="/directions" className="block rounded-full border border-white/15 px-4 py-2 text-center text-xs text-muted">
                Все направления
              </Link>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Повестка</p>
                <h3 className="mt-2 text-lg font-semibold text-app">Ближайшие точки</h3>
              </div>
              <Icon icon="solar:bell-bing-bold-duotone" width={20} />
            </div>
            <div className="mt-5 space-y-3">
              {agenda.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-muted">
                  <div>
                    <p className="text-sm text-app">{item.title}</p>
                    <p className="mt-1">{item.time}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1">{item.tag}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Сигналы</p>
              <h3 className="mt-2 text-lg font-semibold text-app">Ключевые индикаторы</h3>
            </div>
            <Icon icon="solar:shield-warning-bold-duotone" width={20} />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{signal.label}</p>
                <p className={`mt-2 text-lg font-semibold ${signal.tone}`}>{signal.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">История</p>
              <h3 className="mt-2 text-lg font-semibold text-app">Последние чекпоинты</h3>
            </div>
            <Link to="/history" className="rounded-full border border-white/15 px-4 py-2 text-xs text-muted">
              Перейти
            </Link>
          </div>
          <div className="mt-6 space-y-3">
            {checkpoints.map((checkpoint) => (
              <div key={checkpoint.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm text-app">{checkpoint.date}</p>
                  <p className="mt-1 text-xs text-muted">{checkpoint.note}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted">
                  {checkpoint.averageScore}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default DashboardPage;

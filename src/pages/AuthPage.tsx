import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { useAppData } from '../data/appData';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAppData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('Школа');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Заполните email и пароль.');
      return;
    }
    const initials = email
      .split('@')[0]
      .split(/[^a-zA-Zа-яА-Я0-9]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
    login({
      email,
      age: age ? Number(age) : undefined,
      status,
      initials: initials || 'WA',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-auth px-6 py-16 text-app">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-strong shadow-glow">
            <Icon icon="solar:compass-bold-duotone" width={24} className="text-white" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">WAYN</p>
          <h1 className="text-3xl font-semibold text-app md:text-4xl">
            Вход в навигационную панель
          </h1>
          <p className="text-sm text-muted">
            Минимальный профиль: возраст и статус. Без соцсети, без советов — только навигация.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            <span className="rounded-full border border-white/15 px-4 py-2">mobile-first</span>
            <span className="rounded-full border border-white/15 px-4 py-2">тёмная + светлая тема</span>
            <span className="rounded-full border border-white/15 px-4 py-2">без ИИ</span>
          </div>
        </div>
        <GlassCard className="flex-1">
          <h2 className="text-xl font-semibold text-app">Войти</h2>
          <p className="mt-2 text-sm text-muted">Используйте email и пароль.</p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-xs text-muted">
              Email
              <input
                type="email"
                placeholder="you@wayn.app"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted">
              Пароль
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-xs text-muted">
                Возраст
                <input
                  type="number"
                  placeholder="19"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-2 text-xs text-muted">
                Статус
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-app outline-none transition focus:border-accent"
                >
                  <option>Школа</option>
                  <option>ВУЗ</option>
                  <option>Работа</option>
                  <option>Другое</option>
                </select>
              </label>
            </div>
            {error ? <p className="text-xs text-rose-300">{error}</p> : null}
            <button
              type="submit"
              className="block w-full rounded-2xl bg-accent px-6 py-3 text-center text-sm font-semibold text-white shadow-glow"
            >
              Продолжить
            </button>
            <p className="text-center text-xs text-muted">
              Нет аккаунта? <span className="text-app">Создать</span>
            </p>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default AuthPage;

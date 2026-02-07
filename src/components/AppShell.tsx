import { Outlet, NavLink, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { authApi, profileApi, type UserProfile } from '../shared/api';
import { ApiError } from '../shared/api/client';

const navItems = [
  { to: '/', label: 'Панель', icon: 'solar:home-2-bold-duotone' },
  { to: '/checkpoint', label: 'Чекпоинт', icon: 'solar:check-circle-bold-duotone' },
  { to: '/directions', label: 'Выборы', icon: 'solar:map-point-bold-duotone' },
  { to: '/history', label: 'История', icon: 'solar:chart-2-bold-duotone' },
  { to: '/pricing', label: 'Тарифы', icon: 'solar:wallet-bold-duotone' },
];

const AppShell = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await profileApi.getProfile();
        setProfile(response.profile);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          setProfile(null);
        } else {
          setError('Не удалось загрузить профиль.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    void fetchProfile();
  }, []);

  const handleLogout = async () => {
    setError('');
    try {
      await authApi.logout();
      setProfile(null);
    } catch {
      setError('Не удалось выйти из профиля.');
    }
  };

  return (
    <div className="min-h-screen bg-app text-app">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-strong shadow-glow">
              <Icon icon="solar:compass-bold-duotone" className="text-app" width={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">WAYN</p>
              <p className="text-lg font-semibold text-app">Навигационная панель</p>
            </div>
          </div>
          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 transition ${
                    isActive ? 'bg-white/10 text-app' : 'text-muted hover:text-app'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted md:flex">
              <Icon icon="solar:calendar-mark-bold-duotone" width={18} />
              Понедельник, 15 сентября
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            {profile ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted transition hover:text-app md:flex"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/30 text-[10px] text-accent">
                  {profile.initials}
                </span>
                {isLoading ? '...' : 'Выйти'}
              </button>
            ) : (
              <Link
                to="/auth"
                className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted md:flex"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/30 text-[10px] text-accent">
                  ??
                </span>
                {isLoading ? '...' : 'Войти'}
              </Link>
            )}
          </div>
        </div>
        {error ? <p className="px-6 pb-3 text-xs text-rose-300">{error}</p> : null}
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8">
        <Outlet />
      </main>

      <nav className="fixed bottom-4 left-1/2 z-40 w-[92%] max-w-xl -translate-x-1/2 rounded-3xl border border-white/10 bg-surface/90 px-4 py-3 shadow-soft backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[10px] transition ${
                  isActive ? 'text-app' : 'text-muted'
                }`
              }
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                  item.to === '/checkpoint' ? 'bg-accent text-white' : 'bg-white/5'
                }`}
              >
                <Icon icon={item.icon} width={20} />
              </div>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppShell;

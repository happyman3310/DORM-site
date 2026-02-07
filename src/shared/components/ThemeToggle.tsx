import { Icon } from '@iconify/react';

type ThemeToggleProps = {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
};

const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => {
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted transition hover:border-white/20 hover:text-white"
    >
      <Icon icon={theme === 'dark' ? 'solar:moon-stars-bold-duotone' : 'solar:sun-2-bold-duotone'} width={18} />
      {theme === 'dark' ? 'Тёмная' : 'Светлая'}
    </button>
  );
};

export default ThemeToggle;

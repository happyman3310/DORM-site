import { ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div className={`rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-soft backdrop-blur-xl ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default GlassCard;

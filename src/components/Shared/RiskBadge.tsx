import { ReactNode } from 'react';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high' | 'severe';
  children?: ReactNode;
}

const RiskBadge = ({ level, children }: RiskBadgeProps) => {
  const styles = {
    low: 'bg-green-500/20 text-green-500',
    medium: 'bg-yellow-500/20 text-yellow-500',
    high: 'bg-orange-500/20 text-orange-500',
    severe: 'bg-red-500/20 text-red-500 animate-pulse',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[level]}`}>
      {children || level.toUpperCase()}
    </span>
  );
};

export default RiskBadge;
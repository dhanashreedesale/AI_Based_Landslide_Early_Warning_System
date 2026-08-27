import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM d, yyyy HH:mm:ss');
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatRiskScore = (score: number): string => {
  return `${Math.round(score)}%`;
};

export const formatRainfall = (mm: number): string => {
  return `${Math.round(mm)} mm`;
};

export const getRiskLevelFromScore = (score: number): 'low' | 'medium' | 'high' | 'severe' => {
  if (score >= 80) return 'severe';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
};

export const getRiskColor = (level: string): string => {
  const colors = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
    severe: '#dc2626',
  };
  return colors[level as keyof typeof colors] || '#6b7280';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
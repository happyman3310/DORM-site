import { lifeAreas } from '../constants/lifeAreas';
import type { Checkpoint } from '../api/types';

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
  });

export const calculateAreaSummary = (checkpoint: Checkpoint | null) => {
  if (!checkpoint) return null;
  const entries = Object.entries(checkpoint.areas).map(([id, area]) => ({
    id,
    score: area.score,
  }));
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const strong = sorted.slice(0, 2).map((item) => item.id);
  const weak = sorted.slice(-2).map((item) => item.id);
  return { strong, weak };
};

export const formatAreaLabels = (ids: string[]) =>
  ids
    .map((id) => lifeAreas.find((area) => area.id === id)?.label ?? id)
    .join(', ');

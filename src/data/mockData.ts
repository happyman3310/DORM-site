import { lifeAreas } from './lifeAreas';
import type { Checkpoint, Direction, LifeAreaScore } from '../types/wayn';

const buildAreas = (scores: number[], comments: string[]): LifeAreaScore[] =>
  lifeAreas.map((area, index) => ({
    key: area.id as LifeAreaScore['key'],
    label: area.label,
    score: scores[index],
    comment: comments[index],
  }));

export const checkpoints: Checkpoint[] = [
  {
    id: 'cp-12-09',
    date: '12 сент',
    averageScore: 7.4,
    note: 'Сильный фокус на навыках',
    areas: buildAreas(
      [7, 8, 6, 4, 5, 7, 6],
      [
        'Стабильный прогресс по учебе.',
        'Активно развиваю прикладные навыки.',
        'Интересы стабильны, не хватает новизны.',
        'Финансы просели из-за трат.',
        'Энергия ниже комфортного уровня.',
        'Окружение поддерживает.',
        'Смысл требует пересборки.',
      ],
    ),
  },
  {
    id: 'cp-05-09',
    date: '05 сент',
    averageScore: 5.8,
    note: 'Энергия на минимуме',
    areas: buildAreas(
      [6, 6, 5, 3, 3, 6, 5],
      [
        'Учёба без рывков.',
        'Навыки в режиме поддержки.',
        'Интерес снизился.',
        'Денежный поток нестабилен.',
        'Энергия критически низкая.',
        'Окружение нейтрально.',
        'Нет ясности по направлению.',
      ],
    ),
  },
  {
    id: 'cp-29-08',
    date: '29 авг',
    averageScore: 6.9,
    note: 'Стабильный баланс',
    areas: buildAreas(
      [7, 7, 7, 5, 6, 7, 6],
      [
        'Учёба в хорошем ритме.',
        'Навыки растут постепенно.',
        'Интересы на подъеме.',
        'Финансы умеренные.',
        'Энергия ровная.',
        'Окружение заряжает.',
        'Смысл в поиске.',
      ],
    ),
  },
];

export const directions: Direction[] = [
  {
    id: 'dir-master',
    title: 'Поступление в магистратуру',
    period: '1 месяц',
    status: 'Ожидает проверки',
    criteria: ['Интерес 8', 'Реальность 7', 'Энергия 6'],
    nextReviewInDays: 6,
  },
  {
    id: 'dir-shift',
    title: 'Смена специализации',
    period: '2 недели',
    status: 'В процессе',
    criteria: ['Энергия 6', 'Реальность 5', 'Сложность 7'],
    nextReviewInDays: 12,
  },
  {
    id: 'dir-design',
    title: 'Изучение дизайна',
    period: '3 месяца',
    status: 'В процессе',
    criteria: ['Интерес 7', 'Реальность 5', 'Энергия 6'],
    nextReviewInDays: 20,
  },
];

export const getLatestCheckpoint = () => checkpoints[0];
export const getPreviousCheckpoint = () => checkpoints[1];

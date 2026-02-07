export interface RecommendationInput {
  stressLevel?: number;
  clarityLevel?: number;
  goals: string[];
  interests: string[];
}

export interface DirectionRecommendation {
  direction: string;
  score: number;
  explanation: string;
}

const DIRECTION_CATALOG = [
  {
    direction: 'Профессия и карьера',
    keywords: ['карьера', 'работа', 'профессия', 'рост', 'доход', 'позиция'],
  },
  {
    direction: 'Обучение и навыки',
    keywords: ['учёба', 'учеба', 'курсы', 'навыки', 'образование', 'развитие'],
  },
  {
    direction: 'Здоровье и энергия',
    keywords: ['здоровье', 'сон', 'спорт', 'энергия', 'тело', 'привычки'],
  },
  {
    direction: 'Отношения и окружение',
    keywords: ['семья', 'друзья', 'отношения', 'поддержка', 'сообщество'],
  },
  {
    direction: 'Финансы и стабильность',
    keywords: ['деньги', 'финансы', 'накопления', 'бюджет', 'стабильность'],
  },
  {
    direction: 'Смысл и самореализация',
    keywords: ['смысл', 'миссия', 'ценности', 'самореализация', 'вклад'],
  },
  {
    direction: 'Отдых и восстановление',
    keywords: ['отдых', 'хобби', 'баланс', 'восстановление', 'пауза'],
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalizeList = (items: string[]) => items.map((item) => item.trim().toLowerCase()).filter(Boolean);

export const recommendDirections = ({
  stressLevel,
  clarityLevel,
  goals,
  interests,
}: RecommendationInput): DirectionRecommendation[] => {
  const normalizedGoals = normalizeList(goals);
  const normalizedInterests = normalizeList(interests);
  const combined = [...normalizedGoals, ...normalizedInterests];

  const readiness = (() => {
    const safeStress = clamp(stressLevel ?? 5, 0, 10);
    const safeClarity = clamp(clarityLevel ?? 5, 0, 10);
    return (safeClarity + (10 - safeStress)) / 20;
  })();

  return DIRECTION_CATALOG.map((direction) => {
    const matches = direction.keywords.filter((keyword) =>
      combined.some((item) => item.includes(keyword)),
    );
    const matchScore = matches.length / direction.keywords.length;
    const score = Math.round((matchScore * 0.6 + readiness * 0.4) * 100);

    const explanationParts = [];
    if (matches.length > 0) {
      explanationParts.push(`Совпадения по интересам/целям: ${matches.join(', ')}`);
    }
    explanationParts.push(`Готовность: ${Math.round(readiness * 100)}%`);

    return {
      direction: direction.direction,
      score,
      explanation: explanationParts.join('. '),
    };
  }).sort((a, b) => b.score - a.score);
};

export const calculateProgress = async (userId: string) => ({
  userId,
  progress: 0,
  updatedAt: new Date().toISOString(),
});

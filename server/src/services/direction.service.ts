import { directionRepository, type DirectionRecord } from '../repositories/direction.repository';

type RecommendDirectionsInput = {
  stressLevel: number;
  clarityLevel: number;
  goals: string[];
  interests: string[];
};

type DirectionExplanation = {
  stress: number;
  clarity: number;
  goals: number;
  interests: number;
  total: number;
};

export type DirectionRecommendation = {
  direction: DirectionRecord;
  score: number;
  explanation: DirectionExplanation;
};

const normalizeTags = (value: string[] | string | null | undefined) => {
  if (!value) return [];
  const raw = Array.isArray(value) ? value : value.split(',');
  return raw
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.length > 0);
};

const countIntersection = (left: string[], right: string[]) => {
  if (left.length === 0 || right.length === 0) return 0;
  const rightSet = new Set(right);
  return left.reduce((total, item) => (rightSet.has(item) ? total + 1 : total), 0);
};

export const recommendDirections = async (
  input: RecommendDirectionsInput,
): Promise<DirectionRecommendation[]> => {
  const directions = await directionRepository.findAll();
  const normalizedGoals = normalizeTags(input.goals);
  const normalizedInterests = normalizeTags(input.interests);

  const scored = directions.map((direction) => {
    const directionGoals = normalizeTags(direction.goals);
    const directionInterests = normalizeTags(direction.interests);
    const stressContribution = direction.stressWeight * input.stressLevel;
    const clarityContribution = direction.clarityWeight * input.clarityLevel;
    const goalsMatch = countIntersection(normalizedGoals, directionGoals);
    const interestMatch = countIntersection(normalizedInterests, directionInterests);
    const total = stressContribution + clarityContribution + goalsMatch + interestMatch;

    return {
      direction,
      score: total,
      explanation: {
        stress: stressContribution,
        clarity: clarityContribution,
        goals: goalsMatch,
        interests: interestMatch,
        total,
      },
    };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
};

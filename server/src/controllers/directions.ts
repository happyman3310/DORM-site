import type { Request, Response } from 'express';

import { calculateProgress, recommendDirections } from '../services/directions';

const parseArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  if (typeof value === 'string') {
    if (value.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item));
        }
      } catch {
        return value.split(',').map((item) => item.trim()).filter(Boolean);
      }
    }

    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return [];
};

const parseNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
};

const getInputValue = (req: Request, key: string) => {
  if (req.query[key] !== undefined) {
    return req.query[key];
  }

  if (req.body && key in req.body) {
    return req.body[key];
  }

  return undefined;
};

export const getDirectionRecommendations = async (req: Request, res: Response) => {
  const stressLevel = parseNumber(getInputValue(req, 'stressLevel'));
  const clarityLevel = parseNumber(getInputValue(req, 'clarityLevel'));
  const goals = parseArray(getInputValue(req, 'goals'));
  const interests = parseArray(getInputValue(req, 'interests'));
  const userIdValue = getInputValue(req, 'userId');
  const userId = typeof userIdValue === 'string' ? userIdValue : undefined;

  const recommendations = recommendDirections({
    stressLevel,
    clarityLevel,
    goals,
    interests,
  });

  if (userId) {
    const progress = await calculateProgress(userId);
    res.json({ recommendations, progress });
    return;
  }

  res.json(recommendations);
};

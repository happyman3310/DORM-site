export type LifeAreaKey =
  | 'education'
  | 'skills'
  | 'interests'
  | 'money'
  | 'energy'
  | 'environment'
  | 'meaning';

export type LifeAreaScore = {
  key: LifeAreaKey;
  label: string;
  score: number;
  comment: string;
};

export type Checkpoint = {
  id: string;
  date: string;
  averageScore: number;
  note: string;
  areas: LifeAreaScore[];
};

export type Direction = {
  id: string;
  title: string;
  period: string;
  status: string;
  criteria: string[];
  nextReviewInDays: number;
};

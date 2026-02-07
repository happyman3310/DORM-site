export type DirectionRecord = {
  id: string;
  title: string;
  description?: string | null;
  stressWeight: number;
  clarityWeight: number;
  goals?: string[] | string | null;
  interests?: string[] | string | null;
};

export const directionRepository = {
  async findAll(): Promise<DirectionRecord[]> {
    return [];
  },
};

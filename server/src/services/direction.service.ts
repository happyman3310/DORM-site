export type Checkpoint = {
  id: string;
  userId: string;
  stressLevel: number;
  clarityLevel: number;
  createdAt: Date | string;
};

export type ProgressSummary = {
  deltaStress: number;
  deltaClarity: number;
  avgStress: number;
  avgClarity: number;
  count: number;
};

export type CheckpointRepository = {
  getCheckpointsByUserId: (userId: string) => Promise<Checkpoint[]>;
};

export const calculateProgress = async (
  userId: string,
  repository: CheckpointRepository
): Promise<ProgressSummary> => {
  const checkpoints = await repository.getCheckpointsByUserId(userId);
  const sorted = [...checkpoints].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const count = sorted.length;

  if (count === 0) {
    return {
      deltaStress: 0,
      deltaClarity: 0,
      avgStress: 0,
      avgClarity: 0,
      count: 0,
    };
  }

  const first = sorted[0];
  const last = sorted[count - 1];
  const totals = sorted.reduce(
    (acc, checkpoint) => {
      acc.stress += checkpoint.stressLevel;
      acc.clarity += checkpoint.clarityLevel;
      return acc;
    },
    { stress: 0, clarity: 0 }
  );

  return {
    deltaStress: last.stressLevel - first.stressLevel,
    deltaClarity: last.clarityLevel - first.clarityLevel,
    avgStress: totals.stress / count,
    avgClarity: totals.clarity / count,
    count,
  };
};

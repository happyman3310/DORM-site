import type { Checkpoint } from '../types/wayn';
import { interpretationThresholds } from '../config/wayn';

export const calculateGap = (checkpoint: Checkpoint) => {
  const scores = checkpoint.areas.map((area) => area.score);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  return Number((maxScore - minScore).toFixed(1));
};

export const findLowZones = (checkpoint: Checkpoint) =>
  checkpoint.areas.filter((area) => area.score < interpretationThresholds.lowZoneWarning);

export const calculateDynamics = (current: Checkpoint, previous: Checkpoint) => {
  const currentAvg = current.averageScore;
  const previousAvg = previous.averageScore;
  const delta = Number((currentAvg - previousAvg).toFixed(1));

  return {
    delta,
    isSignificant: Math.abs(delta) > interpretationThresholds.dynamicsDelta,
  };
};

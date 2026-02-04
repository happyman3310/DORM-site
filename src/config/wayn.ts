export const interpretationThresholds = {
  gapHighlight: 3,
  lowZoneWarning: 4,
  dynamicsDelta: 1,
};

export const planLimits = {
  free: {
    activeDirections: 3,
    historyDays: 30,
    scenarios: 1,
  },
  pro: {
    activeDirections: '∞',
    historyDays: 365,
    scenarios: 3,
  },
};

export const stackDecision = {
  hosting: 'Self-hosted (on-prem)',
  database: 'PostgreSQL (self-hosted)',
  auth: 'Custom JWT + email/password (self-hosted)',
};

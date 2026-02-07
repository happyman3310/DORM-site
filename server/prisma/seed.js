import { PrismaClient, DirectionStatus } from '@prisma/client';

const prisma = new PrismaClient();

const directions = [
  {
    title: 'Здоровье и энергия',
    description: 'Сформировать устойчивые привычки для поддержки физической формы.',
    expectedOutcome: 'Тренировки 3 раза в неделю и стабильный сон.',
    period: '8 недель',
    reviewAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 56),
    status: DirectionStatus.IN_PROGRESS,
    criteria: {
      workoutsPerWeek: { expected: 3 },
      sleepHours: { expected: 7 },
    },
  },
  {
    title: 'Учёба и карьера',
    description: 'Сфокусироваться на прогрессе по ключевому предмету.',
    expectedOutcome: 'Сдать два промежуточных теста на 85+ баллов.',
    period: '6 недель',
    reviewAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 42),
    status: DirectionStatus.PENDING_REVIEW,
    criteria: {
      testsPassed: { expected: 2 },
      averageScore: { expected: 85 },
    },
  },
  {
    title: 'Отношения и поддержка',
    description: 'Регулярно поддерживать связь с друзьями и семьёй.',
    expectedOutcome: 'Не меньше 4 встреч/созвонов в месяц.',
    period: '4 недели',
    reviewAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28),
    status: DirectionStatus.COMPLETED,
    criteria: {
      meetups: { expected: 4, actual: 5 },
    },
  },
];

const main = async () => {
  await prisma.direction.createMany({
    data: directions,
    skipDuplicates: true,
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

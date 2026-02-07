const recommendations = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Развивайтесь в UI/UX, React и современном вебе.",
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Сфокусируйтесь на API, базах данных и архитектуре.",
  },
  {
    id: "data",
    title: "Data & AI",
    description: "Постройте карьеру в аналитике, ML и data engineering.",
  },
];

export const directionsService = {
  recommend() {
    return recommendations;
  },
};

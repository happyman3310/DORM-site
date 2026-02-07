import { randomUUID } from "crypto";

const checkpoints = [];

export const checkpointRepository = {
  create(userId, data) {
    const checkpoint = {
      id: randomUUID(),
      userId,
      status: data.status ?? "pending",
      note: data.note ?? "",
      createdAt: new Date().toISOString(),
    };

    checkpoints.push(checkpoint);
    return checkpoint;
  },
  listByUser(userId) {
    return checkpoints.filter((checkpoint) => checkpoint.userId === userId);
  },
};

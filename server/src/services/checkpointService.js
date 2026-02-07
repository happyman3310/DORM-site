import { checkpointRepository } from "../repositories/checkpointRepository.js";

export const checkpointService = {
  create(userId, payload) {
    return checkpointRepository.create(userId, payload);
  },
  history(userId) {
    return checkpointRepository.listByUser(userId);
  },
};

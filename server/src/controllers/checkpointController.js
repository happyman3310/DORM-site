import { checkpointService } from "../services/checkpointService.js";

export const createCheckpoint = (req, res, next) => {
  try {
    const checkpoint = checkpointService.create(req.userId, req.body);
    res.status(201).json(checkpoint);
  } catch (error) {
    next(error);
  }
};

export const getHistory = (req, res, next) => {
  try {
    const history = checkpointService.history(req.userId);
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

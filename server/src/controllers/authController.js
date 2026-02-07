import { authService } from "../services/authService.js";

export const register = (req, res, next) => {
  try {
    const result = authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = (req, res, next) => {
  try {
    const result = authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

import { userService } from "../services/userService.js";

export const getMe = (req, res, next) => {
  try {
    const user = userService.getMe(req.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = (req, res, next) => {
  try {
    const updated = userService.updateProfile(req.userId, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

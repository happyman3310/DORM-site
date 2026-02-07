import { directionsService } from "../services/directionsService.js";

export const recommendDirections = (req, res, next) => {
  try {
    const recommendations = directionsService.recommend();
    res.status(200).json(recommendations);
  } catch (error) {
    next(error);
  }
};

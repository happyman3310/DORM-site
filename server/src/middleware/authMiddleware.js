import { authService } from "../services/authService.js";

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  const userId = authService.getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.userId = userId;
  return next();
};

import { randomUUID } from "crypto";
import { userRepository } from "../repositories/userRepository.js";

const sessions = new Map();

const sanitizeUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  profile: user.profile,
  createdAt: user.createdAt,
});

export const authService = {
  register({ email, password, name }) {
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      throw error;
    }

    if (userRepository.findByEmail(email)) {
      const error = new Error("Email already exists");
      error.status = 409;
      throw error;
    }

    const user = userRepository.create({ email, password, name: name || email });
    const token = randomUUID();
    sessions.set(token, user.id);

    return { user: sanitizeUser(user), token };
  },
  login({ email, password }) {
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      throw error;
    }

    const user = userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      const error = new Error("Invalid credentials");
      error.status = 401;
      throw error;
    }

    const token = randomUUID();
    sessions.set(token, user.id);

    return { user: sanitizeUser(user), token };
  },
  getUserIdFromToken(token) {
    return sessions.get(token) || null;
  },
};

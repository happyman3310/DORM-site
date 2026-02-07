import { userRepository } from "../repositories/userRepository.js";

export const userService = {
  getMe(userId) {
    const user = userRepository.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profile: user.profile,
      createdAt: user.createdAt,
    };
  },
  updateProfile(userId, updates) {
    const user = userRepository.updateProfile(userId, updates);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profile: user.profile,
      createdAt: user.createdAt,
    };
  },
};

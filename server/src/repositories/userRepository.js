import { randomUUID } from "crypto";

const users = [];

export const userRepository = {
  create({ email, password, name }) {
    const user = {
      id: randomUUID(),
      email,
      password,
      name,
      profile: {
        name,
        bio: "",
        direction: "",
      },
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    return user;
  },
  findByEmail(email) {
    return users.find((user) => user.email === email) || null;
  },
  findById(id) {
    return users.find((user) => user.id === id) || null;
  },
  updateProfile(id, updates) {
    const user = users.find((existing) => existing.id === id);

    if (!user) {
      return null;
    }

    user.profile = {
      ...user.profile,
      ...updates,
    };

    return user;
  },
};

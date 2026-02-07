import { randomUUID } from 'node:crypto';

const usersByEmail = new Map();

export const createUser = async ({ email, passwordHash, name }) => {
  const id = randomUUID();
  const user = { id, email, passwordHash, name };
  usersByEmail.set(email, user);
  return user;
};

export const findUserByEmail = async (email) => usersByEmail.get(email) ?? null;

export const findUserById = async (id) => {
  for (const user of usersByEmail.values()) {
    if (user.id === id) {
      return user;
    }
  }
  return null;
};

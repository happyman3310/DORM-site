import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from './middleware/verifyToken.js';
import { createUser, findUserByEmail, findUserById } from './store.js';

const app = express();
app.use(express.json());

const createAccessToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret is not configured.');
  }
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

app.post('/auth/register', async (req, res) => {
  const { email, password, name } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await createUser({ email, passwordHash, name });
  const accessToken = createAccessToken(user.id);

  return res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name ?? null },
    accessToken,
  });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const accessToken = createAccessToken(user.id);
  return res.json({
    user: { id: user.id, email: user.email, name: user.name ?? null },
    accessToken,
  });
});

app.get('/user/me', verifyToken, async (req, res) => {
  const user = await findUserById(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json({ id: user.id, email: user.email, name: user.name ?? null });
});

app.get('/profile', verifyToken, (req, res) => {
  return res.json({ userId: req.user.userId, status: 'ok' });
});

app.post('/checkpoint', verifyToken, (req, res) => {
  return res.status(201).json({ userId: req.user.userId, checkpoint: req.body ?? {} });
});

app.get('/checkpoint/history', verifyToken, (req, res) => {
  return res.json({ userId: req.user.userId, history: [] });
});

app.get('/directions/recommend', verifyToken, (req, res) => {
  return res.json({ userId: req.user.userId, recommendations: [] });
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

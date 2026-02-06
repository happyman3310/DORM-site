import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, 'db.json');
const JWT_SECRET = process.env.WAYN_JWT_SECRET ?? 'wayn-dev-secret';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const lifeAreas = [
  { id: 'education', label: 'Учёба / образование' },
  { id: 'skills', label: 'Навыки / компетенции' },
  { id: 'interests', label: 'Интересы' },
  { id: 'money', label: 'Деньги' },
  { id: 'energy', label: 'Энергия / состояние' },
  { id: 'environment', label: 'Окружение' },
  { id: 'meaning', label: 'Смысл / направление' },
];

const defaultDb = {
  users: [],
  checkpoints: [],
  directions: [],
};

const loadDb = async () => {
  try {
    const raw = await readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    return { ...defaultDb };
  }
};

const saveDb = async (data) => {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

const signToken = (userId) =>
  jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' });

const getInitials = (email) => {
  const prefix = email.split('@')[0] ?? '';
  const parts = prefix.split(/[^a-zA-Zа-яА-Я0-9]+/).filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
  return initials || 'WA';
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.sub;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const buildState = (db, userId) => {
  const user = db.users.find((item) => item.id === userId);
  if (!user) return null;
  return {
    user: {
      id: user.id,
      email: user.email,
      age: user.age ?? null,
      status: user.status ?? null,
      initials: user.initials,
    },
    checkpoints: db.checkpoints.filter((item) => item.userId === userId),
    directions: db.directions.filter((item) => item.userId === userId),
    plan: user.plan ?? 'Free',
  };
};

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/life-areas', (_, res) => {
  res.json(lifeAreas);
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password, age, status } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const db = await loadDb();
  const existing = db.users.find((item) => item.email === email);
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
    age: age ?? null,
    status: status ?? null,
    initials: getInitials(email),
    plan: 'Free',
  };
  db.users.push(user);
  await saveDb(db);
  const token = signToken(user.id);
  return res.json({ token, state: buildState(db, user.id) });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const db = await loadDb();
  const user = db.users.find((item) => item.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken(user.id);
  return res.json({ token, state: buildState(db, user.id) });
});

app.get('/api/state', authMiddleware, async (req, res) => {
  const db = await loadDb();
  const state = buildState(db, req.userId);
  if (!state) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(state);
});

app.post('/api/checkpoints', authMiddleware, async (req, res) => {
  const { areas } = req.body ?? {};
  if (!areas || typeof areas !== 'object') {
    return res.status(400).json({ message: 'Areas payload required' });
  }
  const db = await loadDb();
  const checkpoint = {
    id: crypto.randomUUID(),
    userId: req.userId,
    createdAt: new Date().toISOString(),
    areas,
  };
  db.checkpoints.unshift(checkpoint);
  await saveDb(db);
  return res.json({ checkpoint });
});

app.post('/api/directions', authMiddleware, async (req, res) => {
  const { title, description, expectedOutcome, period, criteria } = req.body ?? {};
  if (!title || !expectedOutcome || !period) {
    return res.status(400).json({ message: 'Missing direction fields' });
  }
  const db = await loadDb();
  const createdAt = new Date();
  const reviewAt = new Date(createdAt);
  if (String(period).includes('нед')) {
    const weeks = Number.parseInt(period, 10) || 2;
    reviewAt.setDate(reviewAt.getDate() + weeks * 7);
  } else if (String(period).includes('месяц')) {
    const months = Number.parseInt(period, 10) || 1;
    reviewAt.setMonth(reviewAt.getMonth() + months);
  } else {
    reviewAt.setDate(reviewAt.getDate() + 14);
  }
  const direction = {
    id: crypto.randomUUID(),
    userId: req.userId,
    title,
    description: description ?? '',
    expectedOutcome,
    period,
    createdAt: createdAt.toISOString(),
    reviewAt: reviewAt.toISOString(),
    status: 'В процессе',
    criteria: criteria ?? {},
  };
  db.directions.unshift(direction);
  await saveDb(db);
  return res.json({ direction });
});

app.patch('/api/directions/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body ?? {};
  const db = await loadDb();
  const index = db.directions.findIndex((item) => item.id === id && item.userId === req.userId);
  if (index === -1) {
    return res.status(404).json({ message: 'Direction not found' });
  }
  db.directions[index] = { ...db.directions[index], ...updates };
  await saveDb(db);
  return res.json({ direction: db.directions[index] });
});

app.put('/api/plan', authMiddleware, async (req, res) => {
  const { plan } = req.body ?? {};
  if (!plan) {
    return res.status(400).json({ message: 'Plan required' });
  }
  const db = await loadDb();
  const user = db.users.find((item) => item.id === req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.plan = plan;
  await saveDb(db);
  return res.json({ plan: user.plan });
});

const PORT = process.env.PORT ?? 5050;
app.listen(PORT, () => {
  console.log(`WAYN API listening on http://localhost:${PORT}`);
});

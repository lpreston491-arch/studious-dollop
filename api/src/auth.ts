import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { query, execute, escape } from './db';
import { User } from '@shared/index';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existingUsers = query<User>(`SELECT * FROM users WHERE email = '${escape(email)}'`);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = randomUUID();

    execute(`INSERT INTO users (id, email, password_hash) VALUES ('${id}', '${escape(email)}', '${hashedPassword}')`);

    const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const users = query<any>(`SELECT * FROM users WHERE email = '${escape(email)}'`);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

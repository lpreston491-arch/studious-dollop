import express from 'express';
import { randomUUID } from 'crypto';
import { query, execute, escape } from './db';
import { authenticateJWT, AuthRequest } from './middleware';
import { Habit, Checkin } from '@shared/index';
import { format } from 'date-fns';
import { updateStreak } from './streakEngine';

const router = express.Router();

router.use(authenticateJWT);

router.get('/', (req: AuthRequest, res) => {
  try {
    const habits = query<Habit>(`SELECT * FROM habits WHERE user_id = '${req.userId}' AND is_active = 1`);
    res.json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', (req: AuthRequest, res) => {
  const { name, frequency, reminder_time, note, color } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    // Check subscription limit for free tier
    const [user]: any = query(`SELECT subscription_tier FROM users WHERE id = '${req.userId}'`);
    if (user?.subscription_tier !== 'premium') {
      const habitsCount: any = query(`SELECT COUNT(*) as count FROM habits WHERE user_id = '${req.userId}' AND is_active = 1`);
      if (habitsCount[0].count >= 3) {
        return res.status(403).json({ error: 'Free tier limited to 3 habits. Upgrade to Premium for unlimited.' });
      }
    }

    const id = randomUUID();
    execute(`INSERT INTO habits (id, user_id, name, frequency, reminder_time, note, color) VALUES (
      '${id}', 
      '${req.userId}', 
      '${escape(name)}', 
      '${escape(frequency || 'daily')}', 
      ${reminder_time ? `'${escape(reminder_time)}'` : 'NULL'}, 
      ${note ? `'${escape(note)}'` : 'NULL'}, 
      ${color ? `'${escape(color)}'` : 'NULL'}
    )`);

    // Initialize streak
    const streakId = randomUUID();
    execute(`INSERT INTO streaks (id, habit_id, user_id) VALUES ('${streakId}', '${id}', '${req.userId}')`);

    res.status(201).json({ id, name, frequency, reminder_time, note, color });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', (req: AuthRequest, res) => {
  const { id } = req.params;
  const { name, frequency, reminder_time, note, color, is_active } = req.body;

  try {
    const habits = query<Habit>(`SELECT * FROM habits WHERE id = '${id}' AND user_id = '${req.userId}'`);
    if (habits.length === 0) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const updates: string[] = [];
    if (name !== undefined) updates.push(`name = '${escape(name)}'`);
    if (frequency !== undefined) updates.push(`frequency = '${escape(frequency)}'`);
    if (reminder_time !== undefined) updates.push(`reminder_time = ${reminder_time ? `'${escape(reminder_time)}'` : 'NULL'}`);
    if (note !== undefined) updates.push(`note = ${note ? `'${escape(note)}'` : 'NULL'}`);
    if (color !== undefined) updates.push(`color = ${color ? `'${escape(color)}'` : 'NULL'}`);
    if (is_active !== undefined) updates.push(`is_active = ${is_active ? 1 : 0}`);

    if (updates.length > 0) {
      execute(`UPDATE habits SET ${updates.join(', ')} WHERE id = '${id}' AND user_id = '${req.userId}'`);
    }

    res.json({ message: 'Habit updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    execute(`UPDATE habits SET is_active = 0 WHERE id = '${id}' AND user_id = '${req.userId}'`);
    res.json({ message: 'Habit soft-deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id/checkin', (req: AuthRequest, res) => {
  const { id } = req.params;
  const today = format(new Date(), 'yyyy-MM-dd');

  try {
    // Check if checkin exists for today
    const checkins = query<Checkin>(`SELECT * FROM checkins WHERE habit_id = '${id}' AND user_id = '${req.userId}' AND date = '${today}'`);

    if (checkins.length > 0) {
      // Toggle off
      const completed = checkins[0].completed ? 0 : 1;
      execute(`UPDATE checkins SET completed = ${completed} WHERE id = '${checkins[0].id}'`);
    } else {
      // Toggle on
      const checkinId = randomUUID();
      execute(`INSERT INTO checkins (id, habit_id, user_id, date, completed) VALUES ('${checkinId}', '${id}', '${req.userId}', '${today}', 1)`);
    }

    updateStreak(id as string, req.userId!);
    res.json({ message: 'Check-in toggled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/checkins', (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    const checkins = query<Checkin>(`SELECT * FROM checkins WHERE habit_id = '${id}' AND user_id = '${req.userId}' ORDER BY date DESC LIMIT 30`);
    res.json(checkins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

import express from 'express';
import { query } from './db';
import { authenticateJWT, AuthRequest } from './middleware';
import { Habit, Checkin, Streak } from '@shared/index';
import { format } from 'date-fns';

const router = express.Router();

router.use(authenticateJWT);

router.get('/', (req: AuthRequest, res) => {
  const today = format(new Date(), 'yyyy-MM-dd');

  try {
    // Get all active habits for the user
    const habits = query<Habit>(`SELECT * FROM habits WHERE user_id = '${req.userId}' AND is_active = 1`);

    // Get today's checkins
    const checkins = query<Checkin>(`SELECT * FROM checkins WHERE user_id = '${req.userId}' AND date = '${today}'`);

    // Get all streaks
    const streaks = query<Streak>(`SELECT * FROM streaks WHERE user_id = '${req.userId}'`);

    const habitsWithStatus = habits.map(habit => {
      const checkin = checkins.find(c => c.habit_id === habit.id);
      const streak = streaks.find(s => s.habit_id === habit.id);

      return {
        ...habit,
        completed_today: checkin ? !!checkin.completed : false,
        current_streak: streak ? streak.current_streak : 0,
        longest_streak: streak ? streak.longest_streak : 0
      };
    });

    const completionRate = habits.length > 0 
      ? (checkins.filter(c => c.completed).length / habits.length) * 100 
      : 0;

    res.json({
      habits: habitsWithStatus,
      completion_rate_today: completionRate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

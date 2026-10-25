import { randomUUID } from 'crypto';
import { query, execute } from './db';
import { Habit, Checkin, Streak } from '@shared/index';
import { format, subDays, parseISO, isSameDay } from 'date-fns';

export const updateStreak = (habitId: string, userId: string) => {
  // Get all completed checkins for this habit, sorted by date descending
  const checkins = query<Checkin>(`SELECT * FROM checkins WHERE habit_id = '${habitId}' AND completed = 1 ORDER BY date DESC`);

  if (checkins.length === 0) {
    execute(`UPDATE streaks SET current_streak = 0, last_checkin_date = NULL WHERE habit_id = '${habitId}'`);
    return;
  }

  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const yesterdayStr = format(subDays(today, 1), 'yyyy-MM-dd');

  let currentStreak = 0;
  let lastCheckinDate = checkins[0].date;

  // Check if the most recent checkin is today or yesterday
  if (lastCheckinDate !== todayStr && lastCheckinDate !== yesterdayStr) {
    // Streak broken
    currentStreak = 0;
  } else {
    // Calculate current streak by walking backwards
    let expectedDate = parseISO(lastCheckinDate);
    for (const checkin of checkins) {
      const checkinDate = parseISO(checkin.date);
      if (isSameDay(checkinDate, expectedDate)) {
        currentStreak++;
        expectedDate = subDays(expectedDate, 1);
      } else {
        break;
      }
    }
  }

  // Update streaks table
  const streaks = query<Streak>(`SELECT * FROM streaks WHERE habit_id = '${habitId}'`);
  const longestStreak = streaks.length > 0 ? Math.max(streaks[0].longest_streak, currentStreak) : currentStreak;

  if (streaks.length === 0) {
    execute(`INSERT INTO streaks (id, habit_id, user_id, current_streak, longest_streak, last_checkin_date) 
             VALUES ('${randomUUID()}', '${habitId}', '${userId}', ${currentStreak}, ${longestStreak}, '${lastCheckinDate}')`);
  } else {
    execute(`UPDATE streaks SET 
             current_streak = ${currentStreak}, 
             longest_streak = ${longestStreak}, 
             last_checkin_date = '${lastCheckinDate}' 
             WHERE habit_id = '${habitId}'`);
  }
};

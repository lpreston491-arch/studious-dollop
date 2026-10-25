export interface User {
  id: string;
  email: string;
  subscription_tier: 'free' | 'premium';
  stripe_customer_id?: string;
  created_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  reminder_time?: string;
  note?: string;
  color?: string;
  is_active: boolean;
  created_at: string;
}

export interface Checkin {
  id: string;
  habit_id: string;
  user_id: string;
  date: string;
  completed: boolean;
  created_at: string;
}

export interface Streak {
  id: string;
  habit_id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_checkin_date?: string;
}

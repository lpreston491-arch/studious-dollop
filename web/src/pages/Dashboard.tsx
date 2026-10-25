import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { dashboard, habits as habitApi, subscriptions } from '../api';
import { format } from 'date-fns';
import { Plus, Flame, Settings, User, Bell, Check, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    const init = async () => {
      await Promise.all([fetchDashboard(), fetchSubscription()]);
      setLoading(false);
    };
    init();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await dashboard.get();
      setData(response.data);
    } catch (err: any) {
      setError('Failed to load dashboard');
    }
  };

  const fetchSubscription = async () => {
    try {
      const response = await subscriptions.getStatus();
      setSubscription(response.data);
    } catch (err) {
      console.error('Failed to fetch subscription status');
    }
  };

  const globalStreak = data?.habits.reduce((max: number, h: any) => Math.max(max, h.current_streak), 0) || 0;

  const handleCheckin = async (habitId: string) => {
    try {
      await habitApi.toggleCheckin(habitId);
      // Optimistic update or just refetch
      fetchDashboard();
    } catch (err: any) {
      console.error('Failed to toggle check-in');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg p-4 flex flex-col space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card h-24 animate-shimmer"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-20">
      <header className="p-6 bg-warm-white border-b border-border sticky top-0 z-10">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-deep-charcoal">Today</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-primary bg-primary/5 px-2 py-1 rounded-full text-caption font-bold">
              <Flame size={16} fill="currentColor" />
              <span>{globalStreak}-day streak</span>
            </div>
            <button className="text-text-secondary" onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              localStorage.removeItem('has_onboarded');
              navigate('/login');
            }}>
              <Settings size={24} />
            </button>
          </div>
        </div>
        <p className="text-text-secondary text-caption uppercase tracking-wider">
          {format(new Date(), 'EEEE, MMMM do')}
        </p>
      </header>

      <main className="p-4 space-y-4">
        <div className="mb-6">
          <p className="text-text-secondary mb-1">Hello, {user?.email}</p>
          <div className="flex items-center space-x-2 text-primary font-semibold">
            <Flame size={20} />
            <span>{data?.completion_rate_today.toFixed(0)}% Done today</span>
          </div>
        </div>

        {subscription?.tier === 'free' && (
          <Link to="/premium" className="card bg-accent-gold/10 border-accent-gold/30 flex items-center justify-between p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-gold/20 text-accent-gold rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-deep-charcoal">Upgrade to Premium</p>
                <p className="text-xs text-text-secondary">
                  You've used {data?.habits.length || 0} of 3 habits
                </p>
              </div>
            </div>
            <button className="text-accent-gold font-bold text-sm">Upgrade</button>
          </Link>
        )}

        {data?.habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 text-text-secondary">
              <Plus size={32} />
            </div>
            <h2>No habits yet</h2>
            <p className="text-text-secondary mb-6">Start small. Add your first habit.</p>
            <Link to="/habits/new" className="btn-primary">
              Add Your First Habit
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.habits.map((habit: any) => (
              <div key={habit.id} className="card flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 cursor-pointer" onClick={() => navigate(`/habits/${habit.id}/edit`)}>
                  <div className="flex flex-col">
                    <h3 className="text-deep-charcoal">{habit.name}</h3>
                    <div className="flex items-center text-caption text-text-secondary">
                      <Flame size={14} className="mr-1" />
                      <span>{habit.current_streak} days</span>
                      {habit.reminder_time && (
                        <>
                          <span className="mx-2">•</span>
                          <Bell size={14} className="mr-1" />
                          <span>{habit.reminder_time}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleCheckin(habit.id)}
                  className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all ${
                    habit.completed_today
                      ? 'bg-primary border-primary text-white scale-100'
                      : 'border-border bg-transparent text-transparent hover:border-text-secondary'
                  }`}
                >
                  <Check size={24} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Link
        to="/habits/new"
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-md flex items-center justify-center active:scale-95 transition-transform"
      >
        <Plus size={32} />
      </Link>

      <nav className="fixed bottom-0 left-0 right-0 h-14 bg-warm-white border-t border-border flex items-center justify-around px-6">
        <button className="text-primary flex flex-col items-center">
          <Check size={24} />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button className="text-text-secondary flex flex-col items-center" onClick={() => navigate('/premium')}>
          <Flame size={24} />
          <span className="text-[10px] font-medium">Stats</span>
        </button>
        <button className="text-text-secondary flex flex-col items-center" onClick={() => navigate('/premium')}>
          <User size={24} />
          <span className="text-[10px] font-medium">Account</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;

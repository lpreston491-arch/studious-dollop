import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { habits as habitApi } from '../api';
import { ArrowLeft, Trash2 } from 'lucide-react';

const AddEditHabit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [reminderTime, setReminderTime] = useState('');
  const [note, setNote] = useState('');
  const [color, setColor] = useState('#8CB89A');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colors = [
    { name: 'Sage', hex: '#8CB89A' },
    { name: 'Warm', hex: '#D4937A' },
    { name: 'Blue', hex: '#7FB5C9' },
    { name: 'Rose', hex: '#D47A8B' },
    { name: 'Gold', hex: '#E8C87A' },
    { name: 'Charcoal', hex: '#2D2D2D' },
  ];

  useEffect(() => {
    if (id) {
      fetchHabit();
    }
  }, [id]);

  const fetchHabit = async () => {
    try {
      const response = await habitApi.list();
      const habit = response.data.find((h: any) => h.id === id);
      if (habit) {
        setName(habit.name);
        setFrequency(habit.frequency);
        setReminderTime(habit.reminder_time || '');
        setNote(habit.note || '');
        setColor(habit.color || '#8CB89A');
      }
    } catch (err) {
      setError('Failed to load habit');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name,
        frequency,
        reminder_time: reminderTime || null,
        note,
        color,
      };

      if (id) {
        await habitApi.update(id, data);
      } else {
        await habitApi.create(data);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save habit');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this habit?')) return;
    try {
      await habitApi.delete(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete habit');
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <header className="p-6 bg-warm-white border-b border-border flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-text-secondary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-deep-charcoal">{id ? 'Edit Habit' : 'New Habit'}</h1>
        {id && (
          <button onClick={handleDelete} className="text-error">
            <Trash2 size={24} />
          </button>
        )}
      </header>

      <main className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-error/10 border border-error text-error text-caption rounded-sm">
              {error}
            </div>
          )}

          <div>
            <label className="label-overline">Habit Name</label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Morning Meditation"
              required
            />
          </div>

          <div>
            <label className="label-overline">Frequency</label>
            <div className="flex bg-surface p-1 rounded-sm border border-border">
              <button
                type="button"
                className={`flex-1 py-2 rounded-sm text-caption font-medium transition-all ${
                  frequency === 'daily' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary'
                }`}
                onClick={() => setFrequency('daily')}
              >
                Daily
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-sm text-caption font-medium transition-all ${
                  frequency === 'weekly' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary'
                }`}
                onClick={() => setFrequency('weekly')}
              >
                Weekly
              </button>
            </div>
          </div>

          <div>
            <label className="label-overline">Reminder Time (Optional)</label>
            <input
              type="time"
              className="input-field"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
          </div>

          <div>
            <label className="label-overline">Color</label>
            <div className="flex justify-between">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    color === c.hex ? 'border-text-primary' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setColor(c.hex)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="label-overline">Notes</label>
            <textarea
              className="input-field min-h-[100px] py-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why is this habit important?"
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Saving...' : id ? 'Update Habit' : 'Create Habit'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddEditHabit;

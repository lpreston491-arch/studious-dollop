import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Loader2 } from 'lucide-react';
import { subscriptions } from '../api';

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await subscriptions.createCheckout(selectedPlan);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error('Failed to create checkout session', err);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <header className="p-6 bg-warm-white border-b border-border flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-text-secondary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-deep-charcoal">StreakStack Premium</h1>
      </header>

      <main className="p-6 max-w-lg mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-accent-gold/20 text-accent-gold rounded-full flex items-center justify-center mb-4">
            <Crown size={48} />
          </div>
          <h2>Unlock your full potential</h2>
          <p className="text-text-secondary mt-2">Go beyond the basics and build a lifestyle of consistency.</p>
        </div>

        <div className="card space-y-4 mb-8">
          {[
            { label: 'Unlimited habits', free: '3 habits', premium: 'Unlimited' },
            { label: 'Custom reminders', free: 'Basic', premium: 'Time & Repeat' },
            { label: 'Advanced analytics', free: '7-day view', premium: 'Full history' },
            { label: 'Cloud sync', free: 'Basic', premium: 'Instant' },
            { label: 'Dark mode', free: '—', premium: '✅' },
          ].map((feature, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0 text-caption">
              <span className="font-medium">{feature.label}</span>
              <div className="flex space-x-4">
                <span className="text-text-secondary w-16 text-right">{feature.free}</span>
                <span className="text-primary font-bold w-16 text-right">{feature.premium}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => setSelectedPlan('monthly')}
            className={`w-full card flex justify-between items-center p-6 transition-all ${selectedPlan === 'monthly' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-surface'}`}
          >
            <div className="text-left">
              <p className="font-bold text-deep-charcoal">Monthly</p>
              <p className="text-caption text-text-secondary">Billed every month</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">$3.99</p>
            </div>
          </button>

          <button 
            onClick={() => setSelectedPlan('annual')}
            className={`w-full card flex justify-between items-center p-6 relative transition-all ${selectedPlan === 'annual' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-surface'}`}
          >
            <div className="absolute -top-3 right-4 bg-accent-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              Save 37%
            </div>
            <div className="text-left">
              <p className="font-bold text-deep-charcoal">Annual</p>
              <p className="text-caption text-text-secondary">Billed every year</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">$29.99</p>
            </div>
          </button>
        </div>

        <button 
          onClick={handleUpgrade}
          disabled={loading}
          className="btn-primary w-full mt-8 flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
          {loading ? 'Processing...' : 'Upgrade Now'}
        </button>
        
        <p className="text-center text-caption text-text-secondary mt-4">
          Secure payment via Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
};

export default Premium;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const screens = [
    {
      title: "Small steps, big streaks.",
      subtext: "Build habits that actually stick — one day at a time.",
      illustration: (
        <div className="w-64 h-64 bg-primary/10 rounded-full flex flex-col items-center justify-end p-8 space-y-2">
          <div className="w-16 h-8 bg-accent-warm rounded-sm"></div>
          <div className="w-24 h-8 bg-accent-blue rounded-sm"></div>
          <div className="w-32 h-8 bg-primary rounded-sm"></div>
        </div>
      ),
      cta: "Continue"
    },
    {
      title: "Gentle reminders.",
      subtext: "No guilt. No noise. Just a quiet nudge when you need it.",
      illustration: (
        <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center relative">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </div>
          <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-accent-warm rounded-full animate-pulse"></div>
        </div>
      ),
      cta: "Continue"
    },
    {
      title: "Your streak, your story.",
      subtext: "Watch your consistency grow into something beautiful.",
      illustration: (
        <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <div key={i} className={`w-10 h-10 rounded-sm ${i <= 5 ? 'bg-primary' : 'bg-surface border border-border'}`}></div>
            ))}
          </div>
        </div>
      ),
      cta: "Get Started"
    }
  ];

  const handleNext = () => {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('has_onboarded', 'true');
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('has_onboarded', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col p-6">
      <div className="flex justify-end">
        <button onClick={handleSkip} className="btn-ghost text-caption">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
        <div className="mb-8">
          {screens[step].illustration}
        </div>

        <div className="space-y-4 max-w-[320px]">
          <h1 className="text-display text-text-primary leading-tight">
            {screens[step].title}
          </h1>
          <p className="text-body text-text-secondary">
            {screens[step].subtext}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8 pb-12">
        <button onClick={handleNext} className="btn-primary w-full max-w-[280px]">
          {screens[step].cta}
        </button>

        <div className="flex space-x-2">
          {screens.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? 'bg-primary w-4' : 'bg-border'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

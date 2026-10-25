import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-page bg-[#F9F7F4] min-h-screen text-[#2D2D2D] font-sans selection:bg-[#8CB89A]/30">
      {/* ===== Navigation ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-[#E0DCD3]">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <img src="/assets/logo-horizontal.png" alt="StreakStack" className="h-8" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">Pricing</a>
            <Link to="/dashboard" className="bg-[#8CB89A] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#6C9A7A] transition-all active:scale-95">
              Get started
            </Link>
          </div>
          <button className="md:hidden flex flex-col gap-1.5">
            <span className="w-6 h-0.5 bg-[#2D2D2D] rounded-full"></span>
            <span className="w-6 h-0.5 bg-[#2D2D2D] rounded-full"></span>
            <span className="w-6 h-0.5 bg-[#2D2D2D] rounded-full"></span>
          </button>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B8D8C2] text-[#6C9A7A] px-4 py-1.5 rounded-full text-xs font-semibold mb-6 animate-fade-in">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 3C9.5 8 5 10 5 14C5 17.866 8.134 21 12 21C15.866 21 19 17.866 19 14C19 10 14.5 8 12 3Z"/></svg>
            Now available — start your first streak free
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.1]">
            Build what sticks.
          </h1>
          <p className="text-lg md:text-xl text-[#6B6B6B] max-w-xl mx-auto mb-10 leading-relaxed">
            A simple, beautiful habit-tracker that keeps you consistent. No noise. No guilt. Just gentle nudges and growing streaks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto bg-[#8CB89A] text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-[#6C9A7A] transition-all active:scale-95 shadow-lg shadow-[#8CB89A]/20">
              Get started free
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-[#EFECE4] text-[#2D2D2D] border border-[#E0DCD3] px-8 py-4 rounded-md text-lg font-bold hover:bg-[#E6E2D8] transition-all active:scale-95">
              See how it works
            </a>
          </div>
          <div className="mt-16 md:mt-20 relative">
            <div className="absolute inset-0 -top-10 bg-radial-gradient from-[#8CB89A]/15 to-transparent blur-3xl -z-10"></div>
            <img 
              src="/assets/dashboard.png" 
              alt="StreakStack dashboard" 
              className="max-w-[360px] md:max-w-[420px] mx-auto rounded-2xl shadow-2xl border border-[#E0DCD3]"
            />
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section id="features" className="py-20 md:py-32 bg-white border-y border-[#E0DCD3]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8CB89A] mb-3 block">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build habits that last</h2>
          <p className="text-[#6B6B6B] max-w-lg mx-auto mb-16">Designed for busy professionals who want consistency without the clutter.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Daily streaks",
                desc: "Watch your consistency grow with visual streak counters. Every day you check in, your streak grows — a simple, satisfying reward.",
                icon: <path d="M12 3C9.5 8 5 10 5 14C5 17.866 8.134 21 12 21C15.866 21 19 17.866 19 14C19 10 14.5 8 12 3Z"/><path d="M12 17C13.657 17 15 15.657 15 14"/>,
                color: "bg-[#8CB89A]/15 stroke-[#6C9A7A]"
              },
              {
                title: "Gentle reminders",
                desc: "Quiet nudges at the time you choose. No guilt, no noise — just a warm reminder to keep your habit alive.",
                icon: <path d="M18 8C18 4.686 15.314 2 12 2C8.686 2 6 4.686 6 8V11C6 12.657 5.328 14.156 4.172 15.243C3.672 15.704 3.98 16.546 4.644 16.546H19.356C20.02 16.546 20.328 15.704 19.828 15.243C18.672 14.156 18 12.657 18 11V8Z"/><path d="M13.73 21C13.554 21.303 13.302 21.555 12.999 21.731C12.696 21.907 12.352 22 12 22C11.648 22 11.304 21.907 11.001 21.731C10.698 21.555 10.446 21.303 10.27 21"/>,
                color: "bg-[#D4937A]/15 stroke-[#C47A5E]"
              },
              {
                title: "Your story",
                desc: "Every streak tells a story. View your history, celebrate milestones, and see how far you've come — one day at a time.",
                icon: <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10H21"/><path d="M16 2V6"/><path d="M8 2V6"/><circle cx="8" cy="14" r="1" fill="currentColor"/><circle cx="12" cy="14" r="1" fill="currentColor"/><circle cx="16" cy="14" r="1" fill="currentColor"/>,
                color: "bg-[#7FB5C9]/15 stroke-[#5E9AB0]"
              }
            ].map((f, i) => (
              <div key={i} className="bg-white border border-[#E0DCD3] p-8 rounded-xl text-left hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.color}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Showcase ===== */}
      <section className="py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8CB89A] mb-3 block">Preview</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">A peek inside</h2>
          <p className="text-[#6B6B6B] max-w-lg mx-auto mb-12">Clean, calm, and designed to stay out of your way.</p>

          <div className="flex gap-4 overflow-x-auto pb-8 snap-x no-scrollbar">
            {[
              { img: "onboarding-01.png", label: "Start your journey" },
              { img: "dashboard.png", label: "Your habits at a glance" },
              { img: "add-habit.png", label: "Add a new habit" },
              { img: "onboarding-02.png", label: "Gentle reminders" },
              { img: "premium-upgrade.png", label: "Premium features" }
            ].map((s, i) => (
              <div key={i} className="flex-none w-64 snap-center">
                <div className="rounded-xl overflow-hidden shadow-sm border border-[#E0DCD3] mb-3">
                  <img src={`/assets/${s.img}`} alt={s.label} className="w-full" />
                </div>
                <p className="text-xs font-medium text-[#6B6B6B]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="py-20 md:py-32 bg-[#F9F7F4] border-t border-[#E0DCD3]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8CB89A] mb-3 block">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-[#6B6B6B] max-w-lg mx-auto mb-16">Start free. Upgrade when you're ready for more.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-white border border-[#E0DCD3] p-10 rounded-xl text-left hover:shadow-md transition-all">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B6B6B] mb-2 block">Free</span>
              <div className="text-4xl font-bold mb-2">$0 <span className="text-lg font-normal text-[#6B6B6B]">/mo</span></div>
              <p className="text-sm text-[#6B6B6B] mb-8">Forever free, no credit card</p>
              <ul className="space-y-4 mb-10">
                {["Up to 3 habits", "Basic reminders", "7-day streak history"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-[#8CB89A] font-bold">✓</span> {f}
                  </li>
                ))}
                {["Advanced analytics", "Custom themes", "Data export"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#E0DCD3] line-through decoration-[#E0DCD3]">
                    <span>—</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/dashboard" className="block w-full text-center bg-[#EFECE4] text-[#2D2D2D] border border-[#E0DCD3] px-6 py-3 rounded-md font-bold hover:bg-[#E6E2D8] transition-all">
                Get started free
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-white border-2 border-[#8CB89A] p-10 rounded-xl text-left relative shadow-xl shadow-[#8CB89A]/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8CB89A] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                Most popular
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B6B6B] mb-2 block">Premium</span>
              <div className="text-4xl font-bold mb-1">$3.99 <span className="text-lg font-normal text-[#6B6B6B]">/mo</span></div>
              <p className="text-xs font-bold text-[#6C9A7A] mb-8">Or $29.99/year — save 37%</p>
              <ul className="space-y-4 mb-10">
                {["Unlimited habits", "Custom reminders", "Full analytics & trends", "Light & dark themes", "CSV / PDF export", "Priority support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-[#8CB89A] font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/dashboard" className="block w-full text-center bg-[#8CB89A] text-white px-6 py-3 rounded-md font-bold hover:bg-[#6C9A7A] transition-all shadow-lg shadow-[#8CB89A]/20">
                Start free trial
              </Link>
            </div>
          </div>
          <p className="text-[11px] text-[#6B6B6B] mt-8">Cancel anytime. No questions asked.</p>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="py-24 bg-gradient-to-br from-[#8CB89A]/10 to-[#7FB5C9]/5">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build what sticks?</h2>
          <p className="text-[#6B6B6B] max-w-sm mx-auto mb-10">Join thousands building better habits, one streak at a time.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto bg-[#8CB89A] text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-[#6C9A7A] transition-all active:scale-95 shadow-lg shadow-[#8CB89A]/20">
              Get started free
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-white text-[#2D2D2D] border border-[#E0DCD3] px-8 py-4 rounded-md text-lg font-bold hover:bg-[#F9F7F4] transition-all active:scale-95">
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-16 border-t border-[#E0DCD3]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <img src="/assets/logo-horizontal.png" alt="StreakStack" className="h-7 mb-6" />
              <p className="text-sm text-[#6B6B6B] max-w-xs leading-relaxed">
                A simple, beautiful habit-tracker that keeps you consistent. Build what sticks.
              </p>
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-4 uppercase tracking-widest">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-sm text-[#6B6B6B] hover:text-[#8CB89A]">Features</a></li>
                <li><a href="#pricing" className="text-sm text-[#6B6B6B] hover:text-[#8CB89A]">Pricing</a></li>
                <li><Link to="/dashboard" className="text-sm text-[#6B6B6B] hover:text-[#8CB89A]">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-bold mb-4 uppercase tracking-widest">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-[#6B6B6B] hover:text-[#8CB89A]">About</a></li>
                <li><a href="#" className="text-sm text-[#6B6B6B] hover:text-[#8CB89A]">Contact</a></li>
                <li><a href="#" className="text-sm text-[#6B6B6B] hover:text-[#8CB89A]">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-[#E0DCD3] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]">
            <span>&copy; 2026 StreakStack. All rights reserved.</span>
            <span>Built with warmth, built with purpose.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

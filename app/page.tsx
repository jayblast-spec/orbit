'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';

const MODULES = [
  {
    id: 'schedule',
    label: 'Scheduling',
    href: '/schedule',
    icon: '📅',
    gradient: 'from-violet-600 to-purple-700',
    glow: 'shadow-violet-500/20',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/10',
    tag: 'text-violet-300',
    heading: 'Own your calendar.',
    sub: 'Block deep work, coordinate meetings, and protect your most productive hours — without the back-and-forth.',
    bullets: ['Drag-and-drop weekly view', 'Focus blocks & deep work time', 'Time zone–aware scheduling', 'Booking links for your team'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: '📊',
    gradient: 'from-emerald-600 to-teal-700',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/10',
    tag: 'text-emerald-300',
    heading: 'See what actually moves.',
    sub: 'Track MRR, users, churn, content performance and acquisition all in one unified founder dashboard.',
    bullets: ['Live MRR & revenue tracking', 'User acquisition funnels', 'Content performance heatmap', 'Custom KPI targets'],
  },
  {
    id: 'publish',
    label: 'Publishing',
    href: '/publish',
    icon: '✍️',
    gradient: 'from-amber-600 to-orange-700',
    glow: 'shadow-amber-500/20',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/10',
    tag: 'text-amber-300',
    heading: 'Publish everywhere at once.',
    sub: 'Write once. Schedule to LinkedIn, Twitter/X, your newsletter, and blog — all from a single clean editor.',
    bullets: ['Multi-platform scheduling', 'Draft, schedule, publish', 'Twitter character counter', 'Content calendar view'],
  },
  {
    id: 'automate',
    label: 'Automation',
    href: '/automate',
    icon: '⚡',
    gradient: 'from-sky-600 to-blue-700',
    glow: 'shadow-sky-500/20',
    border: 'border-sky-500/20',
    bg: 'bg-sky-500/10',
    tag: 'text-sky-300',
    heading: 'Run on autopilot.',
    sub: 'Build no-code workflows for lead follow-ups, content repurposing, team alerts, and more in minutes.',
    bullets: ['Visual trigger → action builder', 'No-code setup', 'Run history & stats', 'Toggle on/off instantly'],
  },
];

const STATS = [
  { value: '4', label: 'Tools in one platform' },
  { value: '$0', label: 'Forever, for founders' },
  { value: '100%', label: 'Browser-based' },
  { value: 'Open', label: 'Source always' },
];

export default function HomePage() {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  async function getInsight() {
    if (!input.trim()) return;
    setLoading(true);
    setInsight('');
    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      setInsight(data.insight ?? 'No insight returned.');
    } catch {
      setInsight('Unable to reach AI — try again shortly.');
    }
    setLoading(false);
  }

  return (
    <main className="bg-[#05070a]">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#05070a]/80 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-black tracking-tight text-white">Orbit</Link>
            <div className="hidden md:flex items-center gap-0.5">
              {MODULES.map(m => (
                <Link
                  key={m.id}
                  href={m.href}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all font-medium"
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/schedule" className="hidden sm:block text-[13px] font-semibold text-white/60 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/schedule"
              className="rounded-full bg-white px-5 py-2 text-[13px] font-black text-[#000] hover:bg-white/90 transition-colors"
            >
              Start free →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-indigo-600/15 blur-[100px]" />
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-sky-600/10 blur-[80px]" />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] font-semibold text-white/50 tracking-wide">Free · Open Source · No account required</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tight leading-[1.05] mb-6"
          >
            The platform for<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ambitious founders.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Scheduling, analytics, publishing, and automation — unified in one free browser platform.
            Stop switching tabs. Start building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          >
            <Link
              href="/schedule"
              className="w-full sm:w-auto rounded-full bg-white px-8 py-3.5 text-[14px] font-black text-[#000] hover:bg-white/90 transition-all shadow-xl shadow-white/10"
            >
              Open Orbit free →
            </Link>
            <Link
              href="/analytics"
              className="w-full sm:w-auto rounded-full border border-white/10 bg-white/[0.04] px-8 py-3.5 text-[14px] font-semibold text-white/60 hover:bg-white/[0.08] hover:text-white transition-all"
            >
              See your analytics
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap items-center justify-center gap-10"
          >
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white">{s.value}</div>
                <div className="text-[11px] uppercase tracking-widest text-white/25 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MODULE GRID (the actual product entry points) ─── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="grid sm:grid-cols-2 gap-5">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={m.href} className="group block h-full">
                <div className={`relative h-full rounded-2xl border ${m.border} bg-white/[0.025] p-8 overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:shadow-2xl ${m.glow} hover:shadow-xl hover:-translate-y-1`}>
                  {/* Glow blob */}
                  <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${m.gradient} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20`} />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl ${m.bg} border ${m.border} flex items-center justify-center text-2xl`}>
                        {m.icon}
                      </div>
                      <div className={`flex items-center gap-1 text-[12px] font-semibold ${m.tag} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        Open <span>→</span>
                      </div>
                    </div>

                    <div className={`text-[11px] font-bold uppercase tracking-widest ${m.tag} mb-2`}>{m.label}</div>
                    <h3 className="text-xl font-black text-white mb-3">{m.heading}</h3>
                    <p className="text-[14px] text-white/40 leading-relaxed mb-6">{m.sub}</p>

                    <ul className="space-y-2">
                      {m.bullets.map(b => (
                        <li key={b} className="flex items-center gap-2 text-[13px] text-white/40">
                          <div className={`w-1 h-1 rounded-full shrink-0 bg-gradient-to-r ${m.gradient}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY ORBIT ─────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-24 sm:py-32 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">Why Orbit</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              Stop paying for four tools that don&apos;t talk to each other.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Cal.com for scheduling. Plausible for analytics. Ghost for publishing. n8n for automation.
              Each one great — together, a mess. Orbit does all four, for free, in one tab.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🔗',
                title: 'Everything connected',
                desc: 'Publish a post → analytics update → automation fires → calendar blocks off review time. One ecosystem.',
              },
              {
                icon: '🆓',
                title: 'Free. Always.',
                desc: 'No pricing tiers. No free trial. No credit card. Open source and browser-based — yours forever.',
              },
              {
                icon: '⚡',
                title: 'Built for speed',
                desc: 'No setup, no onboarding calls, no 90-page docs. Open a tab and start working in under 60 seconds.',
              },
            ].map(card => (
              <div key={card.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-white mb-2 text-[15px]">{card.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI INSIGHTS ──────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">AI Layer</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ask your business anything.</h2>
            <p className="text-white/40 text-lg">
              Orbit AI answers founder questions across scheduling, analytics, publishing, and automation.
            </p>
          </motion.div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-[11px] text-white/20 font-mono">orbit-ai</span>
              </div>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="When should I post content for maximum reach? What's blocking my MRR growth? How do I structure my week?"
                className="w-full bg-transparent text-[14px] text-white placeholder-white/20 resize-none outline-none min-h-[90px] leading-relaxed font-[var(--font-geist-mono)]"
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) getInsight(); }}
              />
            </div>
            <div className="border-t border-white/[0.06] px-6 py-3 flex items-center justify-between bg-white/[0.02]">
              <span className="text-[11px] text-white/20">⌘ Enter to submit</span>
              <button
                onClick={getInsight}
                disabled={loading || !input.trim()}
                className="rounded-full bg-white px-5 py-2 text-[12px] font-black text-[#000] disabled:opacity-30 hover:bg-white/90 transition-all"
              >
                {loading ? 'Thinking…' : 'Ask Orbit AI →'}
              </button>
            </div>

            {insight && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-violet-500/20 bg-violet-500/[0.04] p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-[9px] font-black text-white">O</div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-violet-300">Orbit AI</span>
                </div>
                <p className="text-[14px] text-white/70 leading-relaxed">{insight}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-24 sm:py-32 px-5 sm:px-8 text-center">
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
              Your whole operation.<br />One free platform.
            </h2>
            <p className="text-white/40 text-lg mb-10">
              No setup. No account. Open a tab and run your business from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/schedule"
                className="w-full sm:w-auto rounded-full bg-white px-10 py-4 text-[15px] font-black text-[#000] hover:bg-white/90 transition-all shadow-2xl shadow-white/10"
              >
                Open Orbit free →
              </Link>
              <Link
                href="/automate"
                className="w-full sm:w-auto rounded-full border border-white/10 bg-white/[0.04] px-10 py-4 text-[15px] font-semibold text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                Build your first workflow
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-white">Orbit</span>
            <span className="text-[11px] text-white/20">by ArkNet Digital</span>
          </div>
          <div className="flex items-center gap-1">
            {MODULES.map(m => (
              <Link key={m.id} href={m.href} className="px-3 py-1.5 rounded-lg text-[12px] text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all">
                {m.label}
              </Link>
            ))}
          </div>
          <p className="text-[11px] text-white/20">Free forever · Open source</p>
        </div>
      </footer>
    </main>
  );
}

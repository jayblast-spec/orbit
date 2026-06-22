'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const MODULES = [
  {
    id: 'scheduling',
    label: 'Scheduling',
    icon: '📅',
    color: 'text-violet-300 border-violet-400/40 bg-violet-400/10',
    dot: 'bg-violet-400',
    heading: 'Own your calendar.',
    sub: 'Smart scheduling built for founders — block deep work, auto-arrange meetings, and never double-book across time zones.',
    features: ['Drag-and-drop calendar', 'Time zone aware', 'Deep work blocks', 'Team availability', 'Booking links'],
    preview: [
      { time: '09:00', label: 'Deep Work — Product Strategy', type: 'focus' },
      { time: '11:30', label: 'Investor Call — Sequoia', type: 'meeting' },
      { time: '14:00', label: 'Team Standup', type: 'meeting' },
      { time: '16:00', label: 'Writing Block', type: 'focus' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📊',
    color: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
    dot: 'bg-emerald-400',
    heading: 'See what actually moves.',
    sub: 'Track your key metrics across every channel in one unified view. Revenue, users, content, and growth — all live.',
    features: ['Unified dashboard', 'Revenue tracking', 'User acquisition', 'Content performance', 'Custom KPIs'],
    preview: [
      { label: 'MRR', value: '$12,400', change: '+18%', up: true },
      { label: 'Active Users', value: '2,847', change: '+34%', up: true },
      { label: 'Churn', value: '2.1%', change: '-0.4%', up: false },
      { label: 'CAC', value: '$47', change: '-12%', up: false },
    ],
  },
  {
    id: 'publishing',
    label: 'Publishing',
    icon: '✍️',
    color: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
    dot: 'bg-amber-400',
    heading: 'Publish everywhere at once.',
    sub: 'Write once, distribute everywhere. Schedule posts across LinkedIn, Twitter/X, your blog, and newsletters from a single editor.',
    features: ['Multi-platform publishing', 'Content calendar', 'AI writing assist', 'Newsletter integration', 'Analytics per post'],
    preview: [
      { platform: 'LinkedIn', status: 'Published', time: 'Today 09:00' },
      { platform: 'Twitter/X', status: 'Scheduled', time: 'Today 15:00' },
      { platform: 'Newsletter', status: 'Draft', time: 'Tomorrow' },
      { platform: 'Blog', status: 'Scheduled', time: 'Wed 10:00' },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: '⚡',
    color: 'text-sky-300 border-sky-400/40 bg-sky-400/10',
    dot: 'bg-sky-400',
    heading: 'Run on autopilot.',
    sub: 'Build workflows that handle the repetitive. From lead follow-ups to content repurposing — automate anything with no-code triggers.',
    features: ['Visual workflow builder', 'No-code triggers', 'API integrations', 'Lead automation', 'Content repurposing'],
    preview: [
      { trigger: 'New signup', action: 'Send welcome sequence', status: 'active' },
      { trigger: 'Post published', action: 'Share to all channels', status: 'active' },
      { trigger: 'MRR milestone', action: 'Notify team + log', status: 'active' },
      { trigger: 'Low engagement', action: 'Suggest best time', status: 'active' },
    ],
  },
];

const STATS = [
  { value: '4 in 1', label: 'Tools replaced' },
  { value: 'Free', label: 'Forever' },
  { value: 'Browser', label: 'Based' },
  { value: 'Open', label: 'Source' },
];

function SchedulingPreview({ items }: { items: typeof MODULES[0]['preview'] }) {
  const p = items as { time: string; label: string; type: string }[];
  return (
    <div className="space-y-2">
      {p.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border ${
            item.type === 'focus'
              ? 'border-violet-400/20 bg-violet-400/[0.06]'
              : 'border-white/10 bg-white/[0.03]'
          }`}
        >
          <span className="font-mono text-[11px] text-white/40 w-10 shrink-0">{item.time}</span>
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.type === 'focus' ? 'bg-violet-400' : 'bg-white/30'}`} />
          <span className="text-xs text-white/70 truncate">{item.label}</span>
          {item.type === 'focus' && (
            <span className="ml-auto text-[10px] font-medium text-violet-300 shrink-0">Focus</span>
          )}
        </div>
      ))}
    </div>
  );
}

function AnalyticsPreview({ items }: { items: typeof MODULES[1]['preview'] }) {
  const p = items as { label: string; value: string; change: string; up: boolean }[];
  return (
    <div className="grid grid-cols-2 gap-2">
      {p.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-[11px] text-white/40 mb-1">{item.label}</div>
          <div className="text-lg font-bold text-white">{item.value}</div>
          <div className={`text-[11px] font-medium mt-0.5 ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
            {item.change}
          </div>
        </div>
      ))}
    </div>
  );
}

function PublishingPreview({ items }: { items: typeof MODULES[2]['preview'] }) {
  const p = items as { platform: string; status: string; time: string }[];
  const statusColor: Record<string, string> = {
    Published: 'text-emerald-400',
    Scheduled: 'text-amber-400',
    Draft: 'text-white/40',
  };
  return (
    <div className="space-y-2">
      {p.map((item, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
          <span className="text-xs font-medium text-white/70">{item.platform}</span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/30">{item.time}</span>
            <span className={`text-[11px] font-semibold ${statusColor[item.status] ?? 'text-white/40'}`}>{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AutomationPreview({ items }: { items: typeof MODULES[3]['preview'] }) {
  const p = items as { trigger: string; action: string; status: string }[];
  return (
    <div className="space-y-2">
      {p.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] text-sky-300 font-medium">{item.trigger}</span>
          </div>
          <span className="text-xs text-white/50 pl-3.5">→ {item.action}</span>
        </div>
      ))}
    </div>
  );
}

function ModulePreview({ module }: { module: typeof MODULES[0] }) {
  if (module.id === 'scheduling') return <SchedulingPreview items={module.preview} />;
  if (module.id === 'analytics') return <AnalyticsPreview items={module.preview} />;
  if (module.id === 'publishing') return <PublishingPreview items={module.preview} />;
  return <AutomationPreview items={module.preview} />;
}

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const mod = MODULES[active];

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
    <main>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Suite</span>
            <h1 className="text-base font-black tracking-tight">Orbit</h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
            {MODULES.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className={`transition-colors hover:text-white ${active === i ? 'text-white font-semibold' : ''}`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <a
            href="#get-started"
            className="rounded-full bg-white px-5 py-2 text-xs font-black text-black hover:bg-white/90 transition-colors"
          >
            Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(139,92,246,0.12)_0%,transparent_60%)] pointer-events-none" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-[0.98fr_1.02fr] lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Free · Open Source · Browser-Based</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
                Schedule.<br />
                Publish.<br />
                Analyze.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">Automate.</span>
              </h2>

              <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
                The founder operating system you&apos;ve been building manually. Four tools in one browser tab — scheduling, analytics, publishing, and automation. Free, forever.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#get-started"
                  className="rounded-full bg-white px-6 py-4 text-sm font-black text-black hover:bg-white/90 transition-colors"
                >
                  Launch Orbit Free →
                </a>
                <a
                  href="#modules"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-bold text-white/70 hover:bg-white/[0.08] transition-colors"
                >
                  See how it works
                </a>
              </div>

              <div className="flex flex-wrap gap-6">
                {STATS.map(({ value, label }) => (
                  <div key={label}>
                    <div className="text-xl sm:text-2xl font-black">{value}</div>
                    <div className="text-[11px] uppercase tracking-widest text-white/30 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — module dashboard preview */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="mt-14 lg:mt-0"
            >
              <div className="rounded-[2rem] border border-white/10 bg-black/35 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
                {/* Module tabs */}
                <div className="flex gap-1 mb-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {MODULES.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => setActive(i)}
                      className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-[11px] font-semibold transition-all ${
                        active === i
                          ? 'bg-white/10 text-white'
                          : 'text-white/30 hover:text-white/60'
                      }`}
                    >
                      <span>{m.icon}</span>
                      <span className="hidden sm:inline">{m.label}</span>
                    </button>
                  ))}
                </div>

                {/* Inner panel */}
                <div className="rounded-[1.5rem] border border-white/10 bg-[#071018]/90 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold mb-2 ${mod.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${mod.dot}`} />
                        {mod.label}
                      </div>
                      <h3 className="text-sm font-bold text-white">{mod.heading}</h3>
                    </div>
                  </div>

                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ModulePreview module={mod} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Module sections */}
      <section id="modules" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-24 sm:space-y-32">
        {MODULES.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
          >
            {/* Text */}
            <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
              <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold mb-6 ${m.color}`}>
                <span>{m.icon}</span>
                {m.label}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4">{m.heading}</h3>
              <p className="text-white/50 leading-relaxed mb-8">{m.sub}</p>
              <ul className="space-y-2">
                {m.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${m.dot}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Preview card */}
            <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#071018]/90 p-5">
                  <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold mb-4 ${m.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                    {m.label}
                  </div>
                  <ModulePreview module={m} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* AI Insights */}
      <section id="get-started" className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(99,102,241,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">AI Founder Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Ask your business anything.</h2>
            <p className="text-white/40 mb-10">
              Orbit&apos;s AI layer analyzes your data across all four modules and answers founder-level questions in seconds.
            </p>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 text-left">
              <div className="rounded-2xl border border-white/[0.06] bg-[#071018]/80 p-4">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="e.g. When should I post for maximum reach? What&apos;s slowing my MRR growth?"
                  className="w-full bg-transparent text-sm text-white placeholder-white/20 resize-none outline-none min-h-[80px]"
                  onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) getInsight(); }}
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                  <span className="text-[11px] text-white/20">⌘ + Enter to submit</span>
                  <button
                    onClick={getInsight}
                    disabled={loading || !input.trim()}
                    className="rounded-full bg-white px-5 py-2 text-xs font-black text-black disabled:opacity-40 hover:bg-white/90 transition-colors"
                  >
                    {loading ? 'Thinking…' : 'Get Insight →'}
                  </button>
                </div>
              </div>

              {insight && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-4"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-violet-300 mb-2">Orbit AI</div>
                  <p className="text-sm text-white/70 leading-relaxed">{insight}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-black">Orbit</h1>
            <span className="text-[11px] text-white/20">by ArkNet Digital</span>
          </div>
          <p className="text-[11px] text-white/20">Free · Open Source · Built for founders</p>
        </div>
      </footer>
    </main>
  );
}

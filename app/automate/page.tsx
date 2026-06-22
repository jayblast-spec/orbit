'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Workflow = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
  runs: number;
  lastRun?: string;
};

const TRIGGERS = [
  'New signup',
  'Post published',
  'MRR milestone',
  'Low engagement',
  'New comment',
  'Weekly on Monday 9am',
  'Daily at 8am',
  'Form submitted',
  'Tag added',
];

const ACTIONS = [
  'Send welcome email sequence',
  'Share to all platforms',
  'Notify team on Slack',
  'Log to Google Sheets',
  'Add to email list',
  'Repurpose to Twitter thread',
  'Generate weekly report',
  'Create follow-up task',
  'Send to newsletter',
];

const SEED: Workflow[] = [
  { id: '1', name: 'New User Welcome', trigger: 'New signup', action: 'Send welcome email sequence', active: true, runs: 284, lastRun: '2 min ago' },
  { id: '2', name: 'Content Distribution', trigger: 'Post published', action: 'Share to all platforms', active: true, runs: 47, lastRun: '1 day ago' },
  { id: '3', name: 'MRR Alert', trigger: 'MRR milestone', action: 'Notify team on Slack', active: true, runs: 3, lastRun: '5 days ago' },
  { id: '4', name: 'Weekly Report', trigger: 'Weekly on Monday 9am', action: 'Generate weekly report', active: false, runs: 12, lastRun: '7 days ago' },
];

const STATS_MOCK = [
  { label: 'Active Workflows', value: 3, color: 'text-sky-300' },
  { label: 'Total Runs (30d)', value: 346, color: 'text-emerald-300' },
  { label: 'Hours Saved', value: '14h', color: 'text-violet-300' },
];

export default function AutomatePage() {
  const [workflows, setWorkflows] = useState<Workflow[]>(SEED);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', trigger: TRIGGERS[0], action: ACTIONS[0] });

  useEffect(() => {
    const saved = localStorage.getItem('orbit_workflows');
    if (saved) setWorkflows(JSON.parse(saved));
  }, []);

  function save(ws: Workflow[]) {
    setWorkflows(ws);
    localStorage.setItem('orbit_workflows', JSON.stringify(ws));
  }

  function toggleActive(id: string) {
    save(workflows.map(w => w.id === id ? { ...w, active: !w.active } : w));
  }

  function deleteWorkflow(id: string) {
    save(workflows.filter(w => w.id !== id));
  }

  function addWorkflow() {
    if (!form.name.trim()) return;
    const wf: Workflow = { ...form, id: Date.now().toString(), active: true, runs: 0 };
    save([...workflows, wf]);
    setForm({ name: '', trigger: TRIGGERS[0], action: ACTIONS[0] });
    setShowAdd(false);
  }

  const active = workflows.filter(w => w.active).length;
  const totalRuns = workflows.reduce((a, w) => a + w.runs, 0);

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-[var(--font-geist-sans)]">
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-base font-black tracking-tight">Orbit</Link>
            <nav className="hidden md:flex items-center gap-4 text-sm text-white/40">
              <Link href="/schedule" className="hover:text-white/70 transition-colors">Schedule</Link>
              <Link href="/analytics" className="hover:text-white/70 transition-colors">Analytics</Link>
              <Link href="/publish" className="hover:text-white/70 transition-colors">Publish</Link>
              <span className="text-sky-300 font-semibold">Automate</span>
            </nav>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="rounded-full bg-white px-4 py-2 text-xs font-black text-black hover:bg-white/90 transition-colors"
          >
            + New Workflow
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { label: 'Active Workflows', value: active, color: 'text-sky-300' },
            { label: 'Total Runs (30d)', value: totalRuns, color: 'text-emerald-300' },
            { label: 'Hours Saved', value: `${Math.round(totalRuns * 0.04)}h`, color: 'text-violet-300' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-white/30 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Workflows */}
        <div className="space-y-3">
          {workflows.map((wf, i) => (
            <motion.div
              key={wf.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 group"
            >
              <div className="flex items-start gap-4">
                {/* Toggle */}
                <button
                  onClick={() => toggleActive(wf.id)}
                  className={`mt-0.5 w-10 h-5 rounded-full border transition-all shrink-0 relative ${
                    wf.active ? 'bg-sky-400/20 border-sky-400/40' : 'bg-white/[0.04] border-white/10'
                  }`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                    wf.active ? 'left-5 bg-sky-400' : 'left-0.5 bg-white/20'
                  }`} />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-sm text-white/80">{wf.name}</h3>
                    <button
                      onClick={() => deleteWorkflow(wf.id)}
                      className="text-[11px] text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Flow diagram */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                      <span className="text-xs text-white/50">{wf.trigger}</span>
                    </div>
                    <div className="text-white/20 text-sm">→</div>
                    <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="text-xs text-white/50">{wf.action}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[11px] text-white/20">{wf.runs} runs</span>
                    {wf.lastRun && <span className="text-[11px] text-white/20">Last: {wf.lastRun}</span>}
                    <span className={`text-[11px] font-semibold ${wf.active ? 'text-sky-300' : 'text-white/20'}`}>
                      {wf.active ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {workflows.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
              <div className="text-2xl mb-3">⚡</div>
              <p className="text-sm text-white/30">No workflows yet. Add one to start automating.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1117] p-6"
          >
            <h3 className="text-base font-bold mb-5">New Workflow</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Name</label>
                <input
                  autoFocus
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-sky-400/40"
                  placeholder="e.g. New User Onboarding"
                />
              </div>
              <div>
                <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">When this happens</label>
                <select
                  value={form.trigger}
                  onChange={e => setForm(f => ({ ...f, trigger: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none"
                >
                  {TRIGGERS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Do this</label>
                <select
                  value={form.action}
                  onChange={e => setForm(f => ({ ...f, action: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none"
                >
                  {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="text-[10px] text-white/20 uppercase tracking-wider mb-2">Preview</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg border border-sky-400/20 bg-sky-400/[0.06] px-2.5 py-1.5">
                    <div className="w-1 h-1 rounded-full bg-sky-400" />
                    <span className="text-[11px] text-sky-300">{form.trigger}</span>
                  </div>
                  <span className="text-white/20 text-xs">→</span>
                  <div className="flex items-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-emerald-300">{form.action}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 rounded-full border border-white/10 py-2.5 text-sm text-white/50 hover:bg-white/[0.04] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addWorkflow}
                disabled={!form.name.trim()}
                className="flex-1 rounded-full bg-white py-2.5 text-sm font-black text-black disabled:opacity-40 hover:bg-white/90 transition-colors"
              >
                Create Workflow
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

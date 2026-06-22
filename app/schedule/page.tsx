'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type CalEvent = {
  id: string;
  title: string;
  type: 'focus' | 'meeting' | 'personal';
  day: number;
  startHour: number;
  durationHours: number;
  color: string;
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 13 }, (_, i) => i + 7); // 7am to 7pm
const TYPE_COLORS = {
  focus: { bg: 'bg-violet-500/20', border: 'border-violet-400/40', text: 'text-violet-300', dot: 'bg-violet-400' },
  meeting: { bg: 'bg-sky-500/20', border: 'border-sky-400/40', text: 'text-sky-300', dot: 'bg-sky-400' },
  personal: { bg: 'bg-emerald-500/20', border: 'border-emerald-400/40', text: 'text-emerald-300', dot: 'bg-emerald-400' },
};

const DEFAULT_EVENTS: CalEvent[] = [
  { id: '1', title: 'Deep Work — Product', type: 'focus', day: 0, startHour: 9, durationHours: 2, color: '' },
  { id: '2', title: 'Investor Call', type: 'meeting', day: 0, startHour: 11, durationHours: 1, color: '' },
  { id: '3', title: 'Team Standup', type: 'meeting', day: 0, startHour: 14, durationHours: 0.5, color: '' },
  { id: '4', title: 'Writing Block', type: 'focus', day: 1, startHour: 9, durationHours: 3, color: '' },
  { id: '5', title: 'Partnership Call', type: 'meeting', day: 1, startHour: 13, durationHours: 1, color: '' },
  { id: '6', title: 'Deep Work — Engineering', type: 'focus', day: 2, startHour: 8, durationHours: 4, color: '' },
  { id: '7', title: 'Board Update', type: 'meeting', day: 3, startHour: 10, durationHours: 1, color: '' },
  { id: '8', title: 'Strategy Session', type: 'focus', day: 3, startHour: 14, durationHours: 2, color: '' },
  { id: '9', title: 'Team Review', type: 'meeting', day: 4, startHour: 9, durationHours: 1, color: '' },
];

export default function SchedulePage() {
  const [events, setEvents] = useState<CalEvent[]>(DEFAULT_EVENTS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'focus' as CalEvent['type'], day: 0, startHour: 9, durationHours: 1 });
  const [today] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('orbit_events');
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  function saveEvents(evts: CalEvent[]) {
    setEvents(evts);
    localStorage.setItem('orbit_events', JSON.stringify(evts));
  }

  function addEvent() {
    if (!form.title.trim()) return;
    const newEvt: CalEvent = { ...form, id: Date.now().toString(), color: '' };
    saveEvents([...events, newEvt]);
    setForm({ title: '', type: 'focus', day: 0, startHour: 9, durationHours: 1 });
    setShowAdd(false);
  }

  function removeEvent(id: string) {
    saveEvents(events.filter(e => e.id !== id));
  }

  const focusHours = events.filter(e => e.type === 'focus').reduce((a, e) => a + e.durationHours, 0);
  const meetingCount = events.filter(e => e.type === 'meeting').length;

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-[var(--font-geist-sans)]">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-base font-black tracking-tight">Orbit</Link>
            <nav className="hidden md:flex items-center gap-4 text-sm text-white/40">
              <span className="text-violet-300 font-semibold">Schedule</span>
              <Link href="/analytics" className="hover:text-white/70 transition-colors">Analytics</Link>
              <Link href="/publish" className="hover:text-white/70 transition-colors">Publish</Link>
              <Link href="/automate" className="hover:text-white/70 transition-colors">Automate</Link>
            </nav>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="rounded-full bg-white px-4 py-2 text-xs font-black text-black hover:bg-white/90 transition-colors"
          >
            + Add Event
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { label: 'Focus Hours This Week', value: `${focusHours}h`, color: 'text-violet-300' },
            { label: 'Meetings', value: meetingCount, color: 'text-sky-300' },
            { label: 'Events Total', value: events.length, color: 'text-white' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-white/30 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-white/[0.06]">
            <div className="py-3 px-2" />
            {DAYS.map((d, i) => (
              <div
                key={d}
                className={`py-3 px-2 text-center text-xs font-semibold border-l border-white/[0.06] ${
                  i === today ? 'text-violet-300' : 'text-white/40'
                }`}
              >
                {d}
                {i === today && <div className="w-1 h-1 rounded-full bg-violet-400 mx-auto mt-1" />}
              </div>
            ))}
          </div>

          {/* Time rows */}
          <div className="relative">
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] min-h-[52px]">
                <div className="px-2 pt-1 text-[10px] text-white/20 font-mono">
                  {hour > 12 ? `${hour - 12}pm` : hour === 12 ? '12pm' : `${hour}am`}
                </div>
                {DAYS.map((_, di) => {
                  const cellEvents = events.filter(e => e.day === di && e.startHour === hour);
                  return (
                    <div key={di} className="border-l border-t border-white/[0.04] relative px-0.5 pt-0.5">
                      {cellEvents.map(evt => {
                        const c = TYPE_COLORS[evt.type];
                        return (
                          <div
                            key={evt.id}
                            className={`rounded-lg border ${c.bg} ${c.border} px-2 py-1 mb-0.5 group cursor-default`}
                            style={{ minHeight: `${evt.durationHours * 52 - 4}px` }}
                          >
                            <div className={`text-[11px] font-semibold ${c.text} leading-tight`}>{evt.title}</div>
                            <div className="text-[10px] text-white/30">{evt.durationHours}h</div>
                            <button
                              onClick={() => removeEvent(evt.id)}
                              className="hidden group-hover:block text-[10px] text-red-400 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4">
          {Object.entries(TYPE_COLORS).map(([type, c]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${c.dot}`} />
              <span className="text-xs capitalize text-white/40">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add event modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1117] p-6"
          >
            <h3 className="text-base font-bold mb-5">Add Event</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Title</label>
                <input
                  autoFocus
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-violet-400/40"
                  placeholder="e.g. Deep Work Block"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value as CalEvent['type'] }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none"
                  >
                    <option value="focus">Focus</option>
                    <option value="meeting">Meeting</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Day</label>
                  <select
                    value={form.day}
                    onChange={e => setForm(f => ({ ...f, day: parseInt(e.target.value) }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none"
                  >
                    {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Start Time</label>
                  <select
                    value={form.startHour}
                    onChange={e => setForm(f => ({ ...f, startHour: parseInt(e.target.value) }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none"
                  >
                    {HOURS.map(h => <option key={h} value={h}>{h > 12 ? `${h-12}:00pm` : h === 12 ? '12:00pm' : `${h}:00am`}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Duration</label>
                  <select
                    value={form.durationHours}
                    onChange={e => setForm(f => ({ ...f, durationHours: parseFloat(e.target.value) }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none"
                  >
                    {[0.5, 1, 1.5, 2, 3, 4].map(h => <option key={h} value={h}>{h}h</option>)}
                  </select>
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
                onClick={addEvent}
                disabled={!form.title.trim()}
                className="flex-1 rounded-full bg-white py-2.5 text-sm font-black text-black disabled:opacity-40 hover:bg-white/90 transition-colors"
              >
                Add to Calendar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

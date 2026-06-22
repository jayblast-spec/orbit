'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Metric = { label: string; value: string; change: string; up: boolean; color: string };
type ChartPoint = { label: string; value: number };

const METRICS: Metric[] = [
  { label: 'MRR', value: '$12,400', change: '+18%', up: true, color: 'text-emerald-300' },
  { label: 'Active Users', value: '2,847', change: '+34%', up: true, color: 'text-sky-300' },
  { label: 'Churn Rate', value: '2.1%', change: '-0.4%', up: false, color: 'text-emerald-300' },
  { label: 'CAC', value: '$47', change: '-12%', up: false, color: 'text-emerald-300' },
  { label: 'LTV', value: '$940', change: '+22%', up: true, color: 'text-violet-300' },
  { label: 'Conversion', value: '4.7%', change: '+1.2%', up: true, color: 'text-amber-300' },
];

const MRR_DATA: ChartPoint[] = [
  { label: 'Jan', value: 5200 }, { label: 'Feb', value: 6100 }, { label: 'Mar', value: 7400 },
  { label: 'Apr', value: 7900 }, { label: 'May', value: 9200 }, { label: 'Jun', value: 10500 },
  { label: 'Jul', value: 11200 }, { label: 'Aug', value: 12400 },
];

const USER_DATA: ChartPoint[] = [
  { label: 'Jan', value: 420 }, { label: 'Feb', value: 680 }, { label: 'Mar', value: 940 },
  { label: 'Apr', value: 1200 }, { label: 'May', value: 1580 }, { label: 'Jun', value: 1940 },
  { label: 'Jul', value: 2340 }, { label: 'Aug', value: 2847 },
];

const SOURCES = [
  { label: 'Organic Search', pct: 38, color: 'bg-violet-400' },
  { label: 'Direct', pct: 24, color: 'bg-sky-400' },
  { label: 'Social', pct: 19, color: 'bg-emerald-400' },
  { label: 'Referral', pct: 12, color: 'bg-amber-400' },
  { label: 'Email', pct: 7, color: 'bg-red-400' },
];

const TOP_CONTENT = [
  { title: 'How We Hit $10K MRR', views: '8.2K', conversion: '4.1%', trend: '↑' },
  { title: '5 Mistakes We Made as Founders', views: '6.7K', conversion: '3.8%', trend: '↑' },
  { title: 'Our Q2 Metrics Breakdown', views: '5.1K', conversion: '5.2%', trend: '↑' },
  { title: 'Building in Public — Week 12', views: '4.4K', conversion: '2.9%', trend: '→' },
  { title: 'Why We Switched from X to Y', views: '3.9K', conversion: '3.3%', trend: '↓' },
];

function LineChart({ data, color }: { data: ChartPoint[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const w = 100 / (data.length - 1);

  const points = data.map((d, i) => ({
    x: i * w,
    y: 100 - ((d.value - min) / range) * 80 - 10,
  }));

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${path} L${points[points.length - 1].x},100 L0,100 Z`;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-32" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={color} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

export default function AnalyticsPage() {
  const [activeChart, setActiveChart] = useState<'mrr' | 'users'>('mrr');

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-[var(--font-geist-sans)]">
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-base font-black tracking-tight">Orbit</Link>
            <nav className="hidden md:flex items-center gap-4 text-sm text-white/40">
              <Link href="/schedule" className="hover:text-white/70 transition-colors">Schedule</Link>
              <span className="text-emerald-300 font-semibold">Analytics</span>
              <Link href="/publish" className="hover:text-white/70 transition-colors">Publish</Link>
              <Link href="/automate" className="hover:text-white/70 transition-colors">Automate</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="text-[11px] text-white/30 mb-1">{m.label}</div>
              <div className="text-xl font-black text-white">{m.value}</div>
              <div className={`text-[11px] font-semibold mt-1 ${m.color}`}>{m.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Main chart */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold">
                {activeChart === 'mrr' ? 'Monthly Recurring Revenue' : 'Active Users'}
              </h2>
              <div className="text-[11px] text-white/30 mt-0.5">Last 8 months</div>
            </div>
            <div className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {(['mrr', 'users'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setActiveChart(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeChart === t ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {t === 'mrr' ? 'MRR' : 'Users'}
                </button>
              ))}
            </div>
          </div>

          <div className="px-2">
            <LineChart
              data={activeChart === 'mrr' ? MRR_DATA : USER_DATA}
              color={activeChart === 'mrr' ? '#34d399' : '#818cf8'}
            />
            <div className="flex justify-between mt-1">
              {(activeChart === 'mrr' ? MRR_DATA : USER_DATA).map(d => (
                <span key={d.label} className="text-[10px] text-white/20">{d.label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Traffic sources */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-sm font-bold mb-5">Traffic Sources</h3>
            <div className="space-y-3">
              {SOURCES.map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/60">{s.label}</span>
                    <span className="font-semibold text-white/80">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full rounded-full ${s.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top content */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-sm font-bold mb-5">Top Content</h3>
            <div className="space-y-3">
              {TOP_CONTENT.map((c, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                  <div className="text-[11px] font-bold text-white/20 w-4 shrink-0">{i + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-white/70 truncate">{c.title}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{c.views} views · {c.conversion} CVR</div>
                  </div>
                  <span className={`text-sm shrink-0 ${c.trend === '↑' ? 'text-emerald-400' : c.trend === '↓' ? 'text-red-400' : 'text-white/30'}`}>
                    {c.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  body: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt?: string;
  createdAt: string;
};

const PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', color: 'text-sky-300 border-sky-400/30 bg-sky-400/[0.08]' },
  { id: 'twitter', label: 'Twitter/X', icon: '🐦', color: 'text-white/60 border-white/10 bg-white/[0.04]' },
  { id: 'newsletter', label: 'Newsletter', icon: '📧', color: 'text-amber-300 border-amber-400/30 bg-amber-400/[0.08]' },
  { id: 'blog', label: 'Blog', icon: '✍️', color: 'text-violet-300 border-violet-400/30 bg-violet-400/[0.08]' },
];

const STATUS_STYLE: Record<string, string> = {
  draft: 'text-white/30',
  scheduled: 'text-amber-300',
  published: 'text-emerald-300',
};

const SEED_POSTS: Post[] = [
  {
    id: '1', title: 'How We Hit $10K MRR Without Paid Ads',
    body: 'Building in public changed everything for us. Here\'s the exact playbook we used to grow from $0 to $10K MRR in 6 months...',
    platforms: ['linkedin', 'newsletter'], status: 'published', createdAt: '2026-06-20',
  },
  {
    id: '2', title: 'The Founder\'s Time Audit (Q2 Results)',
    body: 'I tracked every hour of my time for 90 days. What I found was uncomfortable but necessary...',
    platforms: ['twitter', 'linkedin'], status: 'scheduled', scheduledAt: '2026-06-23T09:00', createdAt: '2026-06-21',
  },
  {
    id: '3', title: 'Building the AI Features Nobody Asked For (And Why We Did It)',
    body: '',
    platforms: ['blog', 'newsletter'], status: 'draft', createdAt: '2026-06-22',
  },
];

export default function PublishPage() {
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: '', body: '', platforms: [] as string[], status: 'draft' as Post['status'] });

  useEffect(() => {
    const saved = localStorage.getItem('orbit_posts');
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  function savePosts(ps: Post[]) {
    setPosts(ps);
    localStorage.setItem('orbit_posts', JSON.stringify(ps));
  }

  function newPost() {
    setEditing(null);
    setForm({ title: '', body: '', platforms: [], status: 'draft' });
    setView('editor');
  }

  function editPost(p: Post) {
    setEditing(p);
    setForm({ title: p.title, body: p.body, platforms: p.platforms, status: p.status });
    setView('editor');
  }

  function savePost() {
    if (!form.title.trim()) return;
    if (editing) {
      const updated = posts.map(p => p.id === editing.id ? { ...p, ...form } : p);
      savePosts(updated);
    } else {
      const newP: Post = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString().slice(0, 10) };
      savePosts([...posts, newP]);
    }
    setView('list');
  }

  function deletePost(id: string) {
    savePosts(posts.filter(p => p.id !== id));
  }

  function togglePlatform(pid: string) {
    setForm(f => ({
      ...f,
      platforms: f.platforms.includes(pid) ? f.platforms.filter(p => p !== pid) : [...f.platforms, pid],
    }));
  }

  const charCount = form.body.length;
  const twitterWarning = form.platforms.includes('twitter') && charCount > 280;

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-[var(--font-geist-sans)]">
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-base font-black tracking-tight">Orbit</Link>
            <nav className="hidden md:flex items-center gap-4 text-sm text-white/40">
              <Link href="/schedule" className="hover:text-white/70 transition-colors">Schedule</Link>
              <Link href="/analytics" className="hover:text-white/70 transition-colors">Analytics</Link>
              <span className="text-amber-300 font-semibold">Publish</span>
              <Link href="/automate" className="hover:text-white/70 transition-colors">Automate</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            {view === 'editor' && (
              <button onClick={() => setView('list')} className="text-xs text-white/40 hover:text-white/70 transition-colors mr-2">
                ← Back
              </button>
            )}
            <button
              onClick={view === 'editor' ? savePost : newPost}
              className="rounded-full bg-white px-4 py-2 text-xs font-black text-black hover:bg-white/90 transition-colors"
            >
              {view === 'editor' ? 'Save Post' : '+ New Post'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {view === 'list' ? (
          <>
            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { label: 'Published', value: posts.filter(p => p.status === 'published').length, color: 'text-emerald-300' },
                { label: 'Scheduled', value: posts.filter(p => p.status === 'scheduled').length, color: 'text-amber-300' },
                { label: 'Drafts', value: posts.filter(p => p.status === 'draft').length, color: 'text-white/40' },
              ].map(s => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-[11px] text-white/30 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Posts list */}
            <div className="space-y-3">
              {posts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm text-white/80 mb-1.5">{p.title}</h3>
                      {p.body && (
                        <p className="text-xs text-white/30 truncate">{p.body}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2.5">
                        <span className={`text-[11px] font-semibold capitalize ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                        <span className="text-white/10">·</span>
                        {p.platforms.map(pid => {
                          const pl = PLATFORMS.find(x => x.id === pid);
                          return pl ? <span key={pid} className="text-[11px] text-white/30">{pl.icon} {pl.label}</span> : null;
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => editPost(p)} className="text-[11px] text-white/40 hover:text-white/80 transition-colors">Edit</button>
                      <button onClick={() => deletePost(p.id)} className="text-[11px] text-red-400 hover:text-red-300 transition-colors">Delete</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Editor */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <input
                  autoFocus
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full bg-transparent text-xl font-bold text-white placeholder-white/20 outline-none border-b border-white/[0.06] pb-3 mb-4"
                  placeholder="Post title..."
                />
                <textarea
                  value={form.body}
                  onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                  className="w-full bg-transparent text-sm text-white/70 placeholder-white/20 outline-none resize-none min-h-[300px] leading-relaxed"
                  placeholder="Start writing..."
                />
                <div className="flex justify-between pt-3 border-t border-white/[0.06] mt-3">
                  <span className={`text-[11px] ${twitterWarning ? 'text-red-400' : 'text-white/20'}`}>
                    {charCount} chars{twitterWarning ? ' — too long for Twitter/X (280 max)' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-3">Publish to</h4>
                <div className="space-y-2">
                  {PLATFORMS.map(pl => (
                    <button
                      key={pl.id}
                      onClick={() => togglePlatform(pl.id)}
                      className={`w-full flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                        form.platforms.includes(pl.id) ? pl.color : 'border-white/[0.06] bg-transparent text-white/30 hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{pl.icon}</span>
                      <span className="text-xs font-semibold">{pl.label}</span>
                      {form.platforms.includes(pl.id) && (
                        <span className="ml-auto text-[10px] opacity-60">Selected</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-3">Status</h4>
                <div className="space-y-1.5">
                  {(['draft', 'scheduled', 'published'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setForm(f => ({ ...f, status: s }))}
                      className={`w-full flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all ${
                        form.status === s
                          ? 'border-white/20 bg-white/[0.06] text-white'
                          : 'border-transparent text-white/30 hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_STYLE[s].replace('text-', 'bg-')}`} />
                      <span className="capitalize">{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

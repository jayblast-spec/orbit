import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Orbit — Schedule. Publish. Analyze. Automate.',
  description: 'The free, open-source founder platform. Manage your schedule, publish content, track analytics, and automate your workflow — all in the browser.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen bg-[#05070a] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

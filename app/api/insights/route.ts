import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'question required' }, { status: 400 });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'You are Orbit AI, an intelligent co-pilot for founders. You give sharp, actionable insights about scheduling, content publishing, analytics, and business automation. Keep answers under 120 words. Be direct, specific, and high-value. No fluff.',
          },
          { role: 'user', content: question },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      return NextResponse.json({ insight: 'AI is temporarily unavailable. Check your GROQ_API_KEY.' }, { status: 200 });
    }

    const data = await groqRes.json();
    const insight = data.choices?.[0]?.message?.content ?? 'No response generated.';
    return NextResponse.json({ insight });
  } catch {
    return NextResponse.json({ insight: 'Something went wrong. Try again.' }, { status: 200 });
  }
}

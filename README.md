<div align="center">

# Orbit

### Schedule. Publish. Analyze. Automate.

Orbit is a free, open-source founder platform that unifies four tools founders normally juggle separately — scheduling, analytics, content publishing, and no-code automation — into one Next.js dashboard. Its `/api/insights` route calls Groq's chat completions API to generate live AI insight text for the analytics module.

<p>
  <a href="https://orbit-alpha-nine.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/orbit"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-1D4ED8?style=flat-square&logo=framer&logoColor=white">
  <img alt="Groq" src="https://img.shields.io/badge/Groq-F55036?style=flat-square">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated Orbit headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Own+your+calendar;See+what+actually+moves;Publish+everywhere+at+once;Run+on+autopilot">
</p>

</div>

## What It Does

Orbit bundles four founder-facing modules behind one shell:

- **Scheduling** — drag-and-drop weekly calendar, focus blocks, timezone-aware booking links
- **Analytics** — live MRR/revenue tracking, acquisition funnels, content performance heatmap, custom KPI targets, with AI-generated insight text
- **Publishing** — write once, schedule to LinkedIn, X/Twitter, newsletter, and blog from one editor
- **Automation** — visual trigger → action workflow builder with run history, no code required

## How It Works

- Next.js App Router, client-rendered landing page (`app/page.tsx`) built with Framer Motion scroll-linked animation
- `app/api/insights/route.ts` calls `https://api.groq.com/openai/v1/chat/completions` with `GROQ_API_KEY` and returns a graceful fallback message ("AI is temporarily unavailable") if the key is missing or the call fails
- No database in this repo — the four modules (`/schedule`, `/analytics`, `/publish`, `/automate`) are routed as product surfaces from the marketing shell

## Live

https://orbit-alpha-nine.vercel.app

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| AI | Groq (`GROQ_API_KEY`, chat completions) |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion |
| Deployment | Vercel |

<br>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=70&color=0:1D4ED8,55:0B1E3D,100:020617&text=ArkNet%20Digital%20%7C%20Orbit&fontColor=FAFAFA&fontSize=18&fontAlign=50&animation=fadeIn">
</p>

<p align="center">
Built by <a href="https://arknet.digital">ArkNet Digital</a> · <a href="mailto:michael@arknet.digital">michael@arknet.digital</a>
</p>

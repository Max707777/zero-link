# Pramaan Ledger — Zero-Trust Mobile Identity Gateway

**MeitY / C-DAC Category 3 Submission**  
Built with Next.js 14, TypeScript, Tailwind CSS, and Lucide React.

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

---

## Pages

| Route | Page |
|---|---|
| `/` | The Gateway — split-path routing |
| `/sanitizer/dashboard` | Number Sanitizer — 48-hour escrow + KYC flow |
| `/manager/dashboard` | Global Identity Manager — broadcast engine + service grid |

---

## Project Structure

```
pramaan-ledger/
├── app/
│   ├── layout.tsx                     # Root layout (fonts, metadata)
│   ├── globals.css                    # Tailwind + custom animations
│   ├── page.tsx                       # Gateway (Path A / B)
│   ├── sanitizer/
│   │   └── dashboard/
│   │       └── page.tsx               # Sanitizer Dashboard
│   └── manager/
│       └── dashboard/
│           └── page.tsx               # Global Manager Dashboard
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── next.config.ts
```

---

## Design System

- **Font**: IBM Plex Sans (body) + Source Serif 4 (display headings)
- **Primary Color**: `indigo-950` / `indigo-700`
- **Status Colors**: Rose (SUSPENDED), Emerald (ACTIVE/VERIFIED), Amber (warnings)
- **UX Standard**: UX4G — Government of India design principles

---

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- Lucide React (icons)
- Google Fonts via `next/font`

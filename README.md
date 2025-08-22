# WiCon Systems Website

A modern marketing website for WiCon Systems built with Next.js (App Router), React, TypeScript, and Tailwind CSS. It showcases WiCon's technology solutions and includes a dedicated "WiCon for Digital Education" training program landing page.

## Contents
- Overview
- Key Features
- Tech Stack
- Project Structure
- Getting Started
- Available Scripts
- Development Notes
- Deployment
- Contributing
- License

## Overview
This project is a content-first, responsive website designed to promote WiCon Systems' products and services:
- Wireless electrical controllers and automation
- Custom software solutions
- IoT solutions
- Solar PV, electrical wiring, CCTV installations
- Annual training program: WiCon for Digital Education

Pages are implemented using Next.js App Router in the `app/` directory, with reusable UI primitives under `components/ui` (shadcn-style, powered by Radix UI).

## Key Features
- Responsive, accessible UI with Tailwind CSS.
- Reusable design system via `components/ui` (Button, Card, Input, Select, etc.).
- Global layout with SEO-ready metadata and Google Inter font.
- Structured sections for Home, Products, Services, Blog, Careers, Contact, and Training.
- Training landing page with program overview, tracks, and trainer application form UI.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- UI & Styling: Tailwind CSS v4, shadcn-style components, Radix UI, Lucide Icons
- State/Forms: React 19, react-hook-form, zod (installed; forms can be wired)
- Theming: next-themes (installed)
- Build Tooling: pnpm, PostCSS

## Project Structure
```
.
├─ app/
│  ├─ layout.tsx            # Root layout & metadata
│  ├─ globals.css           # Global styles (Tailwind v4)
│  ├─ page.tsx              # Home page
│  ├─ training/
│  │  └─ page.tsx          # Training program landing page
│  ├─ products/
│  │  └─ page.tsx          # Products page (hardware & tech)
│  ├─ services/
│  │  └─ page.tsx          # Services page (installation & support)
│  ├─ about/
│  │  └─ page.tsx
│  ├─ blog/
│  │  └─ page.tsx
│  └─ contact/
│     └─ page.tsx
├─ components/
│  ├─ header.tsx            # Sticky header with dropdown nav (client component)
│  ├─ footer.tsx            # Footer with company info & quick links
│  ├─ theme-provider.tsx    # Optional theming provider
│  └─ ui/                   # Reusable UI primitives (Button, Card, Input, Select, etc.)
├─ public/
│  └─ downloads/            # Place brochure PDFs and assets here
├─ styles/
│  └─ ...                   # Tailwind setup (referenced by app/globals.css)
├─ next.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ tsconfig.json
└─ README.md
```

## Getting Started

### Prerequisites
- Node.js 18.18+ (or 20+ recommended)
- pnpm 9+

### Install dependencies
```
pnpm install
```

### Run the development server
```
pnpm run dev
```
Then open http://localhost:3000 in your browser.

### Build for production
```
pnpm run build
```

### Start production server
```
pnpm run start
```

## Available Scripts
- `pnpm run dev` — Start Next.js in development mode.
- `pnpm run build` — Build the production bundle.
- `pnpm run start` — Start the production server after building.
- `pnpm run lint` — Run Next.js lint.

## Development Notes
- Routing: App Router under `app/`. Each folder with `page.tsx` becomes a route.
- Server vs Client Components: Files using React hooks or browser APIs must include `"use client"` (e.g., `components/header.tsx`).
- Styling: Tailwind CSS v4 is configured via `@tailwindcss/postcss` and `postcss.config.mjs`. Global styles live in `app/globals.css`.
- UI Components: `components/ui/*` implements shadcn-style primitives built on Radix UI. Prefer these for consistency.
- Icons: Lucide Icons are used throughout.
- Forms: `react-hook-form` and `zod` are available but not yet wired to forms on the Training page. Consider adding validation and submission handlers.

### Environment Variables
Currently, no environment variables are required. If you add API routes or external services, document variables in this section and create a `.env.local.example` file.

### Code Quality & Conventions
- Use TypeScript types/props for all components.
- Keep components reusable and colocate domain-specific components near their routes if needed.
- Prefer composition and UI primitives over one-off styles.

## Deployment
This project can be deployed to platforms that support Next.js:

- Vercel (recommended): zero-config for Next.js
- Netlify / Cloudflare Pages: supported via adapters

Basic steps (Vercel):
1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the repo in Vercel.
3. Set Framework Preset: Next.js.
4. Add any required environment variables (if introduced later).
5. Deploy.

## Contributing
Contributions are welcome. Suggested areas:
- Wire up Training forms (react-hook-form + zod) with API routes.
- Replace placeholder images and refine content.
- Add SEO metadata per route and social open graph images.
- Implement dark mode using `next-themes` and `theme-provider`.

Guidelines:
- Create a feature branch from `main`.
- Keep PRs focused and small.
- Ensure `pnpm run build` and `pnpm run lint` pass.

## License
This project’s license is not specified. If this is a private/commercial project, consider adding a `LICENSE` file (e.g., Proprietary – All Rights Reserved) or an open-source license as appropriate.

# Here

A warm, guilt-free, frontend-only companion that helps busy parents do the
single most evidence-based thing for connection with their kids: a daily **five
minutes of child-led play** ("Special Time"). Tagline: **"Five minutes, fully
here."**

The research shaped every decision: for young children, the sheer quantity of
parent time barely predicts outcomes. What matters is small moments of warm,
undivided attention, and a stressed or guilty parent's time can actually do
less good. So Here is the opposite of a pressuring tracker. There are no streaks
to fail, no shame, and no "you missed a day". It just reduces guilt and removes
friction so the five minutes actually happen and go well.

There is no backend, no account, and no network calls. Everything is stored on
your own device and the app works fully offline.

---

## What you can do

- **Today** (home): a warm greeting and a rotating de-guilt note; a "Ready when
  you are" suggestion for the child you have played with least recently, with a
  big "Start with [name]" button and quick chips for the others; today's PRIDE
  skill to practise; and a gentle per-child status for the day.
- **Moments**: a keepsake log of the little things you caught after sessions.
  It is framed as a keepsake, not a scoreboard, with no counts or metrics.
  Moments are deletable.
- **Guide**: the gentle "why" and the proven "how", the five **PRIDE** skills
  (Praise, Reflect, Imitate, Describe, Enthusiasm), a "for these five minutes,
  let go of" list, and a reassuring note.
- **The Special Time session**: a full-screen flow in three calm phases. **Prep**
  picks one skill to try, offers a low-prep play spark, and reminds you to set
  the phone down. **Run** is a glanceable, phone-down timer with a soft
  breathing orb. **Done** is warm and de-guilting ("You showed up"), with an
  optional moment to keep. An optional soft end chime can be toggled off.

Add or remove children (a name, an optional age, a soft color). The suggestion
is always the child with the oldest or never-set last Special Time, surfaced as
an invitation, never a guilt-trip.

---

## Tech stack

- **React 19 + TypeScript** (strict), built with **Vite**
- **Tailwind CSS v4** (configured in CSS with `@theme`, no `tailwind.config.js`)
- **Zustand** for state, **React Router** for the three routes
- **React Hook Form + Zod** for the add-child and capture-moment inputs, and for
  validating saved data
- **vite-plugin-pwa** so the app is installable and works offline
- The end chime uses the **WebAudio API**, created on the start-session gesture
- **Vitest** + **Testing Library** for unit and component tests, **Playwright**
  for browser tests

---

## Getting started

You need **Node 20 or newer** and **pnpm** (install pnpm with `npm install -g pnpm`).

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:5173>. That is the whole setup. There is nothing
else to configure because there is no backend.

---

## Commands

| Command          | What it does                              |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Start the Vite dev server                 |
| `pnpm build`     | Type-check and build for production       |
| `pnpm preview`   | Preview the production build locally      |
| `pnpm lint`      | Run ESLint (must pass with zero warnings) |
| `pnpm format`    | Format every file with Prettier           |
| `pnpm typecheck` | Type-check without building               |
| `pnpm test`      | Run the unit and component tests (Vitest) |
| `pnpm test:e2e`  | Run the browser tests (Playwright)        |

To run the browser tests the first time, install the browser once with
`pnpm test:e2e:install`, then run `pnpm test:e2e`.

---

## How it is built

```
src/
├── components/   Presentational pieces (icon, card, button, avatar, layout, overlay, sheet)
├── features/     One folder per area: today, moments, guide, session, kids, settings
├── store/        Zustand stores (saved app state, and the transient overlays)
├── hooks/        Small reusable hooks (interval, session timer, apply theme)
├── lib/          Pure logic and data: repository, whose-turn, session-timer, pride, done-today, streak, chime, content
├── types/        Zod schemas and the types they produce
└── styles/       The theme and layout CSS
```

A few ideas worth knowing:

- **All saving goes through one seam.** `lib/repository.ts` is a small typed
  interface (`getState`, `saveState`, `addKid`, `removeKid`, `completeSession`,
  `deleteMoment`) backed by localStorage. Components and the store never touch
  storage directly, which is how a Dexie/IndexedDB version could slot in later.
  Saved data is parsed with Zod, so an old or broken shape safely falls back to
  defaults.
- **The tricky logic is pure and tested.** Whose-turn (`whose-turn.ts`), the
  session timer (`session-timer.ts`), PRIDE rotation (`pride.ts`), "done today"
  (`done-today.ts`), and the gentle day count (`streak.ts`) are plain functions
  with no React inside, so they are easy to test.
- **The session is a small state machine.** Prep, run, and done are a
  discriminated union; the run phase drives the pure timer with a one-second
  tick and ends to the recall when the time is up or you tap "We're done".
- **The day count never pressures you.** It is internal and never shown as
  something to protect. A missed day is completely fine, by design.

---

## Accessibility and motion

- Every control is keyboard-operable with a visible focus ring.
- The session, the children sheet, and settings trap focus and close on Escape;
  icon buttons have labels.
- The app honors `prefers-reduced-motion` (the breathing orb settles) and
  `prefers-color-scheme`. You can switch theme (warm, dark) and the accent in
  Settings.

---

## A note on guilt

Here is a gentle nudge, not a test. Some days you will miss it, and that is
completely fine, there is no streak to protect and nothing to fail. Come back
whenever you can.

---

## License

MIT.

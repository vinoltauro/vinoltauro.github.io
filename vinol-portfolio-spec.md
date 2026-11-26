# Vinol Tauro — Portfolio Site Build Spec

A single-page personal portfolio for an AI-native full-stack + DevOps engineer, aimed at
hiring managers and recruiters in Dublin / Ireland. The brief: **clean, modern, genuinely
distinctive, premium — Apple-like — but accessible to any non-technical reader.** It should
make someone quickly get who I am, what I've built, and why I'm a strong, curious engineer.
Linked from my CV, LinkedIn, and job applications.

> Build this as a polished production site, not a prototype. Sweat the details: spacing,
> typography, motion timing, and how it feels to scroll. The quality of the execution *is*
> the portfolio — a technical person should look at the site and think "this person has taste
> and ships."

---

## 1. The core concept

**The site is one vertical scroll structured as an argument that pays off three words.**

The hero is three words: **Curious. Agnostic. Autonomous.** Everything below earns them, in
order. It's not a brochure with an "About" tab — it's a single, confident scroll where each
beat answers a question the reader hasn't said out loud yet. The uniqueness comes from
*restraint and narrative order*, not gimmicks.

The reading order:

1. **Hero** — the three words + a short, genuine bio.
2. **01 · Curious** — *why* I build.
3. **02 · Agnostic** — *how* I build.
4. **03 · Autonomous** — *what* I ship.
5. **Companies** — where I've built.
6. **Projects** — what I've shipped.
7. **Skills** — the toolkit.
8. **Education** — credentials.
9. **Contact** — the ask.

A thin **progress spine** runs down the left edge, filling as you scroll and lighting up the
active beat — a quiet signal that you're moving through an argument that's going somewhere.

---

## 2. Voice & tone (applies to all copy)

Honest, human, curious, a builder. Plain, confident, specific. **Not** corporate buzzword
filler. No em dashes. No "passionate about leveraging synergies." Understatement reads as
senior; let the facts carry it. Keep all the copy below **exactly as written** unless I say
otherwise — it's been heavily workshopped.

**Do not** claim tools I don't use (no C#/.NET, Rust, Kafka/Flink, Azure beyond coursework,
Pulsar). **Do not** inflate me to "Senior" — I'm ~4 years professional, strong IC, ~10 years
coding. **Do not** invent projects.

---

## 3. Design direction — "premium, Apple-like"

Concretely, what that means for this build:

- **Generous negative space.** Give every section room to breathe. Content sits in a narrow,
  centered reading column (~720px) with large vertical rhythm between sections. White space is
  the primary design material. When in doubt, add more.
- **Precision typography.** A clear, confident type scale, strictly adhered to. Big, tight
  display type for the hero and section openers; comfortable, readable body. Balanced headings
  (`text-wrap: balance`), tight letter-spacing on display, a little positive tracking on
  small uppercase labels. Tabular numerals for any aligned figures.
- **Restraint in colour.** A near-neutral palette with a single confident accent. No gradients-
  as-decoration, no rainbow. Colour is used sparingly and meaningfully (the accent marks
  structure and interaction, nothing else).
- **Buttery, considered motion.** This is the Apple signature. Smooth momentum scrolling.
  Content reveals on scroll with subtle, fast, well-eased transforms (short translateY + fade,
  ~500–600ms, custom cubic-bezier) — *never* bouncy, never slow, never gaudy. Elements animate
  in from a visible resting state. One orchestrated hero entrance. Micro-interactions on hover.
  Respect `prefers-reduced-motion` fully.
- **Depth through subtlety.** Hairline borders, barely-there surface elevation on cards, soft
  focus states. No heavy drop shadows. Think "precision-milled," not "material design."
- **Flawless light & dark.** Both themes designed with equal care, toggleable, and defaulting
  to the viewer's system preference. Smooth transition between them.
- **Perfect on a phone.** Full responsive care, not an afterthought. The scroll feels just as
  considered at 390px as at 1440px.

Reference feel: Apple product pages, Linear, Vercel, Stripe — editorial restraint, precision,
and motion that feels inevitable rather than decorative.

---

## 4. Design system

### Typography
- **Display** (hero three words, section openers): `Bricolage Grotesque` — heavy weights
  (700/800), tight tracking (-0.025em), set large.
- **Body**: `Hanken Grotesk` — 400/500/600.
- **Mono / utility** (eyebrows, labels, metrics, tags): `JetBrains Mono` — 400/500, uppercase
  with ~0.1–0.14em tracking for labels.
- All via Google Fonts. Always declare real fallback stacks (`Georgia, serif` for display;
  `system-ui, sans-serif` for body; `ui-monospace, monospace` for mono).
- Type scale (fluid, `clamp()`):
  - Hero words: `clamp(2.7rem, 9vw, 4.8rem)`, line-height ~1.0
  - Section opener line: `clamp(1.5rem, 4vw, 2.1rem)`
  - Section H2: `clamp(1.7rem, 4.6vw, 2.4rem)`
  - Lead paragraph: `clamp(1.05rem, 2.4vw, 1.2rem)`
  - Body: 17px base, line-height 1.6
  - Eyebrow / label / mono: 12–13px

### Colour tokens

**Light (default):**
```
--bg:        #F5F4F0   /* warm off-white */
--surface:   #FBFAF7
--ink:       #16181D   /* warm near-black */
--muted:     #65686F
--faint:     #9A9CA1
--line:      #E4E2DB
--accent:    #1F3BFF   /* electric cobalt — the one confident colour */
--accent-soft: rgba(31,59,255,0.08)
--pos:       #1C7C4A   /* positive metric green */
```

**Dark:**
```
--bg:        #0D0E11
--surface:   #15161A
--ink:       #ECEBE7
--muted:     #9A9DA4
--faint:     #63666C
--line:      #24262B
--accent:    #8A97FF   /* lifted cobalt for dark bg */
--accent-soft: rgba(138,151,255,0.13)
--pos:       #5FD39A
```

Define every colour as a token on `:root` (light), then redefine the dark values under both
`@media (prefers-color-scheme: dark)` (guarded so an explicit light choice wins) and
`[data-theme="dark"]` (so the toggle wins). Set `color-scheme: dark` in the dark blocks so
native controls and scrollbars follow. `body` background always from a token.

### Spacing & shape
- Reading column: `max-width: 720px`, centered, min 28px side gutter (use
  `max(28px, env(safe-area-inset-left))` for notch safety).
- Section vertical padding: `clamp(60px, 10vh, 104px)`, hairline `--line` divider between
  sections.
- Hero: ~90vh, vertically centered, mostly air.
- Card radius: 14px. Border: 1px `--line`. Fill: `--surface`. No heavy shadow.
- Button radius: 10px.

---

## 5. Sections & final copy

> All copy below is final. Preserve wording exactly.

### Hero
- Kicker (mono, small): `vinol tauro ▍ dublin, ireland` (the `▍` caret blinks).
- Three words, stacked, display face, huge. **Each word is an anchor link** to its chapter
  (`Curious.` → #curious, `Agnostic.` → #agnostic, `Autonomous.` → #autonomous) with smooth
  scroll. On desktop hover, each reveals a small mono tag beneath it — "why I build" /
  "how I build" / "what I ship" — and shifts to the accent colour. (Hide the tag on touch.)
- Hero entrance: the three words fade + rise in once on load (~700ms, eased). One orchestrated
  moment, nothing else animates on load.
- Bio (muted body, the three words highlighted in accent):

  > I've been building for about ten years, since staying up late on Codeforces and CodeChef at
  > 18 because I was **curious** how it all worked. Since then I've shipped real software at Sony
  > and a fast fintech startup, **agnostic** about tools and languages, and **autonomous** enough
  > to take a vague problem and hand back something running in production. Frontend, backend, or
  > the cloud underneath, I like owning the whole thing.

- Scroll cue (mono, small, with a gently bobbing ↓): `scroll, and I'll show you`

### 01 · Curious
- Eyebrow: `01 / curious`
- Opener (display): **The fundamentals came before the AI did.**
- Lead: I was solving algorithm problems for fun years before any tool could write code for me.
  So when I say I'm AI-native, I don't mean I lean on it. I mean I know enough to use it well,
  and to catch it when it's wrong.
- Muted: That same curiosity is why I built Techopoly, a custom Monopoly app, with my uni
  friends, just so we could play our own version. Nobody asked me to. I just wanted to see it work.

### 02 · Agnostic
- Eyebrow: `02 / agnostic`
- Opener: **I don't get precious about tools.**
- Lead: Frontend, backend, cloud, I go wherever the problem is. React on top, Node or FastAPI
  or Spring Boot in the middle, Terraform and Kubernetes underneath. AWS, GCP, whatever fits.
- Muted: Same with AI. It's a tool, not an identity. I use it hard, and I don't trust it blindly.

### 03 · Autonomous
- Eyebrow: `03 / autonomous`
- Opener: **Hand me a problem, I'll hand back a working thing.**
- Lead: On small teams you don't get to specialise, and I liked it that way. I built the
  interface, the API, and the infrastructure under it, and I owned what happened when it broke.
- Muted: One example: the team kept waiting on engineers to pull data because nobody knew SQL,
  so I built a Slack bot that answered their questions in plain English. The hard part wasn't the
  AI, it was making it reliable and safe enough to trust. Nobody asked me to. I just saw it needed
  doing.

### 04 · Companies
- Eyebrow: `04 / where I've built`  ·  H2: **Companies**
- Two entries (year on the left, body on the right):
  - **2022–2025 — Keenai Global · Bangalore.** A small, fast team building an AI
    wealth-management platform running over $5B in assets. I worked across frontend, backend, and
    infra, and owned products from idea to production.
  - **2021–2022 — Sony India Software Centre · Bangalore.** Backend in Java and Spring Boot,
    frontend in Angular, for Sony North America's direct-to-consumer commerce platform.

### 05 · Projects
- Eyebrow: `05 / what I've shipped`  ·  H2: **Projects**
- Cards (name + a short mono stat/metric in the header, blurb, tech tags). Order matters; lead
  with AsKeenai and Techopoly.
  1. **AsKeenai** — stat: `plain English → data`.
     A Slack bot that let non-technical teams ask for data in plain English. An LLM writes the
     SQL, but the real work was making it trustworthy: scoped schema, read-only access, and no
     way to pull personal data. Took the engineering bottleneck off the team.
     Tags: Python · LLM / text-to-SQL · Postgres · Slack
  2. **Techopoly** — stat: `live · in use`.
     A custom Monopoly web app I built with my uni friends so we could play with our own house
     rules. Built for the fun of it, and people actually play it.
     Tags: React · TypeScript · Vercel · Link: https://monopoly-jet.vercel.app
  3. **Distributed Notification Engine** — stat: `99.9% delivery` (count up the 99.9).
     Event-driven on AWS SQS and Step Functions. Idempotent processing, dead-letter queues,
     retry logic, DynamoDB and MongoDB underneath. It doesn't lose messages.
     Tags: Node.js · SQS · Step Functions · DynamoDB
  4. **Frontend Platform** — stat: `microfrontends`.
     React and TypeScript at scale. Module Federation microfrontends, dashboards in Highcharts
     and ECharts, and a shared design system other teams built on.
     Tags: React · Module Federation · ECharts
  5. **Cloud Infrastructure & CI/CD** — stat: `3 clusters` (count up the 3).
     Terraform for the infrastructure, three Kubernetes clusters, Docker, CI pipelines, and
     Prometheus with Grafana for eyes on production. On call when it mattered.
     Tags: Terraform · Kubernetes · Prometheus · Grafana

### 06 · Skills
- Eyebrow: `06 / the toolkit`  ·  H2: **Skills**
- Label/value rows:
  - **AI-native** — Claude Code, MCP, agentic workflows, spec-driven building, applied AI
  - **Languages** — Python, TypeScript, JavaScript, Java, Go, C/C++, Bash, SQL
  - **Frontend** — React, Redux, React Query, Module Federation, ECharts, Highcharts, Angular
  - **Backend** — Node, Express, FastAPI, Spring Boot, REST, WebSockets, SSE, event-driven
  - **Cloud / DevOps** — AWS, GCP, Terraform, Kubernetes, Docker, GitHub Actions, GitLab CI,
    Prometheus, Grafana
  - **Databases** — PostgreSQL, MongoDB, DynamoDB, Redis, Elasticsearch

### 07 · Education
- Eyebrow: `07 / education`  ·  H2: **Education**
  - **2025–2026 — MSc Computer Science · Trinity College Dublin.** Graduated with Distinction.
  - **2017–2021 — BE Electronics & Communication · NMAM Institute of Technology, Nitte.**
    CGPA 8.67. Competitive programming on Codeforces and CodeChef; Teaching Assistant for Data
    Structures and Algorithms.

### 08 · Contact
- Eyebrow: `08 / let's talk`  ·  H2: **Still reading? Then let's talk.**
- Email shown as selectable text with a copy button: `vinoltauro99@gmail.com`
- Buttons: **GitHub** (https://github.com/vinoltauro) · **LinkedIn**
  (https://linkedin.com/in/vinoltauro) · **CV** (TODO: add real link).
- Footer (mono, small): `Vinol Tauro · Dublin, Ireland` ... `built, not generated`

---

## 6. Interactions & motion

- **Smooth momentum scroll** across the whole page (this is the Apple feel). Consider a light
  smooth-scroll library (e.g. Lenis) but keep it subtle and never fight native scroll on mobile.
- **Scroll progress spine** (fixed, left edge, ~2px): a track in `--line`, a fill in `--accent`
  that grows with scroll %, and a dot per section that turns accent when that section is active
  (section is "active" when its midpoint passes ~40% viewport height). Hidden below ~880px.
- **Reveal on scroll**: each block fades + rises ~14px into place once, via IntersectionObserver
  (threshold ~0.14, slight negative bottom root-margin). Resting state is visible — never leave
  anything stuck at opacity 0 if JS fails or motion is reduced.
- **Hero entrance**: the three words rise + fade in once on load.
- **Hero word hover** (desktop): colour shift to accent + reveal the mono sub-tag; click =
  smooth scroll to that chapter.
- **Count-up metrics**: 99.9% and 3 animate from 0 when scrolled into view (instant if reduced
  motion).
- **Theme toggle**: top-right pill, persists choice in `localStorage` (wrapped in try/catch),
  defaults to system. Smooth colour transition.
- **Copy-email button**: uses `navigator.clipboard` with a text-selection fallback; shows
  "copied" for ~1.4s.
- **`prefers-reduced-motion`**: disables reveals, count-ups, blink, bob, smooth scroll — show
  everything at rest.

---

## 7. Tech stack (recommended)

Pick what ships cleanly and deploys in one step. Recommended:

- **Vite + React + TypeScript** (or Next.js if you want SSG/SEO; a static single page is fine).
- **Tailwind CSS** for the system, OR plain CSS with custom properties — either is fine, keep
  the token system above intact.
- **Framer Motion** for the reveals/hero entrance (clean, declarative, respects reduced motion),
  and optionally **Lenis** for smooth scroll.
- **Google Fonts** via `<link>` (preconnect to fonts.gstatic.com).
- **Deploy on Vercel** (matches Techopoly, one-step, custom domain easy). Must be trivial to
  update and redeploy.
- Keep it a single page, componentized by section (`<Hero/>`, `<Chapter/>`, `<Projects/>`, …).
  No backend, no CMS — content lives in a typed data file so it's easy to edit.

---

## 8. Accessibility & quality bar

- Semantic landmarks, real heading hierarchy, visible keyboard focus states on every
  interactive element.
- Colour contrast AA in both themes (check the muted/faint tones on their backgrounds).
- All motion gated behind `prefers-reduced-motion`.
- Works with JS disabled at a basic level (content readable; progressive enhancement for motion).
- No layout shift; no horizontal scroll at any width; images (if any) `max-width: 100%`.
- Lighthouse: aim 95+ across the board.

---

## 9. Open items / assets to supply

- [ ] **CV link** — replace the placeholder CV button href with the real file/URL.
- [ ] **Custom domain** (optional) — e.g. vinoltauro.com.
- [ ] **Favicon / OG image** — add a simple favicon and an Open Graph image + meta tags
      (title, description, image) so the link previews well when shared on LinkedIn / in
      applications. Suggested OG title: "Vinol Tauro — Curious. Agnostic. Autonomous."
- [ ] Decide whether to add more personal side projects later (leave the Projects section easy
      to extend).

---

## 10. Reference prototype

A working v1 prototype already exists (single self-contained HTML file) with this exact
structure, copy, palette, fonts, the scroll spine, reveals, count-ups, hero word interactions,
and the light/dark toggle. Use it as the functional reference and **level the execution up to
the premium / Apple bar described in §3** — more refined motion, smoother scroll, tighter
spacing rhythm, and production-quality componentized code. The content and concept are locked;
the polish is the job.

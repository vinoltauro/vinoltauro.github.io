import type { FlagCode } from './components/Flag'
import type { IconName } from './components/Icon'

/**
 * All site copy lives here. Edit this file to update the site; components only render it.
 * Copy is final: keep wording exact unless deliberately changing it.
 */

/** A run of text where `{ hl }` pieces are highlighted in the accent colour. */
export type Rich = Array<string | { hl: string }>

export type Chapter = {
  id: string
  num: string
  word: string
  /** Small mono tag shown under the hero word on hover. */
  tag: string
  opener: string
  lead: string
  muted: string
}

export type Logo = {
  /** Full-colour transparent PNG in /public/logos. */
  src: string
  /** Variant for the dark theme, where the brand colour would vanish on near-black. */
  dark?: string
  /** width / height of the trimmed image. */
  aspect: number
  /** Display height in px, tuned per logo so they all carry similar visual weight. */
  height: number
}

/** A headline number. `count` animates up from 0; `text` is shown as-is. */
export type Metric =
  | { count: { to: number; decimals?: number; suffix?: string }; label: string }
  | { text: string; label: string }

export type Role = {
  company: string
  url: string
  /** Short display form of the URL. */
  urlLabel: string
  logo: Logo
  title: string
  start: string
  end: string
  location: string
  /** One line: what the product/company is. */
  context: string
  intro: string
  metrics?: Metric[]
  /** The "What I built" breakdown, revealed on demand. */
  details: Array<{ icon: IconName; heading: string; body: string }>
  tags: string[]
}

export type Education = {
  school: string
  url: string
  urlLabel: string
  logo: Logo
  degree: string
  start: string
  end: string
  location: string
  /** Shown as accent chips (grades, honours). */
  highlights: string[]
  /** Anything beyond the chips. Omit if the chips say it all. */
  intro?: string
  coursework: string[]
}

export type ProjectLink = {
  label: string
  href: string
  icon: IconName
  /** Not shown yet (e.g. repo still private). Flip off once the link works for everyone. */
  pending?: boolean
}

export type Project = {
  name: string
  /** What kind of work this is, shown as a badge where a company logo would sit. */
  kind: { icon: IconName; label: string }
  subtitle: string
  chips: Array<{ icon: IconName; label: string; accent?: boolean }>
  /** One bold line: the hook. */
  hook: string
  intro: string
  metrics?: Metric[]
  /** Expandable breakdown, e.g. "How it works" / "What I found". */
  detailsLabel?: string
  details?: Array<{ icon: IconName; heading: string; body: string }>
  tags: string[]
  links?: ProjectLink[]
  /** Screenshots, shown under the intro. Files live in /public/projects. */
  media?: Array<{
    src: string
    alt: string
    width: number
    height: number
    /** Short plain-English line shown under the image. */
    caption?: string
    /** 'chart' = white-background figure: framed as a panel, and recoloured for the dark theme. */
    kind?: 'screenshot' | 'chart'
  }>
  /** 'grid' (default) sets shots side by side at one shape; 'stack' gives each full width at its own shape. */
  mediaLayout?: 'grid' | 'stack'
}

export type Interest = {
  icon: IconName
  title: string
  body: string
  /** Optional pull quote shown under the body. */
  quote?: { text: string; by: string }
  /** A little drawing at the bottom of the tile, and its caption. */
  sketch?: 'guitar' | 'sisyphus'
  joke?: string
  /** Optional photos (e.g. dishes), shown as a fanned hand of cards. Files live in /public/life. */
  photos?: Array<{ src: string; alt: string; label: string }>
}

export type SkillRow = { icon: IconName; label: string; items: string[] }

export type Achievement = { icon: IconName; value: string; label: string }

export const site = {
  name: 'Vinol Tauro',
  location: 'Dublin, Ireland',
  /** Small mono line at the very top of the hero: what I do, and where. */
  kicker: { role: 'sre · devops · cloud · full-stack engineer', place: 'dublin, ireland' },

  /** Quiet keyword line under the hero bio: what infra/SRE recruiters scan for. */
  heroStack: ['AWS', 'Terraform', 'Kubernetes', 'CI/CD', 'Observability', 'On-call'],

  /** Greeting above the three big words. */
  greeting: { before: "Hi, I’m", name: 'Vinol Tauro', after: '.' },

  bio: [
    "I’ve been building for about ten years, since staying up late on Codeforces and CodeChef at 18 because I was ",
    { hl: 'curious' },
    " how it all worked. Since then I’ve shipped real software at Sony and a fast fintech startup, ",
    { hl: 'agnostic' },
    ' about tools and languages, and ',
    { hl: 'autonomous' },
    ' enough to take a vague problem and hand back something running in production. Frontend, backend, or the cloud underneath, I like owning the whole thing.',
  ] satisfies Rich,

  scrollCue: "scroll, and I’ll show you",


  chapters: [
    {
      id: 'curious',
      num: '01',
      word: 'Curious.',
      tag: 'why I build',
      opener: 'The fundamentals came before the AI did.',
      lead: "I was solving algorithm problems for fun years before any tool could write code for me. So when I say I’m AI-native, I don’t mean I lean on it. I mean I know enough to use it well, and to catch it when it’s wrong.",
      muted:
        'That same curiosity is why I built Techopoly, a custom Monopoly app, with my uni friends, just so we could play our own version. Nobody asked me to. I just wanted to see it work.',
    },
    {
      id: 'agnostic',
      num: '02',
      word: 'Agnostic.',
      tag: 'how I build',
      opener: "I’m loyal to the problem, not the tool.",
      lead: 'Frontend, backend, cloud, I go wherever the problem is. React on top, Node or FastAPI or Spring Boot in the middle, Terraform and Kubernetes underneath. AWS, GCP, whatever fits.',
      muted: "Same with AI. It’s a tool, not an identity. I use it hard, and I don’t trust it blindly.",
    },
    {
      id: 'autonomous',
      num: '03',
      word: 'Autonomous.',
      tag: 'what I ship',
      opener: "Hand me a problem, I’ll hand back a working thing.",
      lead: "On small teams you don’t get to specialise, and I liked it that way. I built the interface, the API, and the infrastructure under it, and I owned what happened when it broke.",
      muted:
        "One example: the team kept waiting on engineers to pull data because nobody knew SQL, so I built a Slack bot that answered their questions in plain English. The hard part wasn’t the AI, it was making it reliable and safe enough to trust. Nobody asked me to. I just saw it needed doing.",
    },
  ] satisfies Chapter[],

  companies: [
    {
      company: 'Keenai Global',
      url: 'https://www.keenaiglobal.com/en-sg',
      urlLabel: 'keenaiglobal.com',
      logo: { src: '/logos/keenai.png', aspect: 406 / 120, height: 28 },
      title: 'Associate, Product Engineering',
      start: 'Sep 2022',
      end: 'Jun 2025',
      location: 'Bengaluru, India',
      context: 'AI-powered wealth management (fintech/SaaS) platform, $5B+ AUM',
      intro:
        "I spent around three years at Keenai, an early-stage fintech startup, building and owning products end to end, from a rough idea through to production. It’s where I learned to work from first principles and move fast without breaking what mattered. I worked across the whole stack but spent most of my time on cloud infrastructure, backend and reliability. I also mentored interns on their projects.",
      metrics: [
        { count: { to: 40, suffix: '%' }, label: 'faster deployments with infrastructure as code' },
        { count: { to: 50, suffix: '%' }, label: 'lower operational costs after containerising' },
        { count: { to: 60, suffix: '%' }, label: 'higher deployment frequency from CI/CD' },
        { count: { to: 95, suffix: '%' }, label: 'fewer scanning attacks after hardening' },
        { text: '15s → 1s', label: 'KYC latency, tuned with Redis' },
        { count: { to: 99.9, decimals: 1, suffix: '%' }, label: 'notification delivery through failures' },
      ],
      details: [
        {
          icon: 'cloud',
          heading: 'Cloud infrastructure & IaC',
          body: 'Architected the AWS infrastructure as code with Terraform and CloudFormation, cutting deployment time by 40%. Containerised microservices on ECS and Kubernetes (Docker, ECR) with auto-scaling, bringing operational costs down 50%. Ran multi-region deployments with cost optimisation.',
        },
        {
          icon: 'pipeline',
          heading: 'CI/CD & security pipelines',
          body: 'Built CI/CD pipelines in Jenkins, GitLab CI and GitHub Actions with dev/stage/prod environment parity, raising deployment frequency by 60%. Baked SAST, DAST and container scanning into the pipelines as security gates for the Node.js and Java Spring Boot services. Applied cloud security best practices throughout: secrets management, least-privilege IAM, and GDPR-compliant deployment across regions.',
        },
        {
          icon: 'observability',
          heading: 'Observability & AIOps',
          body: 'Built the monitoring and alerting stack with CloudWatch, Prometheus and Grafana, with structured logging, SLOs/SLIs, log-based anomaly detection and alerting, so we caught issues before they became incidents. Ran incident response and root-cause analysis on an on-call rotation. Hardened the platform with AWS WAF, load balancers and security groups, cutting scanning attacks by 95%.',
        },
        {
          icon: 'notification',
          heading: 'Centralized Notification Engine',
          body: 'Built a scalable, multichannel notification engine (push, email, SMS, in-app) over HTTP/REST, orchestrated with AWS Step Functions and backed by SQS, SNS, EventBridge and DynamoDB. Designed it as event-driven, horizontally scaled with partitioning, idempotent processing, dead-letter queues and failover, sustaining a 99.9% delivery rate through system failures.',
        },
        {
          icon: 'identity',
          heading: 'KYC Engine (built from scratch)',
          body: 'Designed and built the full KYC and onboarding flow in Python. Integrated Singpass (OAuth) and Digilocker for identity verification, built a liveliness-detection framework on Amazon Rekognition that analysed video in under 3 seconds, and added OCR (Textract) to automate data extraction. Tuned it for scale with Redis, bringing latency down from 15s to 1s and cutting manual errors by 70%, while handling PII and data-protection requirements.',
        },
        {
          icon: 'platform',
          heading: 'Platform Services',
          body: 'Built a set of reusable services the whole platform ran on: a rule engine for rule-based decisions, a scalable scheduler service, a serverless file uploader used by every app, a PDF service, and DLQ-based inter-service communication, with the infrastructure managed in Terraform. This automation reduced operational toil across the platform.',
        },
        {
          icon: 'frontend',
          heading: 'Frontend Platform',
          body: 'Built a modular frontend with a micro-frontend architecture and a shared design system (React, TypeScript, Atomic Design Systems), published as reusable NPM packages used across multiple applications.',
        },
        {
          icon: 'testing',
          heading: 'Automated Testing Framework',
          body: 'Built an automated testing framework (TypeScript, Puppeteer, Jest, Cypress) with unit, integration and load tests, wired into the CI/CD pipelines as quality gates in a peer-reviewed workflow, alongside thorough code reviews.',
        },
        {
          icon: 'agent',
          heading: 'Agent & MCP developer tooling',
          body: 'Built automation and internal tooling with AI-assisted agents (Python, Bash, Claude Code, MCP servers) that reduced repetitive engineering work and manual operations and improved reliability across systems.',
        },
      ],
      tags: [
        'AWS', 'Terraform', 'CloudFormation', 'Kubernetes', 'ECS', 'ECR', 'Docker', 'Auto-scaling', 'Multi-region',
        'CI/CD', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'SAST/DAST', 'Container Scanning', 'IAM', 'Secrets Management',
        'GDPR', 'CloudWatch', 'Prometheus', 'Grafana', 'Observability', 'Anomaly Detection', 'SLOs/SLIs',
        'Incident Response', 'RCA', 'On-call', 'AWS WAF', 'SQS', 'SNS', 'EventBridge', 'Step Functions', 'DynamoDB',
        'Event-Driven', 'Dead-Letter Queues', 'Python', 'Node.js', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Redis',
        'Microservices', 'OAuth2', 'OIDC', 'RBAC', 'Rekognition', 'Textract', 'OCR', 'KYC', 'PII Handling', 'React',
        'Micro-Frontends', 'Design Systems', 'NPM', 'Serverless', 'Puppeteer', 'Jest', 'Cypress', 'Code Reviews',
        'Claude Code', 'MCP', 'Mentoring',
      ],
    },
    {
      company: 'Sony India Software Centre',
      url: 'https://www.sonyindiasoftware.co.in/',
      urlLabel: 'sonyindiasoftware.co.in',
      logo: { src: '/logos/sony.png', dark: '/logos/sony-dark.png', aspect: 677 / 120, height: 19 },
      title: 'Software Engineer',
      start: 'Sep 2021',
      end: 'Sep 2022',
      location: 'Bengaluru, India',
      context: 'Direct-to-consumer commerce platform for Sony North America',
      intro:
        "My first role out of university, at a large MNC, working on the backend for Sony North America’s direct-to-consumer commerce platform. It served high retail traffic, so correctness and reliability mattered, and it’s where I got my grounding in production engineering at scale and in working across a distributed, international team.",
      details: [
        {
          icon: 'server',
          heading: 'Backend microservices',
          body: 'Built and operated backend microservices in Java and Spring Boot for the D2C commerce platform, serving high retail traffic on AWS.',
        },
        {
          icon: 'stack',
          heading: 'Across the stack',
          body: 'Worked across the stack with React (and Angular) on the frontend, connected through REST APIs and RESTful services.',
        },
        {
          icon: 'support',
          heading: 'Production & collaboration',
          body: 'Collaborated with product and engineering teams across US and India time zones, diagnosing and resolving production issues through root-cause analysis.',
        },
      ],
      tags: [
        'Java', 'Spring Boot', 'React', 'Angular', 'AWS', 'REST APIs', 'RESTful Services', 'Backend Microservices',
        'Production Support', 'Root-Cause Analysis', 'Cross-Functional', 'D2C Commerce',
      ],
    },
  ] satisfies Role[],

  projects: [
    {
      name: 'Parameter Superposition for Continual Reinforcement Learning',
      kind: { icon: 'research', label: 'MSc dissertation' },
      subtitle: 'Trinity College Dublin · supervised by Prof. Vinny Cahill',
      chips: [
        { icon: 'calendar', label: '2026', accent: true },
        { icon: 'game', label: 'Pong · Breakout · Space Invaders' },
        { icon: 'brain', label: 'PPO, PyTorch' },
      ],
      hook: 'AI agents that learn a new game forget the old one. I found out why, and how one network can keep two, then three.',
      intro:
        "Train a deep reinforcement learning agent on Pong, then on Breakout, and it forgets Pong almost completely. I tested parameter superposition, a method that gives each task its own key through shared weights, on pixel-based Atari, then traced where the forgetting actually comes from and mapped the trade-off between keeping old games and learning new ones.",
      media: [
        {
          src: '/projects/dissertation-forgetting-curve.webp',
          alt: 'Line chart of Pong score against training steps. All three agents learn Pong to a positive score by 2 million steps. When training switches to Breakout, the unprotected agent collapses to the worst score of −21, while the agents with a frozen shared trunk keep a positive score, the one with superposition keys highest.',
          width: 1422,
          height: 830,
          kind: 'chart',
          caption: 'Pong score as the agent moves on to Breakout at the dotted line. Unprotected (blue), it forgets Pong almost at once. With the shared trunk frozen, it keeps it, best with superposition keys (red). Three seeds each, from Figure 5.5.',
        },
      ],
      metrics: [
        { text: '+10.8 → −21', label: 'Pong score after learning Breakout, unprotected' },
        { text: '~3×', label: 'longer before forgetting with full superposition' },
        { text: '8.1 vs −5.4', label: 'Pong kept with keys vs without, on a slowed trunk' },
      ],
      detailsLabel: 'What I built & found',
      details: [
        {
          icon: 'server',
          heading: 'A durable multi-task PPO system',
          body: 'Python and PyTorch in four packages with one command-line entry point for every run. Each run records its exact configuration as JSON, checkpoints its complete state atomically, and resumes at the exact update it stopped, built for interruptible rented GPUs.',
        },
        {
          icon: 'tradeoff',
          heading: 'Superposition slows forgetting, but cannot stop it',
          body: 'The more of the network the keys cover, the longer the first game survives: gating the fully connected layers roughly doubled the time to collapse, gating the convolutions too roughly tripled it. But while the shared layers kept training, every variant still ended near the worst score.',
        },
        {
          icon: 'freeze',
          heading: 'Found where the forgetting lives',
          body: "Freezing the shared convolutional trunk at the task switch kept Pong in all six runs, even the ones with no keys. So the leak is the shared trunk drifting, not the keys failing.",
        },
        {
          icon: 'graph',
          heading: 'Mapped the stability vs plasticity trade-off',
          body: 'Freezing is not free: a trunk frozen after Breakout could learn almost no Pong. At one hundredth of the normal trunk learning rate, the keys keep Pong (8.1) where the same agent without keys does not (−5.4). It holds with the task order reversed and with a third game added.',
        },
        {
          icon: 'microscope',
          heading: 'Looked inside the network',
          body: "Representation similarity, linear probes, stitching and capacity measures showed the keys protect each game’s own way of reading the shared features rather than the information in them, and that running out of capacity is not the cause of forgetting here.",
        },
        {
          icon: 'target',
          heading: 'Rigour by design',
          body: 'Three seeds per central experiment with honest ranges, interpretation grids fixed before the data came in, and a staged diagnostic chain that caught three design faults from an earlier implementation.',
        },
      ],
      tags: ['Python', 'PyTorch', 'Reinforcement Learning', 'PPO', 'Continual Learning', 'Gymnasium', 'Atari (ALE)', 'Representation Analysis', 'Experiment Design'],
      links: [
        { label: 'Dissertation', href: '/docs/vinol-tauro-msc-dissertation.pdf', icon: 'paper' },
        // Repo returned 404 to anonymous visitors on 2026-11-26: make it public, then remove `pending`.
        { label: 'Code', href: 'https://github.com/vinoltauro/PSP-Atari', icon: 'github', pending: true },
      ],
    },
    {
      name: 'EliteCode',
      kind: { icon: 'team', label: 'Team project · CS7IS5' },
      subtitle: 'Adaptive interview-prep platform · Trinity College Dublin',
      chips: [
        { icon: 'calendar', label: '2026', accent: true },
        { icon: 'check', label: 'Built end to end by me', accent: true },
        { icon: 'team', label: 'Team of 5' },
      ],
      hook: 'LeetCode that learns you.',
      intro:
        "Interview-prep sites give everyone the same problem bank. EliteCode keeps a probabilistic model of each user’s mastery, updated on every submission, chat and confidence rating, and uses it to decide which problem comes next, how much a hint gives away, how feedback is worded and how the AI tutor talks to you. I built the whole platform for our team: frontend, backend, adaptive engine and deployment.",
      media: [
        { src: '/projects/elitecode-dashboard.webp', alt: 'The EliteCode dashboard: a Focus mode banner for an interview in under two weeks, prerequisite-gap alerts such as Trees before Depth-first Search, and a recommended problem', width: 1400, height: 635 },
        { src: '/projects/elitecode-tutor.webp', alt: 'The EliteCode editor with EliteBot: it explains a Python syntax error on line 19 and hints at a logic error without giving the answer', width: 1168, height: 820 },
      ],
      mediaLayout: 'stack',
      detailsLabel: 'How it works',
      details: [
        {
          icon: 'growth',
          heading: 'Bayesian Knowledge Tracing',
          body: 'Every submission updates a mastery estimate for each topic and difficulty. Passing with a hint, or solving unusually slowly, counts as weaker evidence.',
        },
        {
          icon: 'target',
          heading: 'Recommendations in the productive zone',
          body: 'The next problem is one you have a 50 to 80% chance of solving. Weak prerequisites redirect you to the foundation first, and topics are interleaved for better retention.',
        },
        {
          icon: 'chat',
          heading: 'EliteBot, a Socratic tutor',
          body: 'Streams over SSE through a Gemini, Claude Haiku and LLaMA fallback chain. It adapts to your mastery tier, never writes the solution, remembers recurring mistakes, and switches to step-by-step guidance when it detects you are stuck.',
        },
        {
          icon: 'repeat',
          heading: 'Cold start, decay and review',
          body: 'Onboarding answers set stereotype priors so day one is already personal. Idle skills decay along a forgetting curve, and solved problems return on a 1, 3, 7, 14 and 30-day schedule.',
        },
        {
          icon: 'stack',
          heading: 'Architecture',
          body: 'React 18 and TypeScript on Cloudflare Pages, FastAPI on a GCP VM behind Nginx, Supabase Postgres with row-level security and realtime updates, and a self-hosted Judge0 for sandboxed code execution.',
        },
        {
          icon: 'gauge',
          heading: 'Readiness score and an open model',
          body: 'Five signals roll up into one 0 to 100 interview-readiness score, and users can inspect, and reset, the model the system holds about them.',
        },
      ],
      tags: ['React', 'TypeScript', 'FastAPI', 'Python', 'Supabase', 'PostgreSQL', 'Judge0', 'LLMs', 'SSE', 'GCP', 'Nginx', 'Tailwind CSS'],
      links: [
        // Both returned 404 to anonymous visitors on 2026-11-26: make public, then remove `pending`.
        { label: 'Frontend', href: 'https://github.com/adaptive-app-tcd-26/elite-code-frontend', icon: 'github', pending: true },
        { label: 'Backend', href: 'https://github.com/adaptive-app-tcd-26/elite-code-backend', icon: 'github', pending: true },
      ],
    },
    {
      name: 'Job Apply',
      kind: { icon: 'agent', label: 'Personal tool' },
      subtitle: 'A self-hosted job-hunt platform for part-time roles in Dublin',
      chips: [
        { icon: 'check', label: 'Landed my current part-time job', accent: true },
        { icon: 'location', label: 'Dublin' },
        { icon: 'server', label: 'Self-hosted homelab' },
      ],
      hook: "I automated my own part-time job hunt. It’s how I landed my current job.",
      intro:
        'Scrapers pull part-time listings from job boards, supermarkets, retailers and big-brand career sites, filter them by commute and queue them in one dashboard. For each job, Gemini tailors a one-page CV from my real profile, rendered in LaTeX, plus a cover letter, and I can run the whole thing from my phone over Telegram.',
      media: [
        { src: '/projects/job-apply-telegram-start.webp', alt: "The Job Apply Telegram bot’s command menu: scrape job sources, list top jobs, generate a tailored CV, email or cover letter, and apply", width: 640, height: 958 },
        { src: '/projects/job-apply-telegram-jobs.webp', alt: 'The /jobs command in Telegram listing part-time roles with commute time, a link, and Save, Dismiss and Apply buttons', width: 640, height: 958 },
      ],
      detailsLabel: 'How it works',
      details: [
        {
          icon: 'stack',
          heading: 'Scrapers for 20+ sources',
          body: 'Indeed and IrishJobs, the big grocers, retailers on Greenhouse and SmartRecruiters, and proprietary career sites, all behind one registry: add a scraper once and it shows up in the API, the dashboard and Telegram.',
        },
        {
          icon: 'paper',
          heading: 'A CV engine that never invents',
          body: 'A strategy step picks what goes in using must, should and may rules per role type (retail, deli, hospitality, warehouse, office). Gemini tailors the wording to the job without adding anything not in my profile, retries until ATS keyword coverage passes, and LaTeX renders a clean one-page PDF.',
        },
        {
          icon: 'location',
          heading: 'Commute filter',
          body: 'Each listing is geocoded and timed from home with OpenRouteService, falling back to a straight-line estimate, so jobs that are too far away never reach the queue.',
        },
        {
          icon: 'chat',
          heading: 'AI cover letters and form answers',
          body: 'Gemini drafts a cover letter for each job and answers application-form questions, cached per job so nothing is generated twice.',
        },
        {
          icon: 'notification',
          heading: 'Runs from my phone',
          body: 'A Telegram bot to scrape, review, save, generate a CV or cover letter, and apply, alongside a React dashboard for jobs, CVs, applications, scrapers and settings.',
        },
        {
          icon: 'security',
          heading: 'Careful, human-paced applying',
          body: 'Automatic Easy Apply is off by default and, when on, runs on a dedicated account with a daily cap, a minimum time per form and honeypot checks before any field is touched. Everything else goes to a manual queue.',
        },
        {
          icon: 'server',
          heading: 'Runs on my homelab',
          body: 'FastAPI and the dashboard run in Docker Compose on my self-hosted homelab server, with Supabase Postgres for jobs and applications.',
        },
      ],
      tags: ['Python', 'FastAPI', 'Playwright', 'Gemini', 'LaTeX', 'React', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'Radix UI', 'Supabase', 'Docker', 'Homelab', 'Telegram Bot API'],
      links: [
        // Returned 404 to anonymous visitors on 2026-11-26: make public, then remove `pending`.
        { label: 'Code', href: 'https://github.com/vinoltauro/job-apply', icon: 'github', pending: true },
      ],
    },
    {
      name: '3D CAPTCHA vs AI',
      kind: { icon: 'security', label: 'Team project · CS7NS1' },
      subtitle: 'Scalable Computing · Trinity College Dublin',
      chips: [
        { icon: 'calendar', label: '2025', accent: true },
        { icon: 'team', label: 'Team of 4' },
        { icon: 'security', label: 'Bot detection' },
      ],
      hook: 'We built a CAPTCHA to stop AI, then built three bots to break it.',
      intro:
        "Five ray-traced 3D characters in a scene you rotate with the arrow keys: find the one that repeats. Behind it, mouse-behaviour analysis flags bots. Then we attacked our own design with a fingerprint-spoofing spam bot, a fine-tuned YOLO detector and a Gemini-powered active-vision agent.",
      metrics: [
        { text: '808 → 3 ms', label: 'P95 latency once views are pre-rendered' },
        { count: { to: 62, suffix: '%' }, label: 'more throughput from pre-rendering' },
        { text: '20/20', label: 'solved by YOLO with dense camera sweeps' },
        { text: '~30%', label: 'solved by the Gemini agent over 100 attacks' },
      ],
      detailsLabel: 'How it works',
      details: [
        {
          icon: 'security',
          heading: 'The CAPTCHA',
          body: 'POV-Ray renders five characters, one repeated, each with a random 3D position, rotation and colour. Users rotate the camera with the arrow keys, so it works fully from the keyboard.',
        },
        {
          icon: 'observability',
          heading: 'Bot detection from mouse behaviour',
          body: "Fitts' law throughput (40%), path efficiency (35%) and click dwell and drift (25%) score how human the movement is. Anomalies trigger IP and browser-fingerprint blocking.",
        },
        {
          icon: 'growth',
          heading: 'Scaling the renderer',
          body: 'Rendering is the bottleneck, so rendered angles are cached in memory, adjacent angles pre-render asynchronously, and production loads pre-rendered sets from disk: P95 latency fell from 808 ms to 3 ms and throughput rose 62%.',
        },
        {
          icon: 'agent',
          heading: 'Attacker 1: a fingerprint-spoofing spam bot',
          body: 'Selenium drivers with consistent randomised browser profiles, canvas, audio and navigator spoofs, injected WebGL overrides and TLS matching, plus human-like mouse paths. It passed the behaviour check, though guessing kept it near 0.4%.',
        },
        {
          icon: 'target',
          heading: 'Attacker 2: a fine-tuned YOLO11s',
          body: 'Reused the generator to render 250k labelled views by sweeping the camera, fine-tuned a 9.4M-parameter YOLO11s, and voted across views: 20/20 with 49 to 121 views, 82 to 100% depending on how many were fetched.',
        },
        {
          icon: 'brain',
          heading: 'Attacker 3: a Gemini active-vision agent',
          body: "Tilts to a bird’s-eye view, orbits the scene and screenshots each step. Feeding whole sequences to the model hallucinated, so counting moved to a deterministic temporal-gap tracker in Python: about 30% success over 100 attacks.",
        },
        {
          icon: 'server',
          heading: 'Edge to cloud on a Raspberry Pi',
          body: 'The Pi generates fingerprints and issues commands while a cloud server runs the spoofed headless Chrome over the DevTools Protocol and returns screenshots, a classic edge-cloud split.',
        },
      ],
      tags: ['Python', 'POV-Ray', 'Selenium', 'Ultralytics YOLO11', 'Gemini 2.0 Flash', 'Chrome DevTools Protocol', 'Browser Fingerprinting', 'Raspberry Pi', 'Load Testing'],
      links: [
        // Returned 404 to anonymous visitors on 2026-11-26: make public, then remove `pending`.
        { label: 'Code', href: 'https://github.com/fanyuanchen/3dcaptchav2', icon: 'github', pending: true },
      ],
    },
    {
      name: 'Techopoly',
      kind: { icon: 'game', label: 'Side project' },
      subtitle: 'Multiplayer Monopoly for friend groups that want drama',
      chips: [
        { icon: 'check', label: 'live · in use', accent: true },
        { icon: 'team', label: 'Up to 8 players' },
        { icon: 'network', label: 'Zero backend' },
      ],
      hook: 'No installs, no accounts, no backend. Every player’s browser is the network.',
      intro:
        "A multiplayer Monopoly I built with my uni friends so we could play with our own house rules. Share a link and play: the host’s browser runs the game and syncs everyone peer to peer over WebRTC, so no game data ever touches a server. Then chaos mode makes it properly unhinged. Built for the fun of it, and people actually play it.",
      media: [
        { src: '/projects/techopoly-board.webp', alt: 'The Techopoly game board, a Monopoly board of tech companies such as AWS, OpenAI, NVIDIA and Spotify, with a Roll Dice button in the centre', width: 1100, height: 1100 },
        { src: '/projects/techopoly-home.webp', alt: "Techopoly’s home screen: multiplayer monopoly for people who ship things, with Host a Game and Join with Code buttons", width: 1100, height: 999 },
      ],
      detailsLabel: 'How it works',
      details: [
        {
          icon: 'network',
          heading: 'Peer to peer, zero backend',
          body: "WebRTC through PeerJS. Guests send actions to the host, the host’s tab applies them and broadcasts the new state to every peer. Host migration covers a disconnecting admin, and reloading the host tab restores the game from sessionStorage.",
        },
        {
          icon: 'code',
          heading: 'A pure game engine',
          body: 'One synchronous, pure applyAction function is the only way state changes: buying, building, mortgaging, trading, auctions and bankruptcy. A turn state machine keeps every handler honest, and feature flags freeze when the game starts.',
        },
        {
          icon: 'chaos',
          heading: 'Chaos mode',
          body: '40+ events drawn from a shuffled deck: bulldozed colour groups, richest and poorest swapping wallets, eminent domain, teleport madness. Cadence scales with player count, and going quiet for two minutes gets you jailed.',
        },
        {
          icon: 'coins',
          heading: 'A commits economy',
          body: 'Players earn and lose commits for streaks, hotels, jail and rent, and milestones unlock perks like blessed dice, a bigger GO salary and cheaper builds.',
        },
        {
          icon: 'alliance',
          heading: 'Social systems',
          body: 'Alliances with friendship points (and betrayal), sealed and open-bid auctions on a timer, two-player trades, a 51% vote kick, and a lobby you can peek into before joining.',
        },
        {
          icon: 'sound',
          heading: 'Sound with no audio files',
          body: 'Every sound is synthesised live with the Web Audio API, and Framer Motion handles token movement and the modal pops.',
        },
      ],
      tags: ['Next.js 14', 'TypeScript', 'WebRTC', 'PeerJS', 'Zustand', 'Tailwind CSS', 'DaisyUI', 'Framer Motion', 'Web Audio API', 'Vercel'],
      links: [
        { label: 'Play', href: 'https://monopoly-jet.vercel.app', icon: 'external' },
        // Returned 404 to anonymous visitors on 2026-11-26: make public, then remove `pending`.
        { label: 'Code', href: 'https://github.com/AjinkyaTaranekar/monopoly', icon: 'github', pending: true },
      ],
    },
  ] satisfies Project[],

  skills: [
    { icon: 'code', label: 'Languages', items: ['Python', 'Go', 'Bash', 'Java', 'Node.js', 'SQL'] },
    {
      icon: 'cloud',
      label: 'Cloud',
      items: ['AWS', 'EC2', 'S3', 'Lambda', 'ECS', 'ECR', 'CloudWatch', 'SQS', 'SNS', 'Step Functions', 'WAF', 'GCP', 'Multi-region', 'Cost optimisation'],
    },
    {
      icon: 'pipeline',
      label: 'IaC & CI/CD',
      items: ['Terraform', 'CloudFormation', 'Kubernetes', 'Docker', 'Auto-scaling', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'SAST/DAST', 'Container scanning'],
    },
    {
      icon: 'observability',
      label: 'SRE & Observability',
      items: ['Monitoring & alerting', 'CloudWatch', 'Prometheus', 'Grafana', 'Anomaly detection', 'AIOps', 'SLOs/SLIs', 'Incident response', 'Post-incident reviews', 'Root-cause analysis', 'On-call', 'Toil reduction', 'Uptime & reliability'],
    },
    {
      icon: 'ai',
      label: 'AI for Operations',
      items: ['ML & anomaly-based alerting', 'LLM-assisted ops tooling', 'Claude Code', 'MCP', 'Automated triage', 'Deep learning (PyTorch)'],
    },
    { icon: 'backend', label: 'Backend', items: ['Node', 'Express', 'FastAPI', 'Spring Boot', 'REST', 'WebSockets', 'SSE', 'Event-driven'] },
    { icon: 'database', label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis', 'Elasticsearch'] },
    { icon: 'browser', label: 'Frontend', items: ['React', 'Angular', 'Next.js', 'React Native', 'Micro-Frontends', 'NPM packaging'] },
    {
      icon: 'network',
      label: 'Networking & APIs',
      items: ['HTTP', 'DNS', 'TCP/IP', 'Load balancing', 'REST/microservice architecture', 'API design'],
    },
    { icon: 'security', label: 'Security', items: ['AWS WAF', 'Security groups', 'Secrets management', 'Least-privilege IAM', 'SAST/DAST'] },
  ] satisfies SkillRow[],

  /** Shown at the end of Education. */
  achievements: [
    { icon: 'award', value: '3,409 / 136,054', label: 'TCS CodeVita Season 9, top 2.5%' },
    { icon: 'code', value: '4,409 / 12,000+', label: 'Google Kick Start 2021, Round E' },
    { icon: 'team', value: 'TA', label: 'Data Structures & Algorithms, Coding Ninjas' },
  ] satisfies Achievement[],

  education: [
    {
      school: 'Trinity College Dublin',
      url: 'https://www.tcd.ie/',
      urlLabel: 'tcd.ie',
      logo: { src: '/logos/tcd.png', dark: '/logos/tcd-dark.png', aspect: 707 / 120, height: 34 },
      degree: 'MSc Computer Science',
      start: '2025',
      end: '2026',
      location: 'Dublin, Ireland',
      highlights: ['Graduated with Distinction'],
      // Picked for relevance to software / platform / AI roles. Also taken: Adaptive Applications,
      // Urban Computing, Research and Innovation Methods, Dissertation.
      coursework: [
        'Advanced Software Engineering',
        'Scalable Computing',
        'Distributed Systems',
        'Machine Learning',
        'Artificial Intelligence',
        'Security & Privacy',
        'Information Retrieval and Web Search',
        'Internet of Things',
      ],
    },
    {
      school: 'NMAM Institute of Technology',
      url: 'https://nitte.edu.in/nmamit/',
      urlLabel: 'nitte.edu.in/nmamit',
      logo: { src: '/logos/nmamit.png', dark: '/logos/nmamit-dark.png', aspect: 973 / 120, height: 25 },
      degree: 'BE Electronics & Communication',
      start: '2017',
      end: '2021',
      location: 'Nitte, India',
      highlights: ['CGPA 8.67'],
      intro: 'Competitive programming on Codeforces and CodeChef.',
      coursework: [
        'Computer Communication Networks',
        'Database Management Systems',
        'Computer Concepts & C Programming',
        'Object-Oriented Programming (Java, C++)',
        'Graph Theory',
        'Microprocessors & Microcontrollers',
      ],
    },
  ] satisfies Education[],

  /** Photography: a pinned horizontal filmstrip in the Outside of work section. Labels are drafts. */
  photography: {
    title: 'I photograph Dublin',
    body: "Somewhere between meals, I’m usually out with my camera (okay, my phone): Trinity’s campanile, the cliffs at Howth, a pink sky over College Green.",
    photos: [
      { src: '/dublin/campanile.webp', width: 450, height: 1000, label: 'The Campanile, Trinity', alt: "Trinity College’s Campanile bell tower against a deep blue sky" },
      { src: '/dublin/howth-head.webp', width: 562, height: 1000, label: 'Howth Head', alt: 'The Baily Lighthouse on Howth Head above a blue sea, with yellow gorse in the foreground' },
      { src: '/dublin/pink-sky.webp', width: 450, height: 1000, label: 'Pink sky, College Green', alt: 'A blazing pink and orange sunset over College Green, with a crane, bare trees and a double-decker bus' },
      { src: '/dublin/cliff-walk.webp', width: 563, height: 1000, label: 'Cliff walk', alt: 'A person sitting on a grassy clifftop looking out over glittering sea' },
      { src: '/dublin/stillorgan.webp', width: 450, height: 1000, label: 'Stillorgan', alt: 'Looking up at a dark glass apartment tower in Stillorgan against a deep blue sky' },
      { src: '/dublin/cobbled-lane.webp', width: 450, height: 1000, label: 'Cobbled lane', alt: 'A cobbled Dublin lane lined with red-brick buildings under a cloudy sky' },
      { src: '/dublin/dun-laoghaire.webp', width: 450, height: 1000, label: 'Dún Laoghaire', alt: 'The Dún Laoghaire seafront: a lawn, benches by a stone wall and colourful terraced houses under a cloudy sky' },
      { src: '/dublin/cliff-path.webp', width: 562, height: 1000, label: 'Cliff path', alt: 'A sticker-covered warning sign on a clifftop path above the sea, lit by low sun against a blue sky' },
      { src: '/dublin/georgian-stone.webp', width: 450, height: 1000, label: 'Georgian stone', alt: 'Looking up at the corner of a grey Georgian stone building against a bright blue sky' },
      { src: '/dublin/christmas-market.webp', width: 563, height: 1000, label: 'Christmas market', alt: 'A lit Christmas tree and a colourful funfair stall at a night-time Christmas market' },
      { src: '/dublin/brick-and-granite.webp', width: 450, height: 1000, label: 'Brick & granite', alt: 'Grey granite and red-brick facades side by side, seen from below' },
    ],
  },

  /** Opening line of Outside of work, in my own words. */
  lifeIntro:
    "Dublin has been kind to me. These days I work part-time as a customer assistant at Holland & Barrett while I look for my next engineering role. Outside of that, you’ll find me playing guitar, reading, eating my way around the world’s cuisines, or out photographing Dublin.",

  life: [
    {
      icon: 'music',
      title: 'I play classical guitar',
      body: "I’m a trained classical guitarist, and I’ve always loved to build and create: composing music, writing code, anything that lets the creative energy out. It’s the same itch that got me into engineering in the first place.",
      sketch: 'guitar',
      joke: 'Me, tuning for 20 minutes to play for two.',
    },
    {
      icon: 'books',
      title: 'I read philosophy… well, sometimes',
      body: 'Mostly the absurdists. They keep me honest: no guarantees, keep pushing the boulder anyway, and find the fun in it.',
      quote: { text: 'One must imagine Sisyphus happy.', by: 'Albert Camus' },
      sketch: 'sisyphus',
      joke: 'Me, job hunting. Happily.',
    },
  ] satisfies Interest[],

  /** Eating out, rendered as a food passport: cuisine stamps plus a row of polaroids. */
  eatingOut: {
    title: 'I eat my way around the world',
    body: "I love trying cuisines from around the world, and the goal is simple: eat them all. My tour started in Dublin with a Centra chicken fillet roll, as all good Irish stories do, and hasn’t slowed down since: jollof, pulpo, eels, a bowl of Liao Za Lie, and far more than fit on this page. A few favourites:",
    cuisines: [
      // lon/lat: where the globe turns to. Order must match scripts/build-globe.mjs.
      { name: 'Irish', flag: 'IE', lon: -7.6, lat: 53.2 },
      { name: 'Spanish', flag: 'ES', lon: -3.7, lat: 40.2 },
      { name: 'Nigerian', flag: 'NG', lon: 8.1, lat: 9.6 },
      { name: 'Somali', flag: 'SO', lon: 46.2, lat: 6.1 },
      { name: 'Chinese', flag: 'CN', lon: 104.2, lat: 35.9 },
      { name: 'Mongolian', flag: 'MN', lon: 103.8, lat: 46.9 },
      { name: 'Japanese', flag: 'JP', lon: 138.3, lat: 36.2 },
    ] as Array<{ name: string; flag: FlagCode; lon: number; lat: number }>,
    photos: [
      { src: '/eat/chicken-fillet-roll.webp', width: 640, height: 800, label: 'Chicken fillet roll', flag: 'IE' as FlagCode, tag: 'Irish · Centra', alt: 'A chicken fillet roll cut open, stuffed with breaded chicken, coleslaw and cheese, in a compostable wrapper' },
      { src: '/eat/pulpo.webp', width: 640, height: 800, label: 'Pulpo a la gallega', flag: 'ES' as FlagCode, tag: 'Spanish', alt: 'Slices of grilled octopus on potatoes dusted with paprika, on a Spanish restaurant menu' },
      { src: '/eat/rice-plate.webp', width: 640, height: 800, label: 'Jollof rice', flag: 'NG' as FlagCode, tag: 'Nigerian', alt: 'Jollof rice with chicken, pickled red onion and cucumber, eaten outdoors on the grass' },
      { src: '/eat/scallop-gratin.webp', width: 640, height: 800, label: 'Gratin of scallops', tag: 'In the shell', alt: 'A golden gratin of scallops served in the shell, topped with herbs' },
      { src: '/eat/paella.webp', width: 640, height: 800, label: 'Seafood paella', flag: 'ES' as FlagCode, tag: 'Spanish', alt: 'Seafood paella in a cast-iron pan with prawns, squid, mussels and a lemon wedge' },
      { src: '/eat/liao-za-lie.webp', width: 640, height: 800, label: 'Liao Za Lie', flag: 'CN' as FlagCode, tag: 'Chinese', alt: 'A bowl of spicy red noodle soup topped with spring onion and radish' },
      { src: '/eat/eels.webp', width: 640, height: 800, label: 'Eels al ajillo', flag: 'ES' as FlagCode, tag: 'Spanish', alt: 'Baby eels in sizzling garlic oil with chilli, in a terracotta dish' },
      { src: '/eat/dumplings.webp', width: 640, height: 800, label: 'Chilli oil dumplings', tag: 'Street food', alt: 'Dumplings in chilli oil with sesame seeds, coriander and spring onion on pink paper' },
      { src: '/eat/bao.webp', width: 640, height: 800, label: 'Fried chicken bao', tag: 'Street food', alt: 'A fried chicken bao with spring onion on a skewer, on a pink paper plate' },
      { src: '/eat/garlic-prawns.webp', width: 640, height: 800, label: 'Garlic prawns', tag: 'With brown bread', alt: 'Garlic prawns in a cast-iron dish with a slice of brown bread' },
      { src: '/eat/chowder.webp', width: 640, height: 800, label: 'Seafood chowder', tag: 'With brown bread', alt: 'A bowl of seafood chowder with a spoon and brown bread' },
    ],
  },

  contact: {
    heading: 'Help my Job Apply bot retire.',
    /** One line under the heading: open to roles and to building together, no titles. */
    note: 'Open to SRE, DevOps, cloud and full-stack roles, and always happy to build something with good people. If you’re working on something interesting, I’d love to hear about it.',
    email: 'vinoltauro99@gmail.com',
    github: 'https://github.com/vinoltauro',
    linkedin: 'https://linkedin.com/in/vinoltauro',
    /** CV PDF in /public. Shown in the hero, the top bar and Contact. */
    cv: '/vinol-tauro-cv.pdf',
  },

  footer: { left: 'Vinol Tauro · Dublin, Ireland', right: 'built, not generated' },
}

/** Section headers for the non-chapter sections, in scroll order. */
export const sections = {
  how: { id: 'how', num: '01–03', eyebrow: 'the three words', title: 'How I work' },
  companies: { id: 'companies', num: '04', eyebrow: "where I’ve built", title: 'Companies' },
  projects: { id: 'projects', num: '05', eyebrow: "what I’ve built", title: 'Projects' },
  skills: { id: 'skills', num: '06', eyebrow: 'the toolkit', title: 'Skills' },
  education: { id: 'education', num: '07', eyebrow: 'education', title: 'Education' },
  life: { id: 'life', num: '08', eyebrow: 'off the clock', title: 'Outside of work' },
  contact: { id: 'contact', num: '09', eyebrow: "let’s talk", title: site.contact.heading },
} as const

/** Every beat of the argument, in order. Drives the progress spine. */
export const beats = ['hero', ...Object.values(sections).map((s) => s.id)]

/** Labels for the clickable progress line, in the same order as `beats`. */
export const beatLabels: Record<string, { num: string; label: string }> = {
  hero: { num: '00', label: 'Intro' },
  how: { num: sections.how.num, label: 'How I work' },
  companies: { num: sections.companies.num, label: 'Companies' },
  projects: { num: sections.projects.num, label: 'Projects' },
  skills: { num: sections.skills.num, label: 'Skills' },
  education: { num: sections.education.num, label: 'Education' },
  life: { num: sections.life.num, label: 'Outside of work' },
  contact: { num: sections.contact.num, label: 'Contact' },
}

/** Short names for the Projects jump bar, by project name. */
export const projectShortNames: Record<string, string> = {
  'Parameter Superposition for Continual Reinforcement Learning': 'Dissertation',
  EliteCode: 'EliteCode',
  'Job Apply': 'Job Apply',
  '3D CAPTCHA vs AI': '3D CAPTCHA',
  Techopoly: 'Techopoly',
}

/** Stable anchor id for a project card. */
export const projectAnchor = (name: string) =>
  'project-' + (projectShortNames[name] ?? name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

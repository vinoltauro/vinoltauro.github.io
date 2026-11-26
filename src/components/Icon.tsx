import { iconPaths } from './icon-paths'

/**
 * The site's icon vocabulary: one family (Phosphor, regular weight), named by meaning rather than
 * by shape, so the same idea always gets the same icon everywhere. Content refers to these names.
 * Values are Phosphor component names; scripts/build-icons.mjs turns them into icon-paths.ts, so
 * only the drawings we use ship (not every icon in all six weights).
 */
const icons = {
  // brands & contact
  github: 'GithubLogo',
  linkedin: 'LinkedinLogo',
  email: 'EnvelopeSimple',
  cv: 'ReadCvLogo',
  // ui
  external: 'ArrowUpRight',
  down: 'ArrowDown',
  caret: 'CaretDown',
  sun: 'Sun',
  moon: 'Moon',
  copy: 'Copy',
  check: 'Check',
  clock: 'Clock',
  // facts
  calendar: 'CalendarBlank',
  duration: 'Hourglass',
  location: 'MapPin',
  award: 'Medal',
  experience: 'Briefcase',
  growth: 'ChartLineUp',
  company: 'Buildings',
  degree: 'GraduationCap',
  // work areas
  cloud: 'Cloud',
  pipeline: 'GitBranch',
  observability: 'Pulse',
  notification: 'BellRinging',
  identity: 'IdentificationCard',
  platform: 'SquaresFour',
  frontend: 'Layout',
  testing: 'TestTube',
  agent: 'Robot',
  server: 'HardDrives',
  stack: 'Stack',
  support: 'Lifebuoy',
  // skills
  ai: 'Sparkle',
  code: 'Code',
  browser: 'Browser',
  backend: 'TreeStructure',
  database: 'Database',
  // projects & research
  research: 'Flask',
  team: 'UsersThree',
  game: 'GameController',
  brain: 'Brain',
  chat: 'ChatCircleDots',
  target: 'Target',
  gauge: 'Gauge',
  graph: 'Graph',
  freeze: 'Snowflake',
  tradeoff: 'Scales',
  inspect: 'Eye',
  repeat: 'ArrowsClockwise',
  paper: 'FilePdf',
  microscope: 'Microscope',
  security: 'ShieldCheck',
  network: 'ShareNetwork',
  dice: 'DiceFive',
  chaos: 'Lightning',
  coins: 'Coins',
  sound: 'SpeakerHigh',
  alliance: 'Handshake',
  // life
  guitar: 'Guitar',
  books: 'Books',
  gym: 'Barbell',
  cooking: 'CookingPot',
  camera: 'Camera',
  expand: 'ArrowsOutSimple',
  music: 'MusicNotes',
  food: 'ForkKnife',
} as const

export type IconName = keyof typeof icons

type Props = {
  name: IconName
  /** Defaults to 1.15em so icons scale with the text they sit beside. */
  size?: number | string
  className?: string
}

/** Decorative by design: every icon sits next to text that already says what it means. */
export function Icon({ name, size = '1.15em', className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      className={className ? `icon ${className}` : 'icon'}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: iconPaths[name] }}
    />
  )
}

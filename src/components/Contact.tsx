import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import { Icon, type IconName } from './Icon'
import { Reveal } from './Reveal'

const { contact } = site

function CopyEmail() {
  const addrRef = useRef<HTMLSpanElement>(null)
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const flash = () => {
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1400)
  }

  // Fallback: select the address so the user can copy it themselves.
  const selectAddress = () => {
    const el = addrRef.current
    const sel = window.getSelection()
    if (!el || !sel) return
    const range = document.createRange()
    range.selectNodeContents(el)
    sel.removeAllRanges()
    sel.addRange(range)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      flash()
    } catch {
      selectAddress()
    }
  }

  return (
    <div className="mailbox">
      <a className="mail-addr" href={`mailto:${contact.email}`}>
        <span ref={addrRef}>{contact.email}</span>
      </a>
      <button type="button" className={copied ? 'copy is-copied' : 'copy'} onClick={copy}>
        <Icon name={copied ? 'check' : 'copy'} />
        <span aria-hidden="true">{copied ? 'copied' : 'copy'}</span>
        <span className="sr-only">Copy email address</span>
      </button>
      <span className="sr-only" role="status">
        {copied ? 'Email address copied' : ''}
      </span>
    </div>
  )
}

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

/** Live local time in Dublin, so people abroad know when I'm likely to reply. Client-only. */
function DublinTime() {
  const [now, setNow] = useState<string | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Dublin' })
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <p className="contact-meta">
      <span>
        <Icon name="location" />
        {site.location}
      </span>
      {now && (
        <span>
          <Icon name="clock" />
          {now} local time
        </span>
      )}
    </p>
  )
}

export function Contact() {
  const links: Array<{ label: string; href: string; icon: IconName; primary?: boolean }> = [
    { label: 'GitHub', href: contact.github, icon: 'github', primary: true },
    { label: 'LinkedIn', href: contact.linkedin, icon: 'linkedin' },
    ...(contact.cv ? [{ label: 'CV', href: contact.cv, icon: 'cv' as const }] : []),
  ]
  return (
    <>
      <Reveal>
        <CopyEmail />
      </Reveal>
      <Reveal delay={100} className="buttons">
        {links.map((l) => (
          <a key={l.label} className={l.primary ? 'btn btn-primary' : 'btn'} href={l.href} {...external}>
            <Icon name={l.icon} />
            {l.label}
            <Icon name="external" className="btn-ext" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </Reveal>
      <Reveal delay={180}>
        <DublinTime />
      </Reveal>
    </>
  )
}

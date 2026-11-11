import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Mail, Phone, ArrowUp } from 'lucide-react'
import { profile, nav, YEAR } from '../data'
import { Magnetic, SplitText, Reveal, GithubIcon, LinkedinIcon, EASE } from './ui'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <button onClick={copy} className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-lime/50 hover:text-lime transition-colors" aria-label="Copy email address">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.25 }}>
          {copied ? <Check className="h-4 w-4 text-lime" /> : <Copy className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">{copied ? 'Copied' : ''}</span>
    </button>
  )
}

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, Icon: Phone },
  { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, Icon: LinkedinIcon, ext: true },
  { label: 'GitHub', value: profile.githubLabel, href: profile.github, Icon: GithubIcon, ext: true },
]

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/70 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute flex items-center gap-3">
            <span className="text-lime">08</span><span className="h-px w-8 bg-line" />Contact
          </p>
        </Reveal>

        <h2 className="mt-8 font-serif text-[15vw] md:text-[9rem] leading-[0.88] tracking-tight">
          <SplitText text="Let’s build" />
          <br />
          <SplitText text="something that" delay={0.1} />
          <SplitText text="ships." delay={0.25} className="italic text-lime" />
        </h2>

        <div className="mt-14 flex flex-wrap items-center gap-5">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex h-40 w-40 md:h-48 md:w-48 items-center justify-center overflow-hidden rounded-full bg-lime text-ink font-semibold text-lg"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-cream transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100" />
              <span className="relative flex flex-col items-center gap-1">
                <ArrowUpRight className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45" />
                Say hello
              </span>
            </a>
          </Magnetic>
          <div className="flex items-center gap-3">
            <a href={`mailto:${profile.email}`} className="text-xl md:text-3xl font-serif underline decoration-line underline-offset-8 hover:decoration-lime transition-colors break-all">
              {profile.email}
            </a>
            <CopyEmail />
          </div>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line">
          {links.map(({ label, value, href, Icon, ext }, i) => (
            <motion.a
              key={label}
              href={href}
              target={ext ? '_blank' : undefined}
              rel={ext ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group relative flex items-center justify-between gap-4 border-b border-line py-6 sm:px-4 overflow-hidden"
            >
              <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-cream/[0.04] transition-transform duration-500 group-hover:scale-y-100" />
              <span className="relative flex items-center gap-4 min-w-0">
                <Icon className="h-4 w-4 shrink-0 text-lime" />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{label}</span>
                  <span className="block truncate text-sm">{value}</span>
                </span>
              </span>
              <ArrowUpRight className="relative h-4 w-4 shrink-0 text-mute transition-all duration-500 group-hover:rotate-45 group-hover:text-lime" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <a href="#top" className="font-serif text-3xl">Shamna<span className="italic text-lime">.</span></a>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute" aria-label="Footer">
          {nav.map((n) => <a key={n.id} href={`#${n.id}`} className="hover:text-cream transition-colors">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-4 text-sm text-mute">
          <span>© {YEAR} {profile.name}</span>
          <a href="#top" aria-label="Back to top" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-lime hover:text-ink hover:border-lime transition-colors">
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="overflow-hidden">
        <p className="font-serif text-[26vw] leading-[0.75] tracking-tighter text-center text-outline select-none translate-y-[18%]">Shamna K</p>
      </div>
    </footer>
  )
}

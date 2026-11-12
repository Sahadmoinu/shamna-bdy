import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  ClipboardList, Code2, Network, BrainCircuit, Search, FileText, Workflow, Users, Rocket,
  Trophy, Mic, GraduationCap, Handshake, Medal,
} from 'lucide-react'

export const EASE = [0.22, 1, 0.36, 1]

export const icons = {
  ClipboardList, Code2, Network, BrainCircuit, Search, FileText, Workflow, Users, Rocket,
  Trophy, Mic, GraduationCap, Handshake, Medal,
}

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

/* Splits a line into words that slide up from a mask */
export function SplitText({ text, className = '', delay = 0, stagger = 0.06 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SectionHeading({ index, eyebrow, title, accent, children }) {
  return (
    <div className="mb-14 md:mb-20 max-w-3xl">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute flex items-center gap-3">
          <span className="text-lime">{index}</span>
          <span className="h-px w-8 bg-line" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="mt-5 font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight">
        <SplitText text={title} />
        {accent && <SplitText text={accent} className="italic text-lime" delay={0.15} />}
      </h2>
      {children && (
        <Reveal delay={0.2}>
          <p className="mt-6 text-mute text-lg leading-relaxed max-w-2xl">{children}</p>
        </Reveal>
      )}
    </div>
  )
}

/* Element that drifts toward the pointer while hovered */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.2 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

/* Sets --mx/--my on a .spotlight element */
export function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Chip({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line bg-cream/[0.03] px-3 py-1 text-xs text-cream/80 ${className}`}>
      {children}
    </span>
  )
}

export function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

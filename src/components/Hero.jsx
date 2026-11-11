import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin, Trophy, Globe } from 'lucide-react'
import { profile } from '../data'
import { EASE, Magnetic, GithubIcon, LinkedinIcon } from './ui'

function RoleRotator({ roles }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles.length])
  return (
    <span className="relative inline-grid h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="col-start-1 row-start-1 italic text-lime whitespace-nowrap"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Letters({ text, delay = 0, className = '' }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.08em] ${className}`} aria-hidden="true">
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '105%', rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
        >
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </span>
  )
}

function FloatCard({ children, className, delay, floatY = 10, duration = 5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -floatY, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-2xl border border-line bg-ink/75 backdrop-blur-xl px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function Portrait() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 })
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 })
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { mx.set(0); my.set(0) }

  return (
    <div className="relative mx-auto w-full max-w-[420px] [perspective:1200px]" onPointerMove={onMove} onPointerLeave={reset} ref={ref}>
      {/* rotating ring text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 1 }}
        className="absolute -left-10 -top-10 z-30 hidden sm:block"
      >
        <div className="relative h-32 w-32 grid place-items-center rounded-full bg-lime text-ink">
          <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
            <defs>
              <path id="ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
            </defs>
            <text className="font-mono" fontSize="8" fill="currentColor">
              <textPath href="#ring" textLength="230" lengthAdjust="spacing">OPEN TO OPPORTUNITIES • LET’S CONNECT •</textPath>
            </text>
          </svg>
          <ArrowUpRight className="h-7 w-7" />
        </div>
      </motion.div>

      <motion.div
        style={{ rotateX: rotX, rotateY: rotY }}
        initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 32px 32px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 32px 32px)' }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
        className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[32px] border border-line bg-forest"
      >
        <motion.img
          src={profile.photo}
          alt="Portrait of Shamna K standing in front of palm leaves"
          style={{ x: imgX, y: imgY }}
          initial={{ scale: 1.35 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 2, ease: EASE, delay: 0.35 }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </motion.div>

      <FloatCard className="-right-4 sm:-right-10 top-[18%]" delay={1.2} floatY={8} duration={4.5}>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime/15 text-lime"><Trophy className="h-4 w-4" /></span>
          <div>
            <p className="text-sm font-semibold leading-tight">GATE 2025</p>
            <p className="text-[11px] text-mute">Qualified · CS/IT</p>
          </div>
        </div>
      </FloatCard>

      <FloatCard className="-left-4 sm:-left-12 bottom-[14%]" delay={1.4} floatY={12} duration={5.5}>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-sand/15 text-sand"><Globe className="h-4 w-4" /></span>
          <div>
            <p className="text-sm font-semibold leading-tight">International clients</p>
            <p className="text-[11px] text-mute">Peru · South Africa</p>
          </div>
        </div>
      </FloatCard>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative min-h-svh overflow-hidden pt-28 md:pt-32 pb-16">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-forest/60 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-lime/10 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-sand/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(239_233_223/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(239_233_223/0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-[1.25fr_1fr] gap-16 lg:gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-line bg-cream/[0.03] pl-2 pr-4 py-1.5 text-xs text-cream/80"
          >
            <span className="h-2 w-2 rounded-full bg-lime animate-pulse-dot ml-1" />
            Currently at {profile.company}
          </motion.div>

          <h1 className="mt-8 font-serif leading-[0.86] tracking-tight text-[18.5vw] sm:text-[15vw] lg:text-[10.5rem] whitespace-nowrap">
            <span className="sr-only">{profile.name}, {profile.roles.join(', ')}</span>
            <Letters text="Shamna" delay={0.2} />
            <Letters text="K." delay={0.5} className="italic text-outline ml-[0.15em]" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
            className="mt-6 font-serif text-3xl md:text-5xl leading-tight"
            aria-hidden="true"
          >
            <RoleRotator roles={profile.roles} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
            className="mt-6 max-w-xl text-lg text-mute leading-relaxed"
          >
            I turn business requirements into clear documentation, well-scoped sprints and software that ships, for international clients from{' '}
            <span className="text-cream">Peru to South Africa</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#projects" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-lime px-7 py-4 font-semibold text-ink">
                <span className="absolute inset-0 translate-y-full bg-cream transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                <span className="relative">View my work</span>
                <ArrowUpRight className="relative h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 font-medium hover:border-cream/40 transition-colors">
                Get in touch
              </a>
            </Magnetic>
            <div className="flex items-center gap-2 ml-1">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-12 w-12 place-items-center rounded-full border border-line text-cream/70 hover:text-lime hover:border-lime/50 transition-colors">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-12 w-12 place-items-center rounded-full border border-line text-cream/70 hover:text-lime hover:border-lime/50 transition-colors">
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-mute"
          >
            <MapPin className="h-3.5 w-3.5 text-lime" /> {profile.location}
          </motion.p>
        </div>

        <Portrait />
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mute"
        aria-label="Scroll to About"
      >
        Scroll
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}

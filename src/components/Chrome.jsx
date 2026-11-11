import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { nav, profile, YEAR } from '../data'
import { EASE, Magnetic } from './ui'

/* ---------- Preloader ---------- */
export function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { onDone(); return }
    let n = 0
    const id = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9))
      setCount(n)
      if (n >= 100) { clearInterval(id); setTimeout(onDone, 350) }
    }, 45)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex flex-col justify-between p-6 md:p-10"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-mute flex justify-between">
        <span>Portfolio</span>
        <span>©{YEAR}</span>
      </div>
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-serif text-[18vw] md:text-[12vw] leading-none tracking-tight"
        >
          Shamna<span className="italic text-lime">.</span>
        </motion.h1>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 bg-line relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-lime transition-[width] duration-100" style={{ width: `${count}%` }} />
        </div>
        <span className="font-mono text-sm tabular-nums w-12 text-right">{count}%</span>
      </div>
    </motion.div>
  )
}

/* ---------- Custom cursor ---------- */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 250, damping: 25, mass: 0.4 })
  const ry = useSpring(y, { stiffness: 250, damping: 25, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return
    setEnabled(true)
    document.body.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      setHover(!!e.target.closest('a, button, [data-cursor]'))
    }
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', d)
    window.addEventListener('pointerup', u)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', d)
      window.removeEventListener('pointerup', u)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-lime"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-lime/60 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hover ? 64 : 34,
          height: hover ? 64 : 34,
          backgroundColor: hover ? 'rgba(201,226,101,0.9)' : 'rgba(201,226,101,0)',
          scale: down ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  )
}

/* ---------- Scroll progress ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-lime origin-left z-[70]" style={{ scaleX }} />
}

/* ---------- Navigation ---------- */
function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export function Nav() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-50 px-4 md:px-8 pt-4"
      >
        <div
          className={`mx-auto max-w-7xl flex items-center justify-between rounded-full border transition-all duration-500 pl-5 pr-2 py-2 ${
            scrolled ? 'border-line bg-ink/70 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]' : 'border-transparent'
          }`}
        >
          <a href="#top" className="font-serif text-2xl tracking-tight" aria-label="Back to top">
            Shamna<span className="italic text-lime">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors ${active === n.id ? 'text-ink' : 'text-cream/70 hover:text-cream'}`}
              >
                {active === n.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-lime" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:bg-cream hover:text-ink transition-colors">
                Let’s talk <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
          </div>

          <button
            className="md:hidden grid place-items-center h-11 w-11 rounded-full border border-line"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] bg-ink flex flex-col px-6 pt-6 pb-10"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex justify-between items-center">
              <span className="font-serif text-2xl">Shamna<span className="italic text-lime">.</span></span>
              <button className="grid place-items-center h-11 w-11 rounded-full border border-line" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-2" aria-label="Mobile">
              {nav.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: EASE }}
                  className="font-serif text-5xl flex items-baseline gap-4 py-1"
                >
                  <span className="font-mono text-xs text-lime">0{i + 1}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto text-mute text-sm">
              <a href={`mailto:${profile.email}`} className="block text-cream">{profile.email}</a>
              <span>{profile.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

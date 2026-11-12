import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { marquee, profile, stats, skillGroups } from '../data'
import { Reveal, SectionHeading, Chip, icons, trackSpotlight, EASE } from './ui'

export function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="relative border-y border-line bg-ink-2 py-6 overflow-hidden mask-fade-x" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-3xl md:text-4xl whitespace-nowrap">
            <span className={i % 2 ? 'italic text-cream/50' : ''}>{m}</span>
            <Sparkles className="h-5 w-5 text-lime shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-lime">{suffix}</span>
    </span>
  )
}

/* Paragraph whose words light up as you scroll past */
function ScrollText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="font-serif text-3xl md:text-5xl leading-[1.15] tracking-tight flex flex-wrap">
      {words.map((w, i) => {
        const start = i / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>{w}</Word>
      })}
    </p>
  )
}
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em]">
      {children}
    </motion.span>
  )
}

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="01" eyebrow="About me" title="The bridge between" accent="business & build." />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16">
          <div>
            <ScrollText text={profile.summary} />
            <Reveal delay={0.1} className="mt-10 grid sm:grid-cols-2 gap-6 text-mute leading-relaxed">
              <p>
                At BPract I run several projects at once, from MLM platforms with genealogy trees, rank qualifications and
                payout engines to Facility Management, AI Agent and sports-tech products, and I own each one from the first
                client call to the production release.
              </p>
              <p>
                A B.Tech in Information Technology and hands-on MERN, Python and SQL experience mean I can talk architecture
                with engineers, write specs they actually use, and still translate it all back for the client.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-3xl border border-line bg-line">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-ink p-6 md:p-8">
                <p className="font-serif text-5xl md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm text-mute leading-snug">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40 bg-ink-2 border-y border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="02" eyebrow="Core skills" title="A toolkit built for" accent="delivery.">
          Project management discipline, business analysis rigour, a real technical foundation and a knack for client
          outreach, all in one coordinator.
        </SectionHeading>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((g, gi) => {
            const Icon = icons[g.icon]
            return (
              <motion.article
                key={g.key}
                onPointerMove={trackSpotlight}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: EASE, delay: gi * 0.1 }}
                whileHover={{ y: -6 }}
                className={`spotlight group rounded-3xl border border-line bg-ink p-7 md:p-8 flex flex-col transition-colors hover:border-lime/30 ${g.span}`}
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime/10 text-lime transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-mute">0{gi + 1}</span>
                </div>
                <h3 className="mt-8 font-serif text-3xl leading-tight">{g.title}</h3>
                <p className="mt-2 text-sm text-mute">{g.blurb}</p>
                <div className="mt-auto pt-8 flex flex-wrap gap-2">
                  {g.items.map((it, i) => (
                    <motion.span
                      key={it}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                    >
                      <Chip className="group-hover:border-cream/15 transition-colors">{it}</Chip>
                    </motion.span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

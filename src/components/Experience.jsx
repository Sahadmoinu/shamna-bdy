import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience, process } from '../data'
import { Reveal, SectionHeading, Chip, icons, EASE, trackSpotlight } from './ui'

export function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="03" eyebrow="Experience" title="Where I’ve been" accent="making things happen." />

        <div ref={ref} className="relative">
          {/* track + progress line */}
          <div className="absolute left-[7px] md:left-[calc(30%+7px)] top-2 bottom-0 w-px bg-line" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[7px] md:left-[calc(30%+7px)] top-2 bottom-0 w-px bg-gradient-to-b from-lime via-lime to-sand origin-top"
            aria-hidden="true"
          />

          <ol className="space-y-16 md:space-y-24">
            {experience.map((job, i) => (
              <li key={job.company} className="relative grid md:grid-cols-[30%_1fr] gap-6 md:gap-0">
                {/* node */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-30% 0px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="absolute left-0 md:left-[30%] top-1.5 h-[15px] w-[15px] rounded-full border-2 border-lime bg-ink z-10"
                  aria-hidden="true"
                >
                  {job.current && <span className="absolute inset-0.5 rounded-full bg-lime animate-pulse-dot" />}
                </motion.span>

                <Reveal className="pl-10 md:pl-0 md:pr-12 md:text-right">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">{job.period}</p>
                  <p className="mt-2 text-mute text-sm">{job.sub}</p>
                  {job.current && (
                    <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-lime/10 px-3 py-1 text-xs text-lime">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Current role
                    </span>
                  )}
                </Reveal>

                <Reveal delay={0.1} className="pl-10 md:pl-14">
                  <div
                    onPointerMove={trackSpotlight}
                    className="spotlight rounded-3xl border border-line bg-ink-2 p-7 md:p-9 transition-colors hover:border-lime/25"
                  >
                    <h3 className="font-serif text-3xl md:text-4xl leading-tight">{job.role}</h3>
                    <p className="mt-1 text-cream/80">{job.company}</p>
                    <ul className="mt-6 space-y-3">
                      {job.points.map((p, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: EASE, delay: 0.15 + j * 0.06 }}
                          className="flex gap-3 text-mute leading-relaxed"
                        >
                          <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-lime/70" />
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {job.tags.map((t) => <Chip key={t}>{t}</Chip>)}
                    </div>
                  </div>
                </Reveal>
                {i === experience.length - 1 && <span className="sr-only">End of timeline</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="relative py-28 md:py-36 bg-ink-2 border-y border-line overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-lime/10 blur-[110px]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="04" eyebrow="How I work" title="From first call to" accent="release day.">
          A repeatable process that keeps clients informed, teams unblocked and timelines intact.
        </SectionHeading>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease: EASE }}
            className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-lime/0 via-lime/60 to-lime/0 origin-left"
            aria-hidden="true"
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {process.map((p, i) => {
              const Icon = icons[p.icon]
              return (
                <motion.li
                  key={p.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.12 }}
                  className="group relative"
                >
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-line bg-ink text-lime transition-all duration-500 group-hover:bg-lime group-hover:text-ink group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-6 font-mono text-xs text-mute">{p.step}</p>
                  <h3 className="mt-1 font-serif text-3xl">{p.title}</h3>
                  <p className="mt-3 text-sm text-mute leading-relaxed">{p.text}</p>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

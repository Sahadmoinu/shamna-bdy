import { motion } from 'framer-motion'
import { GraduationCap, Languages } from 'lucide-react'
import { leadership, achievements, education, languages } from '../data'
import { Reveal, SectionHeading, icons, trackSpotlight, EASE } from './ui'

export function Leadership() {
  return (
    <section id="leadership" className="relative py-28 md:py-40 bg-ink-2 border-y border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="06" eyebrow="Leadership" title="Leading teams" accent="beyond the office." />

        <div className="grid lg:grid-cols-2 gap-5">
          {leadership.map((l, i) => (
            <motion.article
              key={l.org}
              onPointerMove={trackSpotlight}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
              className="spotlight group rounded-[28px] border border-line bg-ink p-8 md:p-10 flex flex-col hover:border-lime/25 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">{l.period}</p>
                  <h3 className="mt-3 font-serif text-4xl md:text-5xl leading-none">{l.role}</h3>
                  <p className="mt-2 text-cream/75">{l.org}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-6xl md:text-7xl italic text-lime leading-none transition-transform duration-500 group-hover:-translate-y-1">{l.metric.value}</p>
                  <p className="mt-2 max-w-[160px] text-xs text-mute">{l.metric.label}</p>
                </div>
              </div>
              <ul className="mt-8 space-y-3 border-t border-line pt-8">
                {l.points.map((p) => (
                  <li key={p} className="flex gap-3 text-mute leading-relaxed">
                    <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-lime/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Achievements() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="07" eyebrow="Education & achievements" title="Foundations &" accent="milestones." />

        <div className="grid lg:grid-cols-3 gap-5">
          <Reveal className="lg:row-span-2">
            <div className="relative h-full overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-forest to-ink p-8 md:p-10 flex flex-col">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-lime/20" />
              <div aria-hidden="true" className="absolute -right-4 -top-4 h-32 w-32 rounded-full border border-lime/20" />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-ink"><GraduationCap className="h-5 w-5" /></span>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-lime">{education.period}</p>
              <h3 className="mt-3 font-serif text-4xl leading-tight">{education.degree}</h3>
              <p className="mt-2 text-cream/75">{education.school}</p>
              <div className="mt-auto pt-12 flex items-end justify-between">
                <div>
                  <p className="text-xs text-mute uppercase tracking-widest">CGPA</p>
                  <p className="font-serif text-7xl leading-none">{education.cgpa}</p>
                </div>
                <p className="font-mono text-xs text-mute">/ 10</p>
              </div>
            </div>
          </Reveal>

          {achievements.map((a, i) => {
            const Icon = icons[a.icon]
            return (
              <Reveal key={a.title} delay={0.1 + i * 0.08}>
                <div
                  onPointerMove={trackSpotlight}
                  className="spotlight group h-full rounded-[28px] border border-line bg-ink-2 p-8 transition-colors hover:border-lime/25"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime/10 text-lime transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-serif text-3xl">{a.title}</h3>
                  <p className="mt-2 text-mute">{a.text}</p>
                </div>
              </Reveal>
            )
          })}

          <Reveal delay={0.35}>
            <div className="h-full rounded-[28px] border border-line bg-ink-2 p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sand/15 text-sand"><Languages className="h-5 w-5" /></span>
              <h3 className="mt-6 font-serif text-3xl">Languages</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {languages.map((l, i) => (
                  <motion.span
                    key={l}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="rounded-full bg-cream/[0.06] px-4 py-1.5 text-sm"
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

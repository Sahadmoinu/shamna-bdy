import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Briefcase } from 'lucide-react'
import { projects } from '../data'
import { SectionHeading, Chip, EASE } from './ui'

function useMedia(q) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

/* ---------- Illustrations ---------- */
/* children animate via variants; the parent <Svg> owns the single in-view trigger */
const draw = (delay) => ({
  variants: {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 0.8, delay, ease: 'easeInOut' } },
  },
})
const pop = (delay) => ({
  variants: {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 16, delay } },
  },
})
function Svg({ children }) {
  return (
    <motion.svg viewBox="0 0 300 220" className="h-full w-full overflow-visible" aria-hidden="true" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {children}
    </motion.svg>
  )
}

function Tree({ levels, color }) {
  // levels: array of arrays of x positions; each node connects to parent index computed by proportion
  const ys = levels.map((_, i) => 34 + i * 72)
  const nodes = []
  const links = []
  levels.forEach((xs, li) => {
    xs.forEach((x, ni) => {
      nodes.push({ x, y: ys[li], li, ni, root: li === 0 })
      if (li > 0) {
        const parentIdx = Math.floor((ni / xs.length) * levels[li - 1].length)
        const px = levels[li - 1][parentIdx]
        links.push({ d: `M${px},${ys[li - 1]} C${px},${ys[li - 1] + 40} ${x},${ys[li] - 40} ${x},${ys[li]}`, li })
      }
    })
  })
  return (
    <Svg>
      {links.map((l, i) => (
        <motion.path key={i} d={l.d} fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="1.5" {...draw(0.2 + l.li * 0.45 + i * 0.02)} />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={i} style={{ originX: `${n.x}px`, originY: `${n.y}px` }} {...pop(0.1 + n.li * 0.45 + n.ni * 0.04)}>
          {n.root && <circle cx={n.x} cy={n.y} r="20" fill={color} fillOpacity="0.12" />}
          <circle cx={n.x} cy={n.y} r={n.root ? 11 : n.li === 1 ? 8 : 5.5} fill={n.root ? color : '#ffffff'} stroke={color} strokeWidth="1.5" />
        </motion.g>
      ))}
    </Svg>
  )
}

function AiNet({ color }) {
  const xs = [40, 120, 200, 270]
  const layers = [[70, 110, 150], [50, 90, 130, 170], [80, 120, 160], [110]]
  const nodes = layers.flatMap((ys, li) => ys.map((y) => ({ x: xs[li], y, li })))
  const links = []
  for (let li = 0; li < layers.length - 1; li++)
    layers[li].forEach((y1) => layers[li + 1].forEach((y2) => links.push({ x1: xs[li], y1, x2: xs[li + 1], y2, li })))
  return (
    <Svg>
      {links.map((l, i) => (
        <motion.path key={i} d={`M${l.x1},${l.y1} L${l.x2},${l.y2}`} stroke={color} strokeOpacity="0.25" strokeWidth="1" {...draw(0.1 + l.li * 0.3)} />
      ))}
      {links.filter((_, i) => i % 3 === 0).map((l, i) => (
        <motion.circle
          key={`p${i}`}
          r="2.2"
          fill={color}
          initial={{ cx: l.x1, cy: l.y1, opacity: 0 }}
          animate={{ cx: [l.x1, l.x2], cy: [l.y1, l.y2], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: (i * 0.37) % 2.5, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={n.li === 3 ? 10 : 6} fill={n.li === 3 ? color : '#ffffff'} stroke={color} strokeWidth="1.5" style={{ originX: `${n.x}px`, originY: `${n.y}px` }} {...pop(0.1 + n.li * 0.3)} />
      ))}
    </Svg>
  )
}

function Skyline({ color }) {
  const b = [
    [20, 90], [58, 140], [96, 70], [134, 170], [172, 110], [210, 150], [248, 85],
  ]
  return (
    <Svg>
      <line x1="10" x2="290" y1="200" y2="200" stroke={color} strokeOpacity="0.4" />
      {b.map(([x, h], i) => (
        <motion.g
          key={i}
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.08 } } }}
          style={{ originY: '200px', transformBox: 'view-box' }}
        >
          <rect x={x} y={200 - h} width="32" height={h} rx="3" fill={color} fillOpacity={i === 3 ? 0.9 : 0.12} stroke={color} strokeOpacity="0.6" />
          {Array.from({ length: Math.floor(h / 22) }).map((_, j) => (
            <rect key={j} x={x + 8} y={200 - h + 10 + j * 22} width="16" height="8" rx="1.5" fill={i === 3 ? '#ffffff' : color} fillOpacity={i === 3 ? 0.5 : 0.35} />
          ))}
        </motion.g>
      ))}
    </Svg>
  )
}

function Visual({ kind, color }) {
  if (kind === 'binary') return <Tree color={color} levels={[[150], [85, 215], [50, 120, 180, 250]]} />
  if (kind === 'unilevel') return <Tree color={color} levels={[[150], [40, 95, 150, 205, 260], [25, 55, 85, 115, 150, 185, 215, 245, 275]]} />
  if (kind === 'ai') return <AiNet color={color} />
  return <Skyline color={color} />
}

/* ---------- Card ---------- */
function ProjectCard({ p, i, n, progress, stack }) {
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - i - 1) * 0.04])
  return (
    <div className={stack ? 'sticky top-0 h-svh flex items-center pt-16' : 'py-3'}>
      <motion.article
        style={stack ? { scale, top: `${i * 28}px` } : undefined}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative w-full origin-top overflow-hidden rounded-[32px] border border-line bg-ink-2 shadow-[0_-20px_60px_-30px_rgba(90,60,30,0.3)]"
      >
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="p-7 md:p-10 flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: p.accent }}>{p.type}</span>
              <span className="font-serif text-5xl text-outline">0{i + 1}</span>
            </div>
            <h3 className="mt-3 font-serif text-4xl md:text-[3.25rem] leading-none tracking-tight">{p.title}</h3>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-cream/70">
              <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" style={{ color: p.accent }} />{p.role}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" style={{ color: p.accent }} />{p.region}</span>
            </div>
            <p className="mt-5 text-base md:text-lg text-cream/85 leading-relaxed">{p.summary}</p>
            <ul className="mt-5 space-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-sm text-mute leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => <Chip key={t}>{t}</Chip>)}
            </div>
          </div>

          <div className="relative min-h-[260px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-line overflow-hidden">
            <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 50% 40%, ${p.accent}26, transparent 65%)` }} />
            <div className="absolute inset-0 bg-[radial-gradient(rgb(46_36_28/0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />
            <div className="relative h-full w-full p-8 md:p-12 grid place-items-center">
              <div className="w-full max-w-[380px] aspect-[300/220]">
                <Visual kind={p.visual} color={p.accent} />
              </div>
            </div>
            <span className="absolute bottom-5 left-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mute">{p.org}</span>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const stack = useMedia('(min-width: 1024px) and (min-height: 820px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="projects" className="relative pt-28 md:pt-40 pb-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="05" eyebrow="Selected projects" title="Work I’ve" accent="carried to the finish.">
          International MLM platforms coordinated at BPract, plus the AI and full-stack builds that shaped how I work.
        </SectionHeading>
        <div ref={ref} className={stack ? 'pb-[10vh]' : ''}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} n={projects.length} progress={scrollYProgress} stack={stack} />
          ))}
        </div>
      </div>
    </section>
  )
}

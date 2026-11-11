import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Preloader, Cursor, Nav, ScrollProgress } from './components/Chrome'
import Hero from './components/Hero'
import { About, Marquee, Skills } from './components/About'
import { Experience, Process } from './components/Experience'
import Projects from './components/Projects'
import { Leadership, Achievements } from './components/Leadership'
import { Contact, Footer } from './components/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <AnimatePresence>{loading && <Preloader key="pre" onDone={done} />}</AnimatePresence>
        <Cursor />
        <ScrollProgress />
        <Nav />
        <main>
          {loading ? <section className="min-h-svh" /> : <Hero />}
          <Marquee />
          <About />
          <Skills />
          <Experience />
          <Process />
          <Projects />
          <Leadership />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

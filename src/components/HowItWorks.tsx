import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CalendarDays, Car, Sparkles, Star } from 'lucide-react'

const STEPS = [
  {
    icon: CalendarDays,
    step: '01',
    title: 'Book',
    body: 'Quick form or WhatsApp. We confirm within hours.',
  },
  {
    icon: Car,
    step: '02',
    title: 'We Arrive',
    body: 'Fully equipped van at your door — water & power included.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'We Detail',
    body: 'Sit back. 3–8 hours depending on your package.',
  },
  {
    icon: Star,
    step: '04',
    title: 'You Enjoy',
    body: 'Showroom-fresh car. No errands. No waiting.',
  },
]

export default function HowItWorks() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-panel overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Simple Process
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            How It Works
          </h2>
        </motion.div>

        {/* Steps — open layout, no cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {STEPS.map((step, i) => (
            <Step key={step.step} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-20"
        >
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-base transition-colors duration-200 shadow-lg shadow-accent/20"
          >
            Get My Instant Estimate
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Step({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col px-6 lg:px-10 pb-2 first:pl-0 last:pr-0 group"
    >
      {/* Ghost number — huge, barely visible */}
      <div
        className="absolute bottom-0 right-2 font-heading font-black leading-none select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
        style={{
          fontSize: 'clamp(5rem, 12vw, 9rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(31,163,122,0.08)',
          opacity: 0.9,
        }}
      >
        {step.step}
      </div>

      {/* Icon */}
      <div className="relative z-10 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
        <Icon size={18} className="text-accent" />
      </div>

      {/* Step label */}
      <p className="relative z-10 font-body text-xs font-semibold uppercase tracking-widest text-accent mb-3">
        {step.step}
      </p>

      {/* Title */}
      <h3 className="relative z-10 font-heading font-black uppercase tracking-heading text-2xl lg:text-3xl text-text-primary mb-3">
        {step.title}
      </h3>

      {/* Body */}
      <p className="relative z-10 font-body text-sm text-text-muted leading-relaxed">
        {step.body}
      </p>
    </motion.div>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Droplets, Sparkles, ShieldCheck, CalendarCheck, CloudRain } from 'lucide-react'

const REASONS = [
  {
    icon: MapPin,
    title: 'We Come to You',
    body: 'No driving, no waiting. We show up at your home, office or anywhere convenient — fully equipped.',
  },
  {
    icon: Droplets,
    title: 'Own Water & Power',
    body: "We bring our own water tank and generator. You don't need to provide anything — we handle everything.",
  },
  {
    icon: Sparkles,
    title: 'Premium Products',
    body: 'We use professional-grade detailing chemicals and tools — the same used in top detailing studios.',
  },
  {
    icon: ShieldCheck,
    title: 'Fully Insured',
    body: 'Full public liability insurance for every job, every time. Your vehicle is in safe hands.',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Scheduling',
    body: 'Early mornings, evenings, weekends — we work around your calendar, not the other way around.',
  },
  {
    icon: CloudRain,
    title: "Rain Won't Stop Us",
    body: "This is Ireland — we're built for it. Our covered setup means we work through any weather.",
  },
]

export default function WhyUs() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="why-us" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-base overflow-hidden bg-grain">
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(31,163,122,0.04) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Why Choose Us
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            The Difference
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReasonCard({ reason, index }: { reason: typeof REASONS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = reason.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group p-6 rounded-2xl border border-border bg-bg-panel hover:border-accent/50 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
        <Icon size={18} className="text-accent" />
      </div>
      <h3 className="font-body font-semibold text-text-primary text-base mb-2">
        {reason.title}
      </h3>
      <p className="font-body text-sm text-text-muted leading-relaxed">
        {reason.body}
      </p>
    </motion.div>
  )
}

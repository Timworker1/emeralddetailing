import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { SERVICE_VARIANTS, ADD_ONS, VEHICLE_SIZES } from '../config/pricing'

const PACKAGE_HIGHLIGHTS: Record<string, { icon: string; tagline: string }> = {
  exterior: { icon: '✦', tagline: 'Paint, wheels, glass & every detail outside' },
  interior: { icon: '◈', tagline: 'Deep clean, steam & conditioning inside' },
  complete: { icon: '◉', tagline: 'The full works — outside and in' },
}

function useFadeUp(ref: React.RefObject<Element | null>, delay = 0) {
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return {
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null)
  const headAnim = useFadeUp(headRef)

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-base overflow-hidden">
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(31,163,122,0.04) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div ref={headRef} {...headAnim} className="text-center mb-16">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            What We Offer
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            Our Packages
          </h2>
          <p className="mt-4 font-body text-text-muted max-w-lg mx-auto">
            Every service is performed at your location — we bring everything needed.
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SERVICE_VARIANTS.map((variant, i) => (
            <PackageCard key={variant.id} variant={variant} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-border" />
          <span className="font-body text-xs uppercase tracking-widest text-text-muted">Enhance your detail</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Add-ons grid */}
        <AddOnsGrid />

        {/* Consultation card */}
        <ConsultationCard />
      </div>
    </section>
  )
}

function PackageCard({ variant, index }: { variant: typeof SERVICE_VARIANTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isComplete = variant.id === 'complete'

  const priceFrom = Math.min(...VEHICLE_SIZES.map((s) => s.prices[variant.id]))

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group flex flex-col rounded-2xl border p-7 transition-all duration-300 cursor-default
        ${isComplete
          ? 'border-accent/50 bg-accent/5 hover:border-accent hover:bg-accent/10'
          : 'border-border bg-bg-panel hover:border-text-muted'
        }`}
      style={{ willChange: 'transform' }}
      onMouseMove={(e) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
        el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateZ(4px)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
      }}
    >
      {isComplete && (
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-accent text-white font-body text-xs font-semibold">
          Most Popular
        </div>
      )}

      {/* Icon + name */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-xl ${isComplete ? 'text-accent' : 'text-text-muted'}`}>
          {PACKAGE_HIGHLIGHTS[variant.id].icon}
        </span>
        <h3 className="font-heading font-black uppercase tracking-heading text-xl text-text-primary">
          {variant.label}
        </h3>
      </div>

      <p className="font-body text-sm text-text-muted mb-6 leading-relaxed">
        {PACKAGE_HIGHLIGHTS[variant.id].tagline}
      </p>

      {/* Included list */}
      <ul className="space-y-2.5 flex-1 mb-7">
        {variant.included.map((item) => {
          const [title, desc] = item.split(' — ')
          return (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                size={13}
                className={`mt-0.5 flex-shrink-0 ${isComplete ? 'text-accent' : 'text-text-muted'}`}
                strokeWidth={2.5}
              />
              <span className="font-body text-xs text-text-muted leading-relaxed">
                <span className="text-text-secondary font-medium">{title}</span>
                {desc && ` — ${desc}`}
              </span>
            </li>
          )
        })}
      </ul>

      {/* Price + CTA */}
      <div className="border-t border-border pt-5 mt-auto">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="font-body text-xs text-text-muted mb-0.5">Starting from</p>
            <p className="font-heading font-black text-3xl text-text-primary">
              €{priceFrom}
            </p>
          </div>
          <p className="font-body text-xs text-text-muted text-right">
            Prices vary<br />by vehicle size
          </p>
        </div>
        <a
          href="#calculator"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-body font-semibold text-sm transition-colors duration-200
            ${isComplete
              ? 'bg-accent hover:bg-accent-dark text-white'
              : 'border border-border hover:border-accent text-text-muted hover:text-text-primary'
            }`}
        >
          Configure & Price
          <ArrowRight size={14} />
        </a>
      </div>

      {/* Wet-gloss hover shimmer */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(31,163,122,0.08) 0%, transparent 60%)' }}
      />
    </motion.div>
  )
}

function AddOnsGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
    >
      {ADD_ONS.map((addon) => (
        <div
          key={addon.id}
          className="flex flex-col items-start p-4 rounded-xl border border-border bg-bg-panel hover:border-accent/50 transition-colors duration-200 group"
        >
          <p className="font-body text-sm font-semibold text-text-primary mb-1 leading-snug group-hover:text-accent transition-colors duration-200">
            {addon.label}
          </p>
          <p className="font-body text-xs text-text-muted mt-auto pt-3 font-semibold">
            from €{addon.price}
          </p>
        </div>
      ))}
    </motion.div>
  )
}

function ConsultationCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-border bg-bg-panel"
    >
      <div>
        <p className="font-body text-xs uppercase tracking-widest text-accent mb-2">Premium</p>
        <h3 className="font-heading font-black uppercase tracking-heading text-xl text-text-primary mb-1">
          PPF & Paint Correction
        </h3>
        <p className="font-body text-sm text-text-muted max-w-md">
          Multi-stage paint correction and paint protection film pricing depends on
          your vehicle's condition and size — assessed individually.
        </p>
      </div>
      <a
        href="#contact"
        className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-accent text-text-primary font-body font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
      >
        Get a Consultation
        <ArrowRight size={14} />
      </a>
    </motion.div>
  )
}

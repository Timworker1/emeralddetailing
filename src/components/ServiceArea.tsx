import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MapPin, Check, X, Search, Car, Clock, Shield } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const STATS = [
  { icon: MapPin, value: '39',       label: 'Dublin Areas'    },
  { icon: Car,    value: '0',        label: 'Call-out Fee'    },
  { icon: Clock,  value: 'Same Day', label: 'Often Available' },
  { icon: Shield, value: '100%',     label: 'Satisfaction'    },
]

export default function ServiceArea() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="service-area" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-base overflow-hidden">
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-50" />

      {/* Top centre glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(31,163,122,0.07) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            We Come to You
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            Service Area
          </h2>
          <p className="mt-4 font-body text-text-muted max-w-sm mx-auto">
            Dublin city and surrounding areas — fully mobile, no call-out fee.
          </p>
        </motion.div>

        {/* ── Eircode checker (centrepiece) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <EircodeChecker />
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-bg-panel"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Icon size={15} className="text-accent" />
              </div>
              <p className="font-heading font-black text-xl text-text-primary leading-none">{value}</p>
              <p className="font-body text-xs text-text-muted text-center">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Area tags ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="font-body text-xs uppercase tracking-widest text-text-muted mb-4 text-center">
            Areas we cover
          </p>
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.025 } }, hidden: {} }}
          >
            {SITE_CONFIG.areas.map((area) => (
              <motion.span
                key={area}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show:   { opacity: 1, scale: 1, transition: { duration: 0.28 } },
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-bg-panel font-body text-xs text-text-muted hover:border-accent/50 hover:text-text-secondary transition-colors cursor-default"
              >
                <MapPin size={9} className="text-accent flex-shrink-0" />
                {area}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

function EircodeChecker() {
  const [value,  setValue]  = useState('')
  const [result, setResult] = useState<'covered' | 'not-covered' | null>(null)

  const check = () => {
    const routing = value.trim().toUpperCase().slice(0, 3)
    if (!routing) return
    setResult(
      SITE_CONFIG.coveredEircodes.some((ec) => ec.toUpperCase() === routing)
        ? 'covered'
        : 'not-covered'
    )
  }

  const reset = () => { setValue(''); setResult(null) }

  return (
    <div className="relative p-6 sm:p-8 rounded-2xl border border-border bg-bg-panel overflow-hidden">
      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(31,163,122,0.05) 0%, transparent 100%)' }}
      />

      <div className="relative">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Search size={17} className="text-accent" />
          </div>
          <div>
            <p className="font-body font-semibold text-text-primary">Do we cover your area?</p>
            <p className="font-body text-sm text-text-muted mt-0.5">
              Enter your Eircode — instant answer.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setResult(null) }}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            placeholder="e.g. D04 XY12"
            maxLength={8}
            className="flex-1 px-4 py-3.5 rounded-xl border border-border bg-bg-base text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-200 uppercase tracking-widest"
          />
          <button
            onClick={check}
            className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            Check
          </button>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result}
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className={`mt-4 flex items-center gap-3 p-4 rounded-xl border ${
                result === 'covered'
                  ? 'border-accent/40 bg-accent/10'
                  : 'border-border bg-bg-base'
              }`}>
                {result === 'covered' ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
                      className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0"
                    >
                      <Check size={15} className="text-white" strokeWidth={3} />
                    </motion.div>
                    <div>
                      <p className="font-body font-semibold text-text-primary text-sm">
                        Yes — we cover your area!
                      </p>
                      <a href="#calculator" onClick={reset}
                        className="font-body text-xs text-accent hover:underline">
                        Get your instant estimate →
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                      <X size={14} className="text-text-muted" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-text-primary text-sm">
                        We don't cover this area yet
                      </p>
                      <p className="font-body text-xs text-text-muted mt-0.5">
                        Message us — we may still be able to help.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

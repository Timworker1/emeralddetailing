import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Droplets, CloudRain, BadgeCheck } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

interface Stat {
  value: number
  suffix: string
  label: string
  decimals?: number
}

const STATS: Stat[] = [
  { value: parseInt(SITE_CONFIG.carsDetailed), suffix: '+', label: 'Cars Detailed' },
  { value: parseFloat(SITE_CONFIG.googleRating), suffix: '', label: 'Google Rating', decimals: 1 },
  { value: parseInt(SITE_CONFIG.reviewCount), suffix: '+', label: '5★ Reviews' },
  { value: 100, suffix: '%', label: 'Mobile Service' },
]

const TRUST_PILLS = [
  { icon: ShieldCheck, label: 'Fully Insured' },
  { icon: Droplets,    label: 'Own Water & Power' },
  { icon: CloudRain,   label: "Rain Won't Stop Us" },
  { icon: BadgeCheck,  label: 'All Prices Incl. VAT' },
]

function useCounter(target: number, decimals = 0, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1600
    const steps = 60
    let step = 0
    const timer = setInterval(() => {
      step++
      const t = step / steps
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.min(target * eased, target)
      setCount(parseFloat(current.toFixed(decimals)))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [active, target, decimals])
  return count
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-bg-base">

      {/* ── Studio light — cone from top ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[340px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(31,163,122,0.13) 0%, transparent 80%)',
        }}
      />

      {/* ── Soft floor reflection ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(31,163,122,0.06) 0%, transparent 80%)',
        }}
      />

      {/* ── Top hairline — emerald fade ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 mb-14">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="w-1.5 h-1.5 rotate-45 bg-accent/60" />
          </div>
        </div>

        {/* ── Trust pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {TRUST_PILLS.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 + i * 0.07 }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                <Icon size={13} className="text-accent" />
              </div>
              <span className="font-body text-xs font-medium text-text-muted group-hover:text-text-secondary transition-colors duration-200">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom hairline ── */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}

function StatItem({
  stat,
  index,
  inView,
}: {
  stat: Stat
  index: number
  inView: boolean
}) {
  const count = useCounter(stat.value, stat.decimals, inView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Glow halo behind number */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-14 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse, rgba(31,163,122,0.18) 0%, transparent 70%)' }}
      />

      {/* Number */}
      <span
        className="relative font-heading font-black leading-none tabular-nums"
        style={{
          fontSize: 'clamp(2.6rem, 6vw, 4rem)',
          background: 'linear-gradient(160deg, #FFFFFF 30%, #54C39A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {count.toFixed(stat.decimals ?? 0)}
        <span style={{ background: 'linear-gradient(160deg, #54C39A, #1FA37A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {stat.suffix}
        </span>
      </span>

      {/* Label */}
      <span className="mt-2 font-body text-xs uppercase tracking-widest text-text-muted">
        {stat.label}
      </span>

      {/* Thin underline accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 w-8 h-px bg-accent/40 origin-left"
      />
    </motion.div>
  )
}

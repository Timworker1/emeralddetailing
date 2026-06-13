import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, Shield, Droplets, ChevronDown } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Video moves up slower than scroll — creates depth
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  // Content fades and lifts slightly as you scroll away
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Parallax background layer ──────────────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 scale-110"
      >
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero/hero-poster.jpg"
          src="/hero/hero-video.mp4"
        />

        {/* Mobile fallback */}
        <div
          className="md:hidden absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero/hero-poster.jpg)' }}
          aria-hidden="true"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/75 via-bg-base/45 to-bg-base" />

        {/* Emerald studio glow */}
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1FA37A 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* ── Content — fades out on scroll ──────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-24 lg:pt-40"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="font-body text-sm font-semibold uppercase tracking-widest text-accent-light mb-5"
        >
          Dublin's Premium Mobile Detailing
        </motion.p>

        {/* Headline — per-line clip-path reveal */}
        <h1 className="font-heading font-black uppercase tracking-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-text-primary leading-none mb-6">
          {[
            { text: 'Showroom',      delay: 0.2,  cls: '' },
            { text: 'Results.',      delay: 0.38, cls: 'text-accent-gradient' },
            { text: 'At Your Door.', delay: 0.56, cls: '' },
          ].map(({ text, delay, cls }) => (
            <div key={text} className="overflow-hidden">
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
                className={cls || undefined}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Sub-heading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="font-body text-lg sm:text-xl text-text-muted max-w-xl mx-auto mb-10"
        >
          We come to you — fully equipped with our own water & power.
          Professional detailing without leaving home.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.55}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#calculator"
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-base transition-colors duration-200 shadow-lg shadow-accent/20"
          >
            Get My Instant Estimate
          </a>
          <a
            href="#before-after"
            className="w-full sm:w-auto px-8 py-4 rounded-lg border border-border hover:border-text-muted text-text-primary font-body font-semibold text-base transition-colors duration-200"
          >
            See Our Work
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.7}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <TrustBadge icon={<StarRow />} label={`Google ${SITE_CONFIG.googleRating} ★`} />
          <Divider />
          <TrustBadge icon={<Shield size={15} className="text-accent" />} label="Fully Insured" />
          <Divider />
          <TrustBadge icon={<Droplets size={15} className="text-accent" />} label="Own Water & Power" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} className="text-text-muted" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-border z-10" />
    </section>
  )
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-body text-sm font-medium text-text-secondary">{label}</span>
    </div>
  )
}

function Divider() {
  return <span className="hidden sm:block w-px h-4 bg-border" />
}

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className="text-accent fill-accent" />
      ))}
    </div>
  )
}

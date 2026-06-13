import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Play } from 'lucide-react'

const VIDEOS = [
  { src: '/gallery/video do.mp4',   label: 'BEFORE', sub: 'Paint correction start' },
  { src: '/gallery/video posle.mp4', label: 'AFTER',  sub: 'Showroom-grade finish'  },
]

const WORKS = [
  {
    src:     '/gallery/bmw-grey.jpg',
    car:     'BMW 3 Series',
    service: 'Exterior Detail',
    tag:     'Most Popular',
    // portrait photo — focus on top half (car body)
    position: 'object-[center_30%]',
    featured: true,
  },
  {
    src:     '/gallery/range-rover.jpg',
    car:     'Range Rover',
    service: 'Complete Detail',
    tag:     'Luxury SUV',
    position: 'object-[center_40%]',
    featured: false,
  },
  {
    src:     '/gallery/audi.jpg',
    car:     'Audi A Series',
    service: 'Exterior + Engine Bay',
    tag:     'Premium',
    position: 'object-[center_35%]',
    featured: false,
  },
  {
    src:     '/gallery/bmw-red.jpg',
    car:     'BMW M Sport',
    service: 'Full Foam Wash + Detail',
    tag:     'Sport',
    position: 'object-[center_40%]',
    featured: false,
  },
]

export default function Gallery() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-panel overflow-hidden">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-56 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(31,163,122,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
              Real Results
            </p>
            <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
              Our Work
            </h2>
          </div>
          <p className="font-body text-text-muted max-w-xs text-sm leading-relaxed sm:text-right">
            Every car treated like our own.<br className="hidden sm:block" /> These are real clients, real results.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 auto-rows-[240px] lg:auto-rows-[200px]">

          {/* Featured — BMW grey with van (lg: 7 cols, 2 rows) */}
          <GalleryCard
            work={WORKS[0]}
            index={0}
            inView={inView}
            className="lg:col-span-7 lg:row-span-2 sm:row-span-1"
            onOpen={() => setLightbox(0)}
          />

          {/* Range Rover (lg: 5 cols, 1 row) */}
          <GalleryCard
            work={WORKS[1]}
            index={1}
            inView={inView}
            className="lg:col-span-5"
            onOpen={() => setLightbox(1)}
          />

          {/* Audi (lg: 2 cols, 1 row — narrow) */}
          <GalleryCard
            work={WORKS[2]}
            index={2}
            inView={inView}
            className="lg:col-span-2"
            onOpen={() => setLightbox(2)}
          />

          {/* BMW red (lg: 3 cols, 1 row) */}
          <GalleryCard
            work={WORKS[3]}
            index={3}
            inView={inView}
            className="lg:col-span-3"
            onOpen={() => setLightbox(3)}
          />
        </div>

        {/* ── Video row: Before / After polishing ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {VIDEOS.map(({ src, label, sub }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-2xl border border-border bg-bg-base group"
              style={{ aspectRatio: '16/9' }}
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(10,10,11,0.65) 0%, transparent 60%)' }}
              />

              {/* Label */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`font-heading font-black text-xs tracking-widest px-3 py-1 rounded-full ${
                  label === 'AFTER'
                    ? 'bg-accent text-white'
                    : 'bg-bg-base/80 border border-border text-text-muted'
                }`}>
                  {label}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <Play size={9} className="text-white fill-white ml-0.5" />
                </div>
                <p className="font-body text-xs text-white/60">{sub}</p>
              </div>

              {/* Accent border on AFTER */}
              {label === 'AFTER' && (
                <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/30 pointer-events-none" />
              )}
            </div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-bg-base/96 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={WORKS[lightbox].src}
                alt={WORKS[lightbox].car}
                className={`w-full max-h-[82vh] object-cover ${WORKS[lightbox].position}`}
              />
              {/* Info bar */}
              <div
                className="absolute bottom-0 inset-x-0 p-6"
                style={{ background: 'linear-gradient(to top, rgba(10,10,11,0.96) 0%, transparent 100%)' }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-heading font-black uppercase text-xl text-text-primary">
                      {WORKS[lightbox].car}
                    </p>
                    <p className="font-body text-sm text-accent mt-1">
                      {WORKS[lightbox].service}
                    </p>
                  </div>
                  <span className="font-body text-xs uppercase tracking-widest text-text-muted border border-border rounded-full px-3 py-1">
                    {WORKS[lightbox].tag}
                  </span>
                </div>
              </div>

              {/* Prev / Next */}
              <div className="absolute top-4 right-4 flex gap-2">
                {lightbox > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
                    className="w-9 h-9 rounded-full bg-bg-base/80 border border-border flex items-center justify-center hover:border-accent transition-colors font-body text-xs text-text-muted"
                  >
                    ‹
                  </button>
                )}
                {lightbox < WORKS.length - 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
                    className="w-9 h-9 rounded-full bg-bg-base/80 border border-border flex items-center justify-center hover:border-accent transition-colors font-body text-xs text-text-muted"
                  >
                    ›
                  </button>
                )}
                <button
                  onClick={() => setLightbox(null)}
                  className="w-9 h-9 rounded-full bg-bg-base/80 border border-border flex items-center justify-center hover:border-accent transition-colors"
                >
                  <X size={15} className="text-text-primary" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryCard({
  work, index, inView, className, onOpen,
}: {
  work: typeof WORKS[0]
  index: number
  inView: boolean
  className?: string
  onOpen: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-border bg-bg-base cursor-pointer group ${className}`}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <motion.img
        src={work.src}
        alt={work.car}
        className={`absolute inset-0 w-full h-full object-cover ${work.position}`}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Permanent bottom gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(10,10,11,0.75) 0%, rgba(10,10,11,0.1) 45%, transparent 100%)' }}
      />

      {/* Index number (top-left) */}
      <div className="absolute top-4 left-4">
        <span className="font-heading font-black text-xs text-white/30">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Tag (top-right) */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4 }}
        transition={{ duration: 0.25 }}
      >
        <span className="font-body text-xs uppercase tracking-widest text-accent border border-accent/40 bg-bg-base/70 backdrop-blur-sm rounded-full px-2.5 py-1">
          {work.tag}
        </span>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-heading font-black uppercase text-sm text-text-primary leading-tight">
              {work.car}
            </p>
            <motion.p
              className="font-body text-xs text-accent mt-0.5"
              animate={{ opacity: hovered ? 1 : 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {work.service}
            </motion.p>
          </div>

          {/* Expand icon */}
          <motion.div
            className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0"
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUpRight size={14} className="text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

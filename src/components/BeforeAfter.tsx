import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react'

interface Pair {
  before: string
  after: string
  label: string
}

// TODO: replace with real before/after pairs
// Place images in public/before-after/ folder: 01-before.jpg, 01-after.jpg, etc.
const PAIRS: Pair[] = [
  { before: '/before-after/01-before.jpg', after: '/before-after/01-after.jpg', label: 'Interior Detail' },
  { before: '/before-after/02-before.jpg', after: '/before-after/02-after.jpg', label: 'Exterior Detail' },
]

export default function BeforeAfter() {
  const [pairIndex, setPairIndex] = useState(0)
  const headRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  const prev = () => setPairIndex((i) => (i - 1 + PAIRS.length) % PAIRS.length)
  const next = () => setPairIndex((i) => (i + 1) % PAIRS.length)

  return (
    <section id="before-after" className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-panel">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Results Speak
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            Before & After
          </h2>
          <p className="mt-4 font-body text-text-muted max-w-md mx-auto">
            Drag the handle to reveal the transformation. Real results, real cars.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <SliderPair pair={PAIRS[pairIndex]} key={pairIndex} />
        </motion.div>

        {/* Pair navigation */}
        {PAIRS.length > 1 && (
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-lg border border-border hover:border-accent text-text-muted hover:text-text-primary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-body text-sm text-text-muted">
              {PAIRS[pairIndex].label} · {pairIndex + 1} / {PAIRS.length}
            </span>
            <button
              onClick={next}
              className="p-2.5 rounded-lg border border-border hover:border-accent text-text-muted hover:text-text-primary transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function SliderPair({ pair }: { pair: Pair }) {
  const [position, setPosition] = useState(50) // percent
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false })

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    updatePosition(e.clientX)
  }
  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) updatePosition(e.clientX) }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [updatePosition])

  // Touch events
  const onTouchMove = (e: React.TouchEvent) => updatePosition(e.touches[0].clientX)

  const allLoaded = imagesLoaded.before && imagesLoaded.after

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl border border-border aspect-[16/9] bg-bg-base cursor-col-resize"
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* Placeholder when images not ready */}
      {!allLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-border border-t-accent animate-spin mx-auto mb-4" />
            <p className="font-body text-xs text-text-muted">
              TODO: Add images to /public/before-after/
            </p>
          </div>
        </div>
      )}

      {/* After image (full width base) */}
      <img
        src={pair.after}
        alt="After detailing"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}
        draggable={false}
        onLoad={() => setImagesLoaded((s) => ({ ...s, after: true }))}
      />

      {/* Before image (clipped to left) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={pair.before}
          alt="Before detailing"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%', maxWidth: 'none' }}
          draggable={false}
          onLoad={() => setImagesLoaded((s) => ({ ...s, before: true }))}
        />
      </div>

      {/* Labels */}
      {allLoaded && (
        <>
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bg-base/80 backdrop-blur-sm border border-border">
            <span className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Before</span>
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/40">
            <span className="font-body text-xs font-semibold text-accent uppercase tracking-wider">After</span>
          </div>
        </>
      )}

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Line */}
        <div className="absolute top-0 bottom-0 w-px bg-white/60" />
        {/* Handle */}
        <div className="relative z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <GripVertical size={16} className="text-bg-base" />
        </div>
      </div>
    </div>
  )
}

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'What if it rains?',
    a: "Rain won't stop us — this is Ireland, after all. We use a covered setup that lets us work in any weather. If conditions are genuinely unsafe (storm-level winds or heavy hail), we'll reschedule at no charge.",
  },
  {
    q: 'Do you need access to water or power?',
    a: "Not at all. We bring our own water tank and generator — everything we need is in the van. You don't need to provide anything. Just let us know where to park.",
  },
  {
    q: 'How long does a detail take?',
    a: 'It depends on the package and vehicle size. An Exterior Detail on a small hatch takes ~3 hours; a Complete Detail on a large SUV can take 7–8 hours. We give you an estimate when you book.',
  },
  {
    q: 'What areas of Dublin do you cover?',
    a: "We cover Dublin city and most surrounding areas. Use the Eircode checker in the Service Area section to confirm, or just message us — we're flexible.",
  },
  {
    q: 'What payment options do you accept?',
    a: "Card (tap or chip), cash, and Revolut. Payment is taken on completion of the job, once you've seen the results.",
  },
  {
    q: 'Can you come to my workplace or apartment car park?',
    a: "Yes — as long as we have room to park the van alongside your vehicle and a safe working area, we're happy to come to offices, apartment car parks, or anywhere else convenient.",
  },
  {
    q: "What's the difference between a valet and a detail?",
    a: "A valet is a quick wash-and-vacuum. A detail is a thorough, methodical process — paint decontamination, hand-cleaning every panel, deep interior steam clean, paint protection — that genuinely restores your car.",
  },
]

export default function FAQ() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-panel overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Got Questions
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            FAQ
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  faq, index, isOpen, onToggle, inView,
}: {
  faq: { q: string; a: string }
  index: number
  isOpen: boolean
  onToggle: () => void
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl border overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-accent/40 shadow-lg shadow-accent/5'
          : 'border-border hover:border-border/80'
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
          isOpen ? 'bg-accent/5' : 'bg-bg-base hover:bg-bg-panel/50'
        }`}
        aria-expanded={isOpen}
      >
        {/* Number + question */}
        <div className="flex items-center gap-4 min-w-0">
          <span className={`font-heading font-black text-xs flex-shrink-0 transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-border'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-body font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${isOpen ? 'text-text-primary' : 'text-text-secondary'}`}>
            {faq.q}
          </span>
        </div>

        {/* Toggle icon */}
        <motion.span
          animate={{ rotate: isOpen ? 0 : 0 }}
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isOpen ? 'bg-accent text-white' : 'bg-bg-panel text-text-muted border border-border'
          }`}
        >
          {isOpen
            ? <Minus size={12} strokeWidth={2.5} />
            : <Plus size={12} strokeWidth={2.5} />
          }
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Accent left border on answer */}
            <div className="flex bg-accent/5">
              <div className="w-0.5 flex-shrink-0 bg-accent/40" />
              <p className="px-6 py-5 font-body text-sm text-text-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

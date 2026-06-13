import { useState, useId, useEffect, useRef } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { Info, Check, ChevronRight, MessageCircle } from 'lucide-react'
import {
  SERVICE_VARIANTS,
  VEHICLE_SIZES,
  FINISH_OPTIONS,
  ADD_ONS,
  type ServiceVariant,
  type VehicleSize,
  type FinishType,
} from '../config/pricing'
import { SITE_CONFIG } from '../config/site'

function formatHours(h: number) {
  if (h === Math.floor(h)) return `~${h}h`
  return `~${h}h`
}

function buildWhatsAppMessage(
  variant: ServiceVariant,
  size: VehicleSize,
  finish: FinishType,
  addOnIds: string[],
  total: number
) {
  const v = SERVICE_VARIANTS.find((x) => x.id === variant)!
  const s = VEHICLE_SIZES.find((x) => x.id === size)!
  const f = FINISH_OPTIONS.find((x) => x.id === finish)!
  const extras = ADD_ONS.filter((a) => addOnIds.includes(a.id))

  let msg = `Hi! I'd like a ${v.label} Detail — ${s.label} (${s.description}), ${f.label} finish`
  if (extras.length) msg += ` + ${extras.map((e) => e.label).join(', ')}`
  msg += ` (est. from €${total}). When's your next availability?`
  return encodeURIComponent(msg)
}

export default function Calculator() {
  const [variant, setVariant] = useState<ServiceVariant>('complete')
  const [size, setSize] = useState<VehicleSize>('M')
  const [finish, setFinish] = useState<FinishType>('wax')
  const [addOns, setAddOns] = useState<Set<string>>(new Set())
  const [tooltip, setTooltip] = useState<string | null>(null)
  const uid = useId()

  const sizeData = VEHICLE_SIZES.find((s) => s.id === size)!
  const finishData = FINISH_OPTIONS.find((f) => f.id === finish)!
  const variantData = SERVICE_VARIANTS.find((v) => v.id === variant)!

  const basePrice = sizeData.prices[variant]
  const finishSurcharge = finishData.surcharge
  const addOnTotal = ADD_ONS.filter((a) => addOns.has(a.id)).reduce((sum, a) => sum + a.price, 0)
  const total = basePrice + finishSurcharge + addOnTotal
  const duration = sizeData.durationHours[variant]

  const toggleAddOn = (id: string) =>
    setAddOns((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${buildWhatsAppMessage(variant, size, finish, [...addOns], total)}`

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-base">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Instant Estimate
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            Configure Your Detail
          </h2>
          <p className="mt-4 font-body text-text-muted max-w-lg mx-auto">
            Build your package and get an instant price estimate — no waiting, no phone tag.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">

          {/* ── Left col — configurator ── */}
          <div className="space-y-6">

            {/* Step 1 — Variant */}
            <Card step="01" title="Choose your service">
              <div className="grid grid-cols-3 gap-3">
                {SERVICE_VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariant(v.id)}
                    className={`py-3 px-2 rounded-lg border font-body font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      variant === v.id
                        ? 'border-accent bg-accent/10 text-text-primary'
                        : 'border-border text-text-muted hover:border-text-muted hover:text-text-primary'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 font-body text-sm text-text-muted">{variantData.tagline}</p>
            </Card>

            {/* Step 2 — Vehicle size */}
            <Card step="02" title="Select vehicle size">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {VEHICLE_SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    className={`relative group flex flex-col items-center py-4 px-3 rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      size === s.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-text-muted'
                    }`}
                  >
                    <span className={`font-heading font-black text-xl uppercase mb-1 ${size === s.id ? 'text-accent' : 'text-text-primary'}`}>
                      {s.id}
                    </span>
                    <span className="font-body text-xs text-text-muted text-center leading-tight mb-2">
                      {s.description}
                    </span>
                    <span className={`font-body font-semibold text-sm ${size === s.id ? 'text-text-primary' : 'text-text-muted'}`}>
                      from €{s.prices[variant]}
                    </span>

                    {/* Tooltip trigger */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setTooltip(tooltip === s.id ? null : s.id) }}
                      className="absolute top-2 right-2 text-text-muted hover:text-accent transition-colors"
                      aria-label="Examples"
                    >
                      <Info size={13} />
                    </button>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {tooltip === s.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-20 bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-bg-panel border border-border rounded-lg p-3 shadow-xl"
                        >
                          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Examples
                          </p>
                          {s.examples.map((ex) => (
                            <p key={ex} className="font-body text-xs text-text-secondary leading-snug">
                              • {ex}
                            </p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </Card>

            {/* Step 3 — Finish */}
            <Card step="03" title="Paint finish">
              <div className="grid grid-cols-2 gap-3">
                {FINISH_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`flex flex-col items-start text-left p-4 rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      finish === f.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-text-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className={`font-body font-semibold text-sm ${finish === f.id ? 'text-text-primary' : 'text-text-muted'}`}>
                        {f.label}
                      </span>
                      {f.surcharge > 0 && (
                        <span className="font-body text-xs font-semibold text-accent">
                          +€{f.surcharge}
                        </span>
                      )}
                      {f.surcharge === 0 && (
                        <span className="font-body text-xs text-text-muted">Included</span>
                      )}
                    </div>
                    <p className="font-body text-xs text-text-muted leading-relaxed">
                      {f.description}
                    </p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Step 4 — Add-ons */}
            <Card step="04" title="Add-ons">
              <div className="grid sm:grid-cols-2 gap-2">
                {ADD_ONS.map((addon) => {
                  const active = addOns.has(addon.id)
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`relative group flex items-center justify-between gap-3 p-3 rounded-lg border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        active
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-text-muted'
                      }`}
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          active ? 'bg-accent border-accent' : 'border-border'
                        }`}>
                          {active && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                        <span className={`font-body text-sm leading-snug ${active ? 'text-text-primary' : 'text-text-muted'}`}>
                          {addon.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`font-body font-semibold text-sm ${active ? 'text-accent' : 'text-text-muted'}`}>
                          €{addon.price}
                        </span>
                        <TooltipIcon text={addon.tooltip} id={`${uid}-${addon.id}`} />
                      </div>
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* ── Right col — summary + included ── */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">

            {/* What's included */}
            <div className="bg-bg-panel border border-border rounded-2xl p-6">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                What's included
              </p>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={variant}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {variantData.included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={13} className="text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span className="font-body text-xs text-text-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* Price summary */}
            <div className="bg-bg-panel border border-accent/30 rounded-2xl p-6">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent mb-5">
                Your Estimate
              </p>

              <div className="space-y-3 mb-5">
                <SummaryRow
                  label={`${variantData.label} — ${sizeData.label}`}
                  value={`€${basePrice}`}
                />
                {finishSurcharge > 0 && (
                  <SummaryRow label={`${finishData.label} finish`} value={`+€${finishSurcharge}`} />
                )}
                {ADD_ONS.filter((a) => addOns.has(a.id)).map((a) => (
                  <SummaryRow key={a.id} label={a.label} value={`+€${a.price}`} />
                ))}
                <div className="pt-3 border-t border-border">
                  <SummaryRow label="Est. duration" value={formatHours(duration)} muted />
                </div>
              </div>

              {/* Total */}
              <div className="flex items-end justify-between mb-1">
                <span className="font-body text-sm text-text-muted">From</span>
                <span className="font-heading font-black text-4xl text-text-primary">
                  €<AnimatedNumber value={total} />
                </span>
              </div>
              <p className="font-body text-xs text-text-muted mb-6">
                Incl. 23% VAT · Final price confirmed after inspection
              </p>

              {/* CTAs */}
              <a
                href="#contact"
                className="block w-full py-3.5 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm text-center transition-colors mb-3"
              >
                Get My Quote
                <ChevronRight size={14} className="inline ml-1" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg border border-border hover:border-accent text-text-primary font-body font-semibold text-sm transition-colors"
              >
                <MessageCircle size={15} />
                Send on WhatsApp
              </a>
            </div>

            {/* Consultation CTA */}
            <div className="bg-bg-panel border border-border rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-body text-sm font-semibold text-text-primary mb-1">
                  PPF / Paint Correction
                </p>
                <p className="font-body text-xs text-text-muted">Priced by consultation — depends on vehicle condition</p>
              </div>
              <a
                href="#contact"
                className="flex-shrink-0 px-4 py-2 rounded-lg border border-border hover:border-accent text-text-muted hover:text-text-primary font-body text-xs font-semibold transition-colors"
              >
                Enquire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: number }) {
  const ref  = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const from = prev.current
    prev.current = value
    const controls = animate(from, value, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) { el.textContent = Math.round(v).toString() },
    })
    return () => controls.stop()
  }, [value])

  return <span ref={ref}>{value}</span>
}

function Card({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-panel border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-heading font-black text-xs text-accent">{step}</span>
        <h3 className="font-body font-semibold text-text-primary text-base">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function SummaryRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={`font-body text-sm ${muted ? 'text-text-muted' : 'text-text-secondary'}`}>{label}</span>
      <span className={`font-body text-sm font-semibold flex-shrink-0 ${muted ? 'text-text-muted' : 'text-text-primary'}`}>{value}</span>
    </div>
  )
}

function TooltipIcon({ text, id }: { text: string; id: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        id={id}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}
        onBlur={() => setOpen(false)}
        className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none"
        aria-label="More info"
      >
        <Info size={13} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 bottom-full right-0 mb-2 w-56 bg-bg-panel border border-border rounded-lg p-3 shadow-xl pointer-events-none"
          >
            <p className="font-body text-xs text-text-secondary leading-relaxed">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


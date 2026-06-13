import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const REVIEWS = [
  {
    name: 'Conor M.',
    location: 'Ranelagh, D6',
    rating: 5,
    ago: '2 weeks ago',
    color: '#1FA37A',
    text: "Absolutely blown away. My BMW looked better than the day I bought it. Arrived on time, brought everything — attention to detail was incredible.",
  },
  {
    name: 'Sarah K.',
    location: 'Clontarf, D3',
    rating: 5,
    ago: '1 month ago',
    color: '#3B82F6',
    text: "Used them after we got a dog. Thought the seats were ruined — they got every single hair out and it smells brand new. Couldn't recommend more.",
  },
  {
    name: 'Damien O.',
    location: 'Ballsbridge, D4',
    rating: 4,
    ago: '3 weeks ago',
    color: '#8B5CF6',
    text: "Booked the Complete package. Proper professionals, you can tell they care about the work. The difference was massive. Only minor thing — took slightly longer than quoted.",
  },
  {
    name: 'Aoife R.',
    location: 'Dundrum, D14',
    rating: 5,
    ago: '5 days ago',
    color: '#F59E0B',
    text: "Super convenient having them come to you. The ceramic sealant looks amazing — water just beads right off. Really happy with the whole experience.",
  },
  {
    name: 'James T.',
    location: 'Sandymount, D4',
    rating: 5,
    ago: '2 months ago',
    color: '#EC4899',
    text: "Had paint correction done on my Audi. Swirl marks are completely gone. Very professional throughout. Car looks showroom fresh — exactly what I wanted.",
  },
  {
    name: 'Niamh F.',
    location: 'Rathmines, D6',
    rating: 4,
    ago: '6 weeks ago',
    color: '#06B6D4',
    text: "Booked Tuesday, they were with me Thursday. Quality of work is exceptional. Would have given 5 stars but they were 20 mins late — still highly recommend.",
  },
  {
    name: 'Patrick B.',
    location: 'Blackrock',
    rating: 5,
    ago: '1 month ago',
    color: '#F97316',
    text: "Engine bay detail alongside the full exterior package. Looked like a brand new car. Great communication and showed up exactly on time.",
  },
  {
    name: 'Ciara H.',
    location: 'Malahide',
    rating: 5,
    ago: '3 weeks ago',
    color: '#A855F7',
    text: "Booked as a surprise for my husband — he was completely blown away. The team was professional and friendly. Already booked them again for next month.",
  },
]

// Google "G" logo SVG
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={i <= rating ? 'text-[#FBBC05] fill-[#FBBC05]' : 'text-border fill-border'}
          />
        ))}
      </div>
      <span className="font-body text-xs text-text-muted ml-0.5">{rating}.0</span>
    </div>
  )
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const initials = review.name.split(' ').map(w => w[0]).join('')

  return (
    <div className="flex-shrink-0 w-72 mx-2.5 p-5 rounded-2xl border border-border bg-bg-panel hover:border-accent/30 transition-colors duration-300 group select-none">

      {/* Top row: avatar + name + Google icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar circle */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white font-heading font-black text-sm"
            style={{ background: review.color }}
          >
            {initials}
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-text-primary leading-none">{review.name}</p>
            <p className="font-body text-[11px] text-text-muted mt-0.5">{review.location}</p>
          </div>
        </div>

        {/* Google icon */}
        <div className="flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
          <GoogleIcon />
        </div>
      </div>

      {/* Stars */}
      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-3 mb-3">
        "{review.text}"
      </p>

      {/* Time ago */}
      <p className="font-body text-[11px] text-text-muted/60">{review.ago}</p>
    </div>
  )
}

// 6 cards per row (not all 8) for less density
const ROW1 = [...REVIEWS.slice(0, 6), ...REVIEWS.slice(0, 6)]
const ROW2 = [...REVIEWS.slice(2),    ...REVIEWS.slice(2)]

export default function Reviews() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="reviews" className="relative py-24 bg-bg-base overflow-hidden">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-44 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(31,163,122,0.055) 0%, transparent 70%)' }}
      />

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0  w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0A0A0B 40%, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left,  #0A0A0B 40%, transparent)' }} />

      <div className="relative z-10">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 px-4"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Google Reviews
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary mb-5">
            What Clients Say
          </h2>

          {/* Rating badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border bg-bg-panel">
            <GoogleIcon />
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-[#FBBC05] fill-[#FBBC05]" />
              ))}
            </div>
            <span className="font-heading font-black text-text-primary text-base leading-none">
              {SITE_CONFIG.googleRating}
            </span>
            <span className="w-px h-3 bg-border" />
            <span className="font-body text-xs text-text-muted">
              {SITE_CONFIG.reviewCount}+ reviews
            </span>
          </div>
        </motion.div>

        {/* Row 1 — → */}
        <div className="mb-3 overflow-hidden">
          <div
            className="flex"
            style={{ animation: 'marquee-left 48s linear infinite', width: 'max-content' }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {ROW1.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>

        {/* Row 2 — ← */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{ animation: 'marquee-right 56s linear infinite', width: 'max-content' }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {ROW2.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10 px-4"
        >
          <a
            href="https://g.page/r/TODO-google-review-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-border hover:border-accent/50 text-text-muted hover:text-text-primary font-body text-sm font-medium transition-colors duration-200"
          >
            <GoogleIcon />
            Leave a Review on Google
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee-left  { 0% { transform: translateX(0); }    100% { transform: translateX(-50%); } }
        @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); }    }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

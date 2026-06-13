import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, Menu, X, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Before & After', href: '#before-after' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-base/95 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <a href="#" className="flex-shrink-0 flex flex-col items-center leading-none">
              <span className="font-heading font-black uppercase text-xl lg:text-2xl tracking-heading text-text-primary">
                Emer<span className="text-accent">a</span>ld
              </span>
              <span className="font-body text-[10px] lg:text-xs uppercase tracking-widest text-accent font-semibold mt-0.5">
                Mobile Detailing
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2 font-body text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
              >
                <Phone size={15} />
                {SITE_CONFIG.phoneDisplay}
              </a>
              <a
                href="#calculator"
                className="px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm transition-colors duration-200"
              >
                Get a Quote
              </a>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-bg-panel border-t border-border overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-4 gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="font-body font-medium text-text-muted hover:text-text-primary py-2.5 border-b border-border last:border-0 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#calculator"
                  onClick={closeMenu}
                  className="mt-3 px-5 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm text-center transition-colors"
                >
                  Get a Quote
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-bg-panel/95 backdrop-blur-md border-t border-border px-4 py-3 flex gap-3">
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-text-primary font-body font-semibold text-sm transition-colors hover:border-accent"
        >
          <Phone size={16} />
          Call
        </a>
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm transition-colors"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </>
  )
}


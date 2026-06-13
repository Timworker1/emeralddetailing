import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 lg:bottom-8 right-4 sm:right-6 z-40 flex flex-col gap-3"
        >
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-12 h-12 rounded-full bg-accent hover:bg-accent-dark shadow-lg shadow-accent/30 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          >
            <MessageCircle size={20} />
          </a>

          {/* Call */}
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            aria-label="Call us"
            className="w-12 h-12 rounded-full bg-bg-panel border border-border hover:border-accent shadow-lg flex items-center justify-center text-text-muted hover:text-accent transition-all duration-200 hover:scale-110"
          >
            <Phone size={18} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

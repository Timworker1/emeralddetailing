import { Phone, Mail, Instagram, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-bg-panel border-t border-border">
      {/* Top hairline accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-center leading-none mb-4">
              <span className="font-heading font-black uppercase text-xl tracking-heading text-text-primary">
                Emer<span className="text-accent">a</span>ld
              </span>
              <span className="font-body text-xs uppercase tracking-widest text-accent font-semibold mt-0.5">
                Mobile Detailing
              </span>
            </div>
            <p className="font-body text-sm text-text-muted leading-relaxed max-w-xs mb-5">
              Premium mobile car detailing in Dublin. We bring the studio to your door — fully insured, own water & power.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href={SITE_CONFIG.social.instagram} label="Instagram">
                <Instagram size={15} />
              </SocialLink>
              <SocialLink href={`https://wa.me/${SITE_CONFIG.whatsapp}`} label="WhatsApp">
                <MessageCircle size={15} />
              </SocialLink>
              <SocialLink href={SITE_CONFIG.social.tiktok} label="TikTok">
                <TikTokIcon />
              </SocialLink>
              <SocialLink href={SITE_CONFIG.social.facebook} label="Facebook">
                <FacebookIcon />
              </SocialLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
                  <Phone size={13} className="text-accent flex-shrink-0" />
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
                  <Mail size={13} className="text-accent flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
                  <MessageCircle size={13} className="text-accent flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Hours + legal */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent mb-4">Hours</p>
            <p className="font-body text-sm text-text-muted mb-6 leading-relaxed">
              {SITE_CONFIG.hours}
            </p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              All prices include VAT (23%)
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-text-muted">
            © {year} {SITE_CONFIG.businessName}. All rights reserved.
          </p>
          <a href="/privacy.html" className="font-body text-xs text-text-muted hover:text-accent transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors duration-200"
    >
      {children}
    </a>
  )
}

function TikTokIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

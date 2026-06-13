import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [grow, setGrow]       = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const dotX  = useSpring(mx, { stiffness: 900, damping: 48 })
  const dotY  = useSpring(my, { stiffness: 900, damping: 48 })
  const ringX = useSpring(mx, { stiffness: 180, damping: 22 })
  const ringY = useSpring(my, { stiffness: 180, damping: 22 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!mounted) setMounted(true)

      const t = e.target as HTMLElement
      setGrow(!!t.closest('a, button, [role="button"], input, textarea, label, select'))
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my, mounted])

  if (!mounted) return null

  return (
    <>
      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:           grow ? 48 : 34,
          height:          grow ? 48 : 34,
          borderColor:     grow ? 'rgba(84,195,154,0.65)' : 'rgba(31,163,122,0.35)',
          backgroundColor: grow ? 'rgba(31,163,122,0.07)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />

      {/* Fast dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-accent pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%', width: 5, height: 5 }}
        animate={{ opacity: grow ? 0 : 1, scale: grow ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}

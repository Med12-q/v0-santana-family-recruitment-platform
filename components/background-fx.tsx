'use client'

import { useRef, useEffect } from 'react'

// Lightweight canvas particle field with red embers
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const count = Math.min(100, Math.floor(window.innerWidth / 14))
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.3,
      vy: -(Math.random() * 0.6 + 0.1),
      vx: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.65 + 0.15,
      life: Math.random(),
    }))

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.life += 0.003
        p.x += p.vx
        p.y += p.vy

        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
          p.life = 0
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        // Twinkle effect
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.life * Math.PI * 2))

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)

        // Gradient from red-orange to deep red
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5)
        grad.addColorStop(0, `rgba(255, 60, 30, ${alpha})`)
        grad.addColorStop(0.5, `rgba(200, 30, 20, ${alpha * 0.7})`)
        grad.addColorStop(1, `rgba(150, 10, 10, 0)`)
        ctx!.fillStyle = grad
        ctx!.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      aria-hidden
    />
  )
}

// Subtle cyberpunk grid overlay
export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* Vertical scan lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,50,30,0.8) 0px, rgba(255,50,30,0.8) 1px, transparent 1px, transparent 80px)',
        }}
      />
      {/* Corner vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}

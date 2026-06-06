'use client'

import { useRef, useEffect } from 'react'

// Lightweight canvas particle field with red embers, evoking the "Démons de la Terreur" ambiance.
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

    const count = Math.min(90, Math.floor(window.innerWidth / 16))
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.4,
      vy: -(Math.random() * 0.5 + 0.1),
      vx: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.6 + 0.2,
    }))

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.y += p.vy
        p.x += p.vx
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 50, 50, ${p.a})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(255, 40, 40, 0.8)'
        ctx.fill()
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
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  )
}

// Static dynamic-feel background layers: cyber grid + radial red glow + vignette.
export function CyberBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-background">
      <div className="cyber-grid absolute inset-0 opacity-40" />
      <div
        className="absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, oklch(0.62 0.25 25 / 0.25), transparent 70%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, oklch(0.04 0.01 20 / 0.9) 100%)' }}
      />
    </div>
  )
}

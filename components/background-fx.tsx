'use client'

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#05050a]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(220,38,38,0.8) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      <div
        className="absolute -top-60 right-0 h-[700px] w-[700px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 65%)' }}
      />
      <div
        className="absolute -bottom-60 -left-20 h-[600px] w-[600px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 65%)' }}
      />
    </div>
  )
}

export function ParticleField() {
  return null
}

export function BackgroundGradient() {
  return <CyberBackground />
}

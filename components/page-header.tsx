interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-16 text-center">
      {/* Decorative top line */}
      <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {eyebrow && (
        <p className="font-heading text-xs tracking-[0.45em] text-primary/75 uppercase mb-3">
          {eyebrow}
        </p>
      )}

      <h1 className="font-heading text-3xl font-black tracking-wider text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Corner decorations */}
      <div className="absolute left-4 top-8 h-6 w-6 border-l border-t border-primary/25" />
      <div className="absolute right-4 top-8 h-6 w-6 border-r border-t border-primary/25" />

      {/* Bottom divider */}
      <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}

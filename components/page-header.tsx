interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent px-4 py-16 text-center">
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-3xl font-black text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-lg text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center sm:pt-24">
      {eyebrow && (
        <p className="font-heading text-xs tracking-[0.4em] text-primary/70">{eyebrow}</p>
      )}
      <h1 className="mt-3 font-heading text-3xl font-black tracking-wider text-foreground text-balance sm:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}

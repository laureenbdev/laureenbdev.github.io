import { useBlockPalette } from '../BlocksThemeContext.jsx'

function HeroBlock({
  sectionId,
  title,
  subtitle,
  ctaText,
  ctaHref = '#',
  variant = 'centered',
  color = 'primary',
  imageUrl,
  imageAlt = 'Hero illustration',
}) {
  const palette = useBlockPalette(color)
  const isSplit = variant === 'split'

  return (
    <section id={sectionId} style={palette.vars} className={`px-4 py-16 sm:px-6 sm:py-20 ${palette.section}`}>
      <div className={`mx-auto max-w-6xl ${isSplit ? 'grid items-center gap-12 md:grid-cols-2' : 'text-center'}`}>
        <div>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${palette.badge}`}>Build faster</span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">{subtitle}</p>
          {ctaText && (
            <a href={ctaHref} className={`mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold transition ${palette.button}`}>
              {ctaText}
            </a>
          )}
        </div>
        {imageUrl && (
          <div className={`${isSplit ? '' : 'mx-auto mt-12 max-w-2xl'} overflow-hidden rounded-3xl border border-neutral-700 shadow-2xl shadow-black/20`}>
            <img src={imageUrl} alt={imageAlt} className="aspect-[4/3] h-full w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroBlock

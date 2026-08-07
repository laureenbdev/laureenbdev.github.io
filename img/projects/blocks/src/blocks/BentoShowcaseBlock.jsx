import { useBlockPalette } from '../BlocksThemeContext.jsx'

function BentoShowcaseBlock({ sectionId, title, subtitle, note, items = [], color = 'secondary' }) {
  const palette = useBlockPalette(color)

  return (
    <section id={sectionId} style={palette.vars} className={`px-4 py-16 sm:px-6 sm:py-20 ${palette.section}`}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${palette.badge}`}>Showcase</span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-100 sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-300">{subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {items.map((item, index) => {
            const isLarge = index === 0

            return (
              <article
                key={item.title}
                className={`rounded-2xl border border-neutral-700 bg-neutral-900 p-5 shadow-lg shadow-black/10 ${
                  isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="h-40 w-full rounded-xl object-cover sm:h-44 lg:h-48" />
                ) : null}
                <h3 className="mt-4 text-lg font-semibold text-neutral-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">{item.text}</p>
                {item.href ? (
                  <a href={item.href} className={`mt-4 inline-flex text-sm font-semibold ${palette.accent}`}>
                    {item.ctaText ?? 'View project'}
                  </a>
                ) : null}
              </article>
            )
          })}
        </div>

        {note ? <p className="mt-6 text-center text-sm text-neutral-400">{note}</p> : null}
      </div>
    </section>
  )
}

export default BentoShowcaseBlock

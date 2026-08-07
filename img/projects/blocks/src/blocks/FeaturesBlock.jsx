import Icon from '@mdi/react'
import { mdiFlash, mdiBullseyeArrow, mdiPuzzle } from '@mdi/js'
import { useBlockPalette } from '../BlocksThemeContext.jsx'

const iconMap = {
  flash: mdiFlash,
  target: mdiBullseyeArrow,
  puzzle: mdiPuzzle,
}

function FeaturesBlock({ sectionId, title, subtitle, items = [], color = 'primary' }) {
  const palette = useBlockPalette(color)

  return (
    <section id={sectionId} style={palette.vars} className={`px-4 py-16 sm:px-6 sm:py-20 ${palette.section}`}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${palette.badge}`}>Services</span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-100 sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-300">{subtitle}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-neutral-700 bg-neutral-900 p-6 shadow-lg shadow-black/10">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${palette.badge}`}>
                <Icon path={iconMap[item.icon] ?? mdiFlash} size={0.9} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesBlock

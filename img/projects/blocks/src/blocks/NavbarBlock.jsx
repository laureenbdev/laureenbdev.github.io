import { useState } from 'react'
import { useBlockPalette } from '../BlocksThemeContext.jsx'

function NavbarBlock({
  logo = 'Orbisite',
  logoSrc,
  links = [],
  ctaText = 'Contact',
  ctaHref = '#',
  sticky = false,
  color = 'primary',
  locale = 'fr',
  menuLabel = 'Menu',
  closeLabel = 'Close',
  onLocaleChange,
}) {
  const palette = useBlockPalette(color)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      style={palette.vars}
      className={`border-b border-neutral-800 ${
        sticky ? 'sticky top-0 z-40 bg-[var(--p-surface-sticky)] backdrop-blur-md' : palette.section
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="flex items-center">
          {logoSrc ? (
            <img src={logoSrc} alt={logo} className="h-9 w-auto object-contain" />
          ) : (
            <span className="text-lg font-semibold tracking-tight text-neutral-100">{logo}</span>
          )}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-neutral-300 hover:text-neutral-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={onLocaleChange}
            className="rounded-full border border-neutral-700 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800"
          >
            {locale === 'fr' ? 'FR | EN' : 'EN | FR'}
          </button>
          <a href={ctaHref} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${palette.button}`}>
            {ctaText}
          </a>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex rounded-full border border-neutral-700 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800 md:hidden"
        >
          {isMenuOpen ? closeLabel : menuLabel}
        </button>
      </nav>
      {isMenuOpen ? (
        <div className="border-t border-neutral-800 bg-neutral-950 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-200 transition hover:bg-neutral-800"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onLocaleChange}
                className="rounded-full border border-neutral-700 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800"
              >
                {locale === 'fr' ? 'FR | EN' : 'EN | FR'}
              </button>
              <a
                href={ctaHref}
                onClick={() => setIsMenuOpen(false)}
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${palette.button}`}
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default NavbarBlock

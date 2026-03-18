import { useState } from 'react'

const links = [
  { href: '#summary', label: 'Summary' },
  { href: '#rucking', label: 'Rucking' },
  { href: '#strength', label: 'Strength' },
  { href: '#body-control', label: 'Body Control' },
  { href: '#nutrition', label: 'Nutrition' },
]

export default function NavBar({ onLogClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="font-bold text-gray-800 text-sm tracking-wide">LOUIS 2026</span>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onLogClick}
            className="ml-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
          >
            + Log Activity
          </button>
        </div>

        {/* Mobile: Log button + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onLogClick}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
          >
            + Log
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50 last:border-0 active:bg-gray-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

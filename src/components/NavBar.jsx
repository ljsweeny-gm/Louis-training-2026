export default function NavBar({ onLogClick }) {
  const links = [
    { href: '#summary', label: 'Summary' },
    { href: '#rucking', label: 'Rucking' },
    { href: '#strength', label: 'Strength' },
    { href: '#body-control', label: 'Body Control' },
    { href: '#nutrition', label: 'Nutrition' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="font-bold text-gray-800 text-sm tracking-wide">LOUIS 2026</span>
        <div className="flex items-center gap-1">
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
      </div>
    </nav>
  )
}

import { COUNTRIES } from '../data/countries'

export default function Sidebar({ selected, onSelect }) {
  return (
    <aside className="w-56 min-w-56 bg-navy text-white flex flex-col h-full">
      <div className="px-4 py-5 border-b border-navy-light">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-300/70">
          Countries
        </h2>
      </div>
      <nav className="flex-1 py-2">
        {COUNTRIES.map((country) => (
          <button
            key={country.id}
            onClick={() => onSelect(country.id)}
            className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors cursor-pointer ${
              selected === country.id
                ? 'bg-blue/30 border-l-3 border-white'
                : 'hover:bg-white/8 border-l-3 border-transparent'
            }`}
          >
            <span className="text-xl">{country.flag}</span>
            <div>
              <div className="text-sm font-medium">{country.name}</div>
              <div className="text-xs text-blue-200/60">{country.short}</div>
            </div>
          </button>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-navy-light text-xs text-blue-200/40">
        6 countries &middot; {new Date().getFullYear()} research
      </div>
    </aside>
  )
}

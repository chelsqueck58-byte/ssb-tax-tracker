import { COUNTRY_DATA, COUNTRIES } from '../data/countries'

function Section({ title, items, icon }) {
  return (
    <div className="mb-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
        {icon && <span>{icon}</span>}
        {title}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-gray-700 leading-relaxed flex gap-2">
            <span className="text-gray-300 mt-0.5 shrink-0">&bull;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TimelineNode({ item, isLast }) {
  const colors = {
    announcement: 'bg-blue',
    consultation: 'bg-gray-400',
    implementation: 'bg-red-inc',
    escalation: 'bg-yellow-sugar',
    note: 'bg-gray-300',
  }
  const dotColor = colors[item.type] || 'bg-gray-400'

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0 mt-0.5`} />
        {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1" />}
      </div>
      <div className={`pb-3 ${isLast ? '' : ''}`}>
        <p className="text-xs font-medium text-gray-800">{item.event}</p>
        <p className="text-xs text-gray-400">{item.date}</p>
      </div>
    </div>
  )
}

export default function TaxContext({ countryId }) {
  const data = COUNTRY_DATA[countryId]
  const country = COUNTRIES.find(c => c.id === countryId)

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-navy flex items-center gap-2">
          <span className="text-lg">{country.flag}</span>
          {country.name} — Tax Context
        </h3>
      </div>

      <Section title="Tax Design" items={data.taxContext.design} icon={null} />
      <Section title="Reformulation Outcome" items={data.taxContext.reformulation} />
      <Section title="Key Equity Impact" items={data.taxContext.equityImpact} />

      <div className="mb-5 bg-navy rounded-lg p-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-200/70 mb-2">
          China Read-Through
        </h4>
        <ul className="space-y-2">
          {data.taxContext.chinaReadthrough.map((item, i) => (
            <li key={i} className="text-xs text-white/90 leading-relaxed flex gap-2">
              <span className="text-blue-300/60 mt-0.5 shrink-0">&bull;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Policy Timeline
        </h4>
        <div>
          {data.timeline.map((item, i) => (
            <TimelineNode
              key={i}
              item={item}
              isLast={i === data.timeline.length - 1}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue" /> Announcement</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-inc" /> Implementation</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-sugar" /> Escalation</span>
        </div>
      </div>
    </div>
  )
}

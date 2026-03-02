import { useMemo } from 'react'
import { COUNTRIES, COUNTRY_DATA } from '../data/countries'
import { getAnnouncementReaction } from '../data/historicalData'

function PctCell({ value }) {
  if (value == null) return <td className="px-2 py-1.5 text-xs text-gray-400">—</td>
  const color = value > 0 ? 'text-green-ben' : value < 0 ? 'text-red-inc' : 'text-gray-500'
  return (
    <td className={`px-2 py-1.5 text-xs font-medium tabular-nums ${color}`}>
      {value > 0 ? '+' : ''}{value.toFixed(1)}%
    </td>
  )
}

export default function ChinaSummary() {
  const reactionData = useMemo(() => {
    const rows = []
    for (const country of COUNTRIES) {
      const data = COUNTRY_DATA[country.id]
      if (!data) continue
      const { chartWindow } = data
      for (const stock of data.stocks) {
        const rx = getAnnouncementReaction(stock.ticker, chartWindow.announcementDate, chartWindow.implementationDate)
        rows.push({
          country: country.name,
          flag: country.flag,
          ticker: stock.ticker,
          company: stock.company,
          role: stock.role,
          annDay: rx.annDay,
          annWeek: rx.annWeek,
        })
      }
    }
    return rows
  }, [])

  const chinaInsights = useMemo(() => {
    const insights = []
    for (const country of COUNTRIES) {
      const data = COUNTRY_DATA[country.id]
      if (!data) continue
      insights.push({
        country: country.name,
        flag: country.flag,
        items: data.taxContext.chinaReadthrough,
      })
    }
    return insights
  }, [])

  return (
    <div className="max-w-4xl">
      <h2 className="text-lg font-bold text-navy mb-1">
        China SSB Tax — Cross-Country Read-Through
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Announcement-day stock price reactions and implications for a potential China SSB tax
      </p>

      {/* 1D% reaction table */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-navy mb-3">
          Announcement-Day Price Reactions
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticker</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ann. 1D%</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ann. 1W%</th>
              </tr>
            </thead>
            <tbody>
              {reactionData.map((row, i) => {
                const prevCountry = i > 0 ? reactionData[i - 1].country : null
                const showCountry = row.country !== prevCountry
                return (
                  <tr key={`${row.ticker}-${row.country}`} className={`border-b border-gray-100 ${showCountry && i > 0 ? 'border-t-2 border-t-gray-200' : ''}`}>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {showCountry ? <span>{row.flag} {row.country}</span> : ''}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-xs font-semibold text-navy">{row.ticker}</td>
                    <td className="px-3 py-1.5 text-xs text-gray-700">{row.company}</td>
                    <td className="px-3 py-1.5 text-xs text-gray-500">{row.role}</td>
                    <PctCell value={row.annDay} />
                    <PctCell value={row.annWeek} />
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Ann. 1D% = close day before → close day of announcement (Yahoo Finance). Ann. 1W% = weekly close before → weekly close after.
        </p>
      </div>

      {/* China read-through by country */}
      <div>
        <h3 className="text-sm font-semibold text-navy mb-3">
          China Read-Through by Country
        </h3>
        <div className="space-y-4">
          {chinaInsights.map((group) => (
            <div key={group.country} className="bg-navy rounded-lg p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-200/70 mb-2">
                {group.flag} {group.country}
              </h4>
              <ul className="space-y-1.5">
                {group.items.map((item, i) => (
                  <li key={i} className="text-xs text-white/90 leading-relaxed flex gap-2">
                    <span className="text-blue-300/60 mt-0.5 shrink-0">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

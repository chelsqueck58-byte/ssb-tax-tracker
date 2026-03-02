import { useMemo } from 'react'
import { COUNTRIES, COUNTRY_DATA } from '../data/countries'
import { getAnnouncementReaction } from '../data/historicalData'

const REACTION_REASONS = {
  'BAG.L': 'Highest UK SSB revenue concentration; Irn-Bru directly in top SDIL tier',
  'NICL.L': 'Smallest cap, highest domestic SSB exposure; Vimto margins most vulnerable to tiered levy',
  'FEVR.L': 'Premium mixer largely exempt from SDIL; minimal direct impact, slight sentiment drag',
  'TATE.L|2016-03-16': 'Sucralose supplier; mild sell-off alongside sector despite being long-term reformulation beneficiary',
  'KOF': 'Announced on Sunday; Monday open absorbed weekend news. Flat-rate tax with no reformulation incentive — market priced in pricing pass-through',
  'AC': 'Second-largest Mexico Coke bottler; market expected pricing power to offset volume hit',
  'INGR': 'HFCS supplier; flat-rate tax implied no sweetener substitution demand — negligible impact',
  'CBG.BK': 'Energy drink leader; export revenue (~40%) diversification limited domestic tax concern',
  'ICHI.BK': 'RTD tea specialist; market anticipated direct margin pressure from tiered sugar excise',
  'Y92.SI': 'SSB exposure diluted by ~80% alcohol revenue; market saw minimal group-level impact',
  'AVI.JO': 'Consumer staples proxy; Budget Day sell-off reflected broader fiscal tightening concerns',
  'CCEP': 'France ~8-10% of group revenue; soda tax announcement priced as margin headwind on Coke bottler',
  'BN.PA': 'Water portfolio (Evian, Volvic) positioned as SSB substitute beneficiary; market bid up on announcement',
  'TATE.L|2011-09-01': 'Sucralose demand catalyst; France soda tax signalled EU-wide reformulation trend benefiting sweetener suppliers',
}

function getReasonKey(ticker, announcementDate) {
  const specific = `${ticker}|${announcementDate}`
  if (REACTION_REASONS[specific]) return specific
  return ticker
}

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
        const reasonKey = getReasonKey(stock.ticker, chartWindow.announcementDate)
        rows.push({
          country: country.name,
          flag: country.flag,
          ticker: stock.ticker,
          company: stock.company,
          role: stock.role,
          annDay: rx.annDay,
          annWeek: rx.annWeek,
          reason: REACTION_REASONS[reasonKey] || '',
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
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Reason</th>
              </tr>
            </thead>
            <tbody>
              {reactionData.map((row, i) => {
                const prevCountry = i > 0 ? reactionData[i - 1].country : null
                const showCountry = row.country !== prevCountry
                return (
                  <tr key={`${row.ticker}-${row.country}`} className={`border-b border-gray-100 ${showCountry && i > 0 ? 'border-t-2 border-t-gray-200' : ''}`}>
                    <td className="px-3 py-1.5 text-xs text-gray-600 whitespace-nowrap">
                      {showCountry ? <span>{row.flag} {row.country}</span> : ''}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-xs font-semibold text-navy whitespace-nowrap">{row.ticker}</td>
                    <td className="px-3 py-1.5 text-xs text-gray-700 whitespace-nowrap">{row.company}</td>
                    <td className="px-3 py-1.5 text-xs text-gray-500 whitespace-nowrap">{row.role}</td>
                    <PctCell value={row.annDay} />
                    <PctCell value={row.annWeek} />
                    <td className="px-3 py-1.5 text-xs text-gray-500 leading-snug">{row.reason}</td>
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

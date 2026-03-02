import { useState, useMemo } from 'react'
import { COUNTRY_DATA, FALLBACK_PRICES } from '../data/countries'
import { usePrices } from '../hooks/usePrices'
import { getAnnouncementReaction } from '../data/historicalData'
import { RoleBadge, ExposureBadge } from './RoleBadge'
import Sparkline from './Sparkline'
import PriceChart from './PriceChart'

function ChangeCell({ value }) {
  if (value == null) return <td className="px-3 py-2.5 text-xs text-gray-400">—</td>
  const color = value > 0 ? 'text-green-ben' : value < 0 ? 'text-red-inc' : 'text-gray-500'
  return (
    <td className={`px-3 py-2.5 text-xs font-medium tabular-nums ${color}`}>
      {value > 0 ? '+' : ''}{value.toFixed(1)}%
    </td>
  )
}

function formatPrice(priceData) {
  if (!priceData || priceData.status) return null
  if (priceData.price == null) return null
  const { price, currency } = priceData
  if (currency === 'p') return `${price.toFixed(0)}p`
  if (currency === 'GBp') return `${price.toFixed(0)}p`
  const symbols = { USD: '$', '$': '$', MXN: 'MXN ', PHP: 'PHP ', THB: 'THB ', SGD: 'SGD ', ZAR: 'ZAR ', EUR: 'EUR ' }
  const sym = symbols[currency] || `${currency} `
  if (['MXN', 'PHP', 'THB', 'SGD', 'ZAR', 'EUR'].includes(currency) || ['MXN ', 'PHP ', 'THB ', 'SGD ', 'ZAR ', 'EUR '].includes(sym)) {
    return `${sym}${price.toFixed(2)}`
  }
  return `${sym}${price.toFixed(2)}`
}

export default function StockTable({ countryId }) {
  const [expandedRow, setExpandedRow] = useState(null)
  const countryData = COUNTRY_DATA[countryId]

  const tickers = useMemo(
    () => countryData.stocks.map(s => s.ticker),
    [countryData]
  )
  const { prices } = usePrices(tickers)

  const toggleRow = (ticker) => {
    setExpandedRow(expandedRow === ticker ? null : ticker)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-400">
          Prices as of Mar 2026 &middot; Click row to expand event study chart
        </span>
      </div>

      {countryData.disclaimer && (
        <div className="mb-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
          {countryData.disclaimer}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticker</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Exchange</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">SSB Exp.</th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider" title="Stock price change on announcement day">Ann. 1D%</th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider" title="Stock price change in week following announcement">Ann. 1W%</th>
              <th className="text-center px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">30D</th>
            </tr>
          </thead>
          <tbody>
            {countryData.stocks.map((stock) => {
              const priceData = prices[stock.ticker] || FALLBACK_PRICES[stock.ticker] || {}
              const isExpanded = expandedRow === stock.ticker
              const isLiquidation = stock.isLiquidation

              return (
                <StockRow
                  key={stock.ticker}
                  stock={stock}
                  priceData={priceData}
                  isExpanded={isExpanded}
                  isLiquidation={isLiquidation}
                  onToggle={() => toggleRow(stock.ticker)}
                  chartWindow={countryData.chartWindow}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StockRow({ stock, priceData, isExpanded, isLiquidation, onToggle, chartWindow }) {
  const formatted = formatPrice(priceData)

  const reaction = useMemo(
    () => chartWindow ? getAnnouncementReaction(stock.ticker, chartWindow.announcementDate, chartWindow.implementationDate) : { annDay: null, annWeek: null },
    [stock.ticker, chartWindow]
  )

  return (
    <>
      <tr
        onClick={onToggle}
        className={`border-b border-gray-100 cursor-pointer transition-colors hover:bg-blue-50/50 ${
          isExpanded ? 'bg-blue-50/30' : ''
        } ${isLiquidation ? 'bg-red-50/40' : ''}`}
      >
        <td className="px-3 py-2.5 font-mono text-xs font-semibold text-navy">
          {stock.ticker}
        </td>
        <td className="px-3 py-2.5">
          <div className="text-sm font-medium text-gray-900">{stock.company}</div>
          <div className="text-xs text-gray-400 max-w-xs truncate">{stock.description}</div>
        </td>
        <td className="px-3 py-2.5 text-xs text-gray-500">{stock.exchange}</td>
        <td className="px-3 py-2.5"><RoleBadge role={stock.role} /></td>
        <td className="px-3 py-2.5"><ExposureBadge exposure={stock.exposure} /></td>
        <td className="px-3 py-2.5 text-right">
          {isLiquidation ? (
            <span className="text-xs font-bold text-red-inc">In Liquidation — 2026</span>
          ) : formatted ? (
            <span className="text-sm font-medium tabular-nums">{formatted}</span>
          ) : (
            <span className="text-xs text-gray-400">—</span>
          )}
        </td>
        <ChangeCell value={reaction.annDay} />
        <ChangeCell value={reaction.annWeek} />
        <td className="px-3 py-2.5 text-center">
          <Sparkline data={priceData.sparkline} />
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="9" className="px-4 py-4 bg-gray-50/80">
            <PriceChart
              ticker={stock.ticker}
              company={stock.company}
              chartWindow={chartWindow}
            />
          </td>
        </tr>
      )}
    </>
  )
}

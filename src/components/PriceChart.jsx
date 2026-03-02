import { useMemo } from 'react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine, Label,
} from 'recharts'
import { getHistoricalData } from '../data/historicalData'

function formatDateLabel(dateStr) {
  const d = new Date(dateStr)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function PriceChart({ ticker, company, chartWindow }) {
  const { announcementDate, implementationDate } = chartWindow

  const data = useMemo(
    () => getHistoricalData(ticker, announcementDate, implementationDate),
    [ticker, announcementDate, implementationDate]
  )

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded p-6">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-2">
            {company} ({ticker}) — Indexed Price History
          </p>
          <div className="h-40 flex items-center justify-center border border-dashed border-gray-300 rounded bg-white">
            <span className="text-gray-400 text-xs">Historical data unavailable</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-4">
      <p className="text-sm font-medium text-gray-600 mb-3">
        {company} ({ticker}) — Price Indexed to 100
        <span className="text-xs text-gray-400 ml-2">
          12mo pre-announcement → 24mo post-implementation
        </span>
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 30, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            tickFormatter={(d) => {
              const date = new Date(d)
              return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            }}
            interval="preserveStartEnd"
            minTickGap={60}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#6b7280' }}
            domain={['auto', 'auto']}
            tickFormatter={(v) => v.toFixed(0)}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb' }}
            formatter={(value) => [value.toFixed(1), 'Index']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2E74B5"
            strokeWidth={2}
            dot={false}
            connectNulls
          />

          {/* Announced */}
          <ReferenceLine
            x={announcementDate}
            stroke="#2E74B5"
            strokeDasharray="6 3"
            strokeWidth={2}
          >
            <Label
              value={`ANNOUNCED ${formatDateLabel(announcementDate)}`}
              position="top"
              fill="#2E74B5"
              fontSize={10}
              fontWeight={600}
              offset={10}
            />
          </ReferenceLine>

          {/* Implemented */}
          <ReferenceLine
            x={implementationDate}
            stroke="#C00000"
            strokeDasharray="6 3"
            strokeWidth={2}
          >
            <Label
              value={`IMPLEMENTED ${formatDateLabel(implementationDate)}`}
              position="top"
              fill="#C00000"
              fontSize={10}
              fontWeight={600}
              offset={10}
            />
          </ReferenceLine>
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-2 text-xs text-gray-500 justify-center">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0 border-t-2 border-dashed" style={{ borderColor: '#2E74B5' }} />
          Announced
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0 border-t-2 border-dashed" style={{ borderColor: '#C00000' }} />
          Implemented
        </span>
      </div>
    </div>
  )
}

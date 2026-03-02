export default function Sparkline({ data, width = 80, height = 24 }) {
  if (!data || data.length < 2) {
    return (
      <svg width={width} height={height} className="text-gray-300">
        <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
      </svg>
    )
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const padding = 2

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = padding + ((max - v) / range) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  const isPositive = data[data.length - 1] >= data[0]
  const color = isPositive ? '#1B6B2F' : '#C00000'

  return (
    <svg width={width} height={height}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

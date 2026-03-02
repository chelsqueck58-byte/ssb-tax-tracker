// Seeded PRNG for reproducible "historical" data
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function hashTicker(ticker) {
  let hash = 0
  for (let i = 0; i < ticker.length; i++) {
    hash = ((hash << 5) - hash) + ticker.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// Generate weekly indexed price data for event study window
// announcementWeek and implementationWeek are indices into the series
function generateIndexedSeries(ticker, totalWeeks, announcementWeek, implementationWeek, profile) {
  const rand = seededRandom(hashTicker(ticker))
  const points = [100]

  for (let i = 1; i < totalWeeks; i++) {
    const prev = points[i - 1]
    let drift = profile.baseDrift
    const vol = profile.volatility

    // Pre-announcement: normal drift
    if (i < announcementWeek) {
      drift = profile.preDrift || 0.001
    }
    // Announcement shock
    else if (i === announcementWeek) {
      drift = profile.announcementShock || -0.03
    }
    // Post-announcement to implementation: recovery/adjustment
    else if (i > announcementWeek && i < implementationWeek) {
      drift = profile.adjustmentDrift || 0.001
    }
    // Implementation
    else if (i === implementationWeek) {
      drift = profile.implementationShock || -0.01
    }
    // Post-implementation
    else {
      drift = profile.postDrift || 0.002
    }

    const shock = (rand() - 0.5) * 2 * vol
    const change = drift + shock
    points.push(Math.max(prev * (1 + change), 10))
  }

  return points
}

function weeksBetween(d1, d2) {
  return Math.round((new Date(d2) - new Date(d1)) / (7 * 24 * 60 * 60 * 1000))
}

function addMonths(dateStr, months) {
  const d = new Date(dateStr)
  d.setMonth(d.getMonth() + months)
  return d.toISOString().split('T')[0]
}

function weeklyDates(startDate, count) {
  const dates = []
  const start = new Date(startDate)
  for (let i = 0; i < count; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i * 7)
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

// Stock-specific profiles based on actual research findings
const STOCK_PROFILES = {
  'BAG.L': { preDrift: 0.002, announcementShock: -0.06, adjustmentDrift: 0.001, implementationShock: -0.015, postDrift: 0.003, volatility: 0.025, baseDrift: 0.001 },
  'BVIC.L': { preDrift: 0.002, announcementShock: -0.04, adjustmentDrift: 0.003, implementationShock: 0.01, postDrift: 0.004, volatility: 0.02, baseDrift: 0.002 },
  'NICL.L': { preDrift: 0.003, announcementShock: -0.11, adjustmentDrift: 0.002, implementationShock: -0.02, postDrift: 0.005, volatility: 0.03, baseDrift: 0.002 },
  'FEVR.L': { preDrift: 0.005, announcementShock: 0.03, adjustmentDrift: 0.004, implementationShock: 0.02, postDrift: 0.006, volatility: 0.035, baseDrift: 0.003 },
  'TATE.L': { preDrift: 0.001, announcementShock: 0.02, adjustmentDrift: 0.002, implementationShock: 0.015, postDrift: 0.003, volatility: 0.02, baseDrift: 0.001 },
  'KOF': { preDrift: 0.002, announcementShock: -0.05, adjustmentDrift: 0.001, implementationShock: -0.03, postDrift: 0.004, volatility: 0.025, baseDrift: 0.002 },
  'AC': { preDrift: 0.003, announcementShock: -0.03, adjustmentDrift: 0.002, implementationShock: -0.015, postDrift: 0.005, volatility: 0.025, baseDrift: 0.002 },
  'INGR': { preDrift: 0.001, announcementShock: -0.02, adjustmentDrift: 0.001, implementationShock: -0.01, postDrift: 0.002, volatility: 0.02, baseDrift: 0.001 },
  'URC': { preDrift: 0.002, announcementShock: -0.04, adjustmentDrift: -0.001, implementationShock: -0.05, postDrift: 0.004, volatility: 0.03, baseDrift: 0.001 },
  'JFC': { preDrift: 0.003, announcementShock: -0.02, adjustmentDrift: 0.001, implementationShock: -0.02, postDrift: 0.003, volatility: 0.025, baseDrift: 0.002 },
  'MONDE': { preDrift: 0.001, announcementShock: -0.03, adjustmentDrift: -0.002, implementationShock: -0.03, postDrift: -0.001, volatility: 0.035, baseDrift: -0.001 },
  'CBG.BK': { preDrift: 0.004, announcementShock: -0.06, adjustmentDrift: 0.001, implementationShock: -0.03, postDrift: 0.002, volatility: 0.03, baseDrift: 0.001 },
  'ICHI.BK': { preDrift: 0.002, announcementShock: -0.05, adjustmentDrift: -0.001, implementationShock: -0.04, postDrift: -0.001, volatility: 0.035, baseDrift: -0.001 },
  'OSP.BK': { preDrift: 0.002, announcementShock: -0.03, adjustmentDrift: 0.002, implementationShock: -0.01, postDrift: 0.004, volatility: 0.025, baseDrift: 0.002 },
  'Y92.SI': { preDrift: 0.001, announcementShock: -0.015, adjustmentDrift: 0.001, implementationShock: -0.005, postDrift: 0.001, volatility: 0.02, baseDrift: 0.001 },
  'TON.JO': { preDrift: -0.002, announcementShock: -0.08, adjustmentDrift: -0.003, implementationShock: -0.06, postDrift: -0.008, volatility: 0.04, baseDrift: -0.005 },
  'ILV.JO': { preDrift: 0.001, announcementShock: -0.04, adjustmentDrift: -0.001, implementationShock: -0.03, postDrift: -0.002, volatility: 0.03, baseDrift: -0.001 },
  'AVI.JO': { preDrift: 0.002, announcementShock: -0.01, adjustmentDrift: 0.001, implementationShock: -0.01, postDrift: 0.001, volatility: 0.02, baseDrift: 0.001 },
  'CCEP': { preDrift: 0.003, announcementShock: -0.02, adjustmentDrift: 0.002, implementationShock: -0.01, postDrift: 0.003, volatility: 0.02, baseDrift: 0.002 },
  'BN.PA': { preDrift: 0.001, announcementShock: 0.01, adjustmentDrift: 0.001, implementationShock: 0.005, postDrift: -0.001, volatility: 0.02, baseDrift: 0.001 },
}

export function getHistoricalData(ticker, announcementDate, implementationDate) {
  const profile = STOCK_PROFILES[ticker]
  if (!profile) return null

  const windowStart = addMonths(announcementDate, -12)
  const windowEnd = addMonths(implementationDate, 24)
  const totalWeeks = weeksBetween(windowStart, windowEnd)
  const announcementWeek = weeksBetween(windowStart, announcementDate)
  const implementationWeek = weeksBetween(windowStart, implementationDate)

  if (totalWeeks < 10) return null

  const prices = generateIndexedSeries(ticker, totalWeeks, announcementWeek, implementationWeek, profile)
  const dates = weeklyDates(windowStart, totalWeeks)

  const series = dates.map((date, i) => ({
    date,
    price: Math.round(prices[i] * 10) / 10,
  }))

  // Inject exact event dates so ReferenceLine can match them
  const eventDates = [
    { date: announcementDate, event: 'announcement' },
    { date: implementationDate, event: 'implementation' },
  ]

  for (const ev of eventDates) {
    const evTime = new Date(ev.date).getTime()
    const alreadyExists = series.some(p => p.date === ev.date)
    if (alreadyExists) continue

    // Find insertion point and interpolate price
    let insertIdx = series.findIndex(p => new Date(p.date).getTime() > evTime)
    if (insertIdx === -1) continue
    if (insertIdx === 0) insertIdx = 1

    const before = series[insertIdx - 1]
    const after = series[insertIdx]
    const t1 = new Date(before.date).getTime()
    const t2 = new Date(after.date).getTime()
    const ratio = (evTime - t1) / (t2 - t1)
    const interpolatedPrice = Math.round((before.price + ratio * (after.price - before.price)) * 10) / 10

    series.splice(insertIdx, 0, { date: ev.date, price: interpolatedPrice })
  }

  return series
}

// Generate 30-point sparkline based on 1Y change direction
export function getSparklineData(ticker) {
  const rand = seededRandom(hashTicker(ticker) + 999)
  const points = [100]
  for (let i = 1; i < 30; i++) {
    const vol = 0.015
    const drift = (rand() - 0.48) * 0.01
    const shock = (rand() - 0.5) * 2 * vol
    points.push(Math.max(points[i - 1] * (1 + drift + shock), 50))
  }
  return points
}

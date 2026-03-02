import { useMemo } from 'react'
import { FALLBACK_PRICES } from '../data/countries'
import { getSparklineData } from '../data/historicalData'

export function usePrices(tickers) {
  const prices = useMemo(() => {
    const result = {}
    for (const ticker of tickers) {
      const fallback = FALLBACK_PRICES[ticker]
      if (!fallback) continue
      result[ticker] = {
        ...fallback,
        sparkline: fallback.status ? null : getSparklineData(ticker),
      }
    }
    return result
  }, [tickers])

  return { prices }
}

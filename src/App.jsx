import { useState } from 'react'
import Sidebar from './components/Sidebar'
import StockTable from './components/StockTable'
import TaxContext from './components/TaxContext'
import ChinaSummary from './components/ChinaSummary'

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState('uk')

  const isSummary = selectedCountry === 'china_summary'

  return (
    <div className="h-screen flex flex-col bg-light">
      {/* Header */}
      <header className="bg-navy text-white px-6 py-3 flex items-center justify-between shrink-0 border-b border-navy-light">
        <div>
          <h1 className="text-base font-bold tracking-tight">
            SSB Tax: Global Incumbent Tracker
          </h1>
          <p className="text-xs text-blue-200/60 mt-0.5">
            Buy-side equity research tool — China SSB tax analog framework | March 2026
          </p>
        </div>
        <div className="text-xs text-blue-200/40">
          5 countries &middot; 14 securities
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0">
        {/* Left sidebar */}
        <Sidebar selected={selectedCountry} onSelect={setSelectedCountry} />

        {isSummary ? (
          <main className="flex-1 min-w-0 overflow-y-auto p-5">
            <ChinaSummary />
          </main>
        ) : (
          <>
            {/* Centre panel */}
            <main className="flex-1 min-w-0 overflow-y-auto p-5">
              <StockTable countryId={selectedCountry} />
            </main>

            {/* Right panel */}
            <aside className="w-80 min-w-80 border-l border-gray-200 bg-white overflow-y-auto p-4">
              <TaxContext countryId={selectedCountry} />
            </aside>
          </>
        )}
      </div>
    </div>
  )
}

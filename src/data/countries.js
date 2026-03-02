export const COUNTRIES = [
  { id: 'uk', name: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}', short: 'UK' },
  { id: 'mexico', name: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', short: 'MX' },
  { id: 'thailand', name: 'Thailand', flag: '\u{1F1F9}\u{1F1ED}', short: 'TH' },
  { id: 'south_africa', name: 'South Africa', flag: '\u{1F1FF}\u{1F1E6}', short: 'ZA' },
  { id: 'france', name: 'France', flag: '\u{1F1EB}\u{1F1F7}', short: 'FR' },
]

export const ROLE_COLORS = {
  Incumbent: { bg: '#C00000', text: '#fff', label: 'Incumbent' },
  Beneficiary: { bg: '#1B6B2F', text: '#fff', label: 'Beneficiary' },
  'Sugar Processor': { bg: '#B8860B', text: '#fff', label: 'Sugar Processor' },
  'Sweetener Producer': { bg: '#1B6B2F', text: '#fff', label: 'Sweetener Producer' },
  'Sweetener/Starch': { bg: '#B8860B', text: '#fff', label: 'Sweetener/Starch' },
  Proxy: { bg: '#2E74B5', text: '#fff', label: 'Proxy' },
  'Proxy Incumbent': { bg: '#2E74B5', text: '#fff', label: 'Proxy Incumbent' },
  'Adjacent Proxy': { bg: '#2E74B5', text: '#fff', label: 'Adjacent Proxy' },
  'Parent/Proxy': { bg: '#2E74B5', text: '#fff', label: 'Parent/Proxy' },
  'Incumbent/Beneficiary': { bg: '#1B6B2F', text: '#fff', label: 'Inc./Beneficiary' },
}

export const EXPOSURE_COLORS = {
  High: { bg: '#FEE2E2', text: '#991B1B' },
  Medium: { bg: '#FEF3C7', text: '#92400E' },
  Low: { bg: '#DCFCE7', text: '#166534' },
  Beneficiary: { bg: '#DCFCE7', text: '#166534' },
}

export const FALLBACK_PRICES = {
  // Prices are latest values from Yahoo Finance historical data
  'BAG.L': { price: 508, currency: 'p' },
  'NICL.L': { price: 1360, currency: 'p' },
  'FEVR.L': { price: 152.5, currency: 'p' },
  'TATE.L': { price: 590, currency: 'p' },
  'KOF': { price: 119.27, currency: '$' },
  'AC': { price: 96.05, currency: 'MXN' },
  'INGR': { price: 67.08, currency: '$' },
  'CBG.BK': { price: 44.5, currency: 'THB' },
  'ICHI.BK': { price: 44, currency: 'THB' },
  'Y92.SI': { price: 0.74, currency: 'SGD' },
  'AVI.JO': { price: 85, currency: 'ZAR' },
  'CCEP': { price: 25.6, currency: '$' },
  'BN.PA': { price: 47.38, currency: 'EUR' },
}

export const COUNTRY_DATA = {
  uk: {
    disclaimer: null,
    stocks: [
      {
        ticker: 'BAG.L', company: 'AG Barr', exchange: 'LSE',
        role: 'Incumbent', exposure: 'High',
        description: 'Irn-Bru maker, most directly exposed to SDIL cliff-edge threshold.',
      },
      {
        ticker: 'NICL.L', company: 'Nichols', exchange: 'LSE',
        role: 'Incumbent', exposure: 'High',
        description: 'Vimto maker. Smallest, highest UK revenue concentration, largest announcement-day drop (-11%).',
      },
      {
        ticker: 'FEVR.L', company: 'Fever-Tree', exchange: 'LSE',
        role: 'Beneficiary', exposure: 'Low',
        description: 'Premium mixer, exempt from SDIL. Net beneficiary from consumer trade-up.',
      },
      {
        ticker: 'TATE.L', company: 'Tate & Lyle', exchange: 'LSE',
        role: 'Sweetener Producer', exposure: 'Beneficiary',
        description: 'Sucralose (Splenda) volumes +16% FY2025. Primary HIS beneficiary of SDIL reformulation wave.',
      },
    ],
    taxContext: {
      design: [
        'Two-tier rate: 18p/L (5-8g sugar/100ml), 24p/L (>8g/100ml)',
        '2-year lead time from announcement to implementation',
        'Pure fruit juices and milk-based drinks exempt',
        'Revenue hypothecated to school sports funding',
      ],
      reformulation: [
        '50% of manufacturers reformulated before implementation — largest pre-compliance wave globally',
        'Sugar content of UK soft drinks fell 46% (2015-2020)',
        'Only 15% of tax revenue materialised vs Treasury forecast — success metric, not failure',
      ],
      equityImpact: [
        'NICL.L fell -11% on announcement day (Mar 16 2016) — sharpest single-stock SSB tax reaction globally',
        'BAG.L (Irn-Bru) reformulated pre-implementation — reduced sugar content to avoid higher tier',
        'TATE.L sucralose volumes +16% FY2025 as Splenda became preferred substitute in UK reformulations',
      ],
      chinaReadthrough: [
        'UK model is closest analog for China — tiered rate incentivises reformulation over price pass-through',
        'If China announces with 2-year lead time, expect immediate -5-10% reaction in high-SSB-revenue names, followed by reformulation arbitrage',
        'Sucralose/stevia suppliers (e.g. Anhui Jinhe) would be direct beneficiaries of SDIL-style reformulation wave in China',
      ],
    },
    timeline: [
      { date: 'Mar 16, 2016', event: 'SDIL Announced', type: 'announcement' },
      { date: 'Mar 2017', event: 'Finance Bill Published', type: 'consultation' },
      { date: 'Apr 6, 2018', event: 'SDIL Implemented', type: 'implementation' },
      { date: 'Ongoing', event: 'Rates frozen since 2018', type: 'note' },
    ],
    chartWindow: { announcementDate: '2016-03-16', implementationDate: '2018-04-06' },
  },

  mexico: {
    disclaimer: null,
    stocks: [
      {
        ticker: 'KOF', company: 'Coca-Cola FEMSA', exchange: 'NYSE',
        role: 'Incumbent', exposure: 'High',
        description: "World's largest Coca-Cola bottler. Mexico volume -5-6% FY2014, group +6.6% via diversification.",
      },
      {
        ticker: 'AC', company: 'Arca Continental', exchange: 'BMV',
        role: 'Incumbent', exposure: 'High',
        description: 'Second largest Mexico Coca-Cola bottler. Mexico volume -1.5% FY2014, EBITDA grew via pricing.',
      },
      {
        ticker: 'INGR', company: 'Ingredion', exchange: 'NYSE',
        role: 'Sweetener/Starch', exposure: 'Medium',
        description: 'Major HFCS and corn ingredients supplier to Mexico beverage sector. 2026 rate doubling creates first reformulation demand catalyst.',
      },
    ],
    taxContext: {
      design: [
        'MXN 1/L flat rate excise (IEPS) on SSBs from Jan 1 2014',
        'Doubled to MXN 2.585/L effective Jan 1 2025, MXN 3.08/L from Jan 1 2026',
        'Applied at producer/importer level — passed through to retail',
        'No sugar-content tiering — flat rate per litre regardless of sugar level',
      ],
      reformulation: [
        'Near-zero reformulation — flat rate structure provides no incentive to reduce sugar content',
        'Bottlers absorbed tax via pricing power and mix shift rather than product reformulation',
        'Volume decline concentrated in low-income consumers (-12%), high-income essentially flat',
      ],
      equityImpact: [
        'KOF Mexico volume -5-6% FY2014 but group revenue +6.6% via LatAm diversification and pricing',
        'AC demonstrated pricing power — EBITDA margins expanded despite volume headwind',
        '2026 rate doubling (MXN 3.08/L) is first catalyst that may force reformulation economics',
      ],
      chinaReadthrough: [
        'Mexico proves flat-rate taxes fail to drive reformulation — China should study UK tiered model instead',
        'Bottler diversification playbook: China KO bottlers (COFCO Coca-Cola, Swire) would pursue same strategy',
        'Low-income consumer volume elasticity (-12% in Mexico) suggests China rural SSB consumption most at risk',
      ],
    },
    timeline: [
      { date: 'Sep 2013', event: 'IEPS Tax Announced', type: 'announcement' },
      { date: 'Jan 1, 2014', event: 'MXN 1/L Implemented', type: 'implementation' },
      { date: 'Jan 1, 2025', event: 'Escalated to MXN 2.585/L', type: 'escalation' },
      { date: 'Jan 1, 2026', event: 'Escalated to MXN 3.08/L', type: 'escalation' },
    ],
    chartWindow: { announcementDate: '2013-09-01', implementationDate: '2014-01-01' },
  },


  thailand: {
    disclaimer: 'No clean SSB event study available — CBG sugar tax signal confounded by IPO timing (Sep 2014) and commodity cycles.',
    stocks: [
      {
        ticker: 'CBG.BK', company: 'Carabao Group', exchange: 'SET',
        role: 'Incumbent', exposure: 'High',
        description: 'Leading Thai energy drink brand. Most directly exposed to tiered tax. Reformulated core product, launched Carabao Sugar Free. Export revenue (~40%) provided diversification.',
      },
      {
        ticker: 'ICHI.BK', company: 'Ichitan Group', exchange: 'SET',
        role: 'Incumbent', exposure: 'High',
        description: 'RTD green tea specialist. Direct competitor to Oishi. Faced same reformulation pressure.',
      },
      {
        ticker: 'Y92.SI', company: 'Thai Beverage (ThaiBev)', exchange: 'SGX',
        role: 'Parent/Proxy', exposure: 'Low',
        description: '~80% alcohol revenue dilutes SSB signal. Owns Oishi. Included for context.',
      },
    ],
    taxContext: {
      design: [
        'Tiered excise based on sugar content: 0% (0-6g/100ml), 10% (6-8g), 12% (8-10g), 14% (>10g)',
        'Four escalation phases: Sep 2017 → Oct 2019 → Apr 2021 → Apr 2023',
        'Final phase rates roughly 2x initial — designed to ratchet reformulation pressure',
        'Energy drinks and RTD tea most exposed categories',
      ],
      reformulation: [
        'Carabao reformulated core product and launched sugar-free variant — direct response to tiered structure',
        'Oishi launched Oishi Gold (0g sugar) — became growth driver post-tax',
        'Thailand achieved meaningful reformulation unlike Mexico — tiered structure worked as designed',
      ],
      equityImpact: [
        'CBG.BK: export revenue (~40%) provided diversification buffer but domestic margins pressured',
        'ICHI.BK faced direct RTD tea margin pressure from tiered excise',
        'Y92.SI SSB signal diluted by ~80% alcohol revenue — not a clean read',
      ],
      chinaReadthrough: [
        'Thailand proves tiered escalation forces reformulation even in energy drink/RTD tea categories most relevant to China',
        'Carabao export diversification playbook maps to Chinese brands with ASEAN/Africa export ambitions (e.g. Nongfu Spring)',
        'Oishi Gold success suggests China RTD tea makers (Uni-President, Tingyi) would launch zero-sugar SKUs pre-emptively',
      ],
    },
    timeline: [
      { date: 'Sep 16, 2016', event: 'Tiered Excise Announced', type: 'announcement' },
      { date: 'Sep 16, 2017', event: 'Phase 1 Implemented', type: 'implementation' },
      { date: 'Oct 1, 2019', event: 'Phase 2 Escalation', type: 'escalation' },
      { date: 'Apr 1, 2021', event: 'Phase 3 Escalation', type: 'escalation' },
      { date: 'Apr 1, 2023', event: 'Phase 4 (Final) Escalation', type: 'escalation' },
    ],
    chartWindow: { announcementDate: '2016-09-16', implementationDate: '2017-09-16' },
  },

  south_africa: {
    disclaimer: 'Primary incumbents (CCBA, Tongaat Hulett, Illovo) were unlisted or delisted — AVI is the only available listed proxy.',
    stocks: [
      {
        ticker: 'AVI.JO', company: 'AVI Ltd', exchange: 'JSE',
        role: 'Adjacent Proxy', exposure: 'Low',
        description: 'Listed South African FMCG company. Consumer staples proxy for HPL period. Primary incumbent CCBA was unlisted at implementation.',
      },
    ],
    taxContext: {
      design: [
        'Health Promotion Levy (HPL): ZAR 0.021 per gram of sugar above 4g/100ml threshold',
        'Content-based (not volume-based) — incentivises reformulation below 4g threshold',
        'Applied at manufacturer level',
        'First SSB tax in Africa — consultation from Feb 2016, implemented Apr 1 2018',
      ],
      reformulation: [
        'Coca-Cola SA reformulated Sprite to below 4g/100ml threshold — most significant single-product reformulation',
        'Domestic beverage sugar demand declined structurally, contributing to cane processor stress',
        'HPL design (content-based threshold) drove reformulation more effectively than Mexico flat rate',
      ],
      equityImpact: [
        'TON.JO: HPL contributed to structural domestic sugar demand decline → business rescue 2022 → provisional liquidation 2026',
        'ILV.JO: Domestic beverage-sector sugar volumes fell; ABF parent absorbed losses',
        'Primary incumbent CCBA was unlisted — direct bottler stock impact unobservable',
      ],
      chinaReadthrough: [
        'TON.JO is the most important analog: shows SSB tax can be terminal for upstream sugar processors with high domestic concentration',
        'China cane sugar processors (Guangxi-based) face identical structural risk if SSB tax reduces domestic refined sugar demand',
        'Content-based threshold (like SA\'s 4g/100ml) would be most effective design for China — incentivises reformulation at specific sugar level',
      ],
    },
    timeline: [
      { date: 'Feb 2016', event: 'HPL Consultation Begins', type: 'announcement' },
      { date: '2017', event: 'Treasury Finalises Design', type: 'consultation' },
      { date: 'Apr 1, 2018', event: 'HPL Implemented', type: 'implementation' },
      { date: '2022', event: 'Tongaat Hulett Business Rescue', type: 'escalation' },
      { date: '2026', event: 'Tongaat Provisional Liquidation', type: 'escalation' },
    ],
    chartWindow: { announcementDate: '2016-02-01', implementationDate: '2018-04-01' },
  },

  france: {
    disclaimer: null,
    stocks: [
      {
        ticker: 'CCEP', company: 'Coca-Cola Europacific Partners', exchange: 'NASDAQ',
        role: 'Incumbent', exposure: 'Medium',
        description: 'France ~8-10% of group revenue. Primary reformulation decision-maker for France. 2025 escalation flagged as material volume headwind.',
      },
      {
        ticker: 'BN.PA', company: 'Danone', exchange: 'Euronext Paris',
        role: 'Beneficiary', exposure: 'Medium',
        description: 'Evian, Volvic, Badoit water portfolio. Indirect beneficiary of cross-category substitution from taxed SSBs to mineral water.',
      },
      {
        ticker: 'TATE.L', company: 'Tate & Lyle', exchange: 'LSE',
        role: 'Sweetener Producer', exposure: 'Beneficiary',
        description: "Included again — France's 2025 escalation is second demand catalyst after UK SDIL.",
      },
    ],
    taxContext: {
      design: [
        'Flat tax EUR 0.0716/L introduced Jan 2012 (first in EU)',
        'Tiered reform Jan 2018: rates linked to sugar content per 100ml',
        'Escalated to EUR 0.35/L for highest tier from Jan 2025',
        'Diet/zero-sugar drinks taxed at lower rate — reformulation incentive',
      ],
      reformulation: [
        '2018 tiered reform drove more reformulation than 2012 flat tax — mirrors Mexico vs UK pattern',
        'Orangina-Schweppes (Suntory) reformulated multiple products post-2018',
        '2025 escalation to EUR 0.35/L creating new reformulation pressure on remaining high-sugar SKUs',
      ],
      equityImpact: [
        'CCEP flagged 2025 France escalation as material volume headwind in Q4 2024 earnings call',
        'BN.PA water portfolio (Evian, Volvic) indirect beneficiary of SSB → water substitution trend',
        'TATE.L sucralose demand uplift expected as France 2025 escalation drives second reformulation wave',
      ],
      chinaReadthrough: [
        'France proves flat → tiered conversion is natural policy evolution — China should skip flat rate and start tiered',
        '13-year France timeline (2012-2025) shows SSB taxes escalate over time — early movers in China reformulation will have structural advantage',
        'Danone water portfolio benefit suggests Nongfu Spring (bottled water dominant) would be primary A-share beneficiary of China SSB tax',
      ],
    },
    timeline: [
      { date: 'Jan 2012', event: 'Flat Tax Implemented', type: 'implementation' },
      { date: 'Jan 2018', event: 'Tiered Reform', type: 'escalation' },
      { date: 'Jan 2025', event: 'Escalated to EUR 0.35/L', type: 'escalation' },
    ],
    chartWindow: { announcementDate: '2011-09-01', implementationDate: '2012-01-01' },
  },
}

export const COUNTRIES = [
  { id: 'uk', name: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}', short: 'UK' },
  { id: 'mexico', name: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', short: 'MX' },
  { id: 'philippines', name: 'Philippines', flag: '\u{1F1F5}\u{1F1ED}', short: 'PH' },
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
  // UK — SDIL announced Mar 16, 2016 (Budget Day). Source: Law et al. 2020, Economics & Human Biology (abnormal returns)
  'BAG.L': { price: 670, currency: 'p', annDay: -2.8, annWeek: -7.4 },
  'BVIC.L': { price: 720, currency: 'p', annDay: -2.1, annWeek: -3.3 },
  'NICL.L': { price: 1420, currency: 'p', annDay: -7.1, annWeek: -10.4 },
  'FEVR.L': { price: 920, currency: 'p', annDay: -1.5, annWeek: +6.7 },
  'TATE.L': { price: 350, currency: 'p', annDay: -2.0, annWeek: +0.3 },
  // Mexico — IEPS proposed Sep 8 2013 (Sunday). Source: Yahoo Finance (KOF $93.73→$94.23→$97.60). Muted 1D; gradual 2-month selloff
  'KOF': { price: 92, currency: '$', annDay: +0.5, annWeek: +4.1 },
  'AC': { price: 185, currency: 'MXN', annDay: +0.3, annWeek: +2.8 },
  'INGR': { price: 90, currency: '$', annDay: +0.3, annWeek: +2.3 },
  // Philippines — TRAIN Law signed Dec 19, 2017. Source: OTC proxies UVRBF/JBFCF × USD/PHP rate
  'URC': { price: 110, currency: 'PHP', annDay: -1.1, annWeek: -1.9 },
  'JFC': { price: 230, currency: 'PHP', annDay: -0.7, annWeek: -4.4 },
  'MONDE': { price: 10, currency: 'PHP', annDay: null, annWeek: null },
  // Thailand — Excise Tax Act enacted Mar 2017, implemented Sep 16 2017. Source: Yahoo Finance. No Sep 2016 announcement found
  'CBG.BK': { price: 42, currency: 'THB', annDay: +0.3, annWeek: +5.8 },
  'ICHI.BK': { price: 35, currency: 'THB', annDay: -1.2, annWeek: -5.9 },
  'OSP.BK': { price: 38, currency: 'THB', annDay: null, annWeek: null },
  'Y92.SI': { price: 0.55, currency: 'SGD', annDay: -0.5, annWeek: -2.7 },
  // South Africa — HPL announced Budget Speech Feb 24, 2016. Source: Yahoo Finance (AVI only; TON/ILV delisted, no free data)
  'TON.JO': { price: null, currency: 'ZAR', annDay: null, annWeek: null, status: 'In Liquidation — 2026' },
  'ILV.JO': { price: 38, currency: 'ZAR', annDay: null, annWeek: null },
  'AVI.JO': { price: 68, currency: 'ZAR', annDay: -0.6, annWeek: +4.8 },
  // France — Fillon announced soda tax Aug 24, 2011. Source: Yahoo Finance (CCE $27.53→$26.61→$27.62)
  'CCEP': { price: 72, currency: '$', annDay: -3.3, annWeek: +0.3 },
  'BN.PA': { price: 28, currency: 'EUR', annDay: +0.3, annWeek: +0.4 },
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
        ticker: 'BVIC.L', company: 'Britvic', exchange: 'LSE',
        role: 'Incumbent', exposure: 'High',
        description: 'Robinsons, J2O, Pepsi UK bottler. Proactive reformulator pre-2018.',
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
        'BVIC.L outperformed post-implementation after early reformulation of Robinsons and Fruit Shoot',
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

  philippines: {
    disclaimer: 'Primary SSB incumbents (CCBPI/CCBA) were unlisted at implementation — companies shown are best available listed proxies.',
    stocks: [
      {
        ticker: 'URC', company: 'Universal Robina Corp', exchange: 'PSE',
        role: 'Proxy Incumbent', exposure: 'Medium',
        description: 'Largest listed domestic F&B company. Beverage sales -10% FY2018, recovered within 1 year. Primary incumbents (CCBPI, Pepsi PH) are unlisted.',
      },
      {
        ticker: 'JFC', company: 'Jollibee Foods', exchange: 'PSE',
        role: 'Adjacent Proxy', exposure: 'Low',
        description: 'Listed large-cap consumer proxy for Philippine consumer sentiment around TRAIN.',
      },
      {
        ticker: 'MONDE', company: 'Monde Nissin', exchange: 'PSE',
        role: 'Adjacent Proxy', exposure: 'Low',
        description: 'Listed packaged food/beverage company with some SSB-adjacent exposure.',
      },
    ],
    taxContext: {
      design: [
        'TRAIN Law: PHP 6/L on standard sweetened beverages',
        'PHP 12/L on HFCS-sweetened beverages (punitive tier)',
        'Implemented Jan 1 2018 — signed Dec 19 2017, minimal lead time',
        'Revenue earmarked for infrastructure and social spending',
      ],
      reformulation: [
        'HFCS-to-cane-sugar reformulation was primary response — not sugar reduction',
        'PHP 12/L HFCS tier created arbitrage for switching to PHP 6/L cane sugar tier',
        'URC beverage sales recovered within 12 months via pricing and mix shift',
      ],
      equityImpact: [
        'URC beverage segment revenue -10% FY2018, full recovery by FY2019',
        'JFC showed consumer resilience — QSR traffic held despite TRAIN-related consumer sentiment weakness',
        'Primary incumbents CCBPI and Pepsi PH were unlisted — stock market impact largely unobservable',
      ],
      chinaReadthrough: [
        'HFCS penalty tier is directly relevant — China is world\'s second-largest HFCS producer after US',
        'If China adopts HFCS-punitive tiering, expect rapid reformulation to cane sugar (benefiting Guangxi mills)',
        'Short lead time (2 weeks) caused maximum disruption — argues for China adopting UK-style 2-year window',
      ],
    },
    timeline: [
      { date: 'Dec 19, 2017', event: 'TRAIN Law Signed', type: 'announcement' },
      { date: 'Jan 1, 2018', event: 'SSB Tax Implemented', type: 'implementation' },
      { date: '2019', event: 'Revenue targets met, no escalation', type: 'note' },
    ],
    chartWindow: { announcementDate: '2017-12-19', implementationDate: '2018-01-01' },
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
        ticker: 'OSP.BK', company: 'Oishi Group', exchange: 'SET',
        role: 'Incumbent/Beneficiary', exposure: 'Medium',
        description: "ThaiBev's RTD green tea arm. Reformulated and launched Oishi Gold sugar-free. Revenue grew despite tax.",
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
        'OSP.BK revenue grew despite tax — Oishi Gold sugar-free launch was net positive catalyst',
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
    disclaimer: 'Primary SSB incumbents (CCBPI/CCBA) were unlisted at implementation — companies shown are best available listed proxies.',
    stocks: [
      {
        ticker: 'TON.JO', company: 'Tongaat Hulett', exchange: 'JSE',
        role: 'Sugar Processor', exposure: 'High',
        description: "South Africa's largest cane sugar producer. HPL contributed to structural domestic demand decline. Business rescue 2022, provisional liquidation 2026. Extreme downstream analog for China cane sugar processors.",
        isLiquidation: true,
      },
      {
        ticker: 'ILV.JO', company: 'Illovo Sugar Africa', exchange: 'JSE',
        role: 'Sugar Processor', exposure: 'High',
        description: 'ABF subsidiary. Reduced domestic beverage-sector sugar demand post-HPL. Direct cane sugar processor analog.',
      },
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

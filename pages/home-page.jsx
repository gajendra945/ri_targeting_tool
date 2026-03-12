import { MainPageLayout } from '../component/main-page-layout'

const summaryMetrics = [
  { label: 'YTD suppressions', value: '600K', valueClassName: 'text-[#163d6f]' },
  { label: 'Currently saved lives', value: '339k', valueClassName: 'text-[#1b2736]' },
  { label: 'YTD identified suppressions', value: '42k', valueClassName: 'text-[#1b2736]' },
  { label: 'YTD gross NDC capture', value: '4%', valueClassName: 'text-[#1f8f50]' },
  { label: 'YTD value per supprn issue', value: '$170', valueClassName: 'text-[#1f8f50]' },
  { label: 'Estimated EOY Gross NDC (value)', value: '$9M', valueClassName: 'text-[#ef9b1c]' },
]

const filterLabels = ['N2P return', 'Market', 'State', 'IVL/GRP/SNP', 'Contract', 'PBP']

const navSections = [
  {
    title: 'Signify HHV',
    items: ['YTD suppression stats', 'Model Performance', 'Future suppressions'],
  },
  {
    title: 'Optum IOA',
    items: ['Model Performance', 'YTD suppression stats', 'Future suppressions'],
  },
]

export function RiTargetingToolHomePage() {
  return (
    <MainPageLayout>
      <section className="grid min-h-[660px] grid-cols-[230px_minmax(0,1fr)]">
        <aside className="border-r border-[#cbccd0] bg-[#f8f8f8] px-4 py-4">
          <h2 className="mb-3 text-[20px] font-semibold text-[#1f4f8a]">RI targeting Tool</h2>

          <div className="rounded bg-[#0f4d92] px-2 py-1 text-xs font-semibold text-white">Overview</div>

          {navSections.map((section) => (
            <div key={section.title} className="mt-4">
              <p className="text-xs font-semibold text-[#2f2f2f]">{section.title}</p>
              <ul className="mt-2 space-y-1.5">
                {section.items.map((item) => (
                  <li key={item} className="text-[11px] text-[#4f535a]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <section className="space-y-4 px-4 py-4">
          <div className="rounded-md border border-[#d4d7db] bg-white px-3 py-2">
            <div className="grid grid-cols-6 gap-2 text-[10px] text-[#3d4249]">
              {filterLabels.map((label) => (
                <label key={label} className="flex items-center gap-1 rounded border border-[#d7d9dd] px-2 py-1">
                  <span>{label}</span>
                  <span className="ml-auto text-[9px] text-[#7a8089]">v</span>
                </label>
              ))}
            </div>
          </div>

          <section className="rounded-2xl border border-[#dbdde2] bg-[#f1f2f4] px-4 py-3">
            <h3 className="mb-3 text-sm font-semibold text-[#2f3238]">Signify HHV</h3>
            <div className="grid grid-cols-6 gap-2">
              {summaryMetrics.map((metric) => (
                <article key={metric.label} className="rounded bg-white">
                  <div className="bg-[#1a4f8f] px-2 py-1 text-center text-[9px] font-semibold text-white">{metric.label}</div>
                  <div className={`px-2 py-2 text-center text-sm font-semibold ${metric.valueClassName}`}>{metric.value}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#dbdde2] bg-[#f1f2f4] px-4 py-3">
            <h3 className="mb-3 text-sm font-semibold text-[#2f3238]">Optum IOA</h3>
            <div className="flex min-h-28 items-center justify-center rounded-xl bg-white text-xl font-semibold text-[#474c55]">TBD (Phase 2)</div>
          </section>
        </section>
      </section>
    </MainPageLayout>
  )
}

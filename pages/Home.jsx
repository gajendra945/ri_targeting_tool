import React from 'react'
import { MainPageLayout } from '../component/main-page-layout'
import '../styles/ri_targeting_tool/home.css'

const OverviewIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" />
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4 4 10v10h6v-6h4v6h6V10z" />
  </svg>
)

const NoteIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 3.5h10.5a2 2 0 0 1 2 2v15H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 3.5v17" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M11 9h5.5M11 12.5h5.5M11 16h4.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const summaryMetrics = [
  { label: 'YTD suppressions', value: '600K', tone: 'blue' },
  { label: 'Currently saved lives', value: '339k', tone: 'neutral' },
  { label: 'YTD identified suppressions', value: '42k', tone: 'neutral' },
  { label: 'YTD gross NDC capture', value: '4%', tone: 'green' },
  { label: 'YTD value per supprn issue', value: '$170', tone: 'green' },
  { label: 'Estimated EOY Gross NDC (value)', value: '$9M', tone: 'orange' },
]

const filterLabels = ['N2P return', 'Market', 'State', 'IVL/GRP/SNP', 'Contract', 'PBP']

const navSections = [
  {
    key: 'signify',
    title: 'Signify HHV',
    icon: <HomeIcon />,
    items: ['YTD suppression stats', 'Model Performance', 'Future suppressions'],
  },
  {
    key: 'optum',
    title: 'Optum IOA',
    icon: <NoteIcon />,
    items: ['Model Performance', 'YTD suppression stats', 'Future suppressions'],
  },
]

const Home = () => (
  <MainPageLayout>
    <section className="ri-main-grid">
      <aside className="ri-sidebar">
        <h2 className="ri-sidebar-title">RI targeting Tool</h2>

        <div className="ri-overview-row">
          <span className="ri-icon-cell">{<OverviewIcon />}</span>
          <button type="button" className="ri-overview-btn" aria-current="page">
            Overview
          </button>
        </div>

        {navSections.map((section) => (
          <div key={section.key} className="ri-nav-row">
            <span className="ri-icon-cell ri-icon-cell--muted">{section.icon}</span>
            <div className="ri-nav-group">
              <p className="ri-nav-heading">{section.title}</p>
              <ul className="ri-nav-list">
                {section.items.map((item) => (
                  <li key={item} className="ri-nav-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </aside>

      <section className="ri-content">
        <section className="ri-filter-panel">
          <h3 className="ri-filter-title">Overview</h3>
          <div className="ri-filter-grid">
            {filterLabels.map((label) => (
              <label key={label} className="ri-filter-item">
                <span>{label}</span>
                <span className="ri-filter-arrow">v</span>
              </label>
            ))}
          </div>
        </section>

        <section className="ri-data-panel">
          <h3 className="ri-panel-title">Signify HHV</h3>
          <div className="ri-kpi-grid">
            {summaryMetrics.map((metric) => (
              <article key={metric.label} className="ri-kpi-card">
                <div className="ri-kpi-label">{metric.label}</div>
                <div className={`ri-kpi-value ri-kpi-value--${metric.tone}`}>{metric.value}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="ri-data-panel">
          <h3 className="ri-panel-title">Optum IOA</h3>
          <div className="ri-phase-box">TBD (Phase 2)</div>
        </section>
      </section>
    </section>
  </MainPageLayout>
)

export default Home

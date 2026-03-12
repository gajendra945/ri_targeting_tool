import React from 'react'
import { MainPageLayout } from '../component/main-page-layout'
import '../styles/ri_targeting_tool/home.css'

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
    title: 'Signify HHV',
    items: ['YTD suppression stats', 'Model Performance', 'Future suppressions'],
  },
  {
    title: 'Optum IOA',
    items: ['Model Performance', 'YTD suppression stats', 'Future suppressions'],
  },
]

const Home = () => (
  <MainPageLayout>
    <section className="ri-main-grid">
      <aside className="ri-sidebar">
        <h2 className="ri-sidebar-title">RI targeting Tool</h2>

        <div className="ri-nav-section ri-nav-section--overview">
          <p className="ri-nav-heading">Overview</p>
        </div>

        {navSections.map((section) => (
          <div key={section.title} className="ri-nav-section">
            <p className="ri-nav-heading">{section.title}</p>
            <ul className="ri-nav-list">
              {section.items.map((item) => (
                <li key={item} className="ri-nav-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <section className="ri-content">
        <div className="ri-filter-panel">
          <div className="ri-filter-grid">
            {filterLabels.map((label) => (
              <label key={label} className="ri-filter-item">
                <span>{label}</span>
                <span className="ri-filter-arrow">v</span>
              </label>
            ))}
          </div>
        </div>

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

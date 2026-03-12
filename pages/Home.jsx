import React, { useState } from 'react'
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
  { id: 'ytd-suppr', label: 'YTD\nsuppressions', value: '600k', tone: 'blue' },
  { id: 'current-suppr', label: 'Currently\nsuppressed', value: '339k', tone: 'neutral' },
  { id: 'saved-visits', label: 'YTD estimated\nsaved visits', value: '42k', tone: 'neutral' },
  { id: 'hcc-capture', label: 'YTD gross\nHCC capture', value: '14%', tone: 'green', isTrend: true },
  { id: 'value-visit', label: "YTD value per\nsuppr'd visit", value: '$170', tone: 'green' },
  { id: 'eoy-savings', label: 'Estimated EOY\nnet Savings (Aetna)', value: '$19M', tone: 'orange' },
]

const optumSummaryMetrics = [
  { id: 'optum-ytd-suppr', label: 'YTD\nsuppressions', value: '540k', tone: 'blue' },
  { id: 'optum-current-suppr', label: 'Currently\nsuppressed', value: '312k', tone: 'neutral' },
  { id: 'optum-saved-visits', label: 'YTD estimated\nsaved visits', value: '36k', tone: 'neutral' },
  { id: 'optum-hcc-capture', label: 'YTD gross\nHCC capture', value: '12%', tone: 'green', isTrend: true },
  { id: 'optum-value-visit', label: "YTD value per\nsuppr'd visit", value: '$158', tone: 'green' },
  { id: 'optum-eoy-savings', label: 'Estimated EOY\nnet Savings (Aetna)', value: '$16M', tone: 'orange' },
]

const overviewFilterLabels = ['N2P return', 'Market', 'State', 'IVL/GRP/SNP', 'Contract', 'PBP']
const ytdFilterLabels = ['N2P/return', 'Market', 'State', 'IVL/GRP', 'Contract', 'PBP']

const VIEW = {
  overview: 'overview',
  ytdSuppression: 'ytdSuppression',
}

const navSections = [
  {
    key: 'signify',
    title: 'Signify HHV',
    icon: <HomeIcon />,
    items: [
      { key: 'signify-ytd', label: 'YTD suppression stats', view: VIEW.ytdSuppression },
      { key: 'signify-model', label: 'Model Performance' },
      { key: 'signify-future', label: 'Future suppressions' },
    ],
  },
  {
    key: 'optum',
    title: 'Optum IOA',
    icon: <NoteIcon />,
    items: [
      { key: 'optum-model', label: 'Model Performance' },
      { key: 'optum-ytd', label: 'YTD suppression stats' },
      { key: 'optum-future', label: 'Future suppressions' },
    ],
  },
]

const getMetricValueToneClass = (metric) => {
  if (metric.isTrend) {
    const isNegative = String(metric.value).trim().startsWith('-')
    return isNegative ? 'ri-kpi-value--red' : 'ri-kpi-value--green'
  }

  return `ri-kpi-value--${metric.tone}`
}

const Home = () => {
  const [activeView, setActiveView] = useState(VIEW.overview)

  return (
    <MainPageLayout>
      <section className="ri-main-grid">
        <aside className="ri-sidebar">
          <h2 className="ri-sidebar-title">RI targeting Tool</h2>

          <div className="ri-overview-row">
            <span className="ri-icon-cell">{<OverviewIcon />}</span>
            <button
              type="button"
              className={`ri-overview-btn ${activeView === VIEW.overview ? 'is-active' : ''}`}
              aria-current={activeView === VIEW.overview ? 'page' : undefined}
              onClick={() => setActiveView(VIEW.overview)}
            >
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
                    <li key={item.key}>
                      {item.view ? (
                        <button
                          type="button"
                          className={`ri-nav-item-btn ${activeView === item.view ? 'is-active' : ''}`}
                          onClick={() => setActiveView(item.view)}
                        >
                          {item.label}
                        </button>
                      ) : (
                        <span className="ri-nav-item">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </aside>

        <section className="ri-content">
          {activeView === VIEW.overview ? (
            <section className="ri-filter-panel">
              <h3 className="ri-filter-title">Overview</h3>
              <div className="ri-filter-grid">
                {overviewFilterLabels.map((label) => (
                  <label key={label} className="ri-filter-item">
                    <span>{label}</span>
                    <span className="ri-filter-arrow">v</span>
                  </label>
                ))}
              </div>
            </section>
          ) : (
            <section className="ri-ytd-header-strip">
              <div className="ri-ytd-header-left">
                <h3 className="ri-ytd-strip-title">Signify HHV</h3>
                <p className="ri-ytd-strip-subtitle">YTD suppression Stats</p>
              </div>
              <div className="ri-ytd-filter-row">
                {ytdFilterLabels.map((label) => (
                  <button type="button" key={label} className="ri-ytd-filter-btn">
                    <span>{label}</span>
                    <span className="ri-ytd-filter-arrow">&#9660;</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <>
            <section className="ri-data-panel ri-data-panel--summary">
              <h3 className="ri-panel-title">Signify HHV</h3>
              <div className="ri-kpi-grid">
                {summaryMetrics.map((metric) => (
                  <article key={metric.id} className="ri-kpi-card">
                    <div className="ri-kpi-label">{metric.label}</div>
                    <div className={`ri-kpi-value ${getMetricValueToneClass(metric)}`}>{metric.value}</div>
                  </article>
                ))}
              </div>
            </section>

            <section className="ri-data-panel ri-data-panel--summary">
              <h3 className="ri-panel-title">Optum IOA</h3>
              <div className="ri-kpi-grid">
                {optumSummaryMetrics.map((metric) => (
                  <article key={metric.id} className="ri-kpi-card">
                    <div className="ri-kpi-label">{metric.label}</div>
                    <div className={`ri-kpi-value ${getMetricValueToneClass(metric)}`}>{metric.value}</div>
                  </article>
                ))}
              </div>
            </section>
          </>
        </section>
      </section>
    </MainPageLayout>
  )
}

export default Home

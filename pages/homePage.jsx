import React from 'react'
import { ProductPageLayout } from '../component/productPageLayout'
import { TopFilterRow } from '../component/productPageStrip'

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

const getMetricValueToneClass = (metric) => {
  if (metric.isTrend) {
    const isNegative = String(metric.value).trim().startsWith('-')
    return isNegative ? 'ri-kpi-value--red' : 'ri-kpi-value--green'
  }

  return `ri-kpi-value--${metric.tone}`
}

const Home = () => {
  return (
    <ProductPageLayout>
      <section className="ri-overview-strip">
        <h3 className="ri-overview-strip-title">Overview</h3>
        <TopFilterRow className="ri-overview-filter-row" />
      </section>

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
    </ProductPageLayout>
  )
}

export default Home

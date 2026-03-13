import React from 'react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/optum_ioa/ytd-suppression-stats.css'

const financialRows = [
  { label: '# members currently suppressed', goal: '28k', ytd: '312k', forecast: '338k', forecastTone: 'green' },
  { label: '# of members released', goal: '384k', ytd: '249k', forecast: '361k', forecastTone: 'green' },
  { label: 'Aetna Med Costs', goal: '$36M', ytd: '$16M', forecast: '$25M', forecastTone: 'amber' },
  { label: 'RI Value Lost', goal: '< $14M', ytd: '$6M', forecast: '$6M', forecastTone: 'green' },
  { label: 'Net Aetna Savings', goal: '$22M', ytd: '$10M', forecast: '$15M', forecastTone: 'amber' },
  { label: 'Net enterprise Savings', goal: '$8M', ytd: '$4M', forecast: '$6M', forecastTone: 'amber' },
]

const operationalRows = [
  { label: 'HHV completion rate of suppressed members', goal: '11%', ytd: '15%', ytdTone: 'amber' },
  { label: 'Gross HCC capture for visits happening naturally (or control)', goal: '14%', ytd: '12%', ytdTone: 'green' },
  { label: 'Estimated HCC $ capture/suppressed HHV', goal: '<$165', ytd: '$142', ytdTone: 'green' },
  { label: '% of members modeler confidently suppresses at 5% error rate', goal: '14%', ytd: '17%', ytdTone: 'green' },
  { label: 'Precision of top 10%', goal: '93%', ytd: '95%', ytdTone: 'green' },
]

const getCellToneClass = (tone) => (tone ? `ri-ytd-cell ri-ytd-cell--${tone}` : undefined)

const OptumIOAYTDSuppressionStatsPage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Optum IOA" subtitle="YTD suppression Stats" />
      <section className="ri-feature-body ri-optum-ioa-ytd-page">
        <div className="ri-ytd-table-grid">
          <article className="ri-ytd-card">
            <h4 className="ri-ytd-card-title">Financial metrics EOY projections</h4>
            <table className="ri-ytd-table ri-ytd-table--financial">
              <thead>
                <tr>
                  <th>Key metric</th>
                  <th>EOY goal</th>
                  <th>YTD</th>
                  <th>EOY Forecast</th>
                </tr>
              </thead>
              <tbody>
                {financialRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.goal}</td>
                    <td>{row.ytd}</td>
                    <td className={getCellToneClass(row.forecastTone)}>{row.forecast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="ri-ytd-card">
            <h4 className="ri-ytd-card-title">Operational Metrics</h4>
            <table className="ri-ytd-table ri-ytd-table--operational">
              <thead>
                <tr>
                  <th>Key metric</th>
                  <th>EOY goal</th>
                  <th>YTD</th>
                </tr>
              </thead>
              <tbody>
                {operationalRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.goal}</td>
                    <td className={getCellToneClass(row.ytdTone)}>{row.ytd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </section>
    </ProductPageLayout>
  )
}

export default OptumIOAYTDSuppressionStatsPage

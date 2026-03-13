import React from 'react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/signify_hhv/ytd-suppression-stats.css'

const financialRows = [
  { label: '# members currently suppressed', goal: '31k', ytd: '339k', forecast: '362k', forecastTone: 'green' },
  { label: '# of members released', goal: '406k', ytd: '271k', forecast: '386k' },
  { label: 'Aetna Med Costs', goal: '$41M', ytd: '$19M', forecast: '$25M', forecastTone: 'amber' },
  { label: 'RI Value Lost', goal: '< $16M', ytd: '$7M', forecast: '$7M', forecastTone: 'green' },
  { label: 'Net Aetna Savings', goal: '$25M', ytd: '$12M', forecast: '$17M', forecastTone: 'amber' },
  { label: 'Net enterprise Savings', goal: '$10M', ytd: '$5M', forecast: '$7M', forecastTone: 'amber' },
]

const operationalRows = [
  { label: 'HHV completion rate of suppressed members', goal: '10%', ytd: '16%', ytdTone: 'amber' },
  { label: 'Gross HCC capture for visits happening naturally (or control)', goal: '15%', ytd: '14%', ytdTone: 'green' },
  { label: 'Estimated HCC $ capture/suppressed HHV', goal: '<$180', ytd: '$155', ytdTone: 'green' },
  { label: '% of members modeler confidently suppresses at 5% error rate', goal: '15%', ytd: '19%', ytdTone: 'green' },
  { label: 'Precision of top 10%', goal: '95%', ytd: '97%', ytdTone: 'green' },
]

const getCellToneClass = (tone) => (tone ? `ri-ytd-cell ri-ytd-cell--${tone}` : undefined)

const SignifyHHVYTDSuppressionStatsPage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Signify HHV" subtitle="YTD suppression Stats" />
      <section className="ri-feature-body ri-signify-hhv-ytd-page">
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

export default SignifyHHVYTDSuppressionStatsPage

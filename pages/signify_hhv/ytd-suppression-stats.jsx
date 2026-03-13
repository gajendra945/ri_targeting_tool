import React from 'react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/signify_hhv/ytd-suppression-stats.css'

const financialRows = [
  ['# members currently suppressed', '31k', '339k', '362k'],
  ['# of members released', '406k', '271k', '386k'],
  ['Aetna Med Costs', '$41M', '$19M', '$29M'],
  ['RI Value Lost', '< $16M', '$7M', '$7M'],
  ['Net Aetna Savings', '$25M', '$12M', '$17M'],
  ['Net enterprise Savings', '$10M', '$5M', '$7M'],
]

const operationalRows = [
  ['HHV completion rate of suppressed members', '10%', '16%'],
  ['Gross HCC capture for visits happening naturally (or control)', '15%', '14%'],
  ['Estimated HCC $ capture/suppressed HHV', '<$180', '$155'],
  ['% of members modeler confidently suppresses at 5% error rate', '15%', '19%'],
  ['Precision of top 10%', '95%', '97%'],
]

const SignifyHHVYTDSuppressionStatsPage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Signify HHV" subtitle="YTD suppression Stats" />
      <section className="ri-feature-body ri-signify-hhv-ytd-page">
        <div className="ri-ytd-table-grid">
          <article className="ri-ytd-card">
            <h4 className="ri-ytd-card-title">Financial metrics EOY projections</h4>
            <table className="ri-ytd-table">
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
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="ri-ytd-card">
            <h4 className="ri-ytd-card-title">Operational Metrics</h4>
            <table className="ri-ytd-table">
              <thead>
                <tr>
                  <th>Key metric</th>
                  <th>EOY goal</th>
                  <th>YTD</th>
                </tr>
              </thead>
              <tbody>
                {operationalRows.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
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

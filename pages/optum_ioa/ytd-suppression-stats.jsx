import React from 'react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/optum_ioa/ytd-suppression-stats.css'

const financialRows = [
  ['# members currently suppressed', '28k', '312k', '338k'],
  ['# of members released', '384k', '249k', '361k'],
  ['Aetna Med Costs', '$36M', '$16M', '$25M'],
  ['RI Value Lost', '< $14M', '$6M', '$6M'],
  ['Net Aetna Savings', '$22M', '$10M', '$15M'],
  ['Net enterprise Savings', '$8M', '$4M', '$6M'],
]

const operationalRows = [
  ['HHV completion rate of suppressed members', '11%', '15%'],
  ['Gross HCC capture for visits happening naturally (or control)', '14%', '12%'],
  ['Estimated HCC $ capture/suppressed HHV', '<$165', '$142'],
  ['% of members modeler confidently suppresses at 5% error rate', '14%', '17%'],
  ['Precision of top 10%', '93%', '95%'],
]

const OptumIOAYTDSuppressionStatsPage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Optum IOA" subtitle="YTD suppression Stats" />
      <section className="ri-feature-body ri-optum-ioa-ytd-page">
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

export default OptumIOAYTDSuppressionStatsPage

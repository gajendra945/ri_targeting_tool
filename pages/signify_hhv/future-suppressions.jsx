import React from 'react'
import { Bar, BarChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/signify_hhv/future-suppressions.css'

const formatMemberCount = (value) => new Intl.NumberFormat('en-US').format(value)

const thresholdData = [
  { key: '1', displayLabel: '1', keepTargeting: 0, newSuppressions: 0, keepSuppression: 19000, releases: 0 },
  { key: '2', displayLabel: '2', keepTargeting: 0, newSuppressions: 1700, keepSuppression: 23000, releases: 0 },
  { key: '3', displayLabel: '3', keepTargeting: 0, newSuppressions: 1600, keepSuppression: 24800, releases: 0 },
  { key: '4', displayLabel: '4', keepTargeting: 0, newSuppressions: 1900, keepSuppression: 25200, releases: 0 },
  { key: '5', displayLabel: '5', keepTargeting: 0, newSuppressions: 2500, keepSuppression: 24800, releases: 0 },
  { key: '6', displayLabel: '6', keepTargeting: 0, newSuppressions: 3200, keepSuppression: 24400, releases: 0 },
  { key: '7', displayLabel: '7', keepTargeting: 0, newSuppressions: 4300, keepSuppression: 23800, releases: 0 },
  { key: '8', displayLabel: '8', keepTargeting: 0, newSuppressions: 5300, keepSuppression: 23000, releases: 0 },
  { key: '9', displayLabel: '9', keepTargeting: 0, newSuppressions: 7600, keepSuppression: 20500, releases: 0 },
  { key: '10', displayLabel: '10', keepTargeting: 0, newSuppressions: 9000, keepSuppression: 19000, releases: 0 },
  { key: '11', displayLabel: '11', keepTargeting: 11000, newSuppressions: 0, keepSuppression: 17000, releases: 0 },
  { key: '12', displayLabel: '12', keepTargeting: 13500, newSuppressions: 0, keepSuppression: 14500, releases: 0 },
  { key: '13', displayLabel: '13', keepTargeting: 16000, newSuppressions: 0, keepSuppression: 12000, releases: 0 },
  { key: '14', displayLabel: '14', keepTargeting: 18500, newSuppressions: 0, keepSuppression: 9500, releases: 0 },
  { key: '15', displayLabel: '15', keepTargeting: 20500, newSuppressions: 0, keepSuppression: 7500, releases: 0 },
  { key: '16', displayLabel: '16', keepTargeting: 23000, newSuppressions: 0, keepSuppression: 0, releases: 5000 },
  { key: '17', displayLabel: '17', keepTargeting: 23800, newSuppressions: 0, keepSuppression: 0, releases: 4200 },
  { key: '18', displayLabel: '18', keepTargeting: 24600, newSuppressions: 0, keepSuppression: 0, releases: 3400 },
  { key: '19', displayLabel: '19', keepTargeting: 25400, newSuppressions: 0, keepSuppression: 0, releases: 2600 },
  { key: '20', displayLabel: '20', keepTargeting: 26000, newSuppressions: 0, keepSuppression: 0, releases: 2000 },
  { key: '21', displayLabel: '21', keepTargeting: 26600, newSuppressions: 0, keepSuppression: 0, releases: 1400 },
  { key: '22', displayLabel: '22', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '23', displayLabel: '23', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '24', displayLabel: '24', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '25', displayLabel: '25', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '26', displayLabel: '26', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '27', displayLabel: '27', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '28', displayLabel: '28', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '29', displayLabel: '29', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '30', displayLabel: '30', keepTargeting: 28000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: 'gap-a', displayLabel: '', keepTargeting: 0, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '50', displayLabel: '50', keepTargeting: 26000, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: 'gap-b', displayLabel: '', keepTargeting: 0, newSuppressions: 0, keepSuppression: 0, releases: 0 },
  { key: '100', displayLabel: '100', keepTargeting: 19500, newSuppressions: 0, keepSuppression: 0, releases: 0 },
]

const legendItems = [
  { key: 'keep-targeting', label: 'Keep in Targeting', swatchClassName: 'ri-future-threshold-swatch--pattern' },
  { key: 'new-suppressions', label: 'New Suppressions', swatchClassName: 'ri-future-threshold-swatch--new' },
  { key: 'keep-suppression', label: 'Keep in Suppression List', swatchClassName: 'ri-future-threshold-swatch--keep' },
  { key: 'releases', label: 'Releases', swatchClassName: 'ri-future-threshold-swatch--release' },
]

const getDisplayLabel = (key) => thresholdData.find((item) => item.key === key)?.displayLabel ?? key

function FutureSuppressionThresholdChart() {
  return (
    <article className="ri-future-threshold-card">
      <header className="ri-future-threshold-card-header">October Suppression Thresholds</header>
      <div className="ri-future-threshold-card-body">
        <div className="ri-future-threshold-layout">
          <div className="ri-future-threshold-plot">
            <p className="ri-future-threshold-axis-title">Member Count</p>
            <div className="ri-future-threshold-scroll">
              <div className="ri-future-threshold-inner">
                <div className="ri-future-threshold-canvas">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={thresholdData} margin={{ top: 8, right: 8, bottom: 16, left: 6 }} barCategoryGap="18%" barGap={0}>
                      <defs>
                        <pattern id="signify-hhv-future-threshold-pattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                          <rect width="6" height="6" fill="#ffffff" />
                          <line x1="0" y1="0" x2="0" y2="6" stroke="#999999" strokeWidth="2" />
                        </pattern>
                      </defs>
                      <XAxis
                        dataKey="key"
                        height={26}
                        tickLine={false}
                        tickMargin={6}
                        axisLine={{ stroke: '#5c6677', strokeWidth: 1.4 }}
                        tick={{ fill: '#2b3342', fontSize: 11 }}
                        interval={0}
                        tickFormatter={getDisplayLabel}
                      />
                      <YAxis
                        width={56}
                        domain={[0, 30000]}
                        ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000]}
                        tickLine={false}
                        axisLine={{ stroke: '#5c6677', strokeWidth: 1.4 }}
                        tick={{ fill: '#2b3342', fontSize: 11 }}
                        tickFormatter={formatMemberCount}
                      />
                      <ReferenceLine x="10" stroke="#9fa6b0" strokeWidth={2} />
                      <ReferenceLine x="15" stroke="#9fa6b0" strokeWidth={2} />
                      <Bar dataKey="releases" stackId="thresholds" name="Releases" fill="#c8c8c8" stroke="#9ea3aa" maxBarSize={18} isAnimationActive={false} />
                      <Bar dataKey="keepSuppression" stackId="thresholds" name="Keep in Suppression List" fill="#6f8fbe" stroke="#536f98" maxBarSize={18} isAnimationActive={false} />
                      <Bar dataKey="newSuppressions" stackId="thresholds" name="New Suppressions" fill="#eef2f7" stroke="#9ea6b2" maxBarSize={18} isAnimationActive={false} />
                      <Bar
                        dataKey="keepTargeting"
                        stackId="thresholds"
                        name="Keep in Targeting"
                        fill="url(#signify-hhv-future-threshold-pattern)"
                        stroke="#9a9a9a"
                        maxBarSize={18}
                        isAnimationActive={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="ri-future-threshold-x-axis-title">
                  Percentiles from September Model1
                  <br />
                  (lower=safe to suppress)
                </p>
              </div>
            </div>
          </div>

          <div className="ri-future-threshold-legend" role="list" aria-label="Suppression threshold legend">
            {legendItems.map((item) => (
              <div key={item.key} className="ri-future-threshold-legend-item" role="listitem">
                <span className={`ri-future-threshold-swatch ${item.swatchClassName}`} />
                <span className="ri-future-threshold-legend-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

const SignifyHHVFutureSuppressionsPage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Signify HHV" subtitle="Future Suppressions" />
      <section className="ri-feature-body ri-signify-hhv-future-page">
        <FutureSuppressionThresholdChart />
      </section>
    </ProductPageLayout>
  )
}

export default SignifyHHVFutureSuppressionsPage

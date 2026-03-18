import React from 'react'
import { Bar, BarChart, LabelList, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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

const completionChart = {
  copyTitle: 'YoY HHV completion rates since 5/10 (%)',
  copySubtitle: 'Suppressed members: Treatment vs. Control',
  max: 50,
  interval: 10,
  legend: {
    control: 'Control group (targeted by Optum)',
    treatment: 'Treatment group (actively suppressed)',
  },
  calloutLayouts: [
    { start: '31%', end: '61%', bubble: '46%' },
    { start: '31%', end: '61%', bubble: '46%' },
  ],
  groups: [
    { label: 'Members suppressed - Low Risk', control: 13.4, treatment: 6.9, delta: -6.5 },
    { label: 'Members suppressed - High Risk', control: 10.8, treatment: 9.92, delta: -0.88 },
  ],
}

const monitoringChart = {
  copyTitle: 'Gross HCC capture rate (%)',
  copySubtitle: 'during completed HHV visits',
  noteTitle: 'Avg 11% per saved visit',
  noteSubtitle: '(+12% optimized rate)',
  months: ['1 Jan', '1 Feb', '1 Mar', '1 Apr', '1 May', '1 Jun', '1 Jul', '1 Aug', '1 Sep', '1 Oct', '1 Nov', '1 Dec'],
  max: 80,
  interval: 20,
  expectedLowLabel: 8,
  expectedHighLabel: 56,
  expectedLow: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  expectedHigh: [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
  treatmentLow: [5, 6, 6, 7, 7, 7, 8, 7, 8, 7, 7, 8],
  treatmentHigh: [56, 42, 44, 45, 47, 46, 49, 48, 49, 38, 22, 0],
}

const chartPalette = {
  axis: '#2f3743',
  control: '#cfcfd1',
  treatment: '#5f7fb9',
  expectedLow: '#2f3743',
  expectedHigh: '#c7e7e4',
  treatmentLow: '#5d7fb4',
  treatmentHigh: '#177f98',
  text: '#2a3342',
}

const buildTicks = (min = 0, max = 0, interval = 1) => {
  const ticks = []

  for (let value = min; value <= max; value += interval) {
    ticks.push(value)
  }

  return ticks
}

const formatPercent = (value) => `${Number(value).toFixed(2).replace(/\.00$/, '')}%`
const formatPercentValue = (value) => `${value}%`
const getCellToneClass = (tone) => (tone ? `ri-ytd-cell ri-ytd-cell--${tone}` : undefined)

const impactData = completionChart.groups.map((group) => ({
  label: group.label,
  control: group.control,
  treatment: group.treatment,
}))

const monitoringData = monitoringChart.months.map((month, index) => ({
  month,
  treatmentLow: monitoringChart.treatmentLow[index],
  treatmentHigh: monitoringChart.treatmentHigh[index],
}))

function YTDLegend({ items, className = '' }) {
  return (
    <div className={`ri-ytd-chart-legend ${className}`.trim()} role="list" aria-label="Chart legend">
      {items.map((item) => (
        <div key={item.label} className="ri-ytd-chart-legend-item" role="listitem">
          <span
            className={`ri-ytd-chart-legend-swatch ri-ytd-chart-legend-swatch--${item.kind}${item.dash ? ' ri-ytd-chart-legend-swatch--dash' : ''}`}
            style={item.kind === 'square' ? { backgroundColor: item.color } : { '--ri-legend-color': item.color }}
          />
          <span className="ri-ytd-chart-legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

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
                  <th>
                    <span className="ri-ytd-table-heading--multiline">{"EOY\nGoal"}</span>
                  </th>
                  <th>YTD</th>
                  <th>
                    <span className="ri-ytd-table-heading--multiline">{"EOY\nForecast"}</span>
                  </th>
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
                  <th>
                    <span className="ri-ytd-table-heading--multiline">{"EOY\nGoal"}</span>
                  </th>
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

        <section className="ri-ytd-chart-grid">
          <article className="ri-ytd-chart-card">
            <header className="ri-ytd-chart-header">Impact of Suppression on HHV Completions (A/B test)</header>
            <div className="ri-ytd-chart-body">
              <p className="ri-ytd-chart-copy">
                {completionChart.copyTitle}
                <br />
                {completionChart.copySubtitle}
              </p>
              <div className="ri-ytd-impact-wrap">
                <div className="ri-ytd-impact-overlay">
                  {(completionChart.groups ?? []).map((group, index) => {
                    const layout = completionChart.calloutLayouts?.[index] ?? {}

                    return (
                      <div
                        key={`${group.label}-callout`}
                        className="ri-ytd-impact-group-overlay"
                        style={{
                          '--ri-impact-start': layout.start ?? '31%',
                          '--ri-impact-end': layout.end ?? '61%',
                          '--ri-impact-bubble': layout.bubble ?? '46%',
                        }}
                      >
                        <div className="ri-ytd-impact-bubble">{`${group.delta.toFixed(2)}pp`}</div>
                        <span className="ri-ytd-impact-leg ri-ytd-impact-leg--left" />
                        <span className="ri-ytd-impact-leg ri-ytd-impact-leg--top" />
                        <span className="ri-ytd-impact-leg ri-ytd-impact-leg--right" />
                        <span className="ri-ytd-impact-arrow" />
                      </div>
                    )
                  })}
                </div>
                <div className="ri-ytd-chart-canvas ri-ytd-chart-canvas--impact">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={impactData} margin={{ top: 54, right: 10, bottom: 36, left: 12 }} barCategoryGap="32%" barGap={4}>
                      <XAxis
                        dataKey="label"
                        height={40}
                        tickLine={false}
                        tickMargin={6}
                        axisLine={{ stroke: chartPalette.axis, strokeWidth: 1.6 }}
                        tick={{ fill: chartPalette.text, fontSize: 11 }}
                        interval={0}
                      />
                      <YAxis
                        width={30}
                        domain={[0, completionChart.max]}
                        ticks={buildTicks(completionChart.interval, completionChart.max, completionChart.interval)}
                        tickLine={false}
                        axisLine={{ stroke: chartPalette.axis, strokeWidth: 1.6 }}
                        tick={{ fill: chartPalette.text, fontSize: 11 }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip formatter={(value, name) => [formatPercent(value), name]} contentStyle={{ fontSize: 11 }} />
                      <Bar dataKey="control" name={completionChart.legend.control} fill={chartPalette.control} maxBarSize={46} isAnimationActive={false}>
                        <LabelList dataKey="control" position="top" offset={6} formatter={formatPercent} fill={chartPalette.text} fontSize={11} fontWeight={700} />
                      </Bar>
                      <Bar dataKey="treatment" name={completionChart.legend.treatment} fill={chartPalette.treatment} maxBarSize={46} isAnimationActive={false}>
                        <LabelList dataKey="treatment" position="top" offset={6} formatter={formatPercent} fill={chartPalette.text} fontSize={11} fontWeight={700} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <YTDLegend
                items={[
                  { label: completionChart.legend.control, color: chartPalette.control, kind: 'square' },
                  { label: completionChart.legend.treatment, color: chartPalette.treatment, kind: 'square' },
                ]}
              />
            </div>
          </article>

          <article className="ri-ytd-chart-card">
            <header className="ri-ytd-chart-header">Monitoring HCC capture during completed HHVs</header>
            <div className="ri-ytd-chart-body">
              <p className="ri-ytd-chart-copy">
                {monitoringChart.copyTitle}
                <br />
                {monitoringChart.copySubtitle}
              </p>
              <div className="ri-ytd-chart-monitor-wrap">
                <div className="ri-ytd-chart-note">
                  <span>{monitoringChart.noteTitle}</span>
                  <span>{monitoringChart.noteSubtitle}</span>
                </div>
                <div className="ri-ytd-chart-canvas ri-ytd-chart-canvas--monitoring">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monitoringData} margin={{ top: 28, right: 22, bottom: 28, left: 12 }}>
                      <XAxis
                        dataKey="month"
                        height={30}
                        tickLine={false}
                        tickMargin={6}
                        axisLine={{ stroke: chartPalette.axis, strokeWidth: 1.4 }}
                        tick={{ fill: chartPalette.text, fontSize: 11 }}
                        interval={0}
                      />
                      <YAxis
                        width={28}
                        domain={[0, monitoringChart.max]}
                        ticks={buildTicks(0, monitoringChart.max, monitoringChart.interval)}
                        tickLine={false}
                        axisLine={{ stroke: chartPalette.axis, strokeWidth: 1.4 }}
                        tick={{ fill: chartPalette.text, fontSize: 11 }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        formatter={(value, name) => [formatPercentValue(value), name]}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{ fontSize: 11 }}
                      />
                      <ReferenceLine
                        y={monitoringChart.expectedHighLabel}
                        stroke={chartPalette.expectedHigh}
                        strokeWidth={1.6}
                        strokeDasharray="6 4"
                        isFront
                        ifOverflow="extendDomain"
                        label={{ value: `${monitoringChart.expectedHighLabel}%`, position: 'right', fill: '#3a3f47', fontSize: 12, fontWeight: 700 }}
                      />
                      <ReferenceLine
                        y={monitoringChart.expectedLowLabel}
                        stroke={chartPalette.expectedLow}
                        strokeWidth={1.6}
                        strokeDasharray="6 4"
                        isFront
                        ifOverflow="extendDomain"
                        label={{ value: `${monitoringChart.expectedLowLabel}%`, position: 'right', fill: '#3a3f47', fontSize: 12, fontWeight: 700 }}
                      />
                      <Line type="monotone" dataKey="treatmentLow" name="Treatment (Low Risk)" stroke={chartPalette.treatmentLow} strokeWidth={1.8} dot={false} isAnimationActive={false} />
                      <Line type="monotone" dataKey="treatmentHigh" name="Treatment (High Risk)" stroke={chartPalette.treatmentHigh} strokeWidth={1.8} strokeDasharray="6 4" dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <YTDLegend
                className="ri-ytd-chart-legend--monitoring"
                items={[
                  { label: 'Expected baseline - Low Risk', color: chartPalette.expectedLow, kind: 'line', dash: true },
                  { label: 'Treatment trend - Low Risk', color: chartPalette.treatmentLow, kind: 'line' },
                  { label: 'Expected baseline - High Risk', color: chartPalette.expectedHigh, kind: 'line', dash: true },
                  { label: 'Treatment trend - High Risk', color: chartPalette.treatmentHigh, kind: 'line', dash: true },
                ]}
              />
            </div>
          </article>
        </section>
      </section>
    </ProductPageLayout>
  )
}

export default OptumIOAYTDSuppressionStatsPage

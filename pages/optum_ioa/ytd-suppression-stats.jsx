import React from 'react'
import ReactECharts from 'echarts-for-react'
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
  copyTitle: 'YoY HHV completion rates since 5/10 (%) -',
  copySubtitle: 'Suppressed members: T vs. C',
  max: 30,
  interval: 10,
  legend: {
    control: 'Control (targeted by Optum)',
    treatment: 'Treatment (actively suppressed)',
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
  copyTitle: 'Gross HCC capture\u00b2 (%)',
  copySubtitle: 'during completed visits',
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
  expectedLow: '#d2d7df',
  expectedHigh: '#c7e7e4',
  treatmentLow: '#5d7fb4',
  treatmentHigh: '#177f98',
  text: '#2a3342',
}

const formatPercent = (value) => `${Number(value).toFixed(2).replace(/\.00$/, '')}%`

const createImpactOption = (completion) => ({
  animation: false,
  color: [chartPalette.control, chartPalette.treatment],
  grid: {
    top: 50,
    right: 16,
    bottom: 70,
    left: 42,
  },
  legend: {
    bottom: 4,
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 14,
    textStyle: {
      color: chartPalette.text,
      fontSize: 11,
    },
    data: [completion.legend.control, completion.legend.treatment],
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    valueFormatter: (value) => formatPercent(value),
  },
  xAxis: {
    type: 'category',
    data: completion.groups.map((group) => group.label),
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: chartPalette.axis,
        width: 1.6,
      },
    },
    axisLabel: {
      color: chartPalette.text,
      fontSize: 11,
      lineHeight: 15,
      interval: 0,
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: completion.max,
    interval: completion.interval,
    axisLine: {
      show: true,
      lineStyle: {
        color: chartPalette.axis,
        width: 1.6,
      },
    },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: {
      color: chartPalette.text,
      fontSize: 11,
      formatter: (value) => `${value}%`,
    },
  },
  series: [
    {
      name: completion.legend.control,
      type: 'bar',
      barWidth: 44,
      data: completion.groups.map((group) => group.control),
      label: {
        show: true,
        position: 'top',
        color: chartPalette.text,
        fontSize: 11,
        fontWeight: 700,
        formatter: ({ value }) => formatPercent(value),
      },
    },
    {
      name: completion.legend.treatment,
      type: 'bar',
      barWidth: 44,
      data: completion.groups.map((group) => group.treatment),
      label: {
        show: true,
        position: 'top',
        color: chartPalette.text,
        fontSize: 11,
        fontWeight: 700,
        formatter: ({ value }) => formatPercent(value),
      },
    },
  ],
})

const createMonitoringOption = (monitoring) => ({
  animation: false,
  color: [
    chartPalette.expectedLow,
    chartPalette.treatmentLow,
    chartPalette.expectedHigh,
    chartPalette.treatmentHigh,
  ],
  grid: {
    top: 16,
    right: 14,
    bottom: 58,
    left: 42,
  },
  legend: {
    bottom: 2,
    icon: 'line',
    itemWidth: 22,
    itemHeight: 2,
    textStyle: {
      color: chartPalette.text,
      fontSize: 11,
    },
    data: [
      'Expected - Low Risk',
      'Treatment (Low Risk)',
      'Expected - High Risk',
      'Treatment (High Risk)',
    ],
  },
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value) => `${value}%`,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: monitoring.months,
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: chartPalette.axis,
        width: 1.4,
      },
    },
    axisLabel: {
      color: chartPalette.text,
      fontSize: 11,
      interval: 0,
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: monitoring.max,
    interval: monitoring.interval,
    axisLine: {
      show: true,
      lineStyle: {
        color: chartPalette.axis,
        width: 1.4,
      },
    },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: {
      color: chartPalette.text,
      fontSize: 11,
      formatter: (value) => `${value}%`,
    },
  },
  series: [
    {
      name: 'Expected - Low Risk',
      type: 'line',
      showSymbol: false,
      lineStyle: {
        type: 'dashed',
        width: 1.6,
      },
      data: monitoring.expectedLow,
    },
    {
      name: 'Treatment (Low Risk)',
      type: 'line',
      showSymbol: false,
      lineStyle: {
        width: 1.8,
      },
      data: monitoring.treatmentLow,
      smooth: 0.2,
    },
    {
      name: 'Expected - High Risk',
      type: 'line',
      showSymbol: false,
      lineStyle: {
        type: 'dashed',
        width: 1.6,
      },
      data: monitoring.expectedHigh,
    },
    {
      name: 'Treatment (High Risk)',
      type: 'line',
      showSymbol: false,
      lineStyle: {
        width: 1.8,
        type: 'dashed',
      },
      data: monitoring.treatmentHigh,
      smooth: 0.18,
    },
  ],
})

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
                <ReactECharts
                  className="ri-ytd-chart-canvas ri-ytd-chart-canvas--impact"
                  option={createImpactOption(completionChart)}
                  notMerge
                  lazyUpdate
                />
              </div>
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
                <span className="ri-ytd-chart-marker ri-ytd-chart-marker--high">{monitoringChart.expectedHighLabel}%</span>
                <span className="ri-ytd-chart-marker ri-ytd-chart-marker--low">{monitoringChart.expectedLowLabel}%</span>
                <ReactECharts
                  className="ri-ytd-chart-canvas ri-ytd-chart-canvas--monitoring"
                  option={createMonitoringOption(monitoringChart)}
                  notMerge
                  lazyUpdate
                />
              </div>
            </div>
          </article>
        </section>
      </section>
    </ProductPageLayout>
  )
}

export default OptumIOAYTDSuppressionStatsPage

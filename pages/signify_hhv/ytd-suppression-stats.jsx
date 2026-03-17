import React from 'react'
import ReactECharts from 'echarts-for-react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/signify_hhv/ytd-suppression-stats.css'

const financialRows = [
  { label: '# members currently suppressed', goal: '31k', ytd: '339k', forecast: '362k', forecastTone: 'green' },
  { label: '# of members released', goal: '406k', ytd: '271k', forecast: '386k', forecastTone: 'green' },
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

const completionChart = {
  copyTitle: 'YoY HHV completion rates since 5/10 (%) -',
  copySubtitle: 'Suppressed members: T vs. C',
  max: 30,
  interval: 10,
  legend: {
    control: 'Control (targeted by Signify)',
    treatment: 'Treatment (actively suppressed)',
  },
  calloutLayouts: [
    { start: '31%', end: '61%', bubble: '46%' },
    { start: '31%', end: '61%', bubble: '46%' },
  ],
  groups: [
    { label: 'Members suppressed - Low Risk', control: 14.19, treatment: 7.04, delta: -7.15 },
    { label: 'Members suppressed - High Risk', control: 11.7, treatment: 10.13, delta: -1.57 },
  ],
}

const monitoringChart = {
  copyTitle: 'Gross HCC capture\u00b2 (%)',
  copySubtitle: 'during completed visits',
  noteTitle: 'Avg 13% per saved visit',
  noteSubtitle: '(+15% optimized rate)',
  months: ['1 Jan', '1 Feb', '1 Mar', '1 Apr', '1 May', '1 Jun', '1 Jul', '1 Aug', '1 Sep', '1 Oct', '1 Nov', '1 Dec'],
  max: 80,
  interval: 20,
  expectedLowLabel: 9,
  expectedHighLabel: 59,
  expectedLow: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  expectedHigh: [59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59],
  treatmentLow: [6, 8, 7, 9, 8, 8, 9, 7, 9, 8, 8, 9],
  treatmentHigh: [60, 43, 45, 46, 49, 47, 50, 51, 49, 50, 28, 0],
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

export default SignifyHHVYTDSuppressionStatsPage

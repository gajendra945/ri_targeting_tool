import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/optum_ioa/model-performance.css'

const palette = {
  brandBlue: '#1f5aa4',
  text: '#2e3a49',
  border: '#d8dee8',
  expected: '#7f9fce',
  aetnaCost: '#5f5f5f',
  enterpriseCost: '#ef4444',
  aetnaNetCurrent: '#f7be3d',
  enterpriseNetCurrent: '#1f7a67',
  aetnaNetPrevious: '#f4d16f',
  enterpriseNetPrevious: '#67a492',
  errorCurrent: '#7d7d7d',
  errorPrevious: '#b3b3b3',
}

const getColor = (token) => palette[token] ?? palette.text
const formatMoney = (value) => `$${value}`

const createRankingSeries = (series = []) =>
  series.map((item) => ({
    name: item.name,
    type: 'line',
    smooth: item.smooth ?? 0,
    symbol: 'none',
    lineStyle: {
      width: 1.8,
      type: item.dash ? 'dashed' : 'solid',
      color: getColor(item.colorToken),
    },
    itemStyle: {
      color: getColor(item.colorToken),
    },
    data: item.data ?? [],
  }))

const renderRankingCallouts = (callouts = []) =>
  callouts.map((item) => (
    <React.Fragment key={item.key}>
      <div className="ri-model-callout" style={{ left: item.textLeft, top: item.textTop }}>
        {item.lines.map((line) => (
          <span key={`${item.key}-${line}`}>{line}</span>
        ))}
      </div>
      <span
        className="ri-model-callout-line"
        style={{
          left: item.lineLeft,
          top: item.lineTop,
          width: item.lineWidth,
          transform: `rotate(${item.lineRotate}deg)`,
        }}
      />
      <span className="ri-model-callout-dot" style={{ left: item.dotLeft, top: item.dotTop }} />
    </React.Fragment>
  ))

const createMonthlySeries = (series = []) =>
  series.map((item) => ({
    name: item.name,
    type: 'line',
    yAxisIndex: item.axis === 'right' ? 1 : 0,
    symbol: item.showSymbol ? 'circle' : 'none',
    symbolSize: item.showSymbol ? 4 : 0,
    smooth: item.smooth ?? 0,
    lineStyle: {
      width: item.axis === 'right' ? 1.4 : 2,
      type: item.dash ? 'dashed' : 'solid',
      color: getColor(item.colorToken),
    },
    itemStyle: {
      color: getColor(item.colorToken),
    },
    data: item.data ?? [],
  }))

const createRankingOption = (ranking = {}) => ({
  animation: false,
  grid: {
    top: 24,
    right: 210,
    bottom: 32,
    left: 52,
  },
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value) => `$${value}`,
  },
  legend: {
    right: 14,
    top: 62,
    orient: 'vertical',
    itemWidth: 18,
    itemHeight: 2,
    itemGap: 8,
    textStyle: {
      color: palette.text,
      fontSize: 10,
    },
    data: (ranking.series ?? []).map((item) => item.name),
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ranking.categories ?? [],
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: '#394251',
        width: 1.4,
      },
    },
    axisLabel: {
      color: palette.text,
      fontSize: 10,
      interval: 0,
    },
    name: ranking.xAxisLabel,
    nameLocation: 'end',
    nameGap: 12,
    nameTextStyle: {
      color: palette.text,
      fontSize: 10,
      fontWeight: 700,
    },
  },
  yAxis: {
    type: 'value',
    min: ranking.yAxis?.min ?? 0,
    max: ranking.yAxis?.max ?? 600,
    interval: ranking.yAxis?.interval ?? 100,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#394251',
        width: 1.4,
      },
    },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: {
      color: palette.text,
      fontSize: 10,
      formatter: (value) => formatMoney(value),
    },
  },
  series: createRankingSeries(ranking.series),
})

const createMonthPerformanceOption = (monthly = {}) => ({
  animation: false,
  grid: {
    top: 18,
    right: 232,
    bottom: 32,
    left: 54,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    right: 14,
    top: 26,
    orient: 'vertical',
    itemWidth: 18,
    itemHeight: 2,
    itemGap: 7,
    textStyle: {
      color: palette.text,
      fontSize: 10,
    },
    data: (monthly.series ?? []).map((item) => item.name),
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: monthly.categories ?? [],
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: '#394251',
        width: 1.4,
      },
    },
    axisLabel: {
      color: palette.text,
      fontSize: 10,
      interval: 0,
    },
  },
  yAxis: [
    {
      type: 'value',
      min: monthly.leftAxis?.min ?? -30,
      max: monthly.leftAxis?.max ?? 50,
      interval: monthly.leftAxis?.interval ?? 10,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#394251',
          width: 1.4,
        },
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: palette.text,
        fontSize: 10,
        formatter: (value) => value,
      },
    },
    {
      type: 'value',
      min: monthly.rightAxis?.min ?? 0,
      max: monthly.rightAxis?.max ?? 30,
      interval: monthly.rightAxis?.interval ?? 5,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#394251',
          width: 1.2,
        },
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: palette.text,
        fontSize: 10,
        formatter: (value) => value,
      },
    },
  ],
  series: createMonthlySeries(monthly.series),
})

const modelPerformanceData = {
  rankingChart: {
    title: 'Member ranking and expected incremental value/HHV',
    yAxisLabel: 'Expected avg value coming from HHV',
    xAxisLabel: 'Model Percentiles',
    categories: ['0%', '5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%'],
    yAxis: {
      min: 0,
      max: 600,
      interval: 100,
    },
    callouts: [],
    series: [
      {
        key: 'expectedRiValue',
        name: 'Expected avg RI value from HHV',
        colorToken: 'expected',
        data: [95, 128, 146, 185, 225, 290, 320, 395, 420, 480, 465],
        smooth: 0.18,
      },
      {
        key: 'aetnaCost',
        name: 'HHV cost to Aetna',
        colorToken: 'aetnaCost',
        data: [340, 340, 340, 340, 340, 340, 340, 340, 340, 340, 340],
        dash: true,
      },
      {
        key: 'enterpriseCost',
        name: 'HHV cost to Enterprise',
        colorToken: 'enterpriseCost',
        data: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
        dash: true,
      },
    ],
  },
  monthlyChart: {
    title: 'Month-Over-Month Model Performance',
    leftAxisLabel: 'Net savings ($M)',
    rightAxisLabel: 'Error rate (%)',
    categories: ['0%', '5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%'],
    leftAxis: {
      min: -30,
      max: 50,
      interval: 10,
    },
    rightAxis: {
      min: 0,
      max: 30,
      interval: 5,
    },
    series: [
      {
        key: 'aetnaOctober',
        name: 'Aetna Net Savings (October)',
        colorToken: 'aetnaNetCurrent',
        axis: 'left',
        data: [0, 31, 35.4, 42.8, 43.6, 41.4, null, null, null, null, null],
        smooth: 0.2,
        showSymbol: true,
      },
      {
        key: 'enterpriseOctober',
        name: 'Enterprise Net Savings (October)',
        colorToken: 'enterpriseNetCurrent',
        axis: 'left',
        data: [0, 5.1, 7.2, 15.4, 15.7, 11.1, 5.9, null, null, null, null],
        smooth: 0.2,
        showSymbol: true,
      },
      {
        key: 'aetnaSeptember',
        name: 'Aetna Net Savings (September)',
        colorToken: 'aetnaNetPrevious',
        axis: 'left',
        data: [0, 29.4, 33.2, 40.9, 41.8, 40.1, null, null, null, null, null],
        smooth: 0.2,
      },
      {
        key: 'enterpriseSeptember',
        name: 'Enterprise Net Savings (September)',
        colorToken: 'enterpriseNetPrevious',
        axis: 'left',
        data: [0, 4.2, 6.3, 13.9, 14.6, 10.8, 5.4, null, null, null, null],
        smooth: 0.2,
      },
      {
        key: 'errorOctober',
        name: 'Error Rate (October)',
        colorToken: 'errorCurrent',
        axis: 'right',
        data: [2.4, 3.2, 4.1, 4.8, 5.7, 6.8, 8.1, null, null, null, null],
        dash: true,
      },
      {
        key: 'errorSeptember',
        name: 'Error Rate (September)',
        colorToken: 'errorPrevious',
        axis: 'right',
        data: [1.8, 2.8, 3.6, 4.3, 5.1, 6.1, 7.4, null, null, null, null],
        dash: true,
      },
    ],
  },
}

function OptumIOAModelPerformanceContent({ data }) {
  const ranking = data?.rankingChart ?? {}
  const monthly = data?.monthlyChart ?? {}
  const rankingOption = useMemo(() => createRankingOption(ranking), [ranking])
  const monthlyOption = useMemo(() => createMonthPerformanceOption(monthly), [monthly])

  return (
    <section className="ri-model-card-grid">
      <article className="ri-model-card">
        <header className="ri-model-card-header">{ranking.title}</header>
        <div className="ri-model-card-body ri-model-card-body--ranking">
          <p className="ri-model-axis-copy">{ranking.yAxisLabel}</p>
          <div className="ri-model-ranking-shell">
            {renderRankingCallouts(ranking.callouts)}
            <ReactECharts
              className="ri-model-chart ri-model-chart--ranking"
              option={rankingOption}
              notMerge
              lazyUpdate
            />
          </div>
        </div>
      </article>

      <article className="ri-model-card">
        <header className="ri-model-card-header">{monthly.title}</header>
        <div className="ri-model-card-body">
          <div className="ri-model-axis-row">
            <span className="ri-model-axis-copy">{monthly.leftAxisLabel}</span>
            <span className="ri-model-axis-copy ri-model-axis-copy--right">{monthly.rightAxisLabel}</span>
          </div>
          <ReactECharts
            className="ri-model-chart ri-model-chart--monthly"
            option={monthlyOption}
            notMerge
            lazyUpdate
          />
        </div>
      </article>
    </section>
  )
}

const OptumIOAModelPerformancePage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Optum IOA" subtitle="Model Performance" />
      <section className="ri-feature-body ri-optum-ioa-model-page">
        <OptumIOAModelPerformanceContent data={modelPerformanceData} />
      </section>
    </ProductPageLayout>
  )
}

export default OptumIOAModelPerformancePage

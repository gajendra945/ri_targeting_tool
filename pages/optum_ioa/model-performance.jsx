import React, { useMemo } from 'react'
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/optum_ioa/model-performance.css'

const palette = {
  text: '#2e3a49',
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
const formatTooltipValue = (value, name) => [String(name).includes('Error') ? `${value}%` : formatMoney(value), name]

const buildTicks = (min = 0, max = 0, interval = 1) => {
  const ticks = []

  for (let value = min; value <= max; value += interval) {
    ticks.push(value)
  }

  return ticks
}

const createChartData = (categories = [], series = []) =>
  categories.map((category, index) => {
    const row = { category }

    series.forEach((item) => {
      row[item.key] = item.data?.[index] ?? null
    })

    return row
  })

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

function ModelLegend({ items }) {
  return (
    <div className="ri-model-legend-shell">
      <p className="ri-model-legend-title">Line description</p>
      <div className="ri-model-legend" role="list" aria-label="Chart legend">
        {items.map((item) => (
          <div key={item.key} className="ri-model-legend-item" role="listitem">
            <span
              className={`ri-model-legend-line${item.dash ? ' ri-model-legend-line--dash' : ''}`}
              style={{ '--ri-legend-color': getColor(item.colorToken) }}
            />
            <span className="ri-model-legend-label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

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
        name: 'Expected avg RI value per HHV',
        colorToken: 'expected',
        data: [95, 128, 146, 185, 225, 290, 320, 395, 420, 480, 465],
        smooth: 0.18,
      },
      {
        key: 'aetnaCost',
        name: 'Reference line - HHV cost to Aetna',
        colorToken: 'aetnaCost',
        data: [340, 340, 340, 340, 340, 340, 340, 340, 340, 340, 340],
        dash: true,
      },
      {
        key: 'enterpriseCost',
        name: 'Reference line - HHV cost to Enterprise',
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
        name: 'Aetna net savings - October',
        colorToken: 'aetnaNetCurrent',
        axis: 'left',
        data: [0, 31, 35.4, 42.8, 43.6, 41.4, null, null, null, null, null],
        smooth: 0.2,
        showSymbol: true,
      },
      {
        key: 'enterpriseOctober',
        name: 'Enterprise net savings - October',
        colorToken: 'enterpriseNetCurrent',
        axis: 'left',
        data: [0, 5.1, 7.2, 15.4, 15.7, 11.1, 5.9, null, null, null, null],
        smooth: 0.2,
        showSymbol: true,
      },
      {
        key: 'aetnaSeptember',
        name: 'Aetna net savings - September',
        colorToken: 'aetnaNetPrevious',
        axis: 'left',
        data: [0, 29.4, 33.2, 40.9, 41.8, 40.1, null, null, null, null, null],
        smooth: 0.2,
      },
      {
        key: 'enterpriseSeptember',
        name: 'Enterprise net savings - September',
        colorToken: 'enterpriseNetPrevious',
        axis: 'left',
        data: [0, 4.2, 6.3, 13.9, 14.6, 10.8, 5.4, null, null, null, null],
        smooth: 0.2,
      },
      {
        key: 'errorOctober',
        name: 'Error rate - October',
        colorToken: 'errorCurrent',
        axis: 'right',
        data: [2.4, 3.2, 4.1, 4.8, 5.7, 6.8, 8.1, null, null, null, null],
        dash: true,
      },
      {
        key: 'errorSeptember',
        name: 'Error rate - September',
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
  const rankingData = useMemo(() => createChartData(ranking.categories, ranking.series), [ranking])
  const monthlyData = useMemo(() => createChartData(monthly.categories, monthly.series), [monthly])

  return (
    <section className="ri-model-card-grid">
      <article className="ri-model-card">
        <header className="ri-model-card-header">{ranking.title}</header>
        <div className="ri-model-card-body ri-model-card-body--ranking">
          <p className="ri-model-axis-copy">{ranking.yAxisLabel}</p>
          <div className="ri-model-ranking-shell">
            {renderRankingCallouts(ranking.callouts)}
            <div className="ri-model-chart-shell">
              <div className="ri-model-chart-stage ri-model-chart--ranking">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rankingData} margin={{ top: 18, right: 12, bottom: 18, left: 0 }}>
                    <XAxis
                      dataKey="category"
                      tickLine={false}
                      tickMargin={8}
                      height={34}
                      axisLine={{ stroke: '#394251', strokeWidth: 1.4 }}
                      tick={{ fill: palette.text, fontSize: 10 }}
                      interval={0}
                      label={{
                        value: ranking.xAxisLabel,
                        position: 'insideBottomRight',
                        offset: -4,
                        fill: palette.text,
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    />
                    <YAxis
                      width={44}
                      domain={[ranking.yAxis?.min ?? 0, ranking.yAxis?.max ?? 600]}
                      ticks={buildTicks(ranking.yAxis?.min ?? 0, ranking.yAxis?.max ?? 600, ranking.yAxis?.interval ?? 100)}
                      tickLine={false}
                      axisLine={{ stroke: '#394251', strokeWidth: 1.4 }}
                      tick={{ fill: palette.text, fontSize: 10 }}
                      tickFormatter={(value) => formatMoney(value)}
                    />
                    <Tooltip formatter={formatTooltipValue} contentStyle={{ fontSize: 11 }} />
                    {(ranking.series ?? []).map((item) => (
                      <Line
                        key={item.key}
                        type={item.smooth ? 'monotone' : 'linear'}
                        dataKey={item.key}
                        name={item.name}
                        stroke={getColor(item.colorToken)}
                        strokeWidth={1.8}
                        strokeDasharray={item.dash ? '6 4' : undefined}
                        dot={false}
                        isAnimationActive={false}
                        connectNulls={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <ModelLegend items={ranking.series ?? []} />
            </div>
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
          <div className="ri-model-chart-shell">
            <div className="ri-model-chart-stage ri-model-chart--monthly">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 16, right: 12, bottom: 18, left: 0 }}>
                  <XAxis
                    dataKey="category"
                    tickLine={false}
                    tickMargin={8}
                    height={30}
                    axisLine={{ stroke: '#394251', strokeWidth: 1.4 }}
                    tick={{ fill: palette.text, fontSize: 10 }}
                    interval={0}
                  />
                  <YAxis
                    yAxisId="left"
                    width={34}
                    domain={[monthly.leftAxis?.min ?? -30, monthly.leftAxis?.max ?? 50]}
                    ticks={buildTicks(monthly.leftAxis?.min ?? -30, monthly.leftAxis?.max ?? 50, monthly.leftAxis?.interval ?? 10)}
                    tickLine={false}
                    axisLine={{ stroke: '#394251', strokeWidth: 1.4 }}
                    tick={{ fill: palette.text, fontSize: 10 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    width={32}
                    domain={[monthly.rightAxis?.min ?? 0, monthly.rightAxis?.max ?? 30]}
                    ticks={buildTicks(monthly.rightAxis?.min ?? 0, monthly.rightAxis?.max ?? 30, monthly.rightAxis?.interval ?? 5)}
                    tickLine={false}
                    axisLine={{ stroke: '#394251', strokeWidth: 1.2 }}
                    tick={{ fill: palette.text, fontSize: 10 }}
                  />
                  <Tooltip formatter={formatTooltipValue} contentStyle={{ fontSize: 11 }} />
                  <ReferenceLine yAxisId="left" y={0} stroke="#394251" strokeWidth={1.2} />
                  {(monthly.series ?? []).map((item) => (
                    <Line
                      key={item.key}
                      yAxisId={item.axis === 'right' ? 'right' : 'left'}
                      type={item.smooth ? 'monotone' : 'linear'}
                      dataKey={item.key}
                      name={item.name}
                      stroke={getColor(item.colorToken)}
                      strokeWidth={item.axis === 'right' ? 1.4 : 2}
                      strokeDasharray={item.dash ? '6 4' : undefined}
                      dot={item.showSymbol ? { r: 2.5, strokeWidth: 0, fill: getColor(item.colorToken) } : false}
                      activeDot={item.showSymbol ? { r: 4 } : false}
                      isAnimationActive={false}
                      connectNulls={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <ModelLegend items={monthly.series ?? []} />
          </div>
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

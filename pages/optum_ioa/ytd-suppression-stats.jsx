import React from 'react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/optum_ioa/ytd-suppression-stats.css'

const OptumIOAYTDSuppressionStatsPage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Optum IOA" subtitle="YTD suppression Stats" />
      <section className="ri-feature-body ri-optum-ioa-ytd-page">
        <p className="ri-feature-description">Page scaffold is ready for this feature.</p>
      </section>
    </ProductPageLayout>
  )
}

export default OptumIOAYTDSuppressionStatsPage

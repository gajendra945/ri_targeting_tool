import React from 'react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/signify_hhv/ytd-suppression-stats.css'

const SignifyHHVYTDSuppressionStatsPage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Signify HHV" subtitle="YTD suppression Stats" />
      <section className="ri-feature-body ri-signify-hhv-ytd-page">
        <p className="ri-feature-description">Page scaffold is ready for this feature.</p>
      </section>
    </ProductPageLayout>
  )
}

export default SignifyHHVYTDSuppressionStatsPage

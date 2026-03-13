import React from 'react'
import { ProductPageLayout } from '../../component/product-page-layout'
import { ProductPageStrip } from '../../component/product-page-strip'
import '../../styles/ri_targeting_tool/optum_ioa/future-suppressions.css'

const OptumIOAFutureSuppressionsPage = () => {
  return (
    <ProductPageLayout>
      <ProductPageStrip title="Optum IOA" subtitle="Future Suppressions" />
      <section className="ri-feature-body">
        <p className="ri-feature-description">Page scaffold is ready for this feature.</p>
      </section>
    </ProductPageLayout>
  )
}

export default OptumIOAFutureSuppressionsPage

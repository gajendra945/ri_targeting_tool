import React from 'react'

const defaultFilterLabels = ['N2P/return', 'Market', 'State', 'IVL/GRP', 'Contract', 'PBP']

export function ProductPageStrip({ title, subtitle, filterLabels = defaultFilterLabels }) {
  return (
    <section className="ri-page-strip">
      <div className="ri-page-strip-left">
        <h3 className="ri-page-strip-title">{title}</h3>
        <p className="ri-page-strip-subtitle">{subtitle}</p>
      </div>
      <div className="ri-page-filter-row">
        {filterLabels.map((label) => (
          <button type="button" key={label} className="ri-page-filter-btn">
            <span>{label}</span>
            <span className="ri-page-filter-arrow">&#9660;</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ProductPageStrip

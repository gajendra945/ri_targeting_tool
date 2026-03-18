import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRiTargetingToolFilters } from '../redux'

const filterDefinitions = [
  {
    key: 'n2pReturn',
    options: ['N2P return', 'All returns', 'New to Plan', 'Returning Members'],
  },
  {
    key: 'market',
    options: ['Market', 'National', 'East', 'West'],
  },
  {
    key: 'state',
    options: ['State', 'AZ', 'CA', 'FL', 'TX'],
  },
  {
    key: 'ivlGrpSnp',
    options: ['IVL/GRP/SNP', 'IVL', 'GRP', 'SNP'],
  },
  {
    key: 'contract',
    options: ['Contract', 'H0544', 'H2228', 'H5216'],
  },
  {
    key: 'pbp',
    options: ['PBP', '001', '004', '010'],
  },
]

export function TopFilterRow({ className }) {
  const filters = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const handleChange = (key, value) => {
    dispatch(
      setRiTargetingToolFilters({
        ...filters,
        [key]: value,
      }),
    )
  }

  return (
    <div className={className}>
      {filterDefinitions.map((filter) => (
        <label key={filter.key} className="ri-filter-item ri-filter-item--select">
          <select
            className="ri-filter-select"
            value={filters[filter.key]}
            onChange={(event) => handleChange(filter.key, event.target.value)}
            aria-label={filter.options[0]}
          >
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="ri-filter-arrow">&#9660;</span>
        </label>
      ))}
    </div>
  )
}

export function ProductPageStrip({ title, subtitle }) {
  return (
    <section className="ri-page-strip">
      <div className="ri-page-strip-left">
        <h3 className="ri-page-strip-title">{title}</h3>
        <p className="ri-page-strip-subtitle">{subtitle}</p>
      </div>
      <TopFilterRow className="ri-page-filter-row" />
    </section>
  )
}

export default ProductPageStrip

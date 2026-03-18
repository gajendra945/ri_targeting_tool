import React from 'react'

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

const filterStorageKey = 'ri-targeting-tool-top-filters'

const defaultFilterValues = {
  n2pReturn: 'N2P return',
  market: 'Market',
  state: 'State',
  ivlGrpSnp: 'IVL/GRP/SNP',
  contract: 'Contract',
  pbp: 'PBP',
}

const normalizeFilters = (candidateFilters = {}) =>
  filterDefinitions.reduce((accumulator, filterDefinition) => {
    const candidateValue = candidateFilters[filterDefinition.key]

    accumulator[filterDefinition.key] = filterDefinition.options.includes(candidateValue)
      ? candidateValue
      : defaultFilterValues[filterDefinition.key]

    return accumulator
  }, {})

const readStoredFilters = () => {
  if (typeof window === 'undefined') {
    return defaultFilterValues
  }

  try {
    const storedValue = window.localStorage.getItem(filterStorageKey)

    if (!storedValue) {
      return defaultFilterValues
    }

    return normalizeFilters(JSON.parse(storedValue))
  } catch {
    return defaultFilterValues
  }
}

export function TopFilterRow({ className }) {
  const [filters, setFilters] = React.useState(readStoredFilters)

  React.useEffect(() => {
    window.localStorage.setItem(filterStorageKey, JSON.stringify(filters))
  }, [filters])

  const handleChange = (key, value) => {
    setFilters((currentFilters) => {
      const nextFilters = {
        ...currentFilters,
        [key]: value,
      }

      window.localStorage.setItem(filterStorageKey, JSON.stringify(nextFilters))

      return nextFilters
    })
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

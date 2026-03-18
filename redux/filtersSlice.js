import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  n2pReturn: 'N2P return',
  market: 'Market',
  state: 'State',
  ivlGrpSnp: 'IVL/GRP/SNP',
  contract: 'Contract',
  pbp: 'PBP',
}

const filtersSlice = createSlice({
  name: 'riTargetingToolFilters',
  initialState,
  reducers: {
    setRiTargetingToolFilters: (_, action) => action.payload,
    resetRiTargetingToolFilters: () => initialState,
  },
})

export const { setRiTargetingToolFilters, resetRiTargetingToolFilters } = filtersSlice.actions
export const riTargetingToolFiltersReducer = filtersSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  n2pReturn: 'All',
  market: 'National',
  state: 'All',
  ivlGrpSnp: 'All',
  contract: 'All',
  pbp: 'All',
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

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface RiTargetingToolFilters {
  n2pReturn: string
  market: string
  state: string
  ivlGrpSnp: string
  contract: string
  pbp: string
}

const initialState: RiTargetingToolFilters = {
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
    setRiTargetingToolFilters: (_, action: PayloadAction<RiTargetingToolFilters>) => action.payload,
    resetRiTargetingToolFilters: () => initialState,
  },
})

export const { setRiTargetingToolFilters, resetRiTargetingToolFilters } = filtersSlice.actions
export const riTargetingToolFiltersReducer = filtersSlice.reducer

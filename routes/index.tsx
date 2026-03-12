import { Route, Routes } from 'react-router-dom'
import { RiTargetingToolHomePage } from '../pages/home-page'
import { RiTargetingToolNotFoundPage } from '../pages/not-found-page'

export function RiTargetingToolRoutes() {
  return (
    <Routes>
      <Route index element={<RiTargetingToolHomePage />} />
      <Route path="*" element={<RiTargetingToolNotFoundPage />} />
    </Routes>
  )
}

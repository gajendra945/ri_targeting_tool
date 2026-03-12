import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../../../common/components/auth/ProtectedRoute.jsx'
import Home from '../pages/Home.jsx'
import NotFound from '../pages/NotFound.jsx'

export const RiTargetingToolRoutes = () => {
  return (
    <Routes>
      {/* RI Targeting Tool product routes - protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Catch all unmatched routes within RI Targeting Tool */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RiTargetingToolRoutes

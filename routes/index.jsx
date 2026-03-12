import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../../../common/components/auth/ProtectedRoute.jsx'
import '../styles/global.css'
import Home from '../pages/Home.jsx'
import NotFound from '../pages/NotFound.jsx'
import { riTargetingToolRoutes } from './constants.js'
import SignifyHHVYTDSuppressionStatsPage from '../pages/signify_hhv/ytd-suppression-stats.jsx'
import SignifyHHVModelPerformancePage from '../pages/signify_hhv/model-performance.jsx'
import SignifyHHVFutureSuppressionsPage from '../pages/signify_hhv/future-suppressions.jsx'
import OptumIOAYTDSuppressionStatsPage from '../pages/optum_ioa/ytd-suppression-stats.jsx'
import OptumIOAModelPerformancePage from '../pages/optum_ioa/model-performance.jsx'
import OptumIOAFutureSuppressionsPage from '../pages/optum_ioa/future-suppressions.jsx'

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
      <Route path="signify_hhv" element={<Navigate to={riTargetingToolRoutes.signifyHHV.ytdSuppressionStats} replace />} />
      <Route
        path="signify_hhv/ytd-suppression-stats"
        element={
          <ProtectedRoute>
            <SignifyHHVYTDSuppressionStatsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="signify_hhv/model-performance"
        element={
          <ProtectedRoute>
            <SignifyHHVModelPerformancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="signify_hhv/future-suppressions"
        element={
          <ProtectedRoute>
            <SignifyHHVFutureSuppressionsPage />
          </ProtectedRoute>
        }
      />
      <Route path="optum_ioa" element={<Navigate to={riTargetingToolRoutes.optumIOA.ytdSuppressionStats} replace />} />
      <Route
        path="optum_ioa/ytd-suppression-stats"
        element={
          <ProtectedRoute>
            <OptumIOAYTDSuppressionStatsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="optum_ioa/model-performance"
        element={
          <ProtectedRoute>
            <OptumIOAModelPerformancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="optum_ioa/future-suppressions"
        element={
          <ProtectedRoute>
            <OptumIOAFutureSuppressionsPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all unmatched routes within RI Targeting Tool */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RiTargetingToolRoutes

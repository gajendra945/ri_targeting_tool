import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../../../common/components/auth/ProtectedRoute.jsx'
import '../styles/global.css'
import Home from '../pages/homePage.jsx'
import NotFound from '../pages/notFoundPage.jsx'
import { riTargetingToolRoutes } from './constants.js'
import SignifyHHVYTDSuppressionStatsPage from '../pages/signifyHHV/ytdSuppressionStats.jsx'
import SignifyHHVModelPerformancePage from '../pages/signifyHHV/modelPerformance.jsx'
import SignifyHHVFutureSuppressionsPage from '../pages/signifyHHV/futureSuppressions.jsx'
import OptumIOAYTDSuppressionStatsPage from '../pages/optumIOA/ytdSuppressionStats.jsx'
import OptumIOAModelPerformancePage from '../pages/optumIOA/modelPerformance.jsx'
import OptumIOAFutureSuppressionsPage from '../pages/optumIOA/futureSuppressions.jsx'

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
      <Route path="signify-hhv" element={<Navigate to={riTargetingToolRoutes.signifyHHV.ytdSuppressionStats} replace />} />
      <Route
        path="signify-hhv/ytd-suppression-stats"
        element={
          <ProtectedRoute>
            <SignifyHHVYTDSuppressionStatsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="signify-hhv/model-performance"
        element={
          <ProtectedRoute>
            <SignifyHHVModelPerformancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="signify-hhv/future-suppressions"
        element={
          <ProtectedRoute>
            <SignifyHHVFutureSuppressionsPage />
          </ProtectedRoute>
        }
      />
      <Route path="optum-ioa" element={<Navigate to={riTargetingToolRoutes.optumIOA.ytdSuppressionStats} replace />} />
      <Route
        path="optum-ioa/ytd-suppression-stats"
        element={
          <ProtectedRoute>
            <OptumIOAYTDSuppressionStatsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="optum-ioa/model-performance"
        element={
          <ProtectedRoute>
            <OptumIOAModelPerformancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="optum-ioa/future-suppressions"
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

import React from 'react'
import { Link } from 'react-router-dom'
import { riTargetingToolRoutes } from '../routes/constants'

const NotFound = () => (
  <main className="ri-notfound-wrap">
    <section className="ri-notfound-card">
      <h1 className="ri-notfound-code">404</h1>
      <p className="ri-notfound-text">Page not found.</p>
      <Link to={riTargetingToolRoutes.home} className="ri-notfound-btn">
        Go to Main Page
      </Link>
    </section>
  </main>
)

export default NotFound

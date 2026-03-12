import { Link } from 'react-router-dom'
import { riTargetingToolRoutes } from '../routes/constants'

export function RiTargetingToolNotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eff1f5] p-6">
      <section className="w-full max-w-md rounded-lg border border-[#d4d8e0] bg-white p-6 text-center">
        <h1 className="text-3xl font-semibold text-[#173f6f]">404</h1>
        <p className="mt-3 text-sm text-[#576071]">Page not found.</p>
        <Link
          to={riTargetingToolRoutes.home}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-[#14539a] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#104680]"
        >
          Go to Main Page
        </Link>
      </section>
    </main>
  )
}

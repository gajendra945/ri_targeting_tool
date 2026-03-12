import { Link } from 'react-router-dom'
import { riTargetingToolRoutes } from '../routes/constants'

type PortalProduct = {
  name: string
  description: string
  openTo: string
}

const portalProducts: PortalProduct[] = [
  {
    name: 'EMO365-Medicare',
    description: 'EMO365-Medicare - Closed Loop Product',
    openTo: riTargetingToolRoutes.home,
  },
  {
    name: 'RI Targeting Tool',
    description: 'Risk intelligence targeting and analytics platform',
    openTo: riTargetingToolRoutes.home,
  },
]

export function RiTargetingToolPortalPage() {
  return (
    <main className="min-h-screen bg-[#ececf0]">
      <header className="bg-[#113a6f]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div>
            <h1 className="text-5xl font-semibold text-white">GCA Products Portal</h1>
            <p className="mt-1 text-sm text-[#d8e6f7]">Access your suite of enterprise products</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-lg text-white">U</div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-10">
        <p className="text-lg text-[#5a5e66]">Welcome! Below are the products you have access to. Select one to get started.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:max-w-3xl">
          {portalProducts.map((product) => (
            <article key={product.name} className="overflow-hidden rounded-md border border-[#35a35a] bg-white shadow-sm">
              <header className="border-b border-[#d8dde5] bg-[#edf1f5] px-5 py-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-4xl font-semibold text-[#143968]">{product.name}</h2>
                  <span className="inline-flex items-center rounded-full bg-[#2f8f4f] px-2 py-0.5 text-xs font-semibold text-white">Active</span>
                </div>
              </header>

              <div className="px-5 py-4 text-sm text-[#5c6068]">{product.description}</div>

              <footer className="border-t border-[#e3e6eb] px-4 py-3">
                <Link
                  to={product.openTo}
                  className="inline-flex h-9 min-w-24 items-center justify-center rounded-lg bg-[#14539a] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#104680]"
                >
                  Open
                </Link>
              </footer>
            </article>
          ))}
        </div>

        <section className="mt-10 grid gap-6 rounded-lg bg-[#e6e7ec] px-6 py-5 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-semibold text-[#143968]">2 of 2 Products Available</h3>
            <p className="mt-2 text-sm text-[#61656d]">You have access to 2 products.</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-[#d61155]">0 Restricted</h3>
            <p className="mt-2 text-sm text-[#61656d]">Contact your administrator to request access to restricted products.</p>
          </div>
        </section>
      </section>
    </main>
  )
}

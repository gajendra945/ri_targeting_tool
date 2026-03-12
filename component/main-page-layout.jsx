export function MainPageLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#efefef] px-4 py-4 md:px-6">
      <section className="mx-auto max-w-[1260px] border border-[#a2a2a2] bg-[#f6f6f7]">{children}</section>
    </main>
  )
}

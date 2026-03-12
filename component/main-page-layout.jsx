export function MainPageLayout({ children }) {
  return (
    <main className="ri-app-shell">
      <section className="ri-app-frame">{children}</section>
    </main>
  )
}

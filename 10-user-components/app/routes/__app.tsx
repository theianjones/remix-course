import {Outlet} from '@remix-run/react'

export default function App() {
  return (
    <div className="max-w-6xl mx-4 md:mx-10">
      <nav>Im a Header!</nav>
      <Outlet />
    </div>
  )
}

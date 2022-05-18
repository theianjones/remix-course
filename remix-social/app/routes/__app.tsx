import {Outlet} from '@remix-run/react'
import {Nav} from '~/components/Nav'

export default function App() {
  return (
    <div className="max-w-6xl mx-4 md:mx-10">
      <Nav />
      <Outlet />
    </div>
  )
}

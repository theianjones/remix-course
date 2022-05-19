import {Outlet} from '@remix-run/react'
import {Nav} from '~/components/Nav'

export default function App() {
  return (
    <div className="max-w-6xl md:px-10 mx-auto">
      <Nav />
      <Outlet />
    </div>
  )
}

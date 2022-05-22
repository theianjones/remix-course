import {Link} from '@remix-run/react'
import type {SessionUser} from '~/services/auth.server'
import {Button} from '../Button'

function Nav() {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <Link to="/">
        <h1 className="text-slate-800 text-2xl">Remix Social</h1>
      </Link>
      <ul className="flex items-center">
        <li className="flex">
          <Button as={Link} to="/login" className="flex">
            Login
          </Button>
        </li>
        <li className="flex">
          <Button as={Link} to="/signup" className="flex">
            Create an Account
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

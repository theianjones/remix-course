import {UserForm} from '~/components/UserForm'

export default function SignInPage() {
  return (
    <div className='max-w-sm mx-auto'>
      <h1 className="text-xl text-slate-800 mb-8">Sign in</h1>
      <UserForm />
    </div>
  )
}

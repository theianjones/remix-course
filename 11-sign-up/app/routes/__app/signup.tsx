import type {ActionFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {UserForm} from '~/components/UserForm'
import {badRequest} from '~/services/utils.server'
import {checkUserExists, userSignup} from '~/services/auth.server'
import {Signup} from '~/services/validations'
import {useActionData} from '@remix-run/react'

type ActionData = {
  error?: {
    formError?: string[]
    fieldErrors?: {
      email?: string[]
      password?: string[]
    }
  }
  fields?: {
    email: string
    password: string
  }
}

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const rawEmail = form.get('email')
  const rawPassword = form.get('password')

  if (typeof rawEmail !== 'string' || typeof rawPassword !== 'string') {
    return badRequest<ActionData>({
      error: {formError: [`Form not submitted correctly.`]},
    })
  }

  const fields = {email: rawEmail, password: rawPassword}

  const result = Signup.safeParse({
    email: rawEmail,
    password: rawPassword,
  })

  if (!result.success) {
    const error = result.error.flatten()

    return badRequest<ActionData>({fields, error})
  }

  const userExists = await checkUserExists(result.data.email)

  if (userExists) {
    return badRequest<ActionData>({
      fields,
      error: {formError: [`User with ${rawEmail} already exists`]},
    })
  }

  const user = await userSignup(result.data.email, result.data.password)
  if (user) {
    return redirect('/login')
  } else {
    return badRequest<ActionData>({
      fields,
      error: {formError: [`Something went wrong, please contact support.`]},
    })
  }
}

export default function SignUpPage() {
  const {error, fields} = useActionData<ActionData>() ?? {}
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl text-slate-800 mb-8">Sign up</h1>
      <UserForm error={error} fields={fields} />
    </div>
  )
}

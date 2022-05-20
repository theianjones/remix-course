import type {User} from '@prisma/client'
import {Authenticator, AuthorizationError} from 'remix-auth'
import {FormStrategy} from 'remix-auth-form'
import {
  getSession,
  commitSession,
  destroySession,
} from '~/services/session.server'
import {userLogin} from './users.server'
import {Login} from './validations'

export type SessionUser = Omit<User, 'hashedPassword'>
export const authenticator = new Authenticator<SessionUser>({
  getSession,
  commitSession,
  destroySession,
})

export const USER_LOGIN = 'user-login'
authenticator.use(
  new FormStrategy(async ({form, context}) => {
    const rawEmail = form.get('email')
    const rawPassword = form.get('password')

    const {email, password} = Login.parse({
      email: rawEmail,
      password: rawPassword,
    })

    console.log('parsed data')
    const user = await userLogin(email, password)
    console.log('logged user in', {user})
    return user
  }),
  USER_LOGIN,
)

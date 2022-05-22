import type {User} from '@prisma/client'
import {Authenticator} from 'remix-auth'
import {FormStrategy} from 'remix-auth-form'
import {
  commitSession,
  destroySession,
  getSession,
} from '~/services/session.server'
import {userLogin} from './users.server'
import {Login} from './validations'

export type SessionUser = Omit<User, 'hashedPassword'>
export const authenticator = new Authenticator<SessionUser>({
  commitSession,
  destroySession,
  getSession,
})

export const USER_LOGIN = 'user-login'
authenticator.use(
  new FormStrategy(async ({form}) => {
    const rawEmail = form.get('email')
    const rawPassword = form.get('password')

    const {email, password} = Login.parse({
      email: rawEmail,
      password: rawPassword,
    })

    const user = await userLogin(email, password)
    return user
  }),
  USER_LOGIN,
)

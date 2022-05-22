import {hashPassword, verifyPassword} from './auth-utils.server'
import {db} from './db.server'

export const userSignup = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password)
  return db.user.create({
    data: {email, hashedPassword},
    select: {
      email: true,
      createdAt: true,
      id: true,
      name: true,
      role: true,
      updatedAt: true,
    },
  })
}

export const checkUserExists = async (email: string) =>
  (await db.user.count({
    where: {email},
  })) > 0

export const userLogin = async (email: string, password: string) => {
  const user = await db.user.findFirst({where: {email}})
  if (!user) {
    throw new Error('User not found')
  }

  const {result, error, improvedHash} = await verifyPassword(
    user.hashedPassword,
    password,
  )

  if (result === 'INVALID') {
    throw error ? error : new Error('Invalid Password')
  }

  if (improvedHash) {
    await db.user.update({
      data: {hashedPassword: improvedHash},
      where: {id: user.id},
    })
  }

  const {hashedPassword, ...sessionUser} = user

  return sessionUser
}

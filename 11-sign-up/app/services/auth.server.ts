import type { User } from '@prisma/client'

import { hashPassword } from './auth-utils.server'
import { db } from './db.server'

export type SessionUser = Omit<User, 'hashedPassword'>

export const userSignup = async (email: string, password: string) => {
    const hashedPassword = await hashPassword(password)
    return db.user.create({
      data: {
        email,
        hashedPassword,
      },
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
  
export const checkUserExists = async (email: string) => await db.user.count({
    where: { email},
}) > 0
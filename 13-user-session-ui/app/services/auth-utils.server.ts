import SecurePassword from 'secure-password'

const SP = new SecurePassword()

export const hashPassword = async (password: string) => {
  const hashedBuffer = await SP.hash(Buffer.from(password))
  return hashedBuffer.toString('base64')
}

const VALID = 'VALID' as const
const INVALID = 'INVALID' as const

export const verifyPassword = async (
  hashedPassword: string,
  password: string,
): Promise<{
  result: 'INVALID' | 'VALID'
  error?: Error
  improvedHash?: string
}> => {
  try {
    const result = await SP.verify(
      Buffer.from(password),
      Buffer.from(hashedPassword, 'base64'),
    )

    switch (result) {
      case SecurePassword.VALID:
        return {result: VALID, error: undefined, improvedHash: undefined}
      case SecurePassword.VALID_NEEDS_REHASH:
        SP.hash(Buffer.from(password), function (err, improvedHash) {
          if (err)
            console.error(
              'You are authenticated, but we could not improve your safety this time around',
            )

          return {result: VALID, improvedHash, error: undefined}
        })
        break
    }
    return {
      result: INVALID,
      improvedHash: undefined,
      error: new Error('Invalid password'),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {error, result: INVALID, improvedHash: undefined}
    }
    return {
      error: new Error('Invalid password'),
      result: INVALID,
      improvedHash: undefined,
    }
  }
}

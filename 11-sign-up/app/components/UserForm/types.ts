import type {FormProps} from '@remix-run/react'

export type Props = FormProps & {
  error?: {
    formError?: string[]
    fieldErrors?: {
      email?: string[]
      password?: string[]
    }
  }
  fields?: {
    email?: string
    password?: string
  }
}

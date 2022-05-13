export type Props = {
  error: {
    formError?: string[]
    fieldErrors?: {
      title: string[]
      body: string[]
    }
  }
  fields: {
    title: string
    body: string
  }
}

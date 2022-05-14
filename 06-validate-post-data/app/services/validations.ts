import {z} from 'zod'

export const CreatePost = z.object({
  title: z.string().optional(),
  body: z.string().min(1),
})

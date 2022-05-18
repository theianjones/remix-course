import type {Post, Prisma} from '@prisma/client'
import {db} from '~/services/db.server'
export type {Post}

export const getPosts = () =>
  db.post.findMany({include: {author: {select: {email: true, id: true}}}})

export const createPost = ({
  title,
  body,
  authorId,
}: Pick<Post, 'title' | 'body' | 'authorId'>) => {
  return db.post.create({data: {title, body, authorId}})
}

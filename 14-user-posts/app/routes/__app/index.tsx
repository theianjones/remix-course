import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect, json} from '@remix-run/node'
import {useActionData, useLoaderData} from '@remix-run/react'
import {createPost, getPosts} from '~/services/posts.server'
import {Post as PostComponent} from '~/components/Post'
import {PostForm} from '~/components/PostForm'
import {CreatePost} from '~/services/validations'
import {authenticator, SessionUser} from '~/services/auth.server'

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
  userId: SessionUser['id']
}

type ActionData = {
  error: {
    formError?: string[]
    fieldErrors?: {
      title?: string[]
      body?: string[]
    }
  }
  fields: {
    title?: string
    body?: string
  }
}

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const rawTitle = form.get('title')
  const rawBody = form.get('body')
  const rawAuthorId = form.get('authorId')
  const result = CreatePost.safeParse({title: rawTitle, body: rawBody, authorId: rawAuthorId})

  if (!result.success) {
    return json(
      {
        error: result.error.flatten(),
        fields: {
          title: rawTitle,
          body: rawBody,
        },
      },
      {status: 400},
    )
  }

  await createPost({
    title: result.data.title ?? null,
    body: result.data.body,
    authorId: result.data.authorId,
  })

  return redirect('/')
}

export const loader: LoaderFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request, {failureRedirect: '/login'})
  const data: LoaderData = {posts: await getPosts(), userId: user.id}
  return json(data)
}

export default function Index() {
  const {posts, userId} = useLoaderData<LoaderData>()
  const formData = useActionData<ActionData>()
  return (
    <div className="m-8 flex flex-col items-center gap-8">
      <PostForm
        action="/?index"
        error={formData?.error}
        fields={formData?.fields}
        authorId={userId}
      />
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.body}>
            <PostComponent
              header={post?.title}
              authorName={post?.author?.email}
            >
              {post.body}
            </PostComponent>
          </li>
        ))}
      </ul>
    </div>
  )
}

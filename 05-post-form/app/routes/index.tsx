import {ActionFunction, LoaderFunction, redirect} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useActionData, useLoaderData} from '@remix-run/react'
import {createPost, getPosts} from '~/services/posts.server'
import type {Post} from '~/services/posts.server'
import {Post as PostComponent} from '~/components/Post'
import {PostForm} from '~/components/PostForm'
import {CreatePost} from '~/services/validations'

type LoaderData = {
  posts: Post[]
}

type ActionData = {
  error: {
    formError: string[]
    fieldErrors: {
      title: string[]
      body: string
    }
  }
  fields: {
    title: string
    body: string
  }
}

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const rawTitle = form.get('title')
  const rawBody = form.get('body')

  const result = CreatePost.safeParse({title: rawTitle, body: rawBody})

  if (!result.success) {
    return json(
      {error: result.error.flatten(), fields: {title: rawTitle, body: rawBody}},
      {status: 400},
    )
  }

  const post = await createPost({
    title: result.data.title ?? null,
    body: result.data.body,
  })

  return redirect('/')
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {posts: await getPosts()}
  return json(data)
}

export default function Index() {
  const {posts} = useLoaderData<LoaderData>()
  const data = useActionData<ActionData>()
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <PostForm method="post" action="/?index" {...data} />
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.body}>
            <PostComponent header={post?.title}>{post.body}</PostComponent>
          </li>
        ))}
      </ul>
    </div>
  )
}

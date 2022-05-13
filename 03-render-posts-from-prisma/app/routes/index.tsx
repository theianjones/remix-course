import {json, LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {getPosts} from '~/services/posts.server'
import type {Post} from '~/services/posts.server'

type LoaderData = {
  posts: Post[]
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {posts: await getPosts()}
  return json(data)
}

export default function Index() {
  const {posts} = useLoaderData<LoaderData>()
  return (
    <div style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
      <h1>Welcome to Remix</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

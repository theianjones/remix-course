import type {Props} from './types'

function Post({header, authorName, children}: Props) {
  return (
    <div className="flex flex-col p-6 max-w-md border rounded">
      {header && <h2 className="font-bold text-3xl text-gray-900">{header}</h2>}
      {authorName && <p className="text-gray-700 italic">{authorName}</p>}
      <p className="mt-4 text-lg text-gray-900">{children}</p>
    </div>
  )
}

export default Post

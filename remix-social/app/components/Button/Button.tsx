import cx from 'classnames'
import type {Props} from './types'

function Button({as = 'button', children, className, ...props}: Props) {
  const Component = as
  return (
    <Component
      className={cx(
        'transition rounded text-blue-700 font-bold py-4 px-6 transparent hover:bg-gray-100',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button

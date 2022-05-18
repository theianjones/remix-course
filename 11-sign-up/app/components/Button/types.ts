import type {ComponentPropsWithoutRef} from 'react'

export type Props = ComponentPropsWithoutRef<any> & {
  as?: React.ElementType<any>
}

import { useContext } from 'react'

import RollerContext from './RollerContext'

export default function useRollerContext() {
  const ctx = useContext(RollerContext)

  if (!ctx) {
    throw new Error(
      'components must be wrapped in the RollerProvider to access context'
    )
  }

  return ctx
}

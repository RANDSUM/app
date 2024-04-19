import { useContext } from 'react'

import RollerContext from './RollerContext'

export default function useRollerContext() {
  return useContext(RollerContext)
}

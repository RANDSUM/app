import { createContext } from 'react'

import initialState from './initialState'
import { RollerState } from './types'

export default createContext<RollerState>(initialState)

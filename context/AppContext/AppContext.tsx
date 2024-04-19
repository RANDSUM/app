import { createContext } from 'react'

import initialState from './initialState'
import { AppState } from './types'

export default createContext<AppState>(initialState)

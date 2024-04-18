import { Dispatch, SetStateAction } from 'react'

import { Roll, SnackbarConfig } from '~types'

export type AppState = {
  savedRolls: Roll[]
  setSavedRolls: Dispatch<SetStateAction<Roll[]>>
  removeSavedRoll: (uuid: string) => void
  hydrated: boolean
  setSnackbarConfig: (config: SnackbarConfig) => void
}

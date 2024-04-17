import { Dispatch, SetStateAction } from 'react'

import { SavedRoll, SnackbarConfig } from '~types'

export type AppState = {
  savedRolls: SavedRoll[]
  setSavedRolls: Dispatch<SetStateAction<SavedRoll[]>>
  removeSavedRoll: (uuid: string) => void
  hydrated: boolean
  setSnackbarConfig: (config: SnackbarConfig) => void
}

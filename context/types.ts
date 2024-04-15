import { Dispatch, SetStateAction } from 'react'

import { SavedRoll } from '~types'

export type AppState = {
  savedRolls: SavedRoll[]
  setSavedRolls: Dispatch<SetStateAction<SavedRoll[]>>
  hydrated: boolean
  setSnackbarText: (text: string) => void
}

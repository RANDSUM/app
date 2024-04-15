import { AppState } from './types'

const initialState: AppState = {
  savedRolls: [],
  setSavedRolls: () => {},
  removeSavedRoll: (_uuid: string) => {},
  hydrated: false,
  setSnackbarText: () => {},
}

export default initialState

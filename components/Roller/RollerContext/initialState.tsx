import { RollerState } from './types'
import { defaultRoll } from '~constants'

const initialState: RollerState = {
  isDirty: false,
  resetRoll: () => {},
  addDieToPool: () => {},
  addToSavedRolls: () => {},
  saveChanges: () => {},
  removeDieFromPool: () => {},
  roll: defaultRoll,
  currentDicePoolParameters:
    defaultRoll.dicePools[Object.keys(defaultRoll.dicePools)[0]],
  dicePools: defaultRoll.dicePools,
  currentDicePoolId: Object.keys(defaultRoll.dicePools)[0],
  setCurrentDicePoolParameters: () => {},
  setRollConfig: () => {},
  setDicePools: () => {},
  setCurrentDicePoolId: () => {},
  setRoll: () => {},
}

export default initialState

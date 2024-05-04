import { RollerState } from './types'
import { defaultDicePoolOptions, defaultRoll } from '~constants'

const initialState: RollerState = {
  isDirty: false,
  resetRoll: () => {},
  addDieToPool: () => {},
  addToSavedRolls: () => {},
  saveChanges: () => {},
  removeDieFromPool: () => {},
  roll: defaultRoll,
  currentDicePoolOptions: defaultDicePoolOptions,
  currentDicePoolParameters:
    defaultRoll.dicePools[Object.keys(defaultRoll.dicePools)[0]],
  dicePools: defaultRoll.dicePools,
  currentDicePoolId: Object.keys(defaultRoll.dicePools)[0],
  setCurrentDicePoolOptions: () => {},
  setRollConfig: () => {},
  setDicePools: () => {},
  setCurrentDicePoolId: () => {},
  setRoll: () => {},
}

export default initialState

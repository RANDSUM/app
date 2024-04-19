import { RollerState } from './types'
import { defaultRoll } from '~constants'

const initialState: RollerState = {
  isDirty: false,
  resetRoll: () => {},
  roll: defaultRoll,
  currentDicePoolOptions:
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

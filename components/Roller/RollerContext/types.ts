import { Dispatch, SetStateAction } from 'react'

import { DicePoolParameters } from 'randsum'

import {
  SetDicePools,
  SetRollConfig,
  SetRollOptions,
} from '~components/Roller/types'
import { Roll } from '~types'

export type RollerState = {
  isDirty: boolean
  addToSavedRolls: (title: string) => void
  saveChanges: () => void
  resetRoll: () => void
  addDieToPool: () => void
  removeDieFromPool: (id: string) => void
  roll: Roll
  dicePools: Roll['dicePools']
  currentDicePoolParameters:
    | DicePoolParameters<number>
    | DicePoolParameters<string>
  currentDicePoolId: string
  setCurrentDicePoolParameters: SetRollOptions
  setRollConfig: SetRollConfig
  setDicePools: SetDicePools
  setCurrentDicePoolId: Dispatch<SetStateAction<string>>
  setRoll: Dispatch<SetStateAction<Roll>>
}

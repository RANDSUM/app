import * as Crypto from 'expo-crypto'
import { DicePoolOptions, DicePoolParameters, dieFactory } from 'randsum'

import { Roll, RollConfig } from '~types'

export const dieSides = [4, 6, 8, 10, 12, 20, 100]
export const defaultDicePoolOptions: DicePoolOptions = {
  quantity: 1,
  sides: 20,
}

export const defaultDicePoolParameters: DicePoolParameters = {
  die: dieFactory(20),
  argument: undefined,
  options: defaultDicePoolOptions,
  notation: '1d20',
  description: ['Roll 1 20-sided die'],
}

export const defaultDicePools: Roll['dicePools'] = {
  [Crypto.randomUUID()]: defaultDicePoolParameters,
}

export const defaultConfig: RollConfig = {
  showRolls: false,
}

export const defaultRoll: Roll = {
  uuid: 'UNSAVED-ROLL',
  title: '',
  persisted: false,
  config: defaultConfig,
  dicePools: defaultDicePools,
}

import * as Crypto from 'expo-crypto'
import { RollOptions } from 'randsum'

import { Roll } from '~types'

export const dieSides = [4, 6, 8, 10, 12, 20, 100]
export const defaultRollOptions: RollOptions = {
  quantity: 1,
  sides: 20,
}

export const defaultDicePools: Roll['dicePools'] = {
  [Crypto.randomUUID()]: defaultRollOptions,
}

import { RollOptions } from '~types'

export const dieSides = [2, 4, 6, 8, 10, 12, 20, 100]
export const defaultRollOptions: RollOptions = {
  quantity: 1,
  sides: 20,
  modifiers: [],
}

export const defaultRollOptionsGroup = [defaultRollOptions]

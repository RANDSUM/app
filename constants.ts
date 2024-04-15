import { RollOptions } from 'randsum'

export const dieSides = [2, 4, 6, 8, 10, 12, 20, 100]
export const defaultRollOptions: RollOptions<number> = {
  quantity: 1,
  sides: 20,
}

export const defaultDiegroups = [defaultRollOptions]

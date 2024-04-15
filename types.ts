import {
  RollOptions as RandsumRollOptions,
  Modifier as RandsumModifier,
} from 'randsum'

type Modifier = RandsumModifier<number> | { showRolls: boolean }

export type RollOptions = RandsumRollOptions<number> & {
  modifiers?: Modifier[]
}
export type SavedRoll = {
  rolls: RollOptions[]
  title: string
  uuid: string
}

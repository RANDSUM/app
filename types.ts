import { RollOptions as RandsumRollOptions, Modifier } from 'randsum'

export type RollOptions = Omit<RandsumRollOptions, 'modifiers'> & {
  modifiers: Modifier[]
}
export type SavedRoll = {
  rolls: RollOptions[]
  title: string
  uuid: string
}

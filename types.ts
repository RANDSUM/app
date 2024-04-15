import { RollOptions } from 'randsum'

export type SavedRoll = {
  rolls: RollOptions<number>[]
  title: string
  uuid: string
}

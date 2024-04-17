import { RollOptions } from 'randsum'
import { SnackbarProps } from 'react-native-paper'

export type SavedRoll = {
  rolls: RollOptions[]
  title: string
  uuid: string
}

export type SnackbarConfig = Pick<
  SnackbarProps,
  'duration' | 'children' | 'action'
>

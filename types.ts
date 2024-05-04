import { RollParameters } from 'randsum'
import { SnackbarProps } from 'react-native-paper'

export type RollConfig = {
  showRolls: boolean
}

export type Roll = RollParameters & {
  title: string
  config: RollConfig
  uuid: string
  persisted: boolean
}

export type SnackbarConfig = Pick<
  SnackbarProps,
  'duration' | 'children' | 'action'
>

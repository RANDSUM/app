import { RollOptions } from 'randsum'
import { SnackbarProps } from 'react-native-paper'

export type RollConfig = {
  showRolls: boolean
}

export type Roll = {
  dicePools: {
    [key: string]: RollOptions
  }
  title: string
  config?: RollConfig
  uuid: string
}

export type SnackbarConfig = Pick<
  SnackbarProps,
  'duration' | 'children' | 'action'
>

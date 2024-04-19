import { Dispatch, SetStateAction } from 'react'

import { RollOptions } from 'randsum'

import { RollConfig } from '~types'

export type SetRollConfig = Dispatch<SetStateAction<RollConfig>>
export type SetRollOptions = Dispatch<SetStateAction<RollOptions<number>>>
export type SetDicePools = Dispatch<
  SetStateAction<{
    [key: string]: RollOptions<number>
  }>
>

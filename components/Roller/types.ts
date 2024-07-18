import { Dispatch, SetStateAction } from 'react'

import { DicePoolOptions, DicePoolParameters } from 'randsum'

import { RollConfig } from '~types'

export type SetRollConfig = Dispatch<SetStateAction<RollConfig>>

export type SetRollParameters = Dispatch<SetStateAction<DicePoolParameters>>
export type SetDicePools = Dispatch<
  SetStateAction<{
    [key: string]: DicePoolParameters
  }>
>
export type SetRollOptions = Dispatch<SetStateAction<DicePoolOptions>>

import { Dispatch, SetStateAction } from 'react'

import { DicePoolOptions, DicePoolParameters } from 'randsum'

import { RollConfig } from '~types'

export type SetRollConfig = Dispatch<SetStateAction<RollConfig>>

export type SetRollParameters = Dispatch<
  SetStateAction<DicePoolParameters<number> | DicePoolParameters<string>>
>
export type SetDicePools = Dispatch<
  SetStateAction<{
    [key: string]: DicePoolParameters<number> | DicePoolParameters<string>
  }>
>
export type SetRollOptions = Dispatch<
  SetStateAction<DicePoolOptions<number> | DicePoolOptions<string>>
>

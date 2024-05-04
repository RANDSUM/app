import { Dispatch, SetStateAction } from 'react'

import { DicePoolParameters } from 'randsum'

import { RollConfig } from '~types'

export type SetRollConfig = Dispatch<SetStateAction<RollConfig>>
export type SetRollOptions = Dispatch<
  SetStateAction<DicePoolParameters<number> | DicePoolParameters<string>>
>
export type SetDicePools = Dispatch<
  SetStateAction<{
    [key: string]: DicePoolParameters<number> | DicePoolParameters<string>
  }>
>

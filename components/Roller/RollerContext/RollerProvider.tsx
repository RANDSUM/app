import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

import * as Crypto from 'expo-crypto'
import { RollOptions } from 'randsum'

import RollerStateContext from './RollerContext'
import { randomDieSide } from '../../../utils'
import { SetDicePools, SetRollConfig } from '~components/Roller/types'
import { defaultRoll, defaultRollOptions } from '~constants'
import { Roll } from '~types'

type Props = {
  savedRoll?: Roll
}
export default function RollerProvider({
  children,
  savedRoll,
}: PropsWithChildren<Props>) {
  const [roll, setRoll] = useState<Roll>(savedRoll || defaultRoll)

  const [currentDicePoolId, setCurrentDicePoolId] = useState(
    Object.keys(roll.dicePools)[0]
  )

  const setDicePools: SetDicePools = (arg) => {
    const newDicePools = arg instanceof Function ? arg(roll.dicePools) : arg
    setRoll((roll) => ({
      ...roll,
      dicePools: newDicePools,
    }))
  }

  const setRollConfig: SetRollConfig = (arg) => {
    const newConfig = arg instanceof Function ? arg(roll.config) : arg
    setRoll((roll) => ({
      ...roll,
      config: newConfig,
    }))
  }

  const currentDicePoolOptions = roll.dicePools[currentDicePoolId]
  const setCurrentDicePoolOptions: Dispatch<SetStateAction<RollOptions>> = (
    arg
  ) => {
    setDicePools((pools) => ({
      ...pools,
      [currentDicePoolId]:
        arg instanceof Function ? arg(currentDicePoolOptions) : arg,
    }))
  }

  const isDirty =
    JSON.stringify(roll) !==
    JSON.stringify(savedRoll ? savedRoll.dicePools : defaultRoll)

  const resetRoll = () => {
    setRoll(defaultRoll)
    setCurrentDicePoolId(Object.entries(defaultRoll.dicePools)[0][0])
  }

  const addDieToPool = () => {
    const newId = Crypto.randomUUID()
    setDicePools((pools) => ({
      ...pools,
      [newId]: {
        ...defaultRollOptions,
        sides: randomDieSide(),
      },
    }))

    setCurrentDicePoolId(newId)
  }

  const removeDieFromPool = (deletedId: string) => {
    setDicePools((pools) => {
      const newPools = { ...pools }
      delete newPools[deletedId]
      return newPools
    })

    if (currentDicePoolId === deletedId) {
      setCurrentDicePoolId(
        Object.keys(roll.dicePools).filter((id) => id !== deletedId)[0]
      )
    }
  }

  return (
    <RollerStateContext.Provider
      value={{
        isDirty,
        resetRoll,
        addDieToPool,
        removeDieFromPool,
        dicePools: roll.dicePools,
        roll,
        currentDicePoolOptions,
        setCurrentDicePoolOptions,
        setRollConfig,
        setDicePools,
        currentDicePoolId,
        setCurrentDicePoolId,
        setRoll,
      }}
    >
      {children}
    </RollerStateContext.Provider>
  )
}

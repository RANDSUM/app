import { PropsWithChildren, useEffect, useState } from 'react'

import * as Crypto from 'expo-crypto'
import { router } from 'expo-router'
import { parameterizeRollArgument, parseRollArguments } from 'randsum'

import RollerStateContext from './RollerContext'
import { randomDieSide } from '../../../utils'
import {
  SetDicePools,
  SetRollConfig,
  SetRollOptions,
  SetRollParameters,
} from '~components/Roller/types'
import { defaultRoll } from '~constants'
import useAppContext from '~context/AppContext/useAppContext'
import { Roll } from '~types'

type Props = PropsWithChildren<{
  savedRoll?: Roll
}>
export default function RollerProvider({ children, savedRoll }: Props) {
  const { setSavedRolls, setSnackbarConfig } = useAppContext()
  const [roll, setRoll] = useState<Roll>(savedRoll || defaultRoll)

  useEffect(() => {}, [])

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

  const currentDicePoolParameters = roll.dicePools[currentDicePoolId]
  const setCurrentDicePoolParameters: SetRollParameters = (arg) => {
    setDicePools((pools) => ({
      ...pools,
      [currentDicePoolId]:
        arg instanceof Function ? arg(currentDicePoolParameters) : arg,
    }))
  }

  const currentDicePoolOptions = currentDicePoolParameters.options

  const setCurrentDicePoolOptions: SetRollOptions = (arg) => {
    const newOptions =
      arg instanceof Function ? arg(currentDicePoolOptions) : arg
    const newParams = parameterizeRollArgument(newOptions)
    setCurrentDicePoolParameters(newParams)
  }

  const isDirty =
    JSON.stringify(roll) !== JSON.stringify(savedRoll ? savedRoll : defaultRoll)

  const resetRoll = () => {
    setRoll(defaultRoll)
    setCurrentDicePoolId(Object.entries(defaultRoll.dicePools)[0][0])
  }

  const addDieToPool = () => {
    const newDicePools = parseRollArguments(randomDieSide()).dicePools
    setDicePools((pools) => ({
      ...pools,
      ...newDicePools,
    }))
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

  const saveChanges = () => {
    setSavedRolls((rolls) => {
      return rolls.map((thisRoll) =>
        thisRoll.uuid === roll.uuid ? roll : thisRoll
      )
    })
    setSnackbarConfig({ children: 'Changes saved!' })
  }

  const addToSavedRolls = (title: string) => {
    setSavedRolls((rolls) => [
      ...rolls,
      {
        ...roll,
        uuid: Crypto.randomUUID(),
        title,
        persisted: true,
      },
    ])
    resetRoll()
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll saved!', duration: 1500 })
  }

  return (
    <RollerStateContext.Provider
      value={{
        isDirty,
        addToSavedRolls,
        saveChanges,
        resetRoll,
        addDieToPool,
        removeDieFromPool,
        dicePools: roll.dicePools,
        roll,
        currentDicePoolParameters,
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

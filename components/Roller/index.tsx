import { useState } from 'react'

import * as Crypto from 'expo-crypto'
import { roll, RollResult } from 'randsum'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Button, Icon } from 'react-native-paper'

import DicePoolDisplay from './DicePoolDisplay'
import RollButton from './RollButton'
import RollConfigButton from './RollConfigButton'
import RollInput from './RollInput'
import SaveButton from './SaveButton'
import { SetCurrentRollOptions, SetDicePools, SetRollConfig } from './types'
import { randomDieSide } from '../../utils'
import { defaultRoll, defaultRollOptions } from '~constants'
import HapticService from '~services/HapticService'
import useAppTheme from '~theme/useAppTheme'
import { Roll } from '~types'

type Props = {
  savedRoll?: Roll
}
export default function Roller(props: Props) {
  const theme = useAppTheme()
  const [lastRollResults, setLastRollResults] = useState<RollResult<number>[]>()
  const [currentRoll, setCurrentRoll] = useState<Roll>(
    props.savedRoll || defaultRoll
  )

  const dicePools = currentRoll.dicePools
  const dicePoolsList = Object.values(dicePools)
  const [currentDicePoolId, setCurrentDicePoolId] = useState(
    Object.keys(dicePools)[0]
  )
  const setDicePools: SetDicePools = (arg) => {
    const newDicePools = arg instanceof Function ? arg(dicePools) : arg
    setCurrentRoll((roll) => ({
      ...roll,
      dicePools: newDicePools,
    }))
  }

  const rollConfig = currentRoll.config
  const setRollConfig: SetRollConfig = (arg) => {
    const newConfig = arg instanceof Function ? arg(rollConfig) : arg
    setCurrentRoll((roll) => ({
      ...roll,
      config: newConfig,
    }))
  }

  const currentDicePoolOptions = dicePools[currentDicePoolId]
  const setCurrentRollOptions: SetCurrentRollOptions = (arg) => {
    setDicePools((pools) => ({
      ...pools,
      [currentDicePoolId]:
        arg instanceof Function ? arg(currentDicePoolOptions) : arg,
    }))
  }

  const coreRoll = () => {
    const rolls = dicePoolsList.map((pool) => {
      return roll(pool)
    })
    setLastRollResults(rolls)
    HapticService.notifyVibrate()
    Keyboard.dismiss()
  }

  const addDie = () => {
    setDicePools((pools) => ({
      ...pools,
      [Crypto.randomUUID()]: {
        ...defaultRollOptions,
        sides: randomDieSide(),
      },
    }))
  }
  const duplicateDie = () => {
    setDicePools((pools) => ({
      ...pools,
      [Crypto.randomUUID()]: currentDicePoolOptions,
    }))
  }

  const removeDie = () => {
    if (dicePoolsList.length <= 1) return

    setDicePools((pools) => {
      const newPools = { ...pools }
      delete newPools[currentDicePoolId]
      return newPools
    })

    const nextPoolList = Object.keys(dicePools).filter(
      (id) => id !== currentDicePoolId
    )
    const nextPoolId = nextPoolList[nextPoolList.length - 1]

    setCurrentDicePoolId(nextPoolId)
  }
  const isDirty =
    JSON.stringify(currentRoll) !==
    JSON.stringify(props.savedRoll ? props.savedRoll.dicePools : defaultRoll)

  const disableRemove = dicePoolsList.length <= 1
  const disableAdd = dicePoolsList.length >= 8

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <RollConfigButton
            currentRoll={currentRoll}
            onChange={setRollConfig}
          />
          <SaveButton
            isSavedRoll={currentRoll.persisted}
            isDirty={isDirty}
            currentRoll={currentRoll}
          />
        </View>
        <RollInput
          currentDicePoolOptions={currentDicePoolOptions}
          setCurrentRollOptions={setCurrentRollOptions}
        />
        <View style={styles.row}>
          <RollButton
            coreRoll={coreRoll}
            currentRoll={currentRoll}
            rollResults={lastRollResults}
          />
        </View>
        <View style={styles.collection}>
          <DicePoolDisplay
            dicePools={dicePools}
            currentDicePoolId={currentDicePoolId}
            onPress={setCurrentDicePoolId}
          />
          <View style={styles.row}>
            <Button mode="text" disabled={disableRemove} onPress={removeDie}>
              <Icon
                source="minus-circle-outline"
                size={40}
                color={theme.colors.primary}
              />
            </Button>
            <Button mode="text" disabled={disableAdd} onPress={addDie}>
              <Icon
                source="plus-circle-outline"
                size={40}
                color={theme.colors.primary}
              />
            </Button>
            <Button mode="text" disabled={disableAdd} onPress={duplicateDie}>
              <Icon
                source="plus-circle-multiple-outline"
                size={40}
                color={theme.colors.primary}
              />
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  collection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})

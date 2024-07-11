import { useEffect, useState } from 'react'

import * as Crypto from 'expo-crypto'
import { router } from 'expo-router'
import {
  RollResult,
  generateRollResult,
  parameterizeRollArgument,
  parseRollArguments,
} from 'randsum'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import ComplexRollInput from './ComplexRollInput'
import DicePoolDisplay from './DicePoolDisplay'
import RollHeader from './RollHeader'
import SaveButton from './SaveButton'
import SimpleRollInput from './SimpleRollInput'
import { randomDieSide } from '../../utils'
import ResultModal from '~components/ResultModal'
import {
  SetDicePools,
  SetRollOptions,
  SetRollParameters,
} from '~components/Roller/types'
import { defaultRoll } from '~constants'
import useAppContext from '~context/AppContext/useAppContext'
import HapticService from '~services/HapticService'
import { Roll } from '~types'

enum RollerComplexity {
  Simple = 'simple',
  Advanced = 'advanced',
}

type Props = {
  savedRoll?: Roll
}

export default function Roller({ savedRoll }: Props) {
  const [complexity, setComplexity] = useState<RollerComplexity>(
    savedRoll ? RollerComplexity.Advanced : RollerComplexity.Simple
  )
  const { setSavedRolls, setSnackbarConfig } = useAppContext()
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

  const toggleComplexity = () => {
    setComplexity((prev) =>
      prev === RollerComplexity.Simple
        ? RollerComplexity.Advanced
        : RollerComplexity.Simple
    )
  }

  const isSimple = complexity === RollerComplexity.Simple

  useEffect(() => {
    if (isSimple) {
      setCurrentDicePoolOptions((o) => ({
        ...o,
        modifiers: undefined,
      }))
    }
  }, [isSimple, savedRoll])

  const [showResultModal, setShowResultModal] = useState(false)
  const [lastRollResult, setLastRollResult] = useState<RollResult>()

  const coreRoll = () => {
    setLastRollResult(generateRollResult({ dicePools: roll.dicePools }))
    HapticService.notifyVibrate()
    Keyboard.dismiss()
  }

  const rollDie = () => {
    coreRoll()
    setShowResultModal(true)
  }
  return (
    <>
      {savedRoll && <RollHeader isDirty={isDirty} roll={roll} />}
      <View style={styles.container}>
        <View style={styles.row}>
          <Button disabled={!!savedRoll} icon="cog" onPress={toggleComplexity}>
            {isSimple ? 'Switch to Advanced Mode' : 'Switch to Simple Mode'}
          </Button>
          <SaveButton
            roll={roll}
            isDirty={isDirty}
            saveChanges={saveChanges}
            addToSavedRolls={addToSavedRolls}
          />
        </View>
        <View style={styles.collection}>
          {isSimple ? (
            <SimpleRollInput
              setCurrentDicePoolOptions={setCurrentDicePoolOptions}
              currentDicePoolOptions={currentDicePoolOptions}
              description={currentDicePoolParameters.description}
            />
          ) : (
            <ComplexRollInput
              currentDicePoolId={currentDicePoolId}
              currentDicePoolOptions={currentDicePoolOptions}
              description={currentDicePoolParameters.description}
              setCurrentDicePoolOptions={setCurrentDicePoolOptions}
            />
          )}
        </View>
        <View style={styles.collection}>
          <DicePoolDisplay
            setCurrentDicePoolId={setCurrentDicePoolId}
            currentDicePoolId={currentDicePoolId}
            dicePools={roll.dicePools}
            addDieToPool={addDieToPool}
            removeDieFromPool={removeDieFromPool}
          />

          <Button
            style={{ width: '100%' }}
            labelStyle={{ lineHeight: 55, fontSize: 30 }}
            mode="contained"
            onPress={rollDie}
          >
            Roll
          </Button>
        </View>
      </View>
      <ResultModal
        rollResult={lastRollResult}
        roll={roll}
        rollAgain={coreRoll}
        onDismiss={() => setShowResultModal(false)}
        visible={showResultModal}
        preventAutoDismiss
      />
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
    margin: 10,
  },
  collection: {
    justifyContent: 'flex-end',
    gap: 10,
  },
})

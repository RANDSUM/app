import { Dispatch, SetStateAction, useState } from 'react'

import * as Crypto from 'expo-crypto'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { roll, RollOptions, RollResult } from 'randsum'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import DeleteSavedRollDialog from './DeleteSavedRollDialog'
import RollButton from './RollButton'
import RollConfigButton from './RollConfigButton'
import RollInput from './RollInput'
import RollOptionsGroupDisplay from './RollOptionsGroupDisplay'
import SaveRollDialog from './SaveRollDialog'
import { randomDieSide } from '../../utils'
import { defaultDicePools, defaultRollOptions } from '~constants'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { RollConfig, Roll } from '~types'

type Props = {
  savedRoll?: Roll
}
export default function Roller(props: Props) {
  const theme = useAppTheme()
  const router = useRouter()

  const { setSavedRolls, removeSavedRoll, setSnackbarConfig } = useAppContext()

  const [saveDialogIsVisible, setSaveDialogIsVisible] = useState(false)
  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false)

  const [dicePools, setDicePools] = useState<Roll['dicePools']>(
    props.savedRoll?.dicePools || defaultDicePools
  )
  const dicePoolsList = Object.values(dicePools)

  const [currentDicePoolId, setCurrentDicePoolId] = useState(
    Object.keys(dicePools)[0]
  )
  const [lastRollResults, setLastRollResults] = useState<RollResult<number>[]>()

  const currentRollOptions = dicePools[currentDicePoolId]

  const setCurrentRollOptions: Dispatch<SetStateAction<RollOptions<number>>> = (
    arg
  ) => {
    setDicePools((pools) => ({
      ...pools,
      [currentDicePoolId]:
        arg instanceof Function ? arg(currentRollOptions) : arg,
    }))
  }

  const [rollConfig, setRollConfig] = useState<RollConfig>({
    showRolls: false,
    ...(props.savedRoll?.config || {}),
  })

  const coreRoll = () => {
    const rolls = dicePoolsList.map((pool) => {
      return roll(pool)
    })
    setLastRollResults(rolls)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    Keyboard.dismiss()
  }

  const currentRoll: Roll = {
    dicePools,
    title: props.savedRoll?.title || '',
    config: rollConfig,
    uuid: Crypto.randomUUID(),
  }

  const addToSavedRolls = (title: string) => {
    setSavedRolls((rolls) => [
      ...rolls,
      {
        ...currentRoll,
        title,
      },
    ])
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll saved!' })
  }

  const saveChanges = () => {
    setSavedRolls((rolls) => {
      const newRolls = [...rolls]
      return newRolls.map((roll) => {
        if (roll.uuid === props.savedRoll?.uuid) {
          return {
            ...roll,
            ...currentRoll,
          }
        }
        return roll
      })
    })
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

  const removeDie = () => {
    if (dicePoolsList.length <= 1) return

    setDicePools((pools) => {
      const newPools = { ...pools }

      delete newPools[currentDicePoolId]

      return newPools
    })

    const nextPoolId = Object.keys(dicePools).filter(
      (id) => id !== currentDicePoolId
    )[0]

    setCurrentDicePoolId(nextPoolId)
  }

  const deleteSavedRoll = () => {
    if (!props.savedRoll) return
    removeSavedRoll(props.savedRoll?.uuid)
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll deleted', duration: 5000 })
  }

  const isDirty =
    JSON.stringify(dicePools) !==
    JSON.stringify(
      props.savedRoll ? props.savedRoll.dicePools : defaultDicePools
    )

  const isSavedRoll = !!props.savedRoll

  const disableRemove = dicePoolsList.length <= 1
  const disableAdd = dicePoolsList.length >= 8

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <RollConfigButton
            config={rollConfig}
            onChange={(config) =>
              setRollConfig((oldConfig) => ({ ...oldConfig, ...config }))
            }
          />
          {!isSavedRoll && (
            <Button mode="text" onPress={() => setSaveDialogIsVisible(true)}>
              Save Roll
            </Button>
          )}
          {isSavedRoll && (
            <>
              <Button mode="text" disabled={!isDirty} onPress={saveChanges}>
                Save Changes
              </Button>
              <Button
                labelStyle={{ color: theme.colors.error }}
                mode="text"
                onPress={() => setDeleteDialogIsVisible(true)}
              >
                Delete Roll
              </Button>
            </>
          )}
        </View>
        <RollInput
          currentRollOptions={currentRollOptions}
          setCurrentRollOptions={setCurrentRollOptions}
        />
        <View style={styles.row}>
          <RollButton
            coreRoll={coreRoll}
            title={props.savedRoll?.title}
            rollResults={lastRollResults}
          />
        </View>
        <View style={styles.collection}>
          <RollOptionsGroupDisplay
            dicePools={dicePools}
            currentDicePoolId={currentDicePoolId}
            onPress={setCurrentDicePoolId}
          />
          <View style={styles.row}>
            <Button mode="text" disabled={disableRemove} onPress={removeDie}>
              Remove {currentRollOptions.quantity}D{currentRollOptions.sides}
            </Button>
            <Button mode="text" disabled={disableAdd} onPress={addDie}>
              Add Die
            </Button>
          </View>
        </View>
      </View>
      <DeleteSavedRollDialog
        savedRoll={props.savedRoll}
        visible={deleteDialogIsVisible}
        onAccept={deleteSavedRoll}
        onDismiss={() => setDeleteDialogIsVisible(false)}
      />
      <SaveRollDialog
        visible={saveDialogIsVisible}
        onDismiss={() => setSaveDialogIsVisible(false)}
        onAccept={(title) => {
          setSaveDialogIsVisible(false)
          addToSavedRolls(title)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    gap: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  collection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})

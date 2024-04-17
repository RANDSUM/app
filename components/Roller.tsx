import { useEffect, useState } from 'react'

import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { roll, RollOptions, RollResult } from 'randsum'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import DeleteSavedRollDialog from './DeleteSavedRollDialog'
import ModifierPanel from './ModifierPanel'
import RollInput from './RollInput'
import RollOptionsGroupDisplay from './RollOptionsGroupDisplay'
import SaveRollDialog from './SaveRollDialog'
import sharedStyles from './sharedStyles'
import ResultModal from '~components/ResultModal'
import { defaultRollOptionsGroup, defaultRollOptions } from '~constants'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { SavedRoll } from '~types'

type Props = {
  savedRoll?: SavedRoll
  title?: string
}
export default function Roller(props: Props) {
  const theme = useAppTheme()
  const { setSavedRolls, removeSavedRoll, setSnackbarConfig } = useAppContext()
  const [rollOptions, setRollOptions] = useState<RollOptions>(
    props.savedRoll?.rolls
      ? props.savedRoll?.rolls[0]
      : defaultRollOptionsGroup[0]
  )

  const [rollOptionsGroups, setRollOptionsGroups] = useState<RollOptions[]>(
    props.savedRoll?.rolls || defaultRollOptionsGroup
  )
  const [currentDieGroupIndex, setCurrentDieGroupIndex] = useState(0)

  const isSavedRoll = !!props.savedRoll

  useEffect(() => {
    setRollOptionsGroups((groups) => {
      const newGroups = [...groups]
      newGroups[currentDieGroupIndex] = rollOptions
      return newGroups
    })
  }, [JSON.stringify(rollOptions)])

  useEffect(() => {
    setRollOptions(rollOptionsGroups[currentDieGroupIndex])
  }, [currentDieGroupIndex])

  const [lastRolls, setLastRolls] = useState<RollResult<number>[]>()

  const [resultModalIsVisible, setResultModalIsVisible] = useState(false)
  const [saveDialogIsVisible, setSaveDialogIsVisible] = useState(false)
  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false)

  const router = useRouter()

  const coreRoll = () => {
    const rolls = rollOptionsGroups.map((group) => roll(group))
    setLastRolls(rolls)
  }
  const rollDie = () => {
    Keyboard.dismiss()
    coreRoll()
    setResultModalIsVisible(true)
  }

  const addToSavedRolls = (title: string) => {
    setSavedRolls((rolls) => {
      const newRolls = [...rolls]
      newRolls.push({
        title,
        rolls: rollOptionsGroups,
        uuid: Crypto.randomUUID(),
      })
      return newRolls
    })
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll saved!', duration: 5000 })
  }

  const saveChanges = () => {
    setSavedRolls((rolls) => {
      const newRolls = [...rolls]
      return newRolls.map((roll) => {
        if (roll.uuid === props.savedRoll?.uuid) {
          return {
            ...roll,
            rolls: rollOptionsGroups,
          }
        }
        return roll
      })
    })
  }

  const removeDie = () => {
    if (rollOptionsGroups.length <= 1) return
    const newRollOptionsGroups = [...rollOptionsGroups]
    newRollOptionsGroups.splice(currentDieGroupIndex, 1)
    setRollOptionsGroups(newRollOptionsGroups)
    setLastRolls(undefined)
    if (currentDieGroupIndex >= newRollOptionsGroups.length - 1) {
      setCurrentDieGroupIndex(newRollOptionsGroups.length - 1)
      setRollOptions(newRollOptionsGroups[newRollOptionsGroups.length - 1])
    } else {
      setRollOptions(newRollOptionsGroups[currentDieGroupIndex])
    }
  }

  const isDirty =
    JSON.stringify(rollOptionsGroups) !==
    JSON.stringify(
      props.savedRoll ? props.savedRoll.rolls : defaultRollOptionsGroup
    )

  const deleteSavedRoll = () => {
    if (!props.savedRoll) return
    removeSavedRoll(props.savedRoll?.uuid)
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll deleted', duration: 5000 })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.collection}>
          <View style={sharedStyles.lesserButtonRow}>
            <Button
              mode="text"
              onPress={() => {
                setRollOptionsGroups((groups) => [
                  ...groups,
                  defaultRollOptions,
                ])
                setCurrentDieGroupIndex(rollOptionsGroups.length)
              }}
              disabled={rollOptionsGroups.length >= 4}
            >
              Add Die
            </Button>
            <Button
              mode="text"
              onPress={removeDie}
              disabled={rollOptionsGroups.length <= 1}
            >
              Remove Die
            </Button>
          </View>
          <RollOptionsGroupDisplay
            rollOptionsGroup={rollOptionsGroups}
            activeIndex={currentDieGroupIndex}
            onPress={(index) => setCurrentDieGroupIndex(index)}
          />
        </View>
        <RollInput rollOptions={rollOptions} setRollOptions={setRollOptions} />
        <ModifierPanel
          rollOptions={rollOptions}
          setRollOptions={setRollOptions}
        />
        <View style={styles.collection}>
          <View style={sharedStyles.lesserButtonRow}>
            <Button
              style={{ width: '100%' }}
              onPress={rollDie}
              mode="contained"
            >
              Roll
            </Button>
          </View>
          <View style={sharedStyles.lesserButtonRow}>
            {!isSavedRoll && (
              <View style={sharedStyles.lesserButtonRow}>
                <Button
                  mode="text"
                  onPress={() => setSaveDialogIsVisible(true)}
                >
                  Save Roll
                </Button>
              </View>
            )}
            {isSavedRoll && (
              <>
                <View style={sharedStyles.lesserButtonRow}>
                  <Button mode="text" disabled={!isDirty} onPress={saveChanges}>
                    Save Changes
                  </Button>
                </View>
                <View style={sharedStyles.lesserButtonRow}>
                  <Button
                    labelStyle={{ color: theme.colors.error }}
                    mode="text"
                    onPress={() => setDeleteDialogIsVisible(true)}
                  >
                    Delete Roll
                  </Button>
                </View>
              </>
            )}
          </View>
        </View>
      </View>

      <ResultModal
        visible={resultModalIsVisible}
        onDismiss={() => setResultModalIsVisible(false)}
        rollResults={lastRolls}
        rollAgain={coreRoll}
      />
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
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  lowerContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  collection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
})

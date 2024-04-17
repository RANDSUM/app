import { useEffect, useState } from 'react'

import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { roll, RollOptions, RollResult } from 'randsum'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import DeleteSavedRollDialog from './DeleteSavedRollDialog'
import RollControlRow from './RollControlRow'
import RollInput from './RollInput'
import RollOptionsGroupDisplay from './RollOptionsGroupDisplay'
import SaveRollDialog from './SaveRollDialog'
import sharedStyles from './sharedStyles'
import ResultModal from '~components/ResultModal'
import { defaultRollOptionsGroup, defaultRollOptions } from '~constants'
import useAppContext from '~context/useAppContext'
import { SavedRoll } from '~types'

type Props = {
  savedRoll?: SavedRoll
  title?: string
}
export default function Roller(props: Props) {
  const { setSavedRolls, setSnackbarText, removeSavedRoll } = useAppContext()
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

  const rollDie = () => {
    Keyboard.dismiss()
    const rolls = rollOptionsGroups.map((group) => roll(group))
    setLastRolls(rolls)
  }

  const dismissResultModal = () => setLastRolls(undefined)
  const resultModalIsVisible = !!lastRolls

  const [saveDialogIsVisible, setSaveDialogIsVisible] = useState(false)

  const router = useRouter()
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
    setSnackbarText('Roll saved!')
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

  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false)
  const deleteSavedRoll = () => {
    if (!props.savedRoll) return
    removeSavedRoll(props.savedRoll?.uuid)
    router.push('/myRolls')
    setSnackbarText('Roll deleted')
  }

  return (
    <>
      <View style={styles.container}>
        <RollInput rollOptions={rollOptions} setRollOptions={setRollOptions} />
        <View style={styles.lowerContainer}>
          <RollOptionsGroupDisplay
            rollOptionsGroup={rollOptionsGroups}
            activeIndex={currentDieGroupIndex}
            onPress={(index) => setCurrentDieGroupIndex(index)}
          />
          <RollControlRow
            onAdd={() => {
              setRollOptionsGroups((groups) => [...groups, defaultRollOptions])
              setCurrentDieGroupIndex(rollOptionsGroups.length)
            }}
            onRemove={removeDie}
            onSaveChanges={saveChanges}
            onDelete={() => setDeleteDialogIsVisible(true)}
            onSaveRoll={() => setSaveDialogIsVisible(true)}
            isDirty={isDirty}
            isSavedRoll={isSavedRoll}
            rollOptionsGroups={rollOptionsGroups}
          />
          <View style={sharedStyles.lesserButtonRow}>
            <Button
              style={{ width: '100%' }}
              onPress={rollDie}
              mode="contained"
            >
              Roll
            </Button>
          </View>
        </View>
      </View>

      <ResultModal
        visible={resultModalIsVisible}
        onDismiss={dismissResultModal}
        rollResults={lastRolls}
        rollAgain={rollDie}
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
  lowerContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-evenly',
  },
})

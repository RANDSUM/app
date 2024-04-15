import { useEffect, useState } from 'react'

import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { roll, RollOptions, RollResult } from 'randsum'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'

import DeleteSavedRollDialog from './DeleteSavedRollDialog'
import DieGroupDisplay from './DieGroupDisplay'
import SaveRollDialog from './SaveRollDialog'
import NumButton from '~components/NumButton'
import ResultModal from '~components/ResultModal'
import { defaultDiegroups, defaultRollOptions, dieSides } from '~constants'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { SavedRoll } from '~types'

type Props = {
  savedRoll?: SavedRoll
  title?: string
}
export default function Roller(props: Props) {
  const theme = useAppTheme()
  const { setSavedRolls, setSnackbarText, removeSavedRoll } = useAppContext()
  const [rollOptions, setRollOptions] = useState<RollOptions<number>>(
    props.savedRoll?.rolls ? props.savedRoll?.rolls[0] : defaultDiegroups[0]
  )

  const [dieGroups, setDieGroups] = useState<RollOptions<number>[]>(
    props.savedRoll?.rolls || defaultDiegroups
  )
  const [currentDieGroupIndex, setCurrentDieGroupIndex] = useState(0)

  const isSavedRoll = !!props.savedRoll

  useEffect(() => {
    setDieGroups((groups) => {
      const newGroups = [...groups]
      newGroups[currentDieGroupIndex] = rollOptions
      return newGroups
    })
  }, [JSON.stringify(rollOptions)])

  useEffect(() => {
    setRollOptions(dieGroups[currentDieGroupIndex])
  }, [currentDieGroupIndex])

  const increaseSides = () =>
    setRollOptions((o) => ({
      ...o,
      sides: dieSides[dieSides.indexOf(Number(o.sides)) + 1] || dieSides[0],
    }))
  const decreaseSides = () =>
    setRollOptions((o) => ({
      ...o,
      sides: dieSides[dieSides.indexOf(Number(o.sides)) - 1] || dieSides[0],
    }))
  const disableSidesUp = rollOptions.sides === dieSides[dieSides.length - 1]
  const disableSidesDown = rollOptions.sides === dieSides[0]

  const increaseQuantity = () =>
    setRollOptions((o) => ({ ...o, quantity: Number(o.quantity) + 1 || 1 }))
  const decreaseQuantity = () =>
    setRollOptions((o) => ({ ...o, quantity: Number(o.quantity) - 1 || 1 }))
  const quantityDownDisabled = Number(rollOptions.quantity) <= 1

  const [lastRolls, setLastRolls] = useState<RollResult<number>[]>()

  const rollDie = () => {
    Keyboard.dismiss()
    setLastRolls(dieGroups.map((group) => roll(group)))
  }

  const addDie = () => {
    setDieGroups((groups) => [...groups, defaultRollOptions])
    setCurrentDieGroupIndex(dieGroups.length)
  }

  const dismissResultModal = () => setLastRolls(undefined)
  const resultModalIsVisible = !!lastRolls

  const [saveDialogIsVisible, setSaveDialogIsVisible] = useState(false)

  const reset = () => {
    setDieGroups([defaultRollOptions])
    setCurrentDieGroupIndex(0)
    setLastRolls(undefined)
    setRollOptions(defaultRollOptions)
  }

  const router = useRouter()
  const addToSavedRolls = (title: string) => {
    setSavedRolls((rolls) => {
      const newRolls = [...rolls]
      newRolls.push({
        title,
        rolls: dieGroups,
        uuid: Crypto.randomUUID(),
      })
      return newRolls
    })
    router.push('/myRolls')
    setSnackbarText('Roll saved!')
  }

  const removeDie = () => {
    if (dieGroups.length <= 1) return
    const newDieGroups = [...dieGroups]
    newDieGroups.splice(currentDieGroupIndex, 1)
    setDieGroups(newDieGroups)
    setLastRolls(undefined)
    if (currentDieGroupIndex >= newDieGroups.length - 1) {
      setCurrentDieGroupIndex(newDieGroups.length - 1)
      setRollOptions(newDieGroups[newDieGroups.length - 1])
    } else {
      setRollOptions(newDieGroups[currentDieGroupIndex])
    }
  }

  const isDirty = JSON.stringify(dieGroups) !== JSON.stringify(defaultDiegroups)

  const ButtonControlRow = () => {
    return (
      <View style={styles.lesserButtonRow}>
        <Button mode="text" onPress={addDie} disabled={dieGroups.length >= 4}>
          Add Die
        </Button>
        <Button
          mode="text"
          onPress={removeDie}
          disabled={dieGroups.length <= 1}
        >
          Remove Die
        </Button>
        <Button mode="text" onPress={reset} disabled={!isDirty}>
          Reset
        </Button>
      </View>
    )
  }

  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false)
  const deleteSavedRoll = () => {
    if (!props.savedRoll) return
    removeSavedRoll(props.savedRoll?.uuid)
    router.push('/myRolls')
    setSnackbarText('Roll deleted!')
  }

  return (
    <View style={styles.container}>
      <View>
        <ButtonControlRow />
        <DieGroupDisplay
          dieGroups={dieGroups}
          activeIndex={currentDieGroupIndex}
          onPress={(index) => setCurrentDieGroupIndex(index)}
        />
      </View>
      <View style={styles.diceContainer}>
        <View style={styles.numContainer}>
          <NumButton label="+" onPress={increaseQuantity} />
          <TextInput
            style={[styles.num, { backgroundColor: theme.colors.background }]}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            label=""
            keyboardType="numeric"
            numberOfLines={1}
            value={String(rollOptions.quantity)}
            onChangeText={(num) =>
              setRollOptions((o) => ({
                ...o,
                quantity: isNaN(Number(num))
                  ? rollOptions.quantity
                  : Number(num),
              }))
            }
          />
          <NumButton
            label="-"
            disabled={quantityDownDisabled}
            onPress={decreaseQuantity}
          />
        </View>
        <View style={styles.numContainer}>
          <NumButton
            label="+"
            disabled={disableSidesUp}
            onPress={increaseSides}
          />
          <View style={styles.num}>
            <Text variant="displayLarge">D{rollOptions.sides}</Text>
          </View>
          <NumButton
            label="-"
            disabled={disableSidesDown}
            onPress={decreaseSides}
          />
        </View>
      </View>
      {!isSavedRoll && (
        <View style={styles.lesserButtonRow}>
          <Button
            style={{ width: '100%' }}
            mode="text"
            onPress={() => setSaveDialogIsVisible(true)}
          >
            Add to My Rolls
          </Button>
        </View>
      )}
      <View style={styles.lesserButtonRow}>
        <Button style={{ width: '100%' }} onPress={rollDie} mode="contained">
          Roll
        </Button>
      </View>
      {isSavedRoll && (
        <View style={styles.lesserButtonRow}>
          <Button
            style={{ width: '100%' }}
            labelStyle={{ color: theme.colors.error }}
            mode="text"
            onPress={() => setDeleteDialogIsVisible(true)}
          >
            Delete Roll
          </Button>
        </View>
      )}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  numContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  lesserButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
    paddingBottom: 15,
  },
  num: {
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
    width: 175,
    padding: 20,
    fontSize: 55,
  },
  diceContainer: {
    flexDirection: 'row',
    flexGrow: 2,
    width: '100%',
    justifyContent: 'center',
  },
})

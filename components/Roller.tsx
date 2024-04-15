import React, { useEffect, useState } from 'react'

import { roll, RollOptions, RollResult } from 'randsum'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'

import DieGroupDisplay from './DieGroupDisplay'
import NumButton from '~components/NumButton'
import ResultModal from '~components/ResultModal'
import useAppTheme from '~theme/useAppTheme'

const dieSides = [2, 4, 6, 8, 10, 12, 20, 100]
const defaultRollOptions: RollOptions<number> = {
  quantity: 1,
  sides: 20,
}

const defaultDiegroups = [defaultRollOptions]
type Props = {
  dieGroups?: RollOptions<number>[]
  title?: string
}
export default function Roller(props: Props) {
  const theme = useAppTheme()
  const [rollOptions, setRollOptions] = useState<RollOptions<number>>(
    defaultDiegroups[0]
  )

  const [dieGroups, setDieGroups] = useState<RollOptions<number>[]>(
    props.dieGroups || defaultDiegroups
  )
  const [currentDieGroupIndex, setCurrentDieGroupIndex] = useState(0)

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

  const dismissModal = () => setLastRolls(undefined)
  const modalIsVisible = !!lastRolls

  const reset = () => {
    setDieGroups([defaultRollOptions])
    setCurrentDieGroupIndex(0)
    setLastRolls(undefined)
    setRollOptions(defaultRollOptions)
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
        <Button mode="text" onPress={reset}>
          Reset
        </Button>
      </View>
    )
  }

  return (
    <>
      <Text style={{ textAlign: 'center' }} variant="displaySmall">
        {props.title}
      </Text>
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
      <View>
        <DieGroupDisplay
          dieGroups={dieGroups}
          activeIndex={currentDieGroupIndex}
          onPress={(index) => setCurrentDieGroupIndex(index)}
        />
        <ButtonControlRow />
        <View style={styles.lesserButtonRow}>
          <Button mode="contained" onPress={rollDie} style={{ width: '100%' }}>
            Roll
          </Button>
        </View>
      </View>
      <ResultModal
        title={props.title}
        visible={modalIsVisible}
        onDismiss={dismissModal}
        rollResults={lastRolls}
        rollAgain={rollDie}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  modalStyle: {},
  numContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  lesserButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
    paddingTop: 15,
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
    width: '100%',
    justifyContent: 'center',
  },
})

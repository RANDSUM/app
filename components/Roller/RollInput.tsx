import { Dispatch, SetStateAction } from 'react'

import { RollOptions } from 'randsum'
import { View, StyleSheet } from 'react-native'
import { TextInput, Text } from 'react-native-paper'

import NumButton from './NumButton'
import { dieSides } from '~constants'
import useAppTheme from '~theme/useAppTheme'

type Props = {
  currentRollOptions: RollOptions
  setCurrentRollOptions: Dispatch<SetStateAction<RollOptions>>
}
export default function RollInput({
  currentRollOptions,
  setCurrentRollOptions,
}: Props) {
  const theme = useAppTheme()

  const increaseSides = () =>
    setCurrentRollOptions((o) => ({
      ...o,
      sides: dieSides[dieSides.indexOf(Number(o.sides)) + 1] || dieSides[0],
    }))
  const decreaseSides = () =>
    setCurrentRollOptions((o) => ({
      ...o,
      sides: dieSides[dieSides.indexOf(Number(o.sides)) - 1] || dieSides[0],
    }))

  const disableSidesUp =
    currentRollOptions.sides === dieSides[dieSides.length - 1]
  const disableSidesDown = currentRollOptions.sides === dieSides[0]

  const increaseQuantity = () =>
    setCurrentRollOptions((o) => ({
      ...o,
      quantity: Number(o.quantity) + 1 || 1,
    }))
  const decreaseQuantity = () =>
    setCurrentRollOptions((o) => ({
      ...o,
      quantity: Number(o.quantity) - 1 || 1,
    }))
  const quantityDownDisabled = Number(currentRollOptions.quantity) <= 1

  return (
    <View style={styles.diceRow}>
      <View style={styles.numContainer}>
        <NumButton label="+" onPress={increaseQuantity} />
        <TextInput
          style={[styles.num, { backgroundColor: theme.colors.background }]}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          maxFontSizeMultiplier={1}
          label=""
          keyboardType="numeric"
          numberOfLines={1}
          value={String(currentRollOptions.quantity)}
          onChangeText={(num) =>
            setCurrentRollOptions((o) => ({
              ...o,
              quantity: isNaN(Number(num))
                ? currentRollOptions.quantity
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
          labelStyle={{ fontSize: 20 }}
        />
        <View style={styles.num}>
          <Text variant="displayLarge">D{currentRollOptions.sides}</Text>
        </View>
        <NumButton
          label="-"
          disabled={disableSidesDown}
          onPress={decreaseSides}
          labelStyle={{ fontSize: 20 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  numContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
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
  diceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
})

import { Dispatch, SetStateAction } from 'react'

import { RollOptions } from 'randsum'
import { View, StyleSheet } from 'react-native'
import { TextInput, Text } from 'react-native-paper'

import ModifierPanel from './ModifierPanel'
import NumButton from './NumButton'
import { dieSides } from '~constants'
import useAppTheme from '~theme/useAppTheme'

type Props = {
  rollOptions: RollOptions
  setRollOptions: Dispatch<SetStateAction<RollOptions>>
}
export default function RollInput({ rollOptions, setRollOptions }: Props) {
  const theme = useAppTheme()

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
  return (
    <View style={styles.container}>
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
      <ModifierPanel
        rollOptions={rollOptions}
        setRollOptions={setRollOptions}
      />
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
  },
  container: {
    flexGrow: 2,
    flex: 1,
    justifyContent: 'center',
  },
})

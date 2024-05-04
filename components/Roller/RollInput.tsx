import { View, StyleSheet } from 'react-native'
import { TextInput, Icon } from 'react-native-paper'

import NumButton from './NumButton'
import useRollerContext from './RollerContext/useRollerContext'
import { dieSides } from '~constants'
import RollOptionsModel from '~models/RollOptionsModel'
import useAppTheme from '~theme/useAppTheme'

const MAX_QUANTITY = 999
export default function RollInput() {
  const theme = useAppTheme()
  const { currentDicePoolParameters, setCurrentDicePoolParameters } =
    useRollerContext()

  const increaseSides = () =>
    setCurrentDicePoolParameters((o) => ({
      ...o,
      sides: dieSides[dieSides.indexOf(Number(o.sides)) + 1] || dieSides[0],
    }))
  const decreaseSides = () =>
    setCurrentDicePoolParameters((o) => ({
      ...o,
      sides: dieSides[dieSides.indexOf(Number(o.sides)) - 1] || dieSides[0],
    }))

  const disableSidesUp =
    currentDicePoolParameters.sides === dieSides[dieSides.length - 1]
  const disableSidesDown = currentDicePoolParameters.sides === dieSides[0]

  const increaseQuantity = () =>
    setCurrentDicePoolParameters((o) => ({
      ...o,
      quantity: Number(o.quantity) + 1 || 1,
    }))
  const decreaseQuantity = () =>
    setCurrentDicePoolParameters((o) => ({
      ...o,
      quantity: Number(o.quantity) - 1 || 1,
    }))
  const quantityDownDisabled = Number(currentDicePoolParameters.quantity) <= 1
  const quantityUpDisabled =
    Number(currentDicePoolParameters.quantity) >= MAX_QUANTITY

  return (
    <View style={styles.diceRow}>
      <View style={styles.numContainer}>
        <NumButton
          label="+"
          accessibilityLabel="Increase Dice Quantity"
          onPress={increaseQuantity}
          disabled={quantityUpDisabled}
        />
        <TextInput
          style={[styles.num, { backgroundColor: theme.colors.background }]}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          maxFontSizeMultiplier={1}
          contentStyle={{ height: 100 }}
          label=""
          keyboardType="numeric"
          numberOfLines={1}
          value={String(currentDicePoolParameters.quantity)}
          onChangeText={(num) =>
            setCurrentDicePoolParameters((o) => ({
              ...o,
              quantity: isNaN(Number(num))
                ? currentDicePoolParameters.quantity
                : Number(num) > MAX_QUANTITY
                  ? 999
                  : Number(num),
            }))
          }
        />
        <NumButton
          label="-"
          accessibilityLabel="Decrease Dice Quantity"
          disabled={quantityDownDisabled}
          onPress={decreaseQuantity}
        />
      </View>
      <View style={styles.numContainer}>
        <NumButton
          label="+"
          accessibilityLabel="Increase Dice Sides"
          disabled={disableSidesUp}
          onPress={increaseSides}
        />
        <View style={styles.num}>
          <Icon
            source={RollOptionsModel.icon(currentDicePoolParameters)}
            size={165}
          />
        </View>
        <NumButton
          label="-"
          accessibilityLabel="Decrease Dice Sides"
          disabled={disableSidesDown}
          onPress={decreaseSides}
        />
      </View>
    </View>
  )
}

const fontSize = 80
const styles = StyleSheet.create({
  text: {
    fontSize,
    lineHeight: fontSize,
    paddingTop: 20,
  },
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
    minHeight: 180,
    width: 190,
    fontSize,
    lineHeight: fontSize + 20,
  },
  diceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
})

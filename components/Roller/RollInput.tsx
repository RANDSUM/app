import { parseRollArguments } from 'randsum'
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
    setCurrentDicePoolParameters((p) => {
      const newOptions = {
        ...p.options,
        sides:
          dieSides[dieSides.indexOf(Number(p.options.sides)) + 1] ||
          dieSides[0],
      }
      console.log('newOptions', newOptions)
      return Object.values(parseRollArguments(newOptions).dicePools)[0]
    })

  const decreaseSides = () =>
    setCurrentDicePoolParameters((p) => {
      const newOptions = {
        ...p.options,
        sides:
          dieSides[dieSides.indexOf(Number(p.options.sides)) - 1] ||
          dieSides[0],
      }
      return Object.values(parseRollArguments(newOptions).dicePools)[0]
    })

  const disableSidesUp =
    currentDicePoolParameters.options.sides === dieSides[dieSides.length - 1]
  const disableSidesDown =
    currentDicePoolParameters.options.sides === dieSides[0]

  const increaseQuantity = () =>
    setCurrentDicePoolParameters((p) => {
      const newOptions = {
        ...p.options,
        quantity: Number(p.options.quantity) + 1 || 1,
      }
      return Object.values(parseRollArguments(newOptions).dicePools)[0]
    })

  const decreaseQuantity = () =>
    setCurrentDicePoolParameters((p) => {
      const newOptions = {
        ...p.options,
        quantity: Number(p.options.quantity) - 1 || 1,
      }
      return Object.values(parseRollArguments(newOptions).dicePools)[0]
    })

  const changeQuantity = (num: string) =>
    setCurrentDicePoolParameters((p) => {
      const newOptions = {
        ...p.options,
        quantity: isNaN(Number(num))
          ? currentDicePoolParameters.options.quantity
          : Number(num) > MAX_QUANTITY
            ? 999
            : Number(num),
      }
      return Object.values(parseRollArguments(newOptions).dicePools)[0]
    })

  const quantityDownDisabled =
    Number(currentDicePoolParameters.options.quantity) <= 1
  const quantityUpDisabled =
    Number(currentDicePoolParameters.options.quantity) >= MAX_QUANTITY

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
          value={String(currentDicePoolParameters.options.quantity)}
          onChangeText={changeQuantity}
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
            source={RollOptionsModel.icon(currentDicePoolParameters.options)}
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

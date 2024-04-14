import React, { useState } from 'react'

import { roll, RollResult } from 'randsum'
import { StyleSheet, View } from 'react-native'
import { Text, Button, TextInput, Snackbar } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

const dieSides = [2, 4, 6, 8, 10, 12, 20, 100]
export default function App() {
  const theme = useAppTheme()
  const [quantity, setQuantity] = useState(1)
  const [sidesIndex, setSidesIndex] = useState(6)
  const increaseSidesIndex = () => setSidesIndex((s) => s + 1 || 1)
  const decreaseSidesIndex = () => setSidesIndex((s) => s - 1)
  const disableSidesUp = sidesIndex === dieSides.length - 1
  const disableSidesDown = sidesIndex === 0
  const sides = dieSides[sidesIndex]

  const increaseQuantity = () => setQuantity((q) => q + 1 || 1)
  const decreaseQuantity = () => setQuantity((q) => q - 1)
  const quantityDownDisabled = quantity <= 1
  const [lastRoll, setLastRoll] = useState<RollResult<number>>()
  const rollDie = () => setLastRoll(roll({ sides, quantity }))

  const onDismissSnackBar = () => setLastRoll(undefined)

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.diceContainer}>
          <View style={[styles.numContainer, styles.numInputContainer]}>
            <Button onPress={increaseQuantity}>+</Button>
            <TextInput
              style={[styles.num, { backgroundColor: theme.colors.background }]}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              label=""
              keyboardType="numeric"
              numberOfLines={1}
              value={String(quantity)}
              onChangeText={(num) =>
                isNaN(Number(num))
                  ? setQuantity(quantity)
                  : setQuantity(Number(num))
              }
            />
            <Button disabled={quantityDownDisabled} onPress={decreaseQuantity}>
              -
            </Button>
          </View>
          <View style={styles.numContainer}>
            <Text>D</Text>
          </View>
          <View style={[styles.numContainer, styles.numInputContainer]}>
            <Button disabled={disableSidesUp} onPress={increaseSidesIndex}>
              +
            </Button>
            <View style={styles.num}>
              <Text>{sides}</Text>
            </View>
            <Button disabled={disableSidesDown} onPress={decreaseSidesIndex}>
              -
            </Button>
          </View>
        </View>
        <Button onPress={rollDie}>Roll</Button>
      </View>
      <Snackbar
        visible={!!lastRoll}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'X',
          onPress: onDismissSnackBar,
        }}
      >
        {`You rolled ${lastRoll?.rollParameters.diceOptions[0].quantity}D${lastRoll?.rollParameters.diceOptions[0].sides} and rolled [${lastRoll?.rolls.join(',')}] = ${lastRoll?.total}!`}
      </Snackbar>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  num: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  numInputContainer: {
    width: 80,
  },
  diceContainer: {
    flexDirection: 'row',
  },
})

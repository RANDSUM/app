import React, { useState } from 'react'

import { roll, RollResult } from 'randsum'
import { StyleSheet, View } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'

import NumButton from '~components/NumButton'
import ResultModal from '~components/ResultModal'
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

  const dismissModal = () => setLastRoll(undefined)
  const modalIsVisible = !!lastRoll

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
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
              value={String(quantity)}
              onChangeText={(num) =>
                isNaN(Number(num))
                  ? setQuantity(quantity)
                  : setQuantity(Number(num))
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
              onPress={increaseSidesIndex}
            />
            <View style={styles.num}>
              <Text variant="displayLarge">D{sides}</Text>
            </View>
            <NumButton
              label="-"
              disabled={disableSidesDown}
              onPress={decreaseSidesIndex}
            />
          </View>
        </View>
        <Button mode="contained" onPress={rollDie}>
          Roll
        </Button>
      </View>
      <ResultModal
        visible={modalIsVisible}
        onDismiss={dismissModal}
        rollResult={lastRoll}
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
  num: {
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
    maxWidth: 250,
    padding: 20,
    fontSize: 55,
  },
  diceContainer: {
    flexDirection: 'row',
    flex: 2,
    width: '100%',
    justifyContent: 'center',
  },
})

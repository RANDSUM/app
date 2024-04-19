import * as Crypto from 'expo-crypto'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import { randomDieSide } from '../../utils'
import { defaultRollOptions } from '~constants'
import useAppTheme from '~theme/useAppTheme'

export default function DicePoolControls() {
  const theme = useAppTheme()
  const {
    currentDicePoolOptions,
    dicePools,
    currentDicePoolId,
    setCurrentDicePoolId,
    setDicePools,
  } = useRollerContext()
  const dicePoolsList = Object.values(dicePools)

  const addDie = () => {
    setDicePools((pools) => ({
      ...pools,
      [Crypto.randomUUID()]: {
        ...defaultRollOptions,
        sides: randomDieSide(),
      },
    }))
  }

  const duplicateDie = () => {
    setDicePools((pools) => ({
      ...pools,
      [Crypto.randomUUID()]: currentDicePoolOptions,
    }))
  }

  const removeDie = () => {
    if (dicePoolsList.length <= 1) return

    setDicePools((pools) => {
      const newPools = { ...pools }
      delete newPools[currentDicePoolId]
      return newPools
    })

    setCurrentDicePoolId(
      Object.keys(dicePools).filter((id) => id !== currentDicePoolId)[0]
    )
  }

  const disableRemove = dicePoolsList.length <= 1
  const disableAdd = dicePoolsList.length >= 8

  return (
    <View style={styles.row}>
      <IconButton
        icon="plus-circle-outline"
        size={40}
        iconColor={theme.colors.primary}
        disabled={disableAdd}
        onPress={addDie}
      />
      <IconButton
        icon="plus-circle-multiple-outline"
        size={40}
        iconColor={theme.colors.primary}
        disabled={disableAdd}
        onPress={duplicateDie}
      />
      <IconButton
        icon="dots-vertical-circle-outline"
        size={40}
        disabled
        onPress={() => {
          console.log('Modifiers')
        }}
      />
      <IconButton
        icon="close-circle-outline"
        size={40}
        iconColor={theme.colors.error}
        disabled={disableRemove}
        onPress={removeDie}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
  },
})

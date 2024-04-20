import { useState } from 'react'

import * as Crypto from 'expo-crypto'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'

import DieModiferModal from './DieModifierModal'
import useRollerContext from './RollerContext/useRollerContext'
import { randomDieSide } from '../../utils'
import { defaultRollOptions } from '~constants'
import useAppTheme from '~theme/useAppTheme'

export default function DicePoolControls() {
  const theme = useAppTheme()
  const { currentDicePoolOptions, dicePools, setDicePools } = useRollerContext()
  const [showModifierModal, setShowModifierModal] = useState(false)
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

  const disableAdd = dicePoolsList.length >= 6

  return (
    <>
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
          iconColor={theme.colors.primary}
          onPress={() => setShowModifierModal(true)}
        />
      </View>
      <DieModiferModal
        visible={showModifierModal}
        onDismiss={() => setShowModifierModal(false)}
      />
    </>
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

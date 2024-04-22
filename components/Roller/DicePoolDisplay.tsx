import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import RollModifierModel from '~models/RollModifierModel'

export default function DicePoolDisplay() {
  const { setCurrentDicePoolId, dicePools, setDicePools, currentDicePoolId } =
    useRollerContext()

  const removeDie = (deletedId: string) => {
    setDicePools((pools) => {
      const newPools = { ...pools }
      delete newPools[deletedId]
      return newPools
    })

    if (currentDicePoolId === deletedId) {
      setCurrentDicePoolId(
        Object.keys(dicePools).filter((id) => id !== deletedId)[0]
      )
    }
  }

  const dicePoolsList = Object.entries(dicePools)

  return (
    <View style={styles.container}>
      <View style={styles.wrapRow}>
        {dicePoolsList.length <= 1
          ? null
          : dicePoolsList.map(([id, { sides, quantity, modifiers }]) => {
              const showModifier = RollModifierModel.hasModifiers(modifiers)
              const display = `${quantity}D${sides}${showModifier ? '*' : ''}`

              return (
                <Chip
                  selected={id === currentDicePoolId}
                  key={id}
                  closeIcon="close"
                  onClose={
                    Object.keys(dicePools).length > 1
                      ? () => removeDie(id)
                      : undefined
                  }
                  mode="outlined"
                  showSelectedOverlay
                  showSelectedCheck={false}
                  style={{ width: 95 }}
                  textStyle={{ padding: 0, textAlign: 'center' }}
                  onPress={() => setCurrentDicePoolId(id)}
                >
                  {display}
                </Chip>
              )
            })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: 120,
    flex: 7,
  },
  wrapRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
})

import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

import useRollerContext from '~context/RollerContext/useRollerContext'

export default function DicePoolDisplay() {
  const { setCurrentDicePoolId, dicePools, currentDicePoolId } =
    useRollerContext()
  return (
    <View style={styles.container}>
      <View style={styles.wrapRow}>
        {Object.entries(dicePools).map(
          ([id, { sides, quantity, modifiers }]) => {
            const showModifier = !!Object.keys(modifiers || {}).length
            const display = `${quantity}D${sides}${showModifier ? '*' : ''}`

            return (
              <Chip
                selected={id === currentDicePoolId}
                key={id}
                showSelectedOverlay
                showSelectedCheck={false}
                onPress={() => setCurrentDicePoolId(id)}
              >
                {display}
              </Chip>
            )
          }
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    justifyContent: 'flex-end',
  },
  wrapRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    gap: 10,
  },
})

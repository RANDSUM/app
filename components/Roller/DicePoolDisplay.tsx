import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

import { Roll } from '~types'

type Props = {
  dicePools: Roll['dicePools']
  currentDicePoolId: string
  onPress: (index: string) => void
}

export default function DicePoolDisplay({
  dicePools,
  onPress,
  currentDicePoolId,
}: Props) {
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
                onPress={() => onPress(id)}
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
    justifyContent: 'center',
  },
  wrapRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    gap: 10,
  },
})

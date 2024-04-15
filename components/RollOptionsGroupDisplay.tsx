import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

import { RollOptions } from '~types'

type Props = {
  rollOptionsGroup: RollOptions[]
  activeIndex: number
  onPress: (index: number) => void
}

export default function RollOptionsGroupDisplay({
  rollOptionsGroup,
  activeIndex,
  onPress,
}: Props) {
  return (
    <View style={[styles.container]}>
      {rollOptionsGroup.map((group, index) => (
        <Chip
          selected={activeIndex === index}
          key={index}
          showSelectedOverlay
          showSelectedCheck={false}
          onPress={() => onPress(index)}
        >
          {`${group.quantity}D${group.sides}${group.modifiers?.length ? '*' : ''}`}
        </Chip>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minHeight: 32,
    gap: 10,
  },
})

import { RollOptions } from 'randsum'
import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

type Props = {
  dieGroups: RollOptions<number>[]
  activeIndex: number
  onPress: (index: number) => void
}

export default function DieGroupDisplay({
  dieGroups,
  activeIndex,
  onPress,
}: Props) {
  return (
    <View style={[styles.container]}>
      {dieGroups.map((group, index) => (
        <Chip
          selected={activeIndex === index}
          key={index}
          showSelectedOverlay
          showSelectedCheck={false}
          onPress={() => onPress(index)}
        >
          {`${group.quantity}D${group.sides}`}
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

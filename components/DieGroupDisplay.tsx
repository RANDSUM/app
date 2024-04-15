import { RollOptions } from 'randsum'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

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
      {dieGroups.length > 1 &&
        dieGroups.map((group, index) => (
          <Button
            mode={activeIndex === index ? 'contained' : 'outlined'}
            key={index}
            onPress={() => onPress(index)}
          >
            {`${group.quantity}D${group.sides}`}
          </Button>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
})

import { DicePoolOptions } from 'randsum'
import { View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'

export default function ModifierDisplay() {
  const {
    currentDicePoolParameters: { description },
    setCurrentDicePoolOptions,
  } = useRollerContext()

  const clearModifiers = () =>
    setCurrentDicePoolOptions(
      (o) => ({ ...o, modifiers: {} }) as DicePoolOptions<number>
    )

  const components = description
    .map((modifier, i, list) => [
      <Text variant="labelMedium" key={`${modifier}-mod`}>
        {modifier}
      </Text>,
      i === list.length - 1 ? null : (
        <Icon key={`${i}-separator`} source="circle-small" size={20} />
      ),
    ])
    .flat()

  return (
    <View style={{ height: 90, justifyContent: 'center', gap: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {components}
      </View>
      {components.length > 0 && (
        <Button mode="text" onPress={clearModifiers}>
          Clear Modifiers
        </Button>
      )}
    </View>
  )
}

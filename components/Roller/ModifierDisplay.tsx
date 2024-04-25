import { View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import RollModifierModel from '~models/RollModifierModel'

export default function ModifierDisplay() {
  const {
    currentDicePoolOptions: { modifiers },
    setCurrentDicePoolOptions,
  } = useRollerContext()

  const formattedModifiers =
    RollModifierModel.formatModifiersForDisplay(modifiers)

  const clearModifiers = () =>
    setCurrentDicePoolOptions((o) => ({ ...o, modifiers: {} }))

  const components = formattedModifiers
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

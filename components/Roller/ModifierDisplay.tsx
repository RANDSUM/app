import { View } from 'react-native'
import { Icon, Text } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import RollModifierModel from '~models/RollModifierModel'

export default function ModifierDisplay() {
  const {
    currentDicePoolOptions: { modifiers },
  } = useRollerContext()

  const formattedModifiers =
    RollModifierModel.formatModifiersForDisplay(modifiers)

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
    <View style={{ height: 90, justifyContent: 'center' }}>
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
    </View>
  )
}

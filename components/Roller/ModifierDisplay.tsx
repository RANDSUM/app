import { DicePoolParameters } from 'randsum'
import { View } from 'react-native'
import { Icon, Text } from 'react-native-paper'

type Props = {
  currentDicePoolParameters:
    | DicePoolParameters<number>
    | DicePoolParameters<string>
}
export default function ModifierDisplay({ currentDicePoolParameters }: Props) {
  const components = currentDicePoolParameters.description
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
    <View style={{ justifyContent: 'center', gap: 10 }}>
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

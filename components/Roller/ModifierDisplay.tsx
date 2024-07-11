import { DicePoolParameters } from 'randsum'
import { View } from 'react-native'
import { Icon, Text } from 'react-native-paper'

type Props = {
  error?: boolean
  description: string[]
}
export default function ModifierDisplay({ description, error = false }: Props) {
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
    <View style={{ justifyContent: 'center', gap: 10, minHeight: 45 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {error ? (
          <Text variant="labelMedium">
            There is an error with your notation. Check it and try again.
          </Text>
        ) : (
          components
        )}
      </View>
    </View>
  )
}

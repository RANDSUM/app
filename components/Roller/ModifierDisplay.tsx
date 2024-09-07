import { View } from 'react-native'
import { ActivityIndicator, Icon, Text } from 'react-native-paper'

type Props = {
  error?: boolean
  description: string[]
  loading?: boolean
}
export default function ModifierDisplay({
  description,
  loading = false,
  error = false,
}: Props) {
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
        <Content loading={loading} error={error} components={components} />
      </View>
    </View>
  )
}

type ContentProps = {
  loading: boolean
  error: boolean
  components: (JSX.Element | null)[]
}
const Content = ({ loading, error, components }: ContentProps) => {
  if (loading) {
    return <ActivityIndicator size="small" />
  }

  if (error) {
    return (
      <Text variant="labelMedium">
        There is an error with your notation. Check it and try again.
      </Text>
    )
  }

  return components
}

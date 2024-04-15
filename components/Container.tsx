import { PropsWithChildren } from 'react'

import { ViewStyle, View } from 'react-native'
import { ActivityIndicator, Portal } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

type Props = PropsWithChildren<{
  style?: ViewStyle
  loading?: boolean
}>

export default function Container({ children, style, loading = false }: Props) {
  const theme = useAppTheme()

  const showLoading = loading

  return (
    <View
      style={[
        {
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          backgroundColor: theme.colors.background,
        },
        style,
      ]}
    >
      {showLoading && (
        <Portal>
          <ActivityIndicator
            style={{ height: '100%', backgroundColor: theme.colors.backdrop }}
          />
        </Portal>
      )}
      {children}
    </View>
  )
}

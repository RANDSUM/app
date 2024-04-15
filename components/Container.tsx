import { PropsWithChildren } from 'react'

import { ViewStyle } from 'react-native'
import { ActivityIndicator, Portal } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import useAppTheme from '~theme/useAppTheme'

type Props = PropsWithChildren<{
  style?: ViewStyle
  loading?: boolean
}>

export default function Container({ children, style, loading = false }: Props) {
  const theme = useAppTheme()

  const showLoading = loading

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          paddingHorizontal: 30,
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
    </SafeAreaView>
  )
}

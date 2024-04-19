import { PropsWithChildren } from 'react'

import { ViewStyle, View } from 'react-native'
import { ActivityIndicator, Portal } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import useAppContext from '~context/AppContext/useAppContext'
import useAppTheme from '~theme/useAppTheme'

type Props = PropsWithChildren<{
  style?: ViewStyle
  loading?: boolean
  header?: boolean
}>

export default function Container({
  children,
  style,
  header = false,
  loading = false,
}: Props) {
  const theme = useAppTheme()
  const { hydrated } = useAppContext()
  const showLoading = !hydrated || loading

  return (
    <SafeAreaView
      edges={!header ? ['top'] : ['bottom']}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            backgroundColor: theme.colors.background,
            gap: 10,
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
    </SafeAreaView>
  )
}

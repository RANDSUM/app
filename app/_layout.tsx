import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

import AppProvider from '~context/AppContext/AppProvider'
import useAppTheme from '~theme/useAppTheme'

export default function RootLayout() {
  const theme = useAppTheme()

  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
          <Stack />
        </GestureHandlerRootView>
        <StatusBar style="auto" />
      </PaperProvider>
    </AppProvider>
  )
}

import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

import AppProvider from '~context/AppProvider'
import useAppTheme from '~theme/useAppTheme'

export default function RootLayout() {
  const theme = useAppTheme()

  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
          <Slot />
        </GestureHandlerRootView>
        <StatusBar style="auto" />
      </PaperProvider>
    </AppProvider>
  )
}

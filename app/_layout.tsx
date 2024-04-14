import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { PaperProvider } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

export default function RootLayout() {
  const theme = useAppTheme()

  return (
    <PaperProvider theme={theme}>
      <Slot />
      <StatusBar style="auto" />
    </PaperProvider>
  )
}

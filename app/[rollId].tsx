import { Redirect, Stack, useLocalSearchParams } from 'expo-router'

import Container from '~components/Container'
import Roller from '~components/Roller'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'

export default function RollSpecific() {
  const { rollId } = useLocalSearchParams()
  const { setSnackbarConfig, savedRolls } = useAppContext()
  const theme = useAppTheme()

  const savedRoll = savedRolls.find((r) => r.uuid === rollId)

  if (!savedRoll) {
    setSnackbarConfig({ children: 'Roll not found' })
    return <Redirect href="/myRolls" />
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: savedRoll.title,
          headerTintColor: theme.colors.onPrimary,
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerBackButtonMenuEnabled: true,
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTitleStyle: { color: theme.colors.onPrimary },
        }}
      />
      <Container header>
        <Roller savedRoll={savedRoll} />
      </Container>
    </>
  )
}

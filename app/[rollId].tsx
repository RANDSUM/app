import { Redirect, Stack, useLocalSearchParams } from 'expo-router'

import Container from '~components/Container'
import Roller from '~components/Roller'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'

export default function RollSpecific() {
  const { rollId } = useLocalSearchParams()
  const { savedRolls } = useAppContext()
  const theme = useAppTheme()

  const savedRoll = savedRolls.find((r) => r.uuid === rollId)

  if (!savedRoll) {
    return <Redirect href="/" />
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: savedRoll.title,
          headerTintColor: theme.colors.primary,
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerBackButtonMenuEnabled: true,
          headerShown: true,
          headerTitleStyle: {
            color: theme.colors.primary,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
      <Container header>
        <Roller savedRoll={savedRoll} />
      </Container>
    </>
  )
}

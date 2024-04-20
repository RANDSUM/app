import { Redirect, useLocalSearchParams } from 'expo-router'

import Container from '~components/Container'
import Roller from '~components/Roller'
import useAppContext from '~context/AppContext/useAppContext'

export default function RollSpecific() {
  const { rollId } = useLocalSearchParams()
  const { setSnackbarConfig, savedRolls } = useAppContext()

  const savedRoll = savedRolls.find((r) => r.uuid === rollId)

  if (!savedRoll) {
    setSnackbarConfig({ children: 'Roll not found' })
    return <Redirect href="/myRolls" />
  }
  return (
    <>
      <Container header>
        <Roller savedRoll={savedRoll} />
      </Container>
    </>
  )
}

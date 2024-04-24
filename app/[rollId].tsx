import { Redirect, useLocalSearchParams } from 'expo-router'

import Container from '~components/Container'
import Roller from '~components/Roller'
import useAppContext from '~context/AppContext/useAppContext'

export default function SpecificRoll() {
  const { rollId } = useLocalSearchParams()
  const { savedRolls } = useAppContext()

  const savedRoll = savedRolls.find((r) => r.uuid === rollId)

  if (!savedRoll) {
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

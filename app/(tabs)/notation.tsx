import { DicePoolOptions, parameterizeRollArgument } from 'randsum'
import { useState } from 'react'
import { Text } from 'react-native-paper'
import Container from '~components/Container'
import ComplexRollInput from '~components/Roller/ComplexRollInput'

export default function Notation() {
  const [currentDicePoolOptions, setCurrentDicePoolOptions] = useState<
    DicePoolOptions<number> | DicePoolOptions<string>
  >({ sides: 20, quantity: 1 })

  const parameters = parameterizeRollArgument(currentDicePoolOptions)

  return (
    <Container header>
      <Text style={{ width: '100%', textAlign: 'center' }}>
        Use the field below to test the RANDSUM dice notation!
      </Text>
      <ComplexRollInput
        setCurrentDicePoolOptions={setCurrentDicePoolOptions}
        currentDicePoolOptions={currentDicePoolOptions}
        description={parameters.description}
        currentDicePoolId="REFERENCE"
      />
    </Container>
  )
}

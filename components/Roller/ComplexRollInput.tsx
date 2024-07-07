import { useEffect, useState } from 'react'

import { DicePoolOptions, roll, validateDiceNotation } from 'randsum'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

import { SetRollOptions } from './types'

const optionsToNotation = (
  options: DicePoolOptions<number> | DicePoolOptions<string>
) => {
  const result = roll(options)
  return Object.values(result.dicePools)[0].notation
}

type Props = {
  currentDicePoolOptions: DicePoolOptions<number> | DicePoolOptions<string>
  setCurrentDicePoolOptions: SetRollOptions
}

export default function ComplexRollInput({
  currentDicePoolOptions,
  setCurrentDicePoolOptions,
}: Props) {
  const [text, setText] = useState<string>(
    optionsToNotation(currentDicePoolOptions)
  )
  const [error, setError] = useState(false)

  useEffect(() => {
    const validationResult = validateDiceNotation(text)
    if (validationResult.valid && validationResult.digested) {
      setError(false)
      setCurrentDicePoolOptions(validationResult.digested)
    } else {
      setError(true)
    }
  }, [text])

  return (
    <TextInput
      textAlign="center"
      dense
      mode="outlined"
      contentStyle={styles.input}
      onChangeText={setText}
      error={error}
      value={text}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  },
})

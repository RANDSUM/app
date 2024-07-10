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
  currentDicePoolId: string
  setCurrentDicePoolOptions: SetRollOptions
  notationParseError: boolean
  setNotationParseError: (error: boolean) => void
}

export default function ComplexRollInput({
  currentDicePoolOptions,
  currentDicePoolId,
  setCurrentDicePoolOptions,
  notationParseError,
  setNotationParseError,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState<string>(
    optionsToNotation(currentDicePoolOptions)
  )
  useEffect(() => {
    const validationResult = validateDiceNotation(text)
    if (validationResult.valid && validationResult.digested) {
      setNotationParseError(false)
      setCurrentDicePoolOptions(validationResult.digested)
    } else {
      setNotationParseError(true)
    }
  }, [text])

  useEffect(() => {
    setLoading(true)
    setText(optionsToNotation(currentDicePoolOptions))
    setLoading(false)
  }, [currentDicePoolId])

  return (
    !loading && (
      <TextInput
        textAlign="center"
        dense
        mode="outlined"
        contentStyle={styles.input}
        onChangeText={setText}
        error={!!notationParseError}
        value={text}
      />
    )
  )
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  },
})

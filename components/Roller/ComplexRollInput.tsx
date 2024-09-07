import { useEffect, useState } from 'react'

import {
  DicePoolOptions,
  parseRollArgument,
  validateDiceNotation,
} from 'randsum'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

import { SetRollOptions } from './types'
import RollNotationReference from '~components/RollNotationReference'
import ModifierDisplay from './ModifierDisplay'

type Props = {
  currentDicePoolId: string
  setCurrentDicePoolOptions: SetRollOptions
  currentDicePoolOptions: DicePoolOptions
  description: string[]
}

export default function ComplexRollInput({
  currentDicePoolId,
  setCurrentDicePoolOptions,
  currentDicePoolOptions,
  description,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [textLoading, setTextLoading] = useState(0)
  const [text, setText] = useState<string>(
    parseRollArgument(currentDicePoolOptions).notation
  )
  const [notationParseError, setNotationParseError] = useState(false)
  useEffect(() => {
    setTextLoading((i) => i + 1)
    const validationResult = validateDiceNotation(text)
    if (validationResult.valid && validationResult.digested) {
      setNotationParseError(false)
      setCurrentDicePoolOptions(validationResult.digested)
    } else {
      setNotationParseError(true)
    }
    setTimeout(() => setTextLoading((i) => i - 1), 800)
  }, [text])

  useEffect(() => {
    setLoading(true)
    setText(parseRollArgument(currentDicePoolOptions).notation)
    setLoading(false)
  }, [currentDicePoolId])

  return (
    !loading && (
      <>
        <TextInput
          textAlign="center"
          dense
          mode="outlined"
          contentStyle={styles.input}
          onChangeText={setText}
          error={!!notationParseError}
          value={text}
        />
        <ModifierDisplay
          loading={textLoading > 0}
          description={description}
          error={notationParseError}
        />
        <RollNotationReference />
      </>
    )
  )
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  },
})

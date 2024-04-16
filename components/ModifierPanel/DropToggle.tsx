import { Dispatch, SetStateAction } from 'react'

import { DropModifier, Modifier } from 'randsum'
import { View } from 'react-native'
import { Switch, Text, TextInput } from 'react-native-paper'

import { RollOptions } from '~types'

type Props = {
  rollOptions: RollOptions
  setRollOptions: Dispatch<SetStateAction<RollOptions>>
}

const findDrop = (modifier: Modifier): modifier is DropModifier =>
  'drop' in modifier
export default function DropToggle({ rollOptions, setRollOptions }: Props) {
  const modifier = rollOptions.modifiers?.find(findDrop) as
    | DropModifier
    | undefined

  const value = !!modifier

  const onToggle = () => {
    const newModifiers = modifier
      ? rollOptions.modifiers?.filter((m) => {
          return !findDrop(m)
        }) || []
      : [...(rollOptions.modifiers || []), { drop: { highest: 0, lowest: 0 } }]

    setRollOptions({
      ...rollOptions,
      modifiers: newModifiers,
    })
  }

  return (
    <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center' }}>
      <Switch value={value} onChange={onToggle} />
      <Text>Drop</Text>
      <Text> Lowest</Text>
      <TextInput
        keyboardType="numeric"
        value={modifier?.drop?.lowest?.toString() || '0'}
        disabled={!modifier}
        onChangeText={(text) => {
          const newModifiers = rollOptions.modifiers?.map((m) => {
            if (findDrop(m)) {
              return { drop: { ...m.drop, lowest: Number(text) } }
            }
            return m
          })

          setRollOptions({
            ...rollOptions,
            modifiers: newModifiers,
          })
        }}
      />
      <Text> Highest</Text>
      <TextInput
        keyboardType="numeric"
        value={modifier?.drop?.highest?.toString() || '0'}
        disabled={!modifier}
        onChangeText={(text) => {
          const newModifiers = rollOptions.modifiers?.map((m) => {
            if (findDrop(m)) {
              return { drop: { ...m.drop, highest: Number(text) } }
            }
            return m
          })

          setRollOptions({
            ...rollOptions,
            modifiers: newModifiers,
          })
        }}
      />
    </View>
  )
}

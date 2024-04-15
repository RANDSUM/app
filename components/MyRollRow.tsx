import { useState } from 'react'

import { RollResult, roll } from 'randsum'
import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'

import ResultModal from './ResultModal'
import useAppTheme from '~theme/useAppTheme'
import { SavedRoll } from '~types'

export default function MyRollRow({
  savedRoll: { title, rolls },
}: {
  savedRoll: SavedRoll
}) {
  const theme = useAppTheme()
  const [lastRolls, setLastRolls] = useState<RollResult[]>()
  const description = rolls
    .map(({ sides, quantity }) => `${quantity}D${sides}`)
    .join('+')

  const resultModalIsVisible = !!lastRolls
  const dismissResultModal = () => setLastRolls(undefined)
  const rollDie = () => {
    setLastRolls(rolls.map((group) => roll(group)))
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          borderColor: 'black',
          borderBottomWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text variant="titleMedium">{title}</Text>
          <Text variant="bodySmall">{description}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <Button mode="contained" onPress={rollDie}>
            Roll
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.error}
            onPress={rollDie}
          >
            Delete
          </Button>
        </View>
      </View>
      <ResultModal
        title={title}
        visible={resultModalIsVisible}
        onDismiss={dismissResultModal}
        rollResults={lastRolls}
        rollAgain={rollDie}
      />
    </>
  )
}

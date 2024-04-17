import { useState } from 'react'

import { Link } from 'expo-router'
import { RollResult, roll } from 'randsum'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text, Button, Icon } from 'react-native-paper'

import ResultModal from './ResultModal'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { SavedRoll } from '~types'

export default function MyRollRow({
  savedRoll: { title, rolls, uuid },
}: {
  savedRoll: SavedRoll
}) {
  const theme = useAppTheme()
  const { setSnackbarConfig } = useAppContext()
  const [resultModalIsVisible, setResultModalIsVisible] = useState(false)
  const [lastRolls, setLastRolls] = useState<RollResult<number>[]>()
  const description = rolls
    .map(({ sides, quantity }) => `${quantity}D${sides}`)
    .join('+')

  const rollDie = () => {
    const result = rolls.map((group) => roll(group))
    const combinedTotal = result.reduce((prev, current) => {
      return prev + current.total
    }, 0)
    setLastRolls(result)
    setSnackbarConfig({
      children: `Rolled "${title}": ${combinedTotal}`,
      action: {
        label: 'View Details',
        onPress: () => {
          setResultModalIsVisible(true)
        },
      },
    })
  }

  return (
    <>
      <View
        style={StyleSheet.flatten([
          styles.container,
          {
            backgroundColor: theme.colors.background,
          },
        ])}
      >
        <Link asChild href={`/${uuid}`}>
          <Pressable style={{ flexGrow: 1 }}>
            <View>
              <Text variant="titleMedium">{title}</Text>
              <Text variant="bodySmall">{description}</Text>
            </View>
          </Pressable>
        </Link>
        <View style={styles.interactionRow}>
          <Button mode="contained" onPress={rollDie}>
            Roll
          </Button>
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <Link asChild href={`/${uuid}`}>
              <Pressable>
                <Icon source="chevron-right" size={24} />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
      <ResultModal
        rollAgain={rollDie}
        visible={resultModalIsVisible}
        onDismiss={() => setResultModalIsVisible(false)}
        preventAutoDismiss
        rollResults={lastRolls}
        title={title}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  interactionRow: {
    flexDirection: 'row',
    gap: 10,
  },
})

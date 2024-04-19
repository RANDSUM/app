import { useState } from 'react'

import { Link } from 'expo-router'
import { RollResult, roll } from 'randsum'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'

import ResultModal from './ResultModal'
import useAppContext from '~context/AppContext/useAppContext'
import { Roll } from '~types'

export default function MyRollRow({ savedRoll }: { savedRoll: Roll }) {
  const { dicePools, title, uuid } = savedRoll
  const { setSnackbarConfig } = useAppContext()
  const [resultModalIsVisible, setResultModalIsVisible] = useState(false)
  const [lastRolls, setLastRolls] = useState<RollResult<number>[]>()

  const dicePoolList = Object.entries(dicePools)

  const description = dicePoolList
    .map(([, { quantity, sides }]) => {
      return `${quantity}D${sides}`
    })
    .join('+')

  const coreRoll = () => {
    const result = dicePoolList.map(([, pool]) => roll(pool))
    setLastRolls(result)
    return result
  }

  const rollDie = () => {
    if (!savedRoll.config.showRolls) {
      setSnackbarConfig({
        children: `Rolling ...`,
      })
    }
    const result = coreRoll()
    const combinedTotal = result.reduce((prev, current) => {
      return prev + current.total
    }, 0)

    if (savedRoll.config.showRolls) {
      setResultModalIsVisible(true)
      return
    }

    setTimeout(() => {
      setSnackbarConfig({
        children: `Rolled "${title}": ${combinedTotal}`,
        action: {
          label: 'View Details',
          onPress: () => {
            setResultModalIsVisible(true)
          },
        },
      })
    }, 300)
  }

  return (
    <>
      <View style={StyleSheet.flatten([styles.container])}>
        <Link asChild href={`/${uuid}`} style={{ flexGrow: 1 }}>
          <Pressable>
            <View style={styles.textContainer}>
              <Text variant="titleMedium">{title}</Text>
              <Text variant="bodySmall" numberOfLines={1}>
                {description}
              </Text>
            </View>
          </Pressable>
        </Link>
        <Button mode="contained" onPress={rollDie}>
          Roll
        </Button>
      </View>
      <ResultModal
        rollAgain={coreRoll}
        visible={resultModalIsVisible}
        onDismiss={() => setResultModalIsVisible(false)}
        preventAutoDismiss
        rollResults={lastRolls}
        roll={savedRoll}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  textContainer: {
    flexGrow: 1,
  },
  collection: {
    flexDirection: 'row',
    flex: 1,
    gap: 20,
  },
})

import { useState } from 'react'

import { Link } from 'expo-router'
import { RollResult, roll } from 'randsum'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'

import ResultModal from './ResultModal'
import RollOptionsModel from '~models/RollOptionsModel'
import HapticService from '~services/HapticService'
import { Roll } from '~types'

export default function MyRollRow({ savedRoll }: { savedRoll: Roll }) {
  const { dicePools, title, uuid } = savedRoll
  const [resultModalIsVisible, setResultModalIsVisible] = useState(false)
  const [lastRolls, setLastRolls] = useState<RollResult<number>[]>()

  const description = Object.values(dicePools)
    .map((options) => RollOptionsModel.title(options))
    .join('+')

  const coreRoll = () => {
    const result = Object.entries(dicePools).map(([, pool]) => roll(pool))
    setLastRolls(result)
  }

  const rollDie = () => {
    coreRoll()
    HapticService.notifyVibrate()
    setResultModalIsVisible(true)
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
        duration={3_000}
        rollAgain={coreRoll}
        visible={resultModalIsVisible}
        onDismiss={() => setResultModalIsVisible(false)}
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

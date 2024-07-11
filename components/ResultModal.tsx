import { useEffect, useRef, useState } from 'react'

import { RollResult } from 'randsum'
import { View, StyleSheet, ScrollView } from 'react-native'
import CircularProgress, {
  ProgressRef,
} from 'react-native-circular-progress-indicator'
import {
  Modal,
  Portal,
  Text,
  Card,
  Button,
  ActivityIndicator,
} from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'
import { Roll } from '~types'

type Props = {
  visible: boolean
  roll: Roll
  onDismiss: () => void
  rollResult: RollResult | undefined
  rollAgain: () => void
  preventAutoDismiss?: boolean
  duration?: number
}

const DURATION = 10_000

export default function ResultModal({
  onDismiss,
  rollResult,
  rollAgain,
  visible,
  roll: { title, config },
  duration = DURATION,
  preventAutoDismiss = false,
}: Props) {
  const theme = useAppTheme()
  const progressRef = useRef<ProgressRef>(null)
  const [showLoading, setShowLoading] = useState(false)
  const combinedTotal = rollResult?.total

  const isLoading = !rollResult || showLoading

  const shouldCountdown = !preventAutoDismiss
  useEffect(() => {
    progressRef.current?.reAnimate()
    const interval = setInterval(() => {
      if (shouldCountdown) {
        onDismiss()
      }
    }, duration)

    return () => clearInterval(interval)
  }, [combinedTotal, shouldCountdown])

  if (combinedTotal === undefined || !rollResult) return null

  const rollsDescription = Object.values(rollResult.dicePools)
    .map(({ notation }) => notation)
    .join(' + ')

  const MainDisplay = () => {
    const textDisplay = config.showRolls ? (
      <Text style={styles.rollResult} variant="headlineLarge">
        {rollResult.result.flat().join(', ')}
      </Text>
    ) : (
      <Text style={styles.totalResult} variant="displayLarge">
        {new Intl.NumberFormat().format(combinedTotal)}
      </Text>
    )

    return isLoading ? (
      <ActivityIndicator size="large" style={{ height: 85 }} />
    ) : (
      textDisplay
    )
  }

  const keyStyle = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.onPrimary,
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          onDismiss()
        }}
        style={styles.modalStyle}
      >
        <Card mode="contained">
          <Card.Title
            title={title || 'Roll Result'}
            subtitle={rollsDescription}
            titleStyle={{ textAlign: 'center' }}
            subtitleStyle={{ textAlign: 'center' }}
          />
          <Card.Content style={{ paddingHorizontal: 30 }}>
            <ScrollView>
              {shouldCountdown && (
                <View style={{ position: 'absolute', right: 10, top: -60 }}>
                  <CircularProgress
                    activeStrokeColor={theme.colors.primary}
                    ref={progressRef}
                    progressValueStyle={{ display: 'none' }}
                    inActiveStrokeOpacity={0}
                    initialValue={100}
                    value={isLoading ? 100 : 0}
                    duration={duration}
                    radius={15}
                    activeStrokeWidth={2}
                  />
                </View>
              )}
              <MainDisplay />
              <View style={styles.dieGroupContainer}>
                {Object.keys(rollResult.dicePools).map((key) => {
                  const modifiedRolls = rollResult.modifiedRolls[key].rolls
                  const rawRolls = rollResult.rawRolls[key]
                  const isModified =
                    !!rollResult.dicePools[key].options.modifiers

                  const dicePool = rollResult.dicePools[key]

                  return (
                    <View key={key} style={styles.dieGroupRow}>
                      <Text style={keyStyle} variant="labelLarge">
                        {' '}
                        {dicePool.notation}{' '}
                      </Text>
                      <Text variant="labelSmall">{rawRolls.join(', ')}</Text>
                      {isModified && (
                        <>
                          <Text variant="labelMedium">
                            (After applying modifiers)
                          </Text>
                          <Text variant="labelSmall">
                            {modifiedRolls.join(', ')}
                          </Text>
                        </>
                      )}
                    </View>
                  )
                })}
              </View>
            </ScrollView>
          </Card.Content>
          <Card.Actions style={styles.buttonRow}>
            <Button
              disabled={isLoading}
              onPress={() => {
                setShowLoading(true)
                rollAgain()
                setTimeout(() => {
                  setShowLoading(false)
                }, 200)
              }}
            >
              Roll Again
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  )
}
const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalStyle: {
    margin: 20,
  },
  text: {
    textAlign: 'left',
  },
  dieGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dieGroupRow: {
    padding: 10,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 100,
  },
  totalResult: {
    textAlign: 'center',
    fontSize: 78,
    lineHeight: 85,
  },
  rollResult: {
    textAlign: 'left',
  },
})

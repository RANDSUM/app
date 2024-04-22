import { useEffect, useRef, useState } from 'react'

import { RollResult } from 'randsum'
import { View, StyleSheet } from 'react-native'
import CircularProgress, {
  ProgressRef,
} from 'react-native-circular-progress-indicator'
import Collapsible from 'react-native-collapsible'
import {
  Modal,
  Portal,
  Text,
  Card,
  Button,
  ActivityIndicator,
} from 'react-native-paper'

import RollModifierModel from '~models/RollModifierModel'
import useAppTheme from '~theme/useAppTheme'
import { Roll } from '~types'

type Props = {
  visible: boolean
  roll: Roll
  onDismiss: () => void
  rollResults: RollResult[] | undefined
  rollAgain: () => void
  preventAutoDismiss?: boolean
  duration?: number
}

const DURATION = 10_000

export default function ResultModal({
  onDismiss,
  rollResults,
  rollAgain,
  visible,
  roll: { title, config },
  duration = DURATION,
  preventAutoDismiss = false,
}: Props) {
  const theme = useAppTheme()
  const progressRef = useRef<ProgressRef>(null)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [showLoading, setShowLoading] = useState(false)
  const combinedTotal = rollResults?.reduce((prev, current) => {
    return prev + current.total
  }, 0)

  const isLoading = !rollResults || showLoading

  const shouldCountdown = isCollapsed && !preventAutoDismiss
  useEffect(() => {
    progressRef.current?.reAnimate()
    const interval = setInterval(() => {
      if (shouldCountdown) {
        onDismiss()
        setIsCollapsed(true)
      }
    }, duration)

    return () => clearInterval(interval)
  }, [combinedTotal, shouldCountdown])

  if (combinedTotal === undefined || !rollResults) return null

  const rollsDescription = rollResults
    .map((rollResult) => {
      const sides = rollResult.rollParameters.diceOptions[0].sides
      const quantity = rollResult.rollParameters.diceOptions[0].quantity
      const mods = RollModifierModel.hasModifiers(
        rollResult.rollParameters.modifiers
      )
        ? RollModifierModel.formatModifierNotation(
            rollResult.rollParameters.modifiers
          )
        : ''

      const result = `${quantity}D${sides}${mods}`
      return mods ? `(${result})` : result
    })
    .join(' + ')

  const parsedRollOptionsGroup = rollResults.map((rollResult) => {
    const sides = rollResult.rollParameters.diceOptions[0].sides
    const quantity = rollResult.rollParameters.diceOptions[0].quantity
    const rolls = rollResult.rolls

    const rollDescription = `${quantity}D${sides} `

    const rollsDescription = `[${rolls.join(', ')}]`
    return { title: rollDescription, value: rollsDescription }
  })

  const MainDisplay = () => {
    const textDisplay = config.showRolls ? (
      <Text style={styles.rollResult} variant="headlineLarge">
        {rollResults.flatMap((result) => result.rolls).join(', ')}
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

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          onDismiss()
          setIsCollapsed(true)
        }}
        style={[styles.modalStyle]}
      >
        <Card mode="contained">
          <Card.Title
            title={title || 'Roll Result'}
            subtitle={rollsDescription}
            titleStyle={{ textAlign: 'center' }}
            subtitleStyle={{ textAlign: 'center' }}
          />
          <Card.Content style={{ paddingHorizontal: 30 }}>
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
            <Collapsible collapsed={isCollapsed}>
              <View style={styles.dieGroupContainer}>
                {parsedRollOptionsGroup.map(({ title, value }, index) => {
                  return (
                    <View key={title + index} style={styles.dieGroupRow}>
                      <Text style={[styles.text, { fontWeight: '800' }]}>
                        {title}
                      </Text>
                      <Text style={styles.text}>{value}</Text>
                    </View>
                  )
                })}
              </View>
            </Collapsible>
          </Card.Content>
          <Card.Actions style={styles.buttonRow}>
            <Button
              mode="text"
              disabled={isLoading}
              onPress={() => setIsCollapsed((collapsed) => !collapsed)}
            >
              {isCollapsed ? 'Show Details' : 'Hide Details'}
            </Button>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  dieGroupRow: {
    paddingTop: 10,
    textAlign: 'center',
    alignItems: 'center',
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

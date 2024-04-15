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

import useAppTheme from '~theme/useAppTheme'

type Props = {
  visible: boolean
  title?: string | undefined
  onDismiss: () => void
  rollResults: RollResult[] | undefined
  rollAgain: () => void
}

const DURATION = 10_000

export default function ResultModal({
  onDismiss,
  rollResults,
  rollAgain,
  title,
}: Props) {
  const theme = useAppTheme()
  const progressRef = useRef<ProgressRef>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const combinedTotal = rollResults?.reduce((prev, current) => {
    return prev + current.total
  }, 0)

  useEffect(() => {
    setIsLoading(true)
    const interval = setInterval(() => {
      setIsLoading(false)
    }, 500)

    return () => clearInterval(interval)
  }, [combinedTotal])

  useEffect(() => {
    setIsCollapsed(true)
  }, [isLoading])

  useEffect(() => {
    progressRef.current?.reAnimate()
    const interval = setInterval(() => {
      if (isCollapsed) {
        onDismiss()
        setIsCollapsed(true)
        setIsLoading(true)
      }
    }, DURATION)

    return () => clearInterval(interval)
  }, [combinedTotal, isCollapsed])

  if (!combinedTotal || !rollResults) return null

  const rollsDescription = rollResults
    .map((rollResult) => {
      const sides = rollResult.rollParameters.diceOptions[0].sides
      const quantity = rollResult.rollParameters.diceOptions[0].quantity

      return `${quantity}D${sides}`
    })
    .join(' + ')

  const parsedDieGroups = rollResults.map((rollResult) => {
    const sides = rollResult.rollParameters.diceOptions[0].sides
    const quantity = rollResult.rollParameters.diceOptions[0].quantity
    const rolls = rollResult.rolls

    const rollDescription = `${quantity}D${sides}`

    const rollsDescription = `${rolls.join(', ')}`
    return { title: rollDescription, value: rollsDescription }
  })

  return (
    <Portal>
      <Modal
        visible={!!combinedTotal}
        onDismiss={onDismiss}
        style={[styles.modalStyle]}
      >
        <Card style={{ backgroundColor: theme.colors.background }}>
          <Card.Title title={title ? `Rolling "${title}"` : 'Rolling...'} />
          <Card.Content>
            {isLoading ? (
              <ActivityIndicator size="large" style={{ height: 140 }} />
            ) : (
              <>
                {isCollapsed && (
                  <View style={{ position: 'absolute', right: 10, top: -40 }}>
                    <CircularProgress
                      activeStrokeColor={theme.colors.primary}
                      ref={progressRef}
                      progressValueStyle={{ display: 'none' }}
                      inActiveStrokeOpacity={0}
                      initialValue={100}
                      value={0}
                      duration={DURATION}
                      radius={15}
                      activeStrokeWidth={2}
                    />
                  </View>
                )}
                <Text style={{ textAlign: 'center' }}>{rollsDescription}</Text>
                <Text style={styles.result} variant="displayLarge">
                  {combinedTotal}
                </Text>
                <Button
                  mode="text"
                  onPress={() => setIsCollapsed((collapsed) => !collapsed)}
                >
                  {isCollapsed ? 'Show Details' : 'Hide Details'}
                </Button>
                <Collapsible collapsed={isCollapsed}>
                  {parsedDieGroups.map(({ title, value }, index) => {
                    return (
                      <View key={title + index} style={styles.dieGroupRow}>
                        <Text style={[styles.text, { fontWeight: '800' }]}>
                          {title}
                        </Text>
                        <Text style={styles.text}>{value}</Text>
                      </View>
                    )
                  })}
                </Collapsible>
              </>
            )}
          </Card.Content>
          <Card.Actions>
            <Button onPress={rollAgain}>Roll Again</Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  )
}
const styles = StyleSheet.create({
  modalStyle: {
    margin: 20,
  },
  text: {
    textAlign: 'left',
  },
  dieGroupRow: {
    paddingTop: 10,
  },
  result: {
    textAlign: 'center',
    fontSize: 78,
    lineHeight: 85,
  },
})

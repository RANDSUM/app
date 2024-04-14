import { useEffect, useRef } from 'react'

import { RollResult } from 'randsum'
import { View, StyleSheet } from 'react-native'
import CircularProgress, {
  ProgressRef,
} from 'react-native-circular-progress-indicator'
import { Modal, Portal, Text, Card, Button } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

type Props = {
  visible: boolean
  onDismiss: () => void
  rollResult: RollResult | undefined
  rollAgain: () => void
}

const DURATION = 5000

export default function ResultModal({
  onDismiss,
  rollResult,
  rollAgain,
}: Props) {
  const theme = useAppTheme()
  const progressRef = useRef<ProgressRef>(null)

  useEffect(() => {
    progressRef.current?.reAnimate()
    const interval = setInterval(() => {
      onDismiss()
    }, DURATION)

    return () => clearInterval(interval)
  }, [rollResult?.total])

  if (!rollResult) return null

  const sides = rollResult.rollParameters.diceOptions[0].sides
  const quantity = rollResult.rollParameters.diceOptions[0].quantity
  const rolls = rollResult.rolls
  const total = rollResult.total

  const rollDescription = `${quantity}D${sides}`

  const rollsDescription = rolls.join(' + ')

  const Progress = () => (
    <View style={{ position: 'absolute', right: 10, top: -40 }}>
      <CircularProgress
        activeStrokeColor={theme.colors.primary}
        circleBackgroundColor={theme.colors.background}
        ref={progressRef}
        initialValue={100}
        value={0}
        duration={DURATION}
        progressFormatter={() => ''}
        radius={15}
        activeStrokeWidth={2}
      />
    </View>
  )

  return (
    <Portal>
      <Modal
        visible={!!rollResult}
        onDismiss={onDismiss}
        style={[styles.modalStyle]}
      >
        <Card style={{ backgroundColor: theme.colors.background }}>
          <Card.Title title={`Rolling ${rollDescription}`} />
          <Card.Content>
            <Progress />
            {rolls.length > 1 && (
              <Text style={styles.text}>{rollsDescription}</Text>
            )}
            <Text style={styles.text} variant="displayLarge">
              {total}
            </Text>
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
    textAlign: 'center',
  },
})

import { ComponentProps, useState } from 'react'

import { RollResult, roll } from 'randsum'
import { Keyboard } from 'react-native'
import { Button } from 'react-native-paper'

import ResultModal from '~components/ResultModal'
import HapticService from '~services/HapticService'

type Props = Pick<ComponentProps<typeof ResultModal>, 'currentRoll'>

export default function RollButton({ currentRoll }: Props) {
  const [showResultModal, setShowResultModal] = useState(false)
  const [lastRollResults, setLastRollResults] = useState<RollResult<number>[]>()

  const dicePoolsList = Object.values(currentRoll.dicePools)
  const coreRoll = () => {
    const rolls = dicePoolsList.map((pool) => {
      return roll(pool)
    })
    setLastRollResults(rolls)
    HapticService.notifyVibrate()
    Keyboard.dismiss()
  }

  const rollDie = () => {
    coreRoll()
    setShowResultModal(true)
  }
  return (
    <>
      <Button
        style={{ width: '100%' }}
        labelStyle={{ lineHeight: 55, fontSize: 30 }}
        mode="contained"
        onPress={rollDie}
      >
        Roll
      </Button>
      <ResultModal
        rollResults={lastRollResults}
        currentRoll={currentRoll}
        rollAgain={coreRoll}
        onDismiss={() => setShowResultModal(false)}
        visible={showResultModal}
      />
    </>
  )
}

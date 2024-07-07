import { useState } from 'react'

import { RollResult, generateRollResult } from 'randsum'
import { Keyboard } from 'react-native'
import { Button } from 'react-native-paper'

import ResultModal from '~components/ResultModal'
import HapticService from '~services/HapticService'
import { Roll } from '~types'

type Props = {
  roll: Roll
}

export default function RollButton({ roll }: Props) {
  const [showResultModal, setShowResultModal] = useState(false)
  const [lastRollResult, setLastRollResult] = useState<RollResult>()

  const coreRoll = () => {
    setLastRollResult(generateRollResult({ dicePools: roll.dicePools }))
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
        rollResult={lastRollResult}
        roll={roll}
        rollAgain={coreRoll}
        onDismiss={() => setShowResultModal(false)}
        visible={showResultModal}
      />
    </>
  )
}

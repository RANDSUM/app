import { useState } from 'react'

import { RollResult, roll as randsumRoll } from 'randsum'
import { Keyboard } from 'react-native'
import { Button } from 'react-native-paper'

import useRollerContext from '../RollerContext/useRollerContext'
import ResultModal from '~components/ResultModal'
import HapticService from '~services/HapticService'

export default function RollButton() {
  const { roll } = useRollerContext()
  const [showResultModal, setShowResultModal] = useState(false)
  const [lastRollResults, setLastRollResults] = useState<RollResult<number>[]>()

  const dicePoolsList = Object.values(roll.dicePools)
  const coreRoll = () => {
    const rolls = dicePoolsList.map((pool) => {
      return randsumRoll(pool)
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
        roll={roll}
        rollAgain={coreRoll}
        onDismiss={() => setShowResultModal(false)}
        visible={showResultModal}
      />
    </>
  )
}

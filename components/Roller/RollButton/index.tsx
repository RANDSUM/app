import { ComponentProps, useState } from 'react'

import { Button } from 'react-native-paper'

import ResultModal from '~components/ResultModal'

type Props = {
  coreRoll: () => void
} & Pick<ComponentProps<typeof ResultModal>, 'title' | 'rollResults'>

export default function RollButton({ coreRoll, ...props }: Props) {
  const [showResultModal, setShowResultModal] = useState(false)
  const rollDie = () => {
    coreRoll()
    setShowResultModal(true)
  }
  return (
    <>
      <Button style={{ width: '100%' }} mode="contained" onPress={rollDie}>
        Roll
      </Button>
      <ResultModal
        {...props}
        rollAgain={coreRoll}
        onDismiss={() => setShowResultModal(false)}
        visible={showResultModal}
      />
    </>
  )
}

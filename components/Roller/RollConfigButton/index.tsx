import { ComponentProps, useState } from 'react'

import { Button } from 'react-native-paper'

import RollConfigModal from './RollConfigModal'

export default function RollConfigButton(
  props: Pick<ComponentProps<typeof RollConfigModal>, 'onChange' | 'config'>
) {
  const [showConfigModal, setShowConfigModal] = useState(false)
  return (
    <>
      <Button mode="text" onPress={() => setShowConfigModal(true)}>
        Modify Roll Config
      </Button>
      <RollConfigModal
        {...props}
        onDismiss={() => setShowConfigModal(false)}
        visible={showConfigModal}
      />
    </>
  )
}

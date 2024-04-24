import { useState } from 'react'

import { IconButton } from 'react-native-paper'

import RollConfigModal from './RollConfigModal'

export default function RollConfigButton() {
  const [showConfigModal, setShowConfigModal] = useState(false)
  return (
    <>
      <IconButton
        icon="cog"
        accessibilityLabel="Configure Roll"
        mode="contained"
        size={30}
        onPress={() => setShowConfigModal(true)}
      />
      <RollConfigModal
        onDismiss={() => setShowConfigModal(false)}
        visible={showConfigModal}
      />
    </>
  )
}

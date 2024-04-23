import { useState } from 'react'

import { IconButton } from 'react-native-paper'

import RollConfigModal from './RollConfigModal'

export default function RollConfigButton() {
  const [showConfigModal, setShowConfigModal] = useState(false)
  return (
    <>
      <IconButton
        icon="cog"
        mode="contained-tonal"
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

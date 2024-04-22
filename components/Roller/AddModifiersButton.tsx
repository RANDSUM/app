import { useState } from 'react'

import { Button } from 'react-native-paper'

import DieModiferModal from './DieModifierModal'

export default function AddModifiersButton() {
  const [showModifierModal, setShowModifierModal] = useState(false)
  return (
    <>
      <Button mode="text" onPress={() => setShowModifierModal(true)}>
        Add Modifiers
      </Button>
      <DieModiferModal
        visible={showModifierModal}
        onDismiss={() => setShowModifierModal(false)}
      />
    </>
  )
}

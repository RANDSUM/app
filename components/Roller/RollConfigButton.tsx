import { useState } from 'react'

import { IconButton } from 'react-native-paper'

import RollConfigModal from './RollConfigModal'
import useAppTheme from '~theme/useAppTheme'

export default function RollConfigButton() {
  const theme = useAppTheme()
  const [showConfigModal, setShowConfigModal] = useState(false)
  return (
    <>
      <IconButton
        icon="cog"
        iconColor={theme.colors.primary}
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

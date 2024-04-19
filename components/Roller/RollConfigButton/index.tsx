import { useState } from 'react'

import { IconButton } from 'react-native-paper'

import RollConfigModal from './RollConfigModal'
import useRollerContext from '~context/RollerContext/useRollerContext'
import useAppTheme from '~theme/useAppTheme'

export default function RollConfigButton() {
  const theme = useAppTheme()
  const { roll, setRollConfig } = useRollerContext()
  const [showConfigModal, setShowConfigModal] = useState(false)
  return (
    <>
      <IconButton
        icon="cog"
        iconColor={theme.colors.primary}
        size={40}
        onPress={() => setShowConfigModal(true)}
      />
      <RollConfigModal
        roll={roll}
        setRollConfig={setRollConfig}
        onDismiss={() => setShowConfigModal(false)}
        visible={showConfigModal}
      />
    </>
  )
}

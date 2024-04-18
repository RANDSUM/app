import { ComponentProps, useState } from 'react'

import { IconButton } from 'react-native-paper'

import RollConfigModal from './RollConfigModal'
import useAppTheme from '~theme/useAppTheme'

export default function RollConfigButton(
  props: Pick<
    ComponentProps<typeof RollConfigModal>,
    'currentRoll' | 'onChange'
  >
) {
  const theme = useAppTheme()
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
        {...props}
        onDismiss={() => setShowConfigModal(false)}
        visible={showConfigModal}
      />
    </>
  )
}

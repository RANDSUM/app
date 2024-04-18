import { ComponentProps, useState } from 'react'

import { Button, Icon } from 'react-native-paper'

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
      <Button mode="text" onPress={() => setShowConfigModal(true)}>
        <Icon source="cog" size={30} color={theme.colors.primary} />
      </Button>
      <RollConfigModal
        {...props}
        onDismiss={() => setShowConfigModal(false)}
        visible={showConfigModal}
      />
    </>
  )
}

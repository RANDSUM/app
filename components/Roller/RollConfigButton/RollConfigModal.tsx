import { StyleSheet } from 'react-native'
import { Modal, Portal, Text, Card } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'
import { RollConfig } from '~types'

type Props = {
  visible: boolean
  onDismiss: () => void
  onChange: (params: Partial<RollConfig>) => void
  config: RollConfig
}

export default function RollConfigModal({ onDismiss, visible }: Props) {
  const theme = useAppTheme()

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.modalStyle]}
      >
        <Card style={{ backgroundColor: theme.colors.background }}>
          <Card.Title title="Modify Dice Roll" />
          <Card.Content style={{ flexDirection: 'row' }}>
            <Text>Foo</Text>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  )
}
const styles = StyleSheet.create({
  modalStyle: {
    margin: 20,
  },
})

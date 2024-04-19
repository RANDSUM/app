import { StyleSheet } from 'react-native'
import { Modal, Portal, Card, Button, Text } from 'react-native-paper'

import { SetRollOptions } from './types'
import { Roll } from '~types'

type Props = {
  roll: Roll
  visible: boolean
  onDismiss: () => void
  setCurrentDicePoolOptions: SetRollOptions
}

export default function DieModiferModal({
  roll,
  onDismiss,
  setCurrentDicePoolOptions: _foo,
  visible,
}: Props) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.modalStyle]}
      >
        <Card>
          <Card.Title title={`Configure ${roll.title || 'Roll'}`} />
          <Card.Content style={{ flexDirection: 'row' }}>
            <Text>Option Modifiers</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={onDismiss}>Close</Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  )
}
const styles = StyleSheet.create({
  modalStyle: {
    margin: 10,
  },
})

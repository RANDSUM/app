import { StyleSheet } from 'react-native'
import { Modal, Portal, Card } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import RollTotals from './RollTotals'

type Props = {
  visible: boolean
  onDismiss: () => void
}

export default function RollConfigModal({ onDismiss, visible }: Props) {
  const { roll } = useRollerContext()

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          style={[styles.modalStyle]}
        >
          <Card>
            <Card.Title title={`Configure ${roll.title || 'Roll'}`} />
            <Card.Content style={{ flexDirection: 'row' }}>
              <RollTotals />
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </>
  )
}
const styles = StyleSheet.create({
  modalStyle: {
    margin: 10,
  },
})

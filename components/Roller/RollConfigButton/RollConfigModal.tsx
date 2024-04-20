import { useState } from 'react'

import { StyleSheet } from 'react-native'
import { Modal, Portal, Card } from 'react-native-paper'

import RollTotals from './RollTotals'
import DeleteSavedRollDialog from '../DeleteSavedRollDialog'
import useRollerContext from '../RollerContext/useRollerContext'
import useAppContext from '~context/AppContext/useAppContext'

type Props = {
  visible: boolean
  onDismiss: () => void
}

export default function RollConfigModal({ onDismiss, visible }: Props) {
  const { removeSavedRoll } = useAppContext()
  const { roll } = useRollerContext()
  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false)

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
      <DeleteSavedRollDialog
        visible={deleteDialogIsVisible}
        onAccept={() => roll && removeSavedRoll(roll.uuid)}
        onDismiss={() => setDeleteDialogIsVisible(false)}
      />
    </>
  )
}
const styles = StyleSheet.create({
  modalStyle: {
    margin: 10,
  },
})

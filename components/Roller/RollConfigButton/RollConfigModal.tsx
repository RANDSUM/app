import { useState } from 'react'

import { StyleSheet } from 'react-native'
import { Modal, Portal, Card, Button } from 'react-native-paper'

import RollTotals from './RollTotals'
import DeleteSavedRollDialog from '../DeleteSavedRollDialog'
import { SetRollConfig } from '../types'
import useAppContext from '~context/AppContext/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { Roll } from '~types'

type Props = {
  roll: Roll
  visible: boolean
  onDismiss: () => void
  setRollConfig: SetRollConfig
}

export default function RollConfigModal({
  roll,
  onDismiss,
  setRollConfig,
  visible,
}: Props) {
  const theme = useAppTheme()
  const { removeSavedRoll } = useAppContext()
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
              <RollTotals
                rollConfig={roll.config}
                setRollConfig={setRollConfig}
              />
            </Card.Content>
            <Card.Actions>
              <Button onPress={onDismiss}>Close</Button>
              {roll.persisted ? (
                <Button
                  onPress={() => setDeleteDialogIsVisible(true)}
                  style={{
                    backgroundColor: theme.colors.error,
                  }}
                >
                  Delete
                </Button>
              ) : null}
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
      <DeleteSavedRollDialog
        roll={roll}
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

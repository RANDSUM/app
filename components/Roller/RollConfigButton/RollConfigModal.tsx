import { useState } from 'react'

import { useRouter } from 'expo-router'
import { StyleSheet, Switch, View } from 'react-native'
import { Modal, Portal, Card, Button, Text } from 'react-native-paper'

import DeleteSavedRollDialog from '../DeleteSavedRollDialog'
import { SetRollConfig } from '../types'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { Roll } from '~types'

type Props = {
  currentRoll: Roll
  visible: boolean
  onDismiss: () => void
  onChange: SetRollConfig
}

export default function RollConfigModal({
  currentRoll,
  onDismiss,
  onChange,
  visible,
}: Props) {
  const router = useRouter()
  const theme = useAppTheme()
  const { setSnackbarConfig, removeSavedRoll } = useAppContext()
  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false)

  const deleteSavedRoll = () => {
    if (!currentRoll) return
    removeSavedRoll(currentRoll.uuid)
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll deleted' })
  }

  const showRolls = currentRoll.config.showRolls

  const toggleShowRolls = () => {
    const newConfig = {
      ...currentRoll.config,
      showRolls: !showRolls,
    }
    onChange(newConfig)
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          style={[styles.modalStyle]}
        >
          <Card>
            <Card.Title title={`Configure ${currentRoll.title}`} />
            <Card.Content style={{ flexDirection: 'row' }}>
              <View style={styles.input}>
                <Switch onChange={toggleShowRolls} value={showRolls} />
                <Text>Show Rolls instead of Total</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={onDismiss}>Close</Button>
              {currentRoll.persisted ? (
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
        currentRoll={currentRoll}
        visible={deleteDialogIsVisible}
        onAccept={deleteSavedRoll}
        onDismiss={() => setDeleteDialogIsVisible(false)}
      />
    </>
  )
}
const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
  },
  modalStyle: {
    margin: 20,
  },
})

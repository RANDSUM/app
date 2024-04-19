import { useState } from 'react'

import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import {
  Modal,
  Portal,
  Card,
  Button,
  Text,
  RadioButton,
} from 'react-native-paper'

import DeleteSavedRollDialog from '../DeleteSavedRollDialog'
import { SetRollConfig } from '../types'
import useAppContext from '~context/AppContext/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { Roll } from '~types'

type Props = {
  roll: Roll
  visible: boolean
  onDismiss: () => void
  onChange: SetRollConfig
}

export default function RollConfigModal({
  roll,
  onDismiss,
  onChange,
  visible,
}: Props) {
  const router = useRouter()
  const theme = useAppTheme()
  const { setSnackbarConfig, removeSavedRoll } = useAppContext()
  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false)

  const deleteSavedRoll = () => {
    if (!roll) return
    removeSavedRoll(roll.uuid)
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll deleted' })
  }

  const showRolls = roll.config.showRolls

  const toggleShowRolls = () => {
    const newConfig = {
      ...roll.config,
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
            <Card.Title title={`Configure ${roll.title || 'Roll'}`} />
            <Card.Content style={{ flexDirection: 'row' }}>
              <View>
                <Text variant="titleSmall">Roll Totals</Text>
                <RadioButton.Group
                  onValueChange={toggleShowRolls}
                  value={showRolls ? 'showRolls' : 'total'}
                >
                  <RadioButton.Item
                    labelVariant="bodySmall"
                    label="Show Roll Total (9)"
                    value="total"
                  />
                  <RadioButton.Item
                    labelVariant="bodySmall"
                    label="Show Rolls (1, 5, 3)"
                    value="showRolls"
                  />
                </RadioButton.Group>
              </View>
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
        onAccept={deleteSavedRoll}
        onDismiss={() => setDeleteDialogIsVisible(false)}
      />
    </>
  )
}
const styles = StyleSheet.create({
  modalStyle: {
    margin: 20,
  },
})

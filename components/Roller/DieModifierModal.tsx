import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Card, TextInput } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import RollOptionsModel from '~models/RollOptionsModel'

type Props = {
  visible: boolean
  onDismiss: () => void
}

export default function DieModiferModal({ onDismiss, visible }: Props) {
  const { currentDicePoolOptions, setCurrentDicePoolOptions } =
    useRollerContext()

  const changePlus = (value: string) => {
    setCurrentDicePoolOptions((options) => ({
      ...options,
      modifiers: {
        ...options.modifiers,
        plus: Number(value) || 0,
      },
    }))
  }

  const changeMinus = (value: string) => {
    setCurrentDicePoolOptions((options) => ({
      ...options,
      modifiers: {
        ...options.modifiers,
        minus: Number(value) || 0,
      },
    }))
  }

  const title = `Modify "${RollOptionsModel.title(currentDicePoolOptions, false)}"`
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} style={styles.modalStyle}>
        <Card>
          <Card.Title title={title} />
          <Card.Content>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                label="Add"
                keyboardType="numeric"
                style={{ flex: 1 }}
                value={String(
                  Number(currentDicePoolOptions.modifiers?.plus) || 0
                )}
                onChangeText={changePlus}
              />
              <TextInput
                label="Subtract"
                keyboardType="numeric"
                style={{ flex: 1 }}
                value={String(
                  Number(currentDicePoolOptions.modifiers?.minus) || 0
                )}
                onChangeText={changeMinus}
              />
            </View>
          </Card.Content>
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

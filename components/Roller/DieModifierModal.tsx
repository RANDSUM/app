import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Card, Text, TextInput } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'

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
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.modalStyle]}
      >
        <Card>
          <Card.Title title="Modify this Dice Pool" />
          <Card.Content style={{ flexDirection: 'column' }}>
            <Text>Option Modifiers</Text>
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

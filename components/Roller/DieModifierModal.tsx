import { DicePoolOptions } from 'randsum'
import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Card, TextInput } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'

type Props = {
  visible: boolean
  onDismiss: () => void
}

export default function DieModiferModal({ onDismiss, visible }: Props) {
  const { currentDicePoolParameters, setCurrentDicePoolOptions } =
    useRollerContext()

  const changePlus = (value: string) => {
    setCurrentDicePoolOptions(
      (oldParams) =>
        ({
          ...oldParams,
          modifiers: {
            ...oldParams.modifiers,
            plus: Number(value) || 0,
          },
        }) as DicePoolOptions<number>
    )
  }

  const changeMinus = (value: string) => {
    setCurrentDicePoolOptions(
      (oldParams) =>
        ({
          ...oldParams,
          modifiers: {
            ...oldParams.modifiers,
            minus: Number(value) || 0,
          },
        }) as DicePoolOptions<number>
    )
  }

  const title = `Modify "${currentDicePoolParameters}"`
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
                  Number(currentDicePoolParameters.options.modifiers?.plus) || 0
                )}
                onChangeText={changePlus}
              />
              <TextInput
                label="Subtract"
                keyboardType="numeric"
                style={{ flex: 1 }}
                value={String(
                  Number(currentDicePoolParameters.options.modifiers?.minus) ||
                    0
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

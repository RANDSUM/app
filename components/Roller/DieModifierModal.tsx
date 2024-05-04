import { DicePoolOptions, parseRollArguments } from 'randsum'
import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Card, TextInput } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'

type Props = {
  visible: boolean
  onDismiss: () => void
}

export default function DieModiferModal({ onDismiss, visible }: Props) {
  const { currentDicePoolParameters, setCurrentDicePoolParameters } =
    useRollerContext()

  const changePlus = (value: string) => {
    setCurrentDicePoolParameters((oldParams) => {
      const newOptions = {
        ...oldParams.options,
        modifiers: {
          ...oldParams.options.modifiers,
          plus: Number(value) || 0,
        },
      }

      return Object.values(
        parseRollArguments(newOptions as DicePoolOptions<number>).dicePools
      )[0]
    })
  }

  const changeMinus = (value: string) => {
    setCurrentDicePoolParameters((oldParams) => {
      const newOptions = {
        ...oldParams.options,
        modifiers: {
          ...oldParams.options.modifiers,
          minus: Number(value) || 0,
        },
      }
      return Object.values(
        parseRollArguments(newOptions as DicePoolOptions<number>).dicePools
      )[0]
    })
  }

  const title = `Modify "${currentDicePoolParameters}"`
  console.log('currentDicePoolParameters', currentDicePoolParameters)
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

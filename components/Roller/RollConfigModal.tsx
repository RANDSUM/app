import { StyleSheet, View } from 'react-native'
import {
  Modal,
  Portal,
  Card,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'

type Props = {
  visible: boolean
  onDismiss: () => void
}

export default function RollConfigModal({ onDismiss, visible }: Props) {
  const { roll, setRollConfig, setRoll } = useRollerContext()
  const toggleShowRolls = () => {
    setRollConfig((c) => ({
      ...c,
      showRolls: !c.showRolls,
    }))
  }

  const onChangeName = (text: string) => {
    setRoll((roll) => ({ ...roll, title: text }))
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          dismissable
          style={styles.modalStyle}
        >
          <Card>
            <Card.Title title={`Configure ${roll.title || 'Roll'}`} />
            <Card.Content style={styles.contentContainer}>
              <View style={styles.row}>
                {roll.persisted && (
                  <TextInput
                    label="Name"
                    value={roll.title}
                    onChangeText={onChangeName}
                  />
                )}
              </View>
              <View style={styles.row}>
                <Switch
                  value={roll.config.showRolls}
                  onValueChange={toggleShowRolls}
                />
                <Text variant="labelMedium">
                  Show Individual Rolls instead of Roll Totals
                </Text>
              </View>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </>
  )
}
const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalStyle: {
    margin: 10,
  },
})

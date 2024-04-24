import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Card, Switch, Text } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'

type Props = {
  visible: boolean
  onDismiss: () => void
}

export default function RollConfigModal({ onDismiss, visible }: Props) {
  const { roll, setRollConfig } = useRollerContext()
  const toggleShowRolls = () => {
    setRollConfig((c) => ({
      ...c,
      showRolls: !c.showRolls,
    }))
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          dismissable
          style={[styles.modalStyle]}
        >
          <Card>
            <Card.Title title={`Configure ${roll.title || 'Roll'}`} />
            <Card.Content style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
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
  modalStyle: {
    margin: 10,
  },
})

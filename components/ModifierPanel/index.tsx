import { Dispatch, SetStateAction, useState } from 'react'

import { RollOptions } from 'randsum'
import { View, StyleSheet } from 'react-native'
import { Button, Portal, Modal, Card, Text } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

type Props = {
  rollOptions: RollOptions
  setRollOptions: Dispatch<SetStateAction<RollOptions>>
}

export default function ModifierPanel({}: Props) {
  const theme = useAppTheme()
  const [modalIsVisible, setModalIsVisible] = useState(false)

  return (
    <>
      <View style={styles.modifierContainer}>
        <Button mode="text" onPress={() => setModalIsVisible(true)}>
          Modify Dice Roll
        </Button>
      </View>
      <Portal>
        <Modal
          onDismiss={() => setModalIsVisible(false)}
          style={styles.modal}
          visible={modalIsVisible}
        >
          <Card style={{ backgroundColor: theme.colors.background }}>
            <Card.Title title="Modify Dice Roll" />
            <Card.Content style={{ flexDirection: 'row' }}>
              <Text>Foo</Text>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  modifierContainer: {
    display: 'none',
  },
  panel: {
    padding: 5,
  },
  modal: {
    margin: 10,
  },
})

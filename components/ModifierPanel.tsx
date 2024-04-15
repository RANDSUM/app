import { Dispatch, SetStateAction, useState } from 'react'

import { View, StyleSheet } from 'react-native'
import { Button, Portal, Modal, Card, Text, Switch } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'
import { RollOptions } from '~types'

type Props = {
  rollOptions: RollOptions
  setRollOptions: Dispatch<SetStateAction<RollOptions>>
}

export default function ModifierPanel({}: Props) {
  const theme = useAppTheme()
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const MockRow = () => {
    return (
      <View style={{ flexDirection: 'row', margin: 5 }}>
        <Switch />
        <Text> Drop Lowest </Text>
        <Text> 1 </Text>
      </View>
    )
  }

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
              <View>
                <MockRow />
                <MockRow />
                <MockRow />
                <MockRow />
                <MockRow />
              </View>
              <View>
                <MockRow />
                <MockRow />
                <MockRow />
                <MockRow />
                <MockRow />
              </View>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  modifierContainer: {},
  panel: {
    padding: 5,
  },
  modal: {
    margin: 10,
  },
})

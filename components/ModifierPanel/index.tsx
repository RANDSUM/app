import { Dispatch, SetStateAction, useState } from 'react'

import { View, StyleSheet } from 'react-native'
import { Button, Portal, Modal, Card } from 'react-native-paper'

import ShowRollsToggle from './DropToggle'
import useAppTheme from '~theme/useAppTheme'
import { RollOptions } from '~types'

type Props = {
  rollOptions: RollOptions
  setRollOptions: Dispatch<SetStateAction<RollOptions>>
}

export default function ModifierPanel({ rollOptions, setRollOptions }: Props) {
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
              <ShowRollsToggle
                rollOptions={rollOptions}
                setRollOptions={setRollOptions}
              />
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

import { useState } from 'react'

import { Portal, Button, Dialog, TextInput } from 'react-native-paper'

type Props = {
  visible: boolean
  onAccept: (title: string) => void
  onDismiss: () => void
}

export default function SaveRollDialog({
  onDismiss,
  onAccept,
  visible,
}: Props) {
  const [title, setTitle] = useState('')
  const handleDismiss = () => {
    onDismiss()
    setTitle('')
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDismiss}>
        <Dialog.Title>Save Roll</Dialog.Title>
        <Dialog.Content>
          <TextInput
            placeholder="My Saved Roll"
            label="Give your Roll a Title"
            value={title}
            onChangeText={setTitle}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button
            disabled={!title}
            onPress={() => {
              onAccept(title)
              setTitle('')
            }}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

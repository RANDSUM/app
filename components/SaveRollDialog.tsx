import { useState } from 'react'

import { Portal, Text, Button, Dialog, TextInput } from 'react-native-paper'

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

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Save Roll</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodySmall">Add a title for your Roll</Text>
          <TextInput
            placeholder="My Saved Roll"
            label=""
            value={title}
            onChangeText={setTitle}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button disabled={!!title} onPress={() => onAccept(title)}>
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

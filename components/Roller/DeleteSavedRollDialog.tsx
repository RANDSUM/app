import { Portal, Button, Dialog } from 'react-native-paper'

import { Roll } from '~types'

type Props = {
  visible: boolean
  onAccept: () => void
  onDismiss: () => void
  currentRoll: Roll
}

export default function DeleteSavedRollDialog({
  onDismiss,
  onAccept,
  visible,
  currentRoll,
}: Props) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{`Delete "${currentRoll.title}"?`}</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onAccept}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

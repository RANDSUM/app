import { Portal, Button, Dialog } from 'react-native-paper'

import { SavedRoll } from '~types'

type Props = {
  visible: boolean
  onAccept: () => void
  onDismiss: () => void
  savedRoll: SavedRoll | undefined
}

export default function DeleteSavedRollDialog({
  onDismiss,
  onAccept,
  visible,
  savedRoll,
}: Props) {
  if (!savedRoll) return null
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{`Delete "${savedRoll.title}"?`}</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onAccept}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

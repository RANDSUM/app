import { Portal, Button, Dialog } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'

type Props = {
  visible: boolean
  onAccept: () => void
  onDismiss: () => void
}

export default function DeleteSavedRollDialog({
  onDismiss,
  onAccept,
  visible,
}: Props) {
  const { roll } = useRollerContext()
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{`Delete "${roll.title}"?`}</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onAccept}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

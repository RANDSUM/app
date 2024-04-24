import { useState } from 'react'

import { IconButton } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import SaveRollDialog from './SaveRollDialog'

export default function SaveButton() {
  const { roll, isDirty, saveChanges, addToSavedRolls } = useRollerContext()

  const isSavedRoll = roll.persisted

  const [saveDialogIsVisible, setSaveDialogIsVisible] = useState(false)

  const disabled = isSavedRoll && !isDirty
  const onPress = isSavedRoll ? saveChanges : () => setSaveDialogIsVisible(true)

  return (
    <>
      <IconButton
        mode="contained"
        icon="content-save-outline"
        size={30}
        disabled={disabled}
        onPress={onPress}
      />
      <SaveRollDialog
        visible={saveDialogIsVisible}
        onDismiss={() => setSaveDialogIsVisible(false)}
        onAccept={(title) => {
          setSaveDialogIsVisible(false)
          addToSavedRolls(title)
        }}
      />
    </>
  )
}

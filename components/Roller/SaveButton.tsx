import { useState } from 'react'

import { Button } from 'react-native-paper'

import SaveRollDialog from './SaveRollDialog'
import { Roll } from '~types'

type Props = {
  roll: Roll
  isDirty: boolean
  saveChanges: () => void
  addToSavedRolls: (title: string) => void
}
export default function SaveButton({
  roll,
  isDirty,
  saveChanges,
  addToSavedRolls,
}: Props) {
  const isSavedRoll = roll.persisted

  const [saveDialogIsVisible, setSaveDialogIsVisible] = useState(false)

  const disabled = isSavedRoll && !isDirty
  const onPress = isSavedRoll ? saveChanges : () => setSaveDialogIsVisible(true)

  return (
    <>
      <Button
        icon="content-save-outline"
        disabled={disabled}
        onPress={onPress}
        contentStyle={{ flexDirection: 'row-reverse' }}
      >
        Save Roll
      </Button>
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

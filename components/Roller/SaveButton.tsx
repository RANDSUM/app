import { useState } from 'react'

import * as Crypto from 'expo-crypto'
import { router } from 'expo-router'
import { IconButton } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import SaveRollDialog from './SaveRollDialog'
import useAppContext from '~context/AppContext/useAppContext'

export default function SaveButton() {
  const { roll, isDirty, resetRoll } = useRollerContext()

  const isSavedRoll = roll.persisted

  const { setSavedRolls, setSnackbarConfig } = useAppContext()
  const [saveDialogIsVisible, setSaveDialogIsVisible] = useState(false)

  const saveChanges = () => {
    setSavedRolls((rolls) => {
      return rolls.map((thisRoll) =>
        thisRoll.uuid === roll.uuid ? roll : thisRoll
      )
    })
    setSnackbarConfig({ children: 'Changes saved!' })
  }

  const addToSavedRolls = (title: string) => {
    setSavedRolls((rolls) => [
      ...rolls,
      {
        ...roll,
        uuid: Crypto.randomUUID(),
        title,
        persisted: true,
      },
    ])
    resetRoll()
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll saved!', duration: 1500 })
  }

  return (
    <>
      {isSavedRoll ? (
        <IconButton
          mode="contained-tonal"
          icon={
            !isDirty ? 'content-save-alert-outline' : 'content-save-outline'
          }
          size={30}
          disabled={!isDirty}
          onPress={saveChanges}
        />
      ) : (
        <IconButton
          icon="content-save-outline"
          size={30}
          mode="contained-tonal"
          onPress={() => setSaveDialogIsVisible(true)}
        />
      )}
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

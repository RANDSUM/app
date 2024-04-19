import { useState } from 'react'

import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { IconButton } from 'react-native-paper'

import SaveRollDialog from './SaveRollDialog'
import useAppContext from '~context/AppContext/useAppContext'
import useRollerContext from '~context/RollerContext/useRollerContext'
import useAppTheme from '~theme/useAppTheme'

export default function SaveButton() {
  const theme = useAppTheme()
  const router = useRouter()
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
          icon="content-save-outline"
          size={40}
          iconColor={!isDirty ? theme.colors.secondary : theme.colors.primary}
          disabled={!isDirty}
          onPress={saveChanges}
        />
      ) : (
        <IconButton
          icon="content-save-outline"
          size={40}
          iconColor={theme.colors.primary}
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

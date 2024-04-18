import { useState } from 'react'

import { useRouter } from 'expo-router'
import { IconButton } from 'react-native-paper'

import SaveRollDialog from '../SaveRollDialog'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { Roll } from '~types'

type Props = {
  isSavedRoll: boolean
  isDirty: boolean
  currentRoll: Roll
}
export default function SaveButton({
  isSavedRoll,
  isDirty,
  currentRoll,
}: Props) {
  const theme = useAppTheme()
  const router = useRouter()
  const { setSavedRolls, setSnackbarConfig } = useAppContext()
  const [saveDialogIsVisible, setSaveDialogIsVisible] = useState(false)

  const saveChanges = () => {
    setSavedRolls((rolls) => {
      return rolls.map((roll) =>
        roll.uuid === currentRoll.uuid ? currentRoll : roll
      )
    })
    setSnackbarConfig({ children: 'Changes saved!' })
  }

  const addToSavedRolls = (title: string) => {
    setSavedRolls((rolls) => [
      ...rolls,
      {
        ...currentRoll,
        title,
        persisted: true,
      },
    ])
    router.push('/myRolls')
    setSnackbarConfig({ children: 'Roll saved!' })
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

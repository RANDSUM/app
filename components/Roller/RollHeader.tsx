import { useState } from 'react'

import { Stack } from 'expo-router'
import { IconButton } from 'react-native-paper'

import DeleteSavedRollDialog from './DeleteSavedRollDialog'
import useAppContext from '~context/AppContext/useAppContext'
import useAppTheme from '~theme/useAppTheme'
import { Roll } from '~types'

type Props = {
  isDirty: boolean
  roll: Roll
}

function RollHeader({ isDirty, roll }: Props) {
  const { removeSavedRoll } = useAppContext()
  const theme = useAppTheme()
  const [deleteDialogIsVisible, setDeleteDialogIsVisible] = useState(false)

  const title = isDirty ? `${roll.title}*` : roll.title

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerTintColor: theme.colors.onPrimary,
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerBackButtonMenuEnabled: true,
          headerRight: () => (
            <IconButton
              icon="delete-forever"
              iconColor={theme.colors.onPrimary}
              onPress={() => setDeleteDialogIsVisible(true)}
            />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTitleStyle: { color: theme.colors.onPrimary },
        }}
      />
      <DeleteSavedRollDialog
        roll={roll}
        visible={deleteDialogIsVisible}
        onAccept={() => {
          removeSavedRoll(roll.uuid)
        }}
        onDismiss={() => setDeleteDialogIsVisible(false)}
      />
    </>
  )
}

export default RollHeader

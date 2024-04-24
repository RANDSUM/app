import { useState } from 'react'

import { Stack } from 'expo-router'
import { IconButton } from 'react-native-paper'

import DeleteSavedRollDialog from './DeleteSavedRollDialog'
import useRollerContext from './RollerContext/useRollerContext'
import useAppContext from '~context/AppContext/useAppContext'
import useAppTheme from '~theme/useAppTheme'

function RollHeader() {
  const { removeSavedRoll } = useAppContext()
  const { roll, isDirty } = useRollerContext()
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

import { RollOptions } from 'randsum'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

import sharedStyles from './sharedStyles'
import useAppTheme from '~theme/useAppTheme'

type Props = {
  onDelete: () => void
  onSaveRoll: () => void
  onAdd: () => void
  onRemove: () => void
  onSaveChanges: () => void
  isSavedRoll: boolean
  isDirty: boolean
  rollOptionsGroups: RollOptions[]
}
export default function RollControlRow({
  onAdd,
  onRemove,
  onDelete,
  onSaveRoll,
  onSaveChanges,
  rollOptionsGroups,
  isSavedRoll,
  isDirty,
}: Props) {
  const theme = useAppTheme()
  return (
    <View style={sharedStyles.lesserButtonRow}>
      <Button
        mode="text"
        onPress={onAdd}
        disabled={rollOptionsGroups.length >= 4}
      >
        Add Die
      </Button>
      <Button
        mode="text"
        onPress={onRemove}
        disabled={rollOptionsGroups.length <= 1}
      >
        Remove Die
      </Button>
      {!isSavedRoll && (
        <View style={sharedStyles.lesserButtonRow}>
          <Button mode="text" onPress={onSaveRoll}>
            Save Roll
          </Button>
        </View>
      )}
      {isSavedRoll && (
        <>
          <View style={sharedStyles.lesserButtonRow}>
            <Button
              style={{ width: '100%' }}
              mode="text"
              disabled={!isDirty}
              onPress={onSaveChanges}
            >
              Save Changes
            </Button>
          </View>
          <View style={sharedStyles.lesserButtonRow}>
            <Button
              labelStyle={{ color: theme.colors.error }}
              mode="text"
              onPress={onDelete}
            >
              Delete Roll
            </Button>
          </View>
        </>
      )}
    </View>
  )
}

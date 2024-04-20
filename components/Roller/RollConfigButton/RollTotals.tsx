import { View } from 'react-native'
import { Text, Switch } from 'react-native-paper'

import useRollerContext from '../RollerContext/useRollerContext'

export default function RollTotals() {
  const { setRollConfig, roll } = useRollerContext()

  const toggleShowRolls = () => {
    const newConfig = {
      ...roll.config,
      showRolls: !roll.config.showRolls,
    }
    setRollConfig(newConfig)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Switch value={roll.config.showRolls} onValueChange={toggleShowRolls} />
      <Text variant="labelMedium">
        Show Individual Rolls instead of Roll Totals
      </Text>
    </View>
  )
}

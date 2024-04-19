import { View } from 'react-native'
import { Text, Switch } from 'react-native-paper'

import { SetRollConfig } from '../types'
import { RollConfig } from '~types'

type Props = {
  rollConfig: RollConfig
  setRollConfig: SetRollConfig
}
export default function RollTotals({ rollConfig, setRollConfig }: Props) {
  const toggleShowRolls = () => {
    const newConfig = {
      ...rollConfig,
      showRolls: !rollConfig.showRolls,
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
      <Switch value={rollConfig.showRolls} onValueChange={toggleShowRolls} />
      <Text variant="labelMedium">
        Show Individual Rolls instead of Roll Totals
      </Text>
    </View>
  )
}

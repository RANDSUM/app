import { StyleSheet, View } from 'react-native'

import DicePoolControls from './DicePoolControls'
import DicePoolDisplay from './DicePoolDisplay'
import RollButton from './RollButton'
import RollConfigButton from './RollConfigButton'
import RollInput from './RollInput'
import SaveButton from './SaveButton'
import RollerProvider from '~context/RollerContext/RollerProvider'
import { Roll } from '~types'

type Props = {
  savedRoll?: Roll
}
export default function Roller(props: Props) {
  return (
    <RollerProvider {...props}>
      <View style={styles.container}>
        <View style={styles.row}>
          <RollConfigButton />
          <SaveButton />
        </View>
        <RollInput />
        <View style={styles.collection}>
          <DicePoolDisplay />
          <DicePoolControls />
          <RollButton />
        </View>
      </View>
    </RollerProvider>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
  },
  collection: {
    gap: 10,
  },
})

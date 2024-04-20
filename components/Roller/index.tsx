import { StyleSheet, View } from 'react-native'

import DicePoolControls from './DicePoolControls'
import DicePoolDisplay from './DicePoolDisplay'
import ModifierDisplay from './ModifierDisplay'
import RollButton from './RollButton'
import RollConfigButton from './RollConfigButton'
import RollerProvider from './RollerContext/RollerProvider'
import RollHeader from './RollHeader'
import RollInput from './RollInput'
import SaveButton from './SaveButton'
import { Roll } from '~types'

type Props = {
  savedRoll?: Roll
}
export default function Roller(props: Props) {
  return (
    <RollerProvider {...props}>
      {props.savedRoll && <RollHeader />}
      <View style={styles.container}>
        <View style={styles.row}>
          <RollConfigButton />
          <DicePoolDisplay />
          <SaveButton />
        </View>
        <RollInput />
        <View style={styles.collection}>
          <ModifierDisplay />
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

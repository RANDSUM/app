import { StyleSheet, View } from 'react-native'

import AddModifiersButton from './AddModifiersButton'
import DicePoolDisplay from './DicePoolDisplay'
import ModifierDisplay from './ModifierDisplay'
import RollButton from './RollButton'
import RollConfigButton from './RollConfigButton'
import RollerProvider from './RollerContext/RollerProvider'
import RollHeader from './RollHeader'
import RollInput from './RollInput'
import SaveButton from './SaveButton'
import { Roll } from '~types'

export default function Roller(props: { savedRoll?: Roll }) {
  return (
    <RollerProvider {...props}>
      {props.savedRoll && <RollHeader />}
      <View style={styles.container}>
        <View style={styles.row}>
          <RollConfigButton />
          <SaveButton />
        </View>
        <View style={styles.collection}>
          <AddModifiersButton />
          <RollInput />
          <ModifierDisplay />
        </View>
        <View style={styles.collection}>
          <DicePoolDisplay />
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
    gap: 15,
  },
})

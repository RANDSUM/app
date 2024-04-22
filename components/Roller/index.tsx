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
          <SaveButton />
        </View>
        <View style={styles.collection}>
          <RollInput />
          <ModifierDisplay />
        </View>
        <View style={styles.collection}>
          <DicePoolDisplay />
          <RollButton />
          <AddModifiersButton />
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

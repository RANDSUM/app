import { FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

import Container from '~components/Container'
import MyRollRow from '~components/MyRollRow'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'

export default function MyRolls() {
  const { savedRolls } = useAppContext()
  const theme = useAppTheme()
  return (
    <Container>
      <FlatList
        data={savedRolls}
        keyExtractor={({ uuid }) => uuid}
        ListEmptyComponent={() => <Text>No saved rolls</Text>}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { backgroundColor: theme.colors.background },
        ]}
        renderItem={({ item: savedRoll }) => (
          <MyRollRow savedRoll={savedRoll} />
        )}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
})

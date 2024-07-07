import { FlatList, StyleSheet } from 'react-native'
import { Divider, Text } from 'react-native-paper'

import Container from '~components/Container'
import MyRollRow from '~components/MyRollRow'
import useAppContext from '~context/AppContext/useAppContext'
import useAppTheme from '~theme/useAppTheme'

export default function MyRolls() {
  const { savedRolls } = useAppContext()
  const theme = useAppTheme()

  return (
    <Container header>
      <FlatList
        data={savedRolls}
        keyExtractor={({ uuid }) => uuid}
        ItemSeparatorComponent={Divider}
        style={{ backgroundColor: 'blue' }}
        ListEmptyComponent={() => (
          <Text style={styles.text}>No Saved Rolls</Text>
        )}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {
            backgroundColor: theme.colors.background,
            justifyContent: savedRolls.length === 0 ? 'center' : 'flex-start',
          },
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
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
})

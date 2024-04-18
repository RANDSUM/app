import { FlatList, StyleSheet, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'

import Container from '~components/Container'
import MyRollRow from '~components/MyRollRow'
import useAppContext from '~context/useAppContext'
import useAppTheme from '~theme/useAppTheme'

export default function MyRolls() {
  const { savedRolls } = useAppContext()
  const theme = useAppTheme()
  console.log(savedRolls)
  return (
    <Container header>
      <FlatList
        data={savedRolls}
        keyExtractor={({ uuid }) => uuid}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.text}>No Saved Rolls</Text>
          </View>
        )}
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
  text: {
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

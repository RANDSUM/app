import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'

import Container from '~components/Container'
import MyRollRow from '~components/MyRollRow'
import useAppContext from '~context/useAppContext'

export default function MyRolls() {
  const { savedRolls } = useAppContext()
  return (
    <>
      <Container>
        <FlatList
          data={savedRolls}
          keyExtractor={({ uuid }) => uuid}
          ListEmptyComponent={() => <Text>No saved rolls</Text>}
          renderItem={({ item: savedRoll }) => (
            <MyRollRow savedRoll={savedRoll} />
          )}
        />
      </Container>
    </>
  )
}

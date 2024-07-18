import { Platform, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import * as Linking from 'expo-linking'

import Container from '~components/Container'
import { roll } from 'randsum'

const randomDescription = () => {
  const randomTotal = roll('1d100').total
  switch (true) {
    case randomTotal < 80:
      return 'is about generating random numbers with very specific constraints.'
    case randomTotal < 90:
      return 'is a desperate call for help from a man who should really clean his apartment more often'
    case randomTotal < 99:
      return 'is a key part of an ARG that you are now a part of. 17. 221. Honeycomb. 89.'
    case randomTotal === 100:
      return "is my life's work. I have spent years thinking about this. I sincerely hope you enjoy it."
  }
}

export default function About() {
  const goToGithub = () => {
    const url = 'https://github.com/randsum'

    if (Platform.OS === 'web') {
      window.open(url, '_blank')
    } else {
      Linking.openURL(url)
    }
  }

  return (
    <Container header>
      <View style={styles.column}>
        <View style={{ alignItems: 'center' }}>
          <Text variant="displayLarge">RANDSUM</Text>
          <Text variant="headlineSmall">{randomDescription()}</Text>
        </View>
      </View>
      <View style={styles.column}>
        <IconButton icon="github" onPress={goToGithub} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

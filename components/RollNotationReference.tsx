import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

const notationReference = [
  {
    label: 'Drop Highest',
    notation: 'H',
    description: 'Drops the highest results from the pool.',
    example: '4d6H2',
    exampleDescription: 'Roll 4d6 and drop the highest two results.',
  },
  {
    label: 'Drop Lowest',
    notation: 'L',
    description: 'Drops the lowest results from the pool.',
    example: '4d6L3',
    exampleDescription: 'Roll 4d6 and drop the lowest three results.',
  },
  {
    label: 'Drop Specific',
    notation: 'D{N, <N, >N}',
    description:
      'Drops rolls greater than, less than, or equal to the values of N.',
    example: '4d6D{<2, >5, 3}',
    exampleDescription:
      'Roll 4d6 and drop any values lower than [2], greater than [5], or equal to [3].',
  },
  {
    label: 'Cap',
    notation: 'C{<N, >N}',
    description:
      'Reduce all values above or below a certain value to that value',
    example: '4d6C{<2, >5}',
    exampleDescription:
      'Roll 4d6 and cap any values lower than [2] to [2], and greater than [5] to [5].',
  },
  {
    label: 'Reroll',
    notation: 'R{N, <N, >N}F',
    description:
      'Reroll resuls equal to, less than, or greater than the values of N (a maximum of F times).',
    example: '4d6R{<2, >5, 3}2',
    exampleDescription:
      'Roll 4d6 and reroll and results less than [2], greater than [5], or equal to [3], up to [2] times.',
  },
  {
    label: 'Replace',
    notation: 'V{N=R}',
    description:
      'Replace rolls fitting the initial criteria with the second result',
    example: '4d6V{<2=6, >5=1}',
    exampleDescription:
      'Roll 4d6 and replace anything less than [2] with a [6], and anything greater than a [5] with a [1].',
  },
  {
    label: 'Unique',
    notation: 'U{N}',
    description:
      'Enforce uniqueness of individual die rolls. Optionally can ignore values of [N].',
    example: '4d6U{3}',
    exampleDescription:
      'Roll 4d6 and re-roll any duplicates (except for reuslts of [3])',
  },
  {
    label: 'Explode',
    notation: '!',
    description:
      'Roll an additional die whenever you roll the max value of one of these dice.',
    example: '4d6!',
    exampleDescription:
      'Roll 4d6 and Roll an additional die any time you roll a [6].',
  },
  {
    label: 'Plus',
    notation: '+',
    description: 'Adds a number to the end result',
    example: '4d6+2',
    exampleDescription: 'Roll 4d6 and add two to the overall total.',
  },
  {
    label: 'Minus',
    notation: '-',
    description: 'Subtracts a number from the end result',
    example: '4d6-2',
    exampleDescription: 'Roll 4d6 and subtract two from the overall total.',
  },
]

export default function RollNotationReference() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notationReference.map((item, index) => {
        return <Cell key={`reference-${item.label}-${index}`} {...item} />
      })}
    </ScrollView>
  )
}

type Props = {
  label: string
  description: string
  notation: string
  example: string
  exampleDescription: string
}

function Cell({ label, notation, example, exampleDescription }: Props) {
  const theme = useAppTheme()
  const cellStyle = StyleSheet.create({
    container: {
      padding: 5,
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 2,
      width: '100%',
    },
    outlined: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.primary,
      borderWidth: 0,
    },
    flat: {
      backgroundColor: theme.colors.primary,
    },
    text: {
      alignContent: 'flex-start',
      gap: 5,
    },
    bold: {
      fontWeight: 'bold',
    },
    italic: {
      fontStyle: 'italic',
    },
    outlinedText: {
      color: theme.colors.onBackground,
    },
    key: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.onPrimary,
    },
    flatText: {
      color: theme.colors.onPrimary,
    },
  })

  return (
    <View style={[cellStyle.container]}>
      <View style={[styles.row]}>
        <Text variant="labelLarge" style={[cellStyle.text, cellStyle.bold]}>
          {label}:{' '}
        </Text>
        <Text
          variant="labelLarge"
          style={[cellStyle.text, cellStyle.bold, cellStyle.key]}
        >
          {' '}
          {notation}{' '}
        </Text>
      </View>
      <View style={[styles.col]}>
        <Text variant="labelMedium" style={[cellStyle.text, cellStyle.italic]}>
          {exampleDescription}
        </Text>
        <Text
          variant="labelMedium"
          style={[cellStyle.text, cellStyle.italic, cellStyle.key]}
        >
          {example}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

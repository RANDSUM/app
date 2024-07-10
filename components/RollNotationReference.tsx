import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

const notationReference = [
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
    label: 'Drop Greater Than, Less Than, Equal to',
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
]

const groupSize = 2
const pasrseNotationReference = notationReference.reduce<
  (typeof notationReference)[]
>((acc, item, index) => {
  if (index % groupSize === 0) {
    acc.push([item])
  } else {
    acc[acc.length - 1].push(item)
  }
  return acc
}, [])

export default function RollNotationReference() {
  return (
    <View style={styles.container}>
      {pasrseNotationReference.map((group, index) => {
        return (
          <View key={`row-${index}`} style={styles.row}>
            {group.map((item, itemIndex) => {
              return (
                <Cell key={`reference-${item.label}-${itemIndex}`} {...item} />
              )
            })}
          </View>
        )
      })}
    </View>
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
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      padding: 5,
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
      height: '100%',
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
      <View style={[styles.row]}>
        <Text
          variant="labelSmall"
          style={[cellStyle.text, cellStyle.italic, cellStyle.key]}
        >
          {' '}
          {example}{' '}
        </Text>
        <Text variant="labelSmall" style={[cellStyle.text, cellStyle.italic]}>
          : {exampleDescription}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
})

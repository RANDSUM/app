import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

const notationReference = [
  {
    label: 'Plus',
    notation: '+',
    description: 'Adds a number to the end result',
    example: '4d6+2',
    exampleDescription: 'Roll 4d6 and add two.',
  },
  {
    label: 'Minus',
    notation: '-',
    description: 'Subtracts a number from the end result',
    example: '4d6-2',
    exampleDescription: 'Roll 4d6 and subtract two.',
  },
  {
    label: 'Drop Highest',
    notation: 'H',
    description: 'Drops the highest results from the pool.',
    example: '4d6H2',
    exampleDescription: 'Roll 4d6 and drop the highest two.',
  },
  {
    label: 'Drop Lowest',
    notation: 'L',
    description: 'Drops the lowest results from the pool.',
    example: '4d6L3',
    exampleDescription: 'Roll 4d6 and drop the lowest three.',
  },
  {
    label: 'Drop Greater Than, Less Than, Equal to',
    notation: 'D{N, <N, >N}',
    description:
      'Drops rolls greater than, less than, or equal to the values of N.',
    example: '4d6D{<2, >5, 3}',
    exampleDescription:
      'Roll 4d6 and drop any values lower than 2, greater than 5, or equal to 3.',
  },
  {
    label: 'Cap',
    notation: 'C<N | C>N',
    description:
      'Reduce all values above or below a certain value to that value',
    example: '4d6C<2C>5',
    exampleDescription:
      'Roll 4d6 and cap any values lower than 2 ot 2, and greater than 5 to 5.',
  },
  {
    label: 'Reroll',
    notation: 'R{N, <N, >N}F',
    description:
      'Reroll resuls equal to, less than, or greater than the values of N (a maximum of F times).',
    example: '4d6R{<2, >5, 3}2',
    exampleDescription:
      'Roll 4d6 and reroll and results less than 2, greater than 5, or equal to 3, up to 2 times.',
  },
  {
    label: 'Replace',
    notation: 'V{N=R}',
    description:
      'Replace rolls fitting the initial criteria with the second result',
    example: '4d6V{<2=6, >5=1}',
    exampleDescription:
      'Roll 4d6 and replace anything less than 2 with a 6, and anything greater than a 5 with a 1.',
  },
  {
    label: 'Unique',
    notation: 'U{N}',
    description:
      'Enforce uniqueness of individual die rolls. Optionally can ignore values of N.',
    example: '4d6U{3}',
    exampleDescription:
      'Roll 4d6 and make sure that each die gave a unique result (except for reuslts of 3)',
  },
  {
    label: 'Explode',
    notation: '!',
    description:
      'Roll an additional die whenever you roll the max value of one of these dice.',
    example: '4d6!',
    exampleDescription: 'Roll 4d6 and EXPLODE!',
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
        const isEven = index % 2 === 0
        return (
          <View key={`row-${index}`} style={styles.row}>
            {group.map((item, itemIndex) => {
              const isFirst = itemIndex === 0
              const outlined = isEven ? isFirst : !isFirst
              return (
                <Cell
                  key={`reference-${item.label}-${itemIndex}`}
                  mode={outlined ? 'outlined' : 'outlined'}
                  {...item}
                />
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

type Props = {
  mode: 'outlined' | 'flat'
  label: string
  description: string
  notation: string
  example: string
  exampleDescription: string
}

function Cell({ mode, label, notation, example, exampleDescription }: Props) {
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
      textAlign: 'center',
      alignContent: 'flex-start',
      height: '100%',
      width: '100%',
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
    flatText: {
      color: theme.colors.onPrimary,
    },
  })
  const containerStyle =
    mode === 'outlined' ? cellStyle.outlined : cellStyle.flat

  const textStyle =
    mode === 'outlined' ? cellStyle.outlinedText : cellStyle.flatText

  return (
    <View style={[cellStyle.container, containerStyle]}>
      <View style={[styles.row]}>
        <Text
          variant="labelLarge"
          style={[cellStyle.text, cellStyle.bold, textStyle]}
        >
          {label} - {notation}
        </Text>
      </View>
      <View style={[styles.row]}>
        <Text
          variant="labelSmall"
          style={[cellStyle.text, cellStyle.italic, textStyle]}
        >
          {example} - {exampleDescription}
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
    flexDirection: 'row',
    textAlign: 'center',
  },
})
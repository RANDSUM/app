import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

import useRollerContext from './RollerContext/useRollerContext'
import useAppTheme from '~theme/useAppTheme'

export default function DicePoolDisplay() {
  const {
    setCurrentDicePoolId,
    dicePools,
    currentDicePoolId,
    addDieToPool,
    removeDieFromPool,
  } = useRollerContext()
  const theme = useAppTheme()

  const dicePoolsList = Object.entries(dicePools)
  const displaySets = [[], [], [], [], [], []].map((set, index) => {
    return dicePoolsList[index] ? dicePoolsList[index] : set
  })

  return (
    <View style={styles.container}>
      <View style={styles.wrapRow}>
        {displaySets.map(([id, roll], index, arr) => {
          if (!id) {
            const isLast = index === arr.length - 1
            return (
              <Chip
                selected={id === currentDicePoolId}
                key={'empty-dice-pool-' + index}
                mode="outlined"
                icon={isLast ? 'plus' : undefined}
                showSelectedOverlay
                showSelectedCheck={false}
                onPress={addDieToPool}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isLast ? theme.colors.primary : undefined,
                  },
                ]}
                disabled={!isLast}
                textStyle={{
                  padding: 0,
                  textAlign: 'center',
                  color: isLast ? theme.colors.onPrimary : undefined,
                }}
              >
                {isLast ? 'Add' : ''}
              </Chip>
            )
          }

          const { sides, quantity, modifiers } = roll.options
          const showModifier = modifiers && Object.keys(modifiers).length > 0
          const display = `${quantity}D${sides}${showModifier ? '*' : ''}`

          return (
            <Chip
              selected={id === currentDicePoolId}
              key={id}
              closeIcon="close"
              onClose={
                Object.keys(dicePools).length > 1
                  ? () => removeDieFromPool(id)
                  : undefined
              }
              mode="outlined"
              showSelectedOverlay
              showSelectedCheck={false}
              style={styles.chip}
              textStyle={{ padding: 0, textAlign: 'center' }}
              onPress={() => setCurrentDicePoolId(id)}
            >
              {display}
            </Chip>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chip: {
    minWidth: 100,
    height: 34,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
})

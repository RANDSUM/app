import { Dispatch, SetStateAction, useState } from 'react'

import { RollOptions } from 'randsum'
import { StyleSheet, View } from 'react-native'

import DicePoolControls from './DicePoolControls'
import DicePoolDisplay from './DicePoolDisplay'
import RollButton from './RollButton'
import RollConfigButton from './RollConfigButton'
import RollInput from './RollInput'
import SaveButton from './SaveButton'
import { SetDicePools, SetRollConfig } from './types'
import { defaultRoll } from '~constants'
import { Roll } from '~types'

type Props = {
  savedRoll?: Roll
}
export default function Roller(props: Props) {
  const [currentRoll, setCurrentRoll] = useState<Roll>(
    props.savedRoll || defaultRoll
  )

  const dicePools = currentRoll.dicePools
  const [currentDicePoolId, setCurrentDicePoolId] = useState(
    Object.keys(dicePools)[0]
  )
  const setDicePools: SetDicePools = (arg) => {
    const newDicePools = arg instanceof Function ? arg(dicePools) : arg
    setCurrentRoll((roll) => ({
      ...roll,
      dicePools: newDicePools,
    }))
  }

  const rollConfig = currentRoll.config
  const setRollConfig: SetRollConfig = (arg) => {
    const newConfig = arg instanceof Function ? arg(rollConfig) : arg
    setCurrentRoll((roll) => ({
      ...roll,
      config: newConfig,
    }))
  }

  const currentDicePoolOptions = dicePools[currentDicePoolId]
  const setCurrentDicePoolOptions: Dispatch<SetStateAction<RollOptions>> = (
    arg
  ) => {
    setDicePools((pools) => ({
      ...pools,
      [currentDicePoolId]:
        arg instanceof Function ? arg(currentDicePoolOptions) : arg,
    }))
  }

  const isDirty =
    JSON.stringify(currentRoll) !==
    JSON.stringify(props.savedRoll ? props.savedRoll.dicePools : defaultRoll)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <RollConfigButton
            currentRoll={currentRoll}
            onChange={setRollConfig}
          />
          <SaveButton
            isSavedRoll={currentRoll.persisted}
            isDirty={isDirty}
            currentRoll={currentRoll}
          />
        </View>
        <RollInput
          currentDicePoolOptions={currentDicePoolOptions}
          setCurrentDicePoolOptions={setCurrentDicePoolOptions}
        />
        <View style={styles.row}>
          <RollButton currentRoll={currentRoll} />
        </View>
        <View style={styles.collection}>
          <DicePoolDisplay
            dicePools={dicePools}
            currentDicePoolId={currentDicePoolId}
            onPress={setCurrentDicePoolId}
          />
          <DicePoolControls
            setDicePools={setDicePools}
            currentDicePoolOptions={currentDicePoolOptions}
            dicePools={dicePools}
            currentDicePoolId={currentDicePoolId}
            setCurrentDicePoolId={setCurrentDicePoolId}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  dieIcon: {
    backgroundColor: 'red',
    alignContent: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  collection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})

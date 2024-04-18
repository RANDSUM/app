import AsyncStorage from '@react-native-async-storage/async-storage'

import { Roll } from '~types'

enum StorageKeys {
  savedRolls = 'savedRolls',
}

const key = (key: StorageKeys) => `@randsum:${key}`

async function getSavedRolls() {
  const rawTotals = await AsyncStorage.getItem(key(StorageKeys.savedRolls))
  return rawTotals ? JSON.parse(rawTotals) : []
}

async function setSavedRolls(savedRolls: Roll[]) {
  await AsyncStorage.setItem(
    key(StorageKeys.savedRolls),
    JSON.stringify(savedRolls)
  )
}

export default {
  getSavedRolls,
  setSavedRolls,
}

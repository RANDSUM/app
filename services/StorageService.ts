import AsyncStorage from '@react-native-async-storage/async-storage'

import { Roll } from '~types'

enum StorageKeys {
  savedRolls = 'savedRolls',
}

async function getSavedRolls() {
  const rawTotals = await AsyncStorage.getItem(StorageKeys.savedRolls)
  return rawTotals ? JSON.parse(rawTotals) : []
}

async function setSavedRolls(savedRolls: Roll[]) {
  await AsyncStorage.setItem(StorageKeys.savedRolls, JSON.stringify(savedRolls))
}

export default {
  getSavedRolls,
  setSavedRolls,
}

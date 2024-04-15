import AsyncStorage from '@react-native-async-storage/async-storage'

import { SavedRoll } from '~types'

enum StorageKeys {
  savedRolls = 'savedRolls',
}

async function getSavedRolls() {
  const rawTotals = await AsyncStorage.getItem(StorageKeys.savedRolls)
  return rawTotals ? JSON.parse(rawTotals) : []
}

async function setSavedRolls(savedRolls: SavedRoll[]) {
  await AsyncStorage.setItem(StorageKeys.savedRolls, JSON.stringify(savedRolls))
}

export default {
  getSavedRolls,
  setSavedRolls,
}

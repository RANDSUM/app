import { PropsWithChildren, useEffect, useState } from 'react'

import { Snackbar, SnackbarProps } from 'react-native-paper'

import AppStateContext from './AppContext'
import initialState from './initialState'
import StorageService from '~services/StorageService'

type SnackbarConfig = Pick<SnackbarProps, 'duration' | 'children'>

export default function AppProvider({ children }: PropsWithChildren) {
  const [savedRolls, setSavedRolls] = useState(initialState.savedRolls)
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig>({
    children: undefined,
    duration: 3_000,
  })

  const removeSavedRoll = (uuid: string) => {
    setSavedRolls((rolls) => rolls.filter((r) => r.uuid !== uuid))
  }

  const setSnackbarText = (text: string | undefined) =>
    setSnackbarConfig((c) => ({ ...c, children: text }))

  const [hydrated, setHydrated] = useState(initialState.hydrated)

  useEffect(() => {
    const hydrateData = async () => {
      try {
        const rolls = await StorageService.getSavedRolls()
        setSavedRolls(rolls)
      } catch (error) {
        console.error('Error hydrating data:', error)
      } finally {
        setHydrated(true)
      }
    }
    hydrateData()
  }, [])

  useEffect(() => {
    if (hydrated) {
      StorageService.setSavedRolls(savedRolls)
    }
  }, [JSON.stringify(savedRolls)])

  return (
    <AppStateContext.Provider
      value={{
        savedRolls,
        setSavedRolls,
        hydrated,
        setSnackbarText,
        removeSavedRoll,
      }}
    >
      {children}
      <Snackbar
        visible={!!snackbarConfig.children}
        duration={snackbarConfig.duration}
        onDismiss={() => setSnackbarText('')}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarText(''),
        }}
      >
        {snackbarConfig.children}
      </Snackbar>
    </AppStateContext.Provider>
  )
}
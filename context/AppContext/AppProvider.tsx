import { PropsWithChildren, useEffect, useState } from 'react'

import { Snackbar } from 'react-native-paper'

import AppStateContext from './AppContext'
import StorageService from '~services/StorageService'
import { Roll, SnackbarConfig } from '~types'

export default function AppProvider({ children }: PropsWithChildren) {
  const [savedRolls, setSavedRolls] = useState<Roll[]>([])
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig>({
    children: undefined,
    duration: 3_000,
  })

  const removeSavedRoll = (uuid: string) => {
    setSavedRolls((rolls) => rolls.filter((r) => r.uuid !== uuid))
  }

  const setSnackbarText = (text: string | undefined) =>
    setSnackbarConfig((c) => ({ ...c, children: text }))

  const [hydrated, setHydrated] = useState(false)

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
        setSnackbarConfig,
        removeSavedRoll,
      }}
    >
      {children}
      <Snackbar
        visible={!!snackbarConfig.children}
        duration={snackbarConfig.duration}
        onDismiss={() => setSnackbarText('')}
        action={snackbarConfig.action}
      >
        {snackbarConfig.children}
      </Snackbar>
    </AppStateContext.Provider>
  )
}
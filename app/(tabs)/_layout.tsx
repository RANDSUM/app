import { Stack, Tabs } from 'expo-router'
import { Icon } from 'react-native-paper'

import useAppContext from '~context/AppContext/useAppContext'
import useAppTheme from '~theme/useAppTheme'

export default function TabsLayout() {
  const theme = useAppTheme()
  const { savedRolls } = useAppContext()

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarStyle: {
            display: savedRolls.length === 0 ? 'none' : 'flex',
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.secondary,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: 'Roll',
            tabBarIcon: ({ color, size }) => (
              <Icon source="dice-6-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="myRolls"
          options={{
            title: 'My Rolls',
            headerTitle: 'My Saved Rolls',
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTitleStyle: { color: theme.colors.onPrimary },
            tabBarIcon: ({ color, size }) => (
              <Icon source="dice-multiple-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

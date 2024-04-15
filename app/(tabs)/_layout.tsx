import { Tabs } from 'expo-router'
import { Icon } from 'react-native-paper'

import useAppTheme from '~theme/useAppTheme'

export default function TabsLayout() {
  const theme = useAppTheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
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
          headerShown: false,
          title: 'My Rolls',
          tabBarIcon: ({ color, size }) => (
            <Icon source="dice-multiple-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

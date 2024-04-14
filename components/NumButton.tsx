import { Platform } from 'react-native'
import { Button } from 'react-native-paper'

type ButtonProps = {
  onPress: () => void
  label: string
  disabled?: boolean
}

export default function NumButton({ onPress, label, disabled }: ButtonProps) {
  return (
    <Button
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      labelStyle={{
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: Platform.select({ android: 55 }),
        height: Platform.select({ web: 35 }),
        fontSize: 50,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      {label}
    </Button>
  )
}

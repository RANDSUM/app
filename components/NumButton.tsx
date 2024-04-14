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
        height: 30,
        width: 120,
        fontSize: 50,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      {label}
    </Button>
  )
}

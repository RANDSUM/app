import { Platform, StyleProp, TextStyle } from 'react-native'
import { Button } from 'react-native-paper'

type ButtonProps = {
  onPress: () => void
  label: string
  disabled?: boolean
  labelStyle?: StyleProp<TextStyle>
}

export default function NumButton({
  onPress,
  label,
  disabled,
  labelStyle,
}: ButtonProps) {
  return (
    <Button
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      labelStyle={[
        {
          width: 120,
          justifyContent: 'center',
          alignItems: 'center',
          lineHeight: 55,
          height: Platform.select({ web: 35, ios: 55, android: 55 }),
          fontSize: 50,
        },
        labelStyle,
      ]}
      mode="contained"
      disabled={disabled}
      onPress={onPress}
    >
      {label}
    </Button>
  )
}

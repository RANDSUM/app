import * as Haptic from 'expo-haptics'
import { Platform } from 'react-native'

const notifyVibrate = () => {
  if (Platform.OS !== 'web') {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium)
  }
}

export default { notifyVibrate }

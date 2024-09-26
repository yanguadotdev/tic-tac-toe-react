import { useState } from 'react'
import { getItemFromStorage, saveInStorage } from '../storage'

export function useSound () {
  const [sound, toggleSound] = useState(getItemFromStorage({
    key: 'sound',
    fallback: false
  }))

  // Function to sounds reproductor
  const playSound = (src) => {
    const audio = new window.Audio(src)
    audio.oncanplaythrough = () => {
      sound && audio.play()
    }
  }

  const updateSound = () => {
    saveInStorage({ data: { sound: !sound } })
    toggleSound(!sound)
  }

  return { sound, updateSound, playSound }
}

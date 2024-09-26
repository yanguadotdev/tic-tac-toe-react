import { useState } from 'react'
import { getItemFromStorage, saveInStorage } from '../storage'

export function useSound () {
  const [sound, toggleSound] = useState(getItemFromStorage({
    key: 'sound',
    fallback: false
  }))

  const updateSound = () => {
    saveInStorage({ data: { sound: !sound } })
    toggleSound(!sound)
  }

  return { sound, updateSound }
}

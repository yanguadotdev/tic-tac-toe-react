import { createContext } from 'react'
import { useSound } from '../hooks/useSound'

export const SoundContext = createContext()

export function SoundProvider ({ children }) {
  const soundContextValue = useSound()

  return (
    <SoundContext.Provider value={soundContextValue}>
      {children}
    </SoundContext.Provider>
  )
}

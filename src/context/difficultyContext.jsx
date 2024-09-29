import { useState, createContext } from 'react'
import { DIFFICULTY } from '../constants'

export const DifficultyContext = createContext()

export function DifficultyProvider ({ children }) {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY)

  return (
    <DifficultyContext.Provider value={{
      difficulty,
      setDifficulty
    }}
    >
      {children}
    </DifficultyContext.Provider>
  )
}

import { useState } from 'react'
import { TURNS } from '../constants'
import { getItemFromStorage } from '../storage'

export function useGameState () {
  const [history, setHistory] = useState(() =>
    getItemFromStorage({
      key: 'history',
      fallback: [Array(9).fill(null)]
    })
  )
  const [currentMove, setCurrentMove] = useState(() => {
    const value = window.localStorage.getItem('move')
    return value ? Number(value) : 0
  })
  const [winner, setWinner] = useState(null)
  const xIsNext = currentMove % 2 === 0
  const turn = xIsNext ? TURNS.X : TURNS.O
  const currentBoard = history[currentMove]

  return {
    history,
    setHistory,
    currentMove,
    setCurrentMove,
    winner,
    setWinner,
    turn,
    currentBoard
  }
}

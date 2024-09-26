import { useState } from 'react'
import { getItemFromStorage } from '../storage'

export function useHistory () {
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

  return {
    history,
    setHistory,
    currentMove,
    setCurrentMove
  }
}

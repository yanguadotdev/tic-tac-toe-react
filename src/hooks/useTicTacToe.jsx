import { useState } from 'react'
import confetti from 'canvas-confetti'

import { TURNS } from '../constants.js'
import { saveGameToStorage, resetGameStorage, getItemFromStorage } from '../storage/index.js'
import { checkWinnerFrom, checkEndGame } from '../logic/board.js'

export function useTicTacToe () {
  const [board, setBoard] = useState(() => getItemFromStorage({
    key: 'board',
    fallback: Array(9).fill(null)
  }))

  const [turn, setTurn] = useState(() => {
    const value = window.localStorage.getItem('turn')
    return value || TURNS.X
  }
  )

  const [winner, setWinner] = useState(null)

  const startAgain = () => {
    setBoard(Array(9).fill(null))

    setTurn(TURNS.X)
    setWinner(null)

    // Limpiamos storage
    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardamos partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // verificamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return { board, updateBoard, startAgain, turn, winner }
}

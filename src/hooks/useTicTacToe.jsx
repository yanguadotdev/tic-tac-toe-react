import { useState } from 'react'
import confetti from 'canvas-confetti'

import { TURNS } from '../constants.js'
import { saveGameToStorage, resetGameStorage, getItemFromStorage } from '../storage/index.js'
import { checkWinnerFrom, checkEndGame } from '../logic/board.js'
import audioPop from '../assets/pop.mp3'
import audioWinner from '../assets/winner.wav'

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

  // Estado para controlar el audio
  const [sound, toggleSound] = useState(false)

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

    const newWinner = checkWinnerFrom(newBoard)

    const audio = new window.Audio(audioPop)
    audio.oncanplaythrough = () => {
      sound && !newWinner && audio.play()
    }

    const playSound = () => {
      const audio = new window.Audio(audioWinner)
      audio.oncanplaythrough = () => {
        sound && audio.play()
      }
    }

    // verificamos si hay ganador
    if (newWinner) {
      playSound()
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      playSound()
      setWinner(false)
    }
  }

  return { board, updateBoard, startAgain, turn, winner, sound, toggleSound }
}

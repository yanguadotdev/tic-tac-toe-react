import { useState } from 'react'
import confetti from 'canvas-confetti'

import { TURNS } from '../constants.js'
import { saveInStorage, resetGameStorage, getItemFromStorage, clearHistoryGame } from '../storage/index.js'
import { checkWinnerFrom, checkEndGame } from '../logic/board.js'
import audioPop from '../assets/pop.mp3'
import audioWinner from '../assets/winner.wav'
import { useSound } from './useSound.jsx'

export function useTicTacToe () {
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

  const xIsNext = currentMove % 2 === 0
  const turn = xIsNext ? TURNS.X : TURNS.O
  const currentBoard = history[currentMove]
  const [winner, setWinner] = useState(null)
  const { sound, updateSound } = useSound()

  const startAgain = () => {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setWinner(null)
    // Limpiar storage
    resetGameStorage()
    clearHistoryGame({ keys: ['history', 'move'] })
  }

  // Función para reproducir audio
  const playAudio = (src) => {
    const audio = new window.Audio(src)
    audio.oncanplaythrough = () => {
      sound && audio.play()
    }
  }

  const jumpTo = ({ to }) => {
    const nextMove = to === 'next' ? currentMove + 1 : currentMove - 1
    if (nextMove < 0 || nextMove === history.length) return
    setCurrentMove(nextMove)
  }

  const updateBoard = (index) => {
    if (currentBoard[index] || winner) return

    const newBoard = [...currentBoard]
    newBoard[index] = turn

    // Guardar historial
    const nextHistory = [...history.slice(0, currentMove + 1), newBoard]
    setHistory(nextHistory)
    const nextMove = nextHistory.length - 1
    setCurrentMove(nextMove)

    // Guardamos partida
    saveInStorage({
      data: {
        move: nextMove,
        history: nextHistory
      }
    })

    const newWinner = checkWinnerFrom(newBoard)

    !newWinner && playAudio(audioPop)

    // verificamos si hay ganador
    if (newWinner) {
      playAudio(audioWinner)
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      playAudio(audioWinner)
      setWinner(false)
    }
  }

  return { board: currentBoard, updateBoard, startAgain, turn, winner, sound, updateSound, jumpTo }
}

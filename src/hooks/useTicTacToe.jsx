import { useState } from 'react'
import confetti from 'canvas-confetti'

import { saveInStorage, resetGameStorage, clearHistoryGame } from '../storage/index.js'
import { checkWinnerFrom, checkEndGame } from '../logic/board.js'
import audioPop from '../assets/pop.mp3'
import audioWinner from '../assets/winner.wav'
import { useSound } from './useSound.jsx'
import { useHistory } from './useHistory.jsx'
import { getGameState } from '../utils.js'

export function useTicTacToe () {
  const {
    history,
    setHistory,
    currentMove,
    setCurrentMove
  } = useHistory()

  const { turn, currentBoard } = getGameState(currentMove, history)
  const [winner, setWinner] = useState(null)
  const { sound, updateSound, playSound } = useSound()

  const startAgain = () => {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setWinner(null)
    // Limpiar storage
    resetGameStorage()
    clearHistoryGame({ keys: ['history', 'move'] })
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

    !newWinner && playSound(audioPop)

    // verificamos si hay ganador
    if (newWinner) {
      playSound(audioWinner)
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      playSound(audioWinner)
      setWinner(false)
    }
  }

  return {
    board: currentBoard,
    updateBoard,
    startAgain,
    turn,
    winner,
    sound,
    updateSound,
    jumpTo,
    currentMove,
    history
  }
}

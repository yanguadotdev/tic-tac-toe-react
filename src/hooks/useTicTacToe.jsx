import { useState } from 'react'
import confetti from 'canvas-confetti'

import { saveInStorage, resetGameStorage, clearHistoryGame } from '../storage/index.js'
import { checkWinnerFrom, checkEndGame } from '../logic/board.js'
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
  const {
    sound, updateSound, playSound,
    popSound, winnerSound, clickSound
  } = useSound()

  const startAgain = () => {
    playSound(clickSound)
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
    playSound(clickSound)
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

    !newWinner && playSound(popSound)

    // verificamos si hay ganador
    if (newWinner) {
      playSound(winnerSound)
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      playSound(winnerSound)
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

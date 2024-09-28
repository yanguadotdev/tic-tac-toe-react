import confetti from 'canvas-confetti'
import { useContext } from 'react'

import { saveInStorage, resetGameStorage, clearHistoryGame } from '../storage/index.js'
import { checkWinnerFrom, checkEndGame } from '../logic/board.js'
import { useGameState } from './useGameState.jsx'
import { SoundContext } from '../context/soundContext.jsx'

export function useTicTacToe () {
  const {
    history, setHistory,
    currentMove, setCurrentMove,
    turn, currentBoard,
    winner, setWinner
  } = useGameState()

  const {
    playSound,
    popSound, winnerSound, clickSound
  } = useContext(SoundContext)

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
    jumpTo,
    currentMove,
    history
  }
}

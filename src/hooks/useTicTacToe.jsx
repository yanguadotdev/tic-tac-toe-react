import confetti from 'canvas-confetti'
import { useContext, useEffect, useCallback } from 'react'

import { resetGameStorage } from '../storage/index.js'
import { checkWinnerFrom, checkEndGame } from '../logic/board.js'
import { useGameState } from './useGameState.jsx'
import { SoundContext } from '../context/soundContext.jsx'
import { TURNS } from '../constants.js'
import { getBestMove } from '../logic/minimax.js'
import { DifficultyContext } from '../context/difficultyContext.jsx'

export function useTicTacToe ({ isSinglePlayer }) {
  const {
    gameOver, setGameOver,
    history, setHistory,
    currentMove, setCurrentMove,
    turn, currentBoard,
    winner, setWinner
  } = useGameState()

  const {
    playSound,
    popSound, winnerSound, clickSound
  } = useContext(SoundContext)

  const { difficulty } = useContext(DifficultyContext)

  const startAgain = useCallback(() => {
    playSound(clickSound)
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setWinner(null)
    // Limpiar storage
    resetGameStorage()
    // clearHistoryGame({ keys: ['history', 'move'] })
  }
  , [])

  const jumpTo = ({ to }) => {
    const step = isSinglePlayer ? 2 : 1
    const nextMove = to === 'next' ? currentMove + step : currentMove - step
    if (nextMove < 0 || nextMove === history.length) return
    playSound(clickSound)
    setCurrentMove(nextMove)
  }

  const updateBoard = (index) => {
    if (currentBoard[index] || winner) return

    const newBoard = [...currentBoard]
    newBoard[index] = turn

    // Update history
    const nextHistory = [...history.slice(0, currentMove + 1), newBoard]
    setHistory(nextHistory)
    const nextMove = nextHistory.length - 1
    setCurrentMove(nextMove)

    // * Commented out localStorage saving to improve UX.
    // * 👇 Persisting game state after refresh was deemed confusing for players.
    // saveInStorage({
    //   data: {
    //     move: nextMove,
    //     history: nextHistory
    //   }
    // })

    const newWinner = checkWinnerFrom(newBoard)
    const isGameOver = checkEndGame(newBoard)
    setGameOver(isGameOver)

    !isGameOver && playSound(popSound)
    // verificamos si hay ganador
    if (newWinner) {
      playSound(winnerSound)
      confetti()
      setWinner(newWinner)
    } else if (isGameOver) {
      playSound(winnerSound)
      setWinner(false)
    }
  }

  useEffect(() => {
    let timeout
    if (isSinglePlayer && turn === TURNS.O && !winner && !gameOver) {
      const index = getBestMove(currentBoard, TURNS.O, TURNS.X, difficulty)
      timeout = setTimeout(() => {
        updateBoard(index)
      }, 800)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [turn])

  return {
    board: currentBoard,
    updateBoard,
    startAgain,
    turn,
    winner,
    setWinner,
    jumpTo,
    currentMove,
    history
  }
}

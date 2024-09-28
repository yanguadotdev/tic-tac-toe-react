import confetti from 'canvas-confetti'
import { useContext, useEffect } from 'react'

import { saveInStorage, resetGameStorage, clearHistoryGame } from '../storage/index.js'
import { checkWinnerFrom, checkEndGame } from '../logic/board.js'
import { useGameState } from './useGameState.jsx'
import { SoundContext } from '../context/soundContext.jsx'
import { TURNS } from '../constants.js'
import { getBestMove } from '../logic/minmax.js'

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
    const isGameOver = checkEndGame(newBoard)
    setGameOver(isGameOver)

    !gameOver && playSound(popSound)
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
    if (isSinglePlayer && turn === TURNS.O && !winner && !gameOver) {
      const index = getBestMove(currentBoard, TURNS.O, TURNS.X)
      setTimeout(() => {
        updateBoard(index)
      }, 1000)
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

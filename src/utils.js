import { TURNS } from './constants'

export function getGameState (currentMove, history) {
  const xIsNext = currentMove % 2 === 0
  const turn = xIsNext ? TURNS.X : TURNS.O
  const currentBoard = history[currentMove]

  return {
    turn,
    currentBoard
  }
}

import { DIFFICULTY } from '../constants'
import { checkEndGame, checkWinnerFrom, getAvailableMoves } from './board'

/**
 * @returns {number} - The index of the best play for IA
 */
export function getBestMove (board, aiPlayer, humanPlayer, difficulty) {
  const checkWinner = (board) => {
    const winner = checkWinnerFrom(board)
    if (winner) return winner
    return checkEndGame(board) ? 'draw' : null
  }

  /**
   * @param {boolean} isMaximizing - Indicates if it is the turn of IA or Human player
   * @param {number} depth - Current depth of the recursion
   * @returns {number} - The score of the best play
   */
  const minimax = (board, isMaximizing, depth = 0) => {
    const winner = checkWinner(board)

    // Base case: exists winner or draw
    if (winner === aiPlayer) return 10 - depth // prefer quicker wins
    if (winner === humanPlayer) return depth - 10 // prefer longer losses
    if (winner === 'draw') return 0 // exists draw

    const availableMoves = getAvailableMoves(board)

    if (isMaximizing) {
      let bestScore = -Infinity
      for (const move of availableMoves) {
        board[move] = aiPlayer // Make the play
        const score = minimax(board, false, depth + 1) // Recursive to minimize
        board[move] = null // Undo the play
        bestScore = Math.max(score, bestScore) // Search the max score
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (const move of availableMoves) {
        board[move] = humanPlayer
        const score = minimax(board, true, depth + 1)
        board[move] = null
        bestScore = Math.min(score, bestScore)
      }
      return bestScore
    }
  }

  /**
   * Determine the best play for the IA
   * @returns {number} - Index of the best play
   */
  const bestMove = () => {
    let bestScore = -Infinity
    let move = -1
    const availableMoves = getAvailableMoves(board)

    for (const currentMove of availableMoves) {
      board[currentMove] = aiPlayer // Make the play

      // Based on difficulty, limit depth or skip Minimax
      let score
      if (difficulty === DIFFICULTY.EASY) {
        score = Math.random() // Random moves in easy mode
      } else if (difficulty === DIFFICULTY.NORMAL) {
        score = minimax(board, false, 0) // Use minimax with normal depth
      } else { // 'hard'
        score = minimax(board, false) // Full minimax in hard mode
      }

      board[currentMove] = null // Undo the play

      if (score > bestScore) {
        bestScore = score
        move = currentMove
      }
    }

    return move
  }

  return bestMove()
}

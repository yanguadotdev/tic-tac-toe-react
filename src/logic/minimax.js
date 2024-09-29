import { checkEndGame, checkWinnerFrom, getAvailableMoves } from './board'

/**
 * @returns {number} - The index of the best play for IA
 */
export function getBestMove (board, aiPlayer, humanPlayer) {
  const checkWinner = (board) => {
    const winner = checkWinnerFrom(board)
    if (winner) return winner
    return checkEndGame(board) ? 'draw' : null
  }

  /**
   * @param {boolean} isMaximizing - Indicates if it is the turn of IA o Human player
   * @returns {number} - The score of the best play
   */
  const minimax = (board, isMaximizing) => {
    const winner = checkWinner(board)

    // Base case: exists winner or draw
    if (winner === aiPlayer) return 10
    if (winner === humanPlayer) return -10
    if (winner === 'draw') return 0 // exists draw

    const availableMoves = getAvailableMoves(board)

    if (isMaximizing) {
      let bestScore = -Infinity
      for (const move of availableMoves) {
        board[move] = aiPlayer // Make the play
        const score = minimax(board, false) // Recursive to minimize
        board[move] = null // Undo the play
        bestScore = Math.max(score, bestScore) // Search the max score
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (const move of availableMoves) {
        board[move] = humanPlayer
        const score = minimax(board, true)
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
      const score = minimax(board, false) // Evaluate the play
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

// src/logic/ai.js

import { WINNER_COMBOS } from '../constants'

/**
 * Determina la mejor jugada para la IA usando el algoritmo Minimax.
 * @param {Array} board - El estado actual del tablero (array de 9 elementos).
 * @param {string} aiPlayer - El símbolo de la IA ('X' o 'O').
 * @param {string} humanPlayer - El símbolo del jugador humano ('X' o 'O').
 * @returns {number} - El índice de la mejor jugada para la IA.
 */
export function getBestMove (board, aiPlayer, humanPlayer) {
  /**
   * Obtiene las jugadas disponibles en el tablero.
   * @param {Array} board - El estado actual del tablero.
   * @returns {Array} - Array de índices disponibles.
   */
  const getAvailableMoves = (board) => {
    return board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null)
  }

  /**
   * Comprueba si hay un ganador o un empate.
   * @param {Array} board - El estado actual del tablero.
   * @returns {string|null} - 'X', 'O', 'draw' o null.
   */
  const checkWinner = (board) => {
    for (const combination of WINNER_COMBOS) {
      const [a, b, c] = combination
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a] // Retorna el ganador ('X' o 'O')
      }
    }
    return board.includes(null) ? null : 'draw' // Retorna 'draw' si no hay ganador y el tablero está lleno
  }

  /**
   * El algoritmo Minimax.
   * @param {Array} board - El estado actual del tablero.
   * @param {boolean} isMaximizing - Indica si es el turno de la IA (maximizar) o del humano (minimizar).
   * @returns {number} - El puntaje de la mejor jugada.
   */
  const minimax = (board, isMaximizing) => {
    const winner = checkWinner(board)

    // Caso base: si hay un ganador o empate
    if (winner === aiPlayer) return 10
    if (winner === humanPlayer) return -10
    if (winner === 'draw') return 0

    const availableMoves = getAvailableMoves(board)

    if (isMaximizing) {
      let bestScore = -Infinity
      for (const move of availableMoves) {
        board[move] = aiPlayer // Realizar la jugada
        const score = minimax(board, false) // Recurre para minimizar
        board[move] = null // Deshacer la jugada
        bestScore = Math.max(score, bestScore) // Buscar el puntaje máximo
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (const move of availableMoves) {
        board[move] = humanPlayer // Realizar la jugada
        const score = minimax(board, true) // Recurre para maximizar
        board[move] = null // Deshacer la jugada
        bestScore = Math.min(score, bestScore) // Buscar el puntaje mínimo
      }
      return bestScore
    }
  }

  /**
   * Determina la mejor jugada para la IA.
   * @returns {number} - El índice de la mejor jugada.
   */
  const bestMove = () => {
    let bestScore = -Infinity
    let move = -1
    const availableMoves = getAvailableMoves(board)

    for (const currentMove of availableMoves) {
      board[currentMove] = aiPlayer // Realizar la jugada
      const score = minimax(board, false) // Evaluar la jugada
      board[currentMove] = null // Deshacer la jugada

      if (score > bestScore) {
        bestScore = score
        move = currentMove
      }
    }

    return move
  }

  return bestMove()
}

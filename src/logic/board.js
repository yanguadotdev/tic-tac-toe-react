import { WINNER_COMBOS } from '../constants.js'

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const mark = boardToCheck[combo[0]]
    if (combo.every(i => boardToCheck[i] && boardToCheck[i] === mark)) {
      return mark
    }
  }
  return false
}

export const checkEndGame = (boardToCheck) => {
  return !boardToCheck.includes(null)
}

export const getAvailableMoves = (boardToCheck) => {
  return boardToCheck
    .map((cell, index) => cell === null ? index : null)
    .filter(cell => cell !== null)
}

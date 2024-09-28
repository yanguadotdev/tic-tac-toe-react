import { WINNER_COMBOS } from '../constants.js'

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const mark = boardToCheck[combo[0]]
    if (combo.every(i => boardToCheck[i] === mark)) {
      return mark
    }
  }
  return false
}

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every(cell => cell != null)
}

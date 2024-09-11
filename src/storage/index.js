export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const saveScoreToStorage = ({ score }) => {
  window.localStorage.setItem('score', JSON.stringify(score))
}

export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}

export const clearScoreFromStorage = () => {
  window.localStorage.removeItem('score')
}

export function getItemFromStorage ({ key, fallback }) {
  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : fallback
}

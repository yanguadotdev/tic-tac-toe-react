export const saveGameToStorage = ({ data }) => {
  Object.keys(data).forEach(key => {
    window.localStorage.setItem(key, JSON.stringify(data[key]))
  })
}

export const saveScoreToStorage = ({ score }) => {
  window.localStorage.setItem('score', JSON.stringify(score))
}

export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}

export const clearHistoryGame = ({ keys }) => {
  keys.forEach(key => {
    window.localStorage.removeItem(key)
  })
}

export const clearScoreFromStorage = () => {
  window.localStorage.removeItem('score')
}

export function getItemFromStorage ({ key, fallback }) {
  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : fallback
}

export const TURNS = {
  X: 'x',
  O: 'o'
}

export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [6, 4, 2]
]

export const SCREEN = {
  GAME_MODE_SELETOR: 'Game Mode Selector',
  GAME: 'Game'
}

export const GAME_MODE = {
  SINGLE: 'single',
  MULTIPLAYER: 'multiplayer'
}

export const DIFFICULTY = {
  EASY: 'Easy',
  NORMAL: 'Normal',
  HARD: 'Hard'
}

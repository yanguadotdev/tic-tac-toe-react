import { useState } from 'react'

import { GAME_MODE } from './constants.js'
import TicTacToeGame from './components/TicTacToeGame.jsx'
import GameModeSelector from './components/GameModeSelector.jsx'
import { DifficultyProvider } from './context/difficultyContext.jsx'

function App () {
  const [gameMode, setGameMode] = useState('')

  return (
    <DifficultyProvider>
      {!gameMode
        ? <GameModeSelector onSelectMode={setGameMode} />
        : <TicTacToeGame
            setGameMode={setGameMode}
            isSinglePlayer={gameMode === GAME_MODE.SINGLE}
          />}
    </DifficultyProvider>
  )
}

export default App

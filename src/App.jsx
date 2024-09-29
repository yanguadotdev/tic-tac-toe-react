import { useState } from 'react'

import { GAME_MODE } from './constants.js'
import TicTacToeGame from './components/TicTacToeGame.jsx'
import GameModeSelector from './components/GameModeSelector.jsx'

function App () {
  const [gameMode, setGameMode] = useState('')

  return (
    <>
      {!gameMode
        ? <GameModeSelector onSelectMode={setGameMode} />
        : <TicTacToeGame
            setGameMode={setGameMode}
            isSinglePlayer={gameMode === GAME_MODE.SINGLE}
          />}
    </>
  )
}

export default App

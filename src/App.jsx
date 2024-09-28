import { WinnerModal } from './components/WinnerModal.jsx'
import { Turn } from './components/Turn.jsx'
import { Board } from './components/Board.jsx'
import { useTicTacToe } from './hooks/useTicTacToe.jsx'
import { Score } from './components/Score.jsx'
import { useScore } from './hooks/useScore.jsx'
import { Footer } from './components/Footer.jsx'
import { HistoryControls } from './components/HistoryControls.jsx'
import styles from './styles/shadow.module.css'
import utils from './styles/utilities.module.css'

function App () {
  const {
    board, updateBoard,
    startAgain,
    turn, winner,
    sound, updateSound,
    jumpTo,
    currentMove,
    history
  } = useTicTacToe()
  const { oWins, xWins, draws } = useScore({ winner })

  const resetGame = () => {
    startAgain()
  }

  return (
    <main
      className={`Game ${styles.Shadow_inset} ${utils.flex_col}`}
    >
      <h1 className={utils.text_lg}>Tic Tac Toe</h1>
      <Score oWins={oWins} xWins={xWins} draws={draws} />
      <HistoryControls
        history={history}
        currentMove={currentMove}
        jumpTo={jumpTo}
      />
      <Board
        board={board}
        updateBoard={updateBoard}
      />
      <Turn turn={turn} />
      <Footer
        resetGame={resetGame}
        sound={sound}
        toggleSound={updateSound}
      />

      <WinnerModal winner={winner} startAgain={startAgain} />
    </main>
  )
}

export default App

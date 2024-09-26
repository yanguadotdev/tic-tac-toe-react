import { WinnerModal } from './components/WinnerModal.jsx'
import { Turn } from './components/Turn.jsx'
import { Board } from './components/Board.jsx'
import { useTicTacToe } from './hooks/useTicTacToe.jsx'
import { Score } from './components/Score.jsx'
import { useScore } from './hooks/useScore.jsx'
import { Footer } from './components/Footer.jsx'
import { HistoryControls } from './components/HistoryControls.jsx'

function App () {
  const { board, updateBoard, startAgain, turn, winner, sound, updateSound, jumpTo } = useTicTacToe()
  const { oWins, xWins, draws, resetScore } = useScore({ winner })

  const resetGame = () => {
    startAgain()
    resetScore()
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <Score oWins={oWins} xWins={xWins} draws={draws} />
      <HistoryControls jumpTo={jumpTo} />
      <Board board={board} updateBoard={updateBoard} />
      <Turn turn={turn} />
      <Footer resetGame={resetGame} sound={sound} toggleSound={updateSound} />

      <WinnerModal winner={winner} startAgain={startAgain} />
    </main>
  )
}

export default App

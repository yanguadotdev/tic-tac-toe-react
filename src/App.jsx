import { WinnerModal } from './components/WinnerModal.jsx'
import { Turn } from './components/Turn.jsx'
import { Board } from './components/Board.jsx'
import { useTicTacToe } from './hooks/useTicTacToe.jsx'
import { Score } from './components/Score.jsx'
import { useScore } from './hooks/useScore.jsx'
import { Footer } from './components/Footer.jsx'

function App () {
  const { board, updateBoard, resetGame, turn, winner } = useTicTacToe()
  const { oWins, xWins, draws, setOWins, setXWins, setDraws } = useScore({ winner })

  const resetAllGame = () => {
    resetGame()
    setOWins(0)
    setXWins(0)
    setDraws(0)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <Score oWins={oWins} xWins={xWins} draws={draws} />
      <Board board={board} updateBoard={updateBoard} />
      <Turn turn={turn} />
      <Footer reset={resetAllGame} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App

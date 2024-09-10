import { WinnerModal } from './components/WinnerModal.jsx'
import { Turn } from './components/Turn.jsx'
import { Board } from './components/Board.jsx'
import { useTicTacToe } from './hooks/useTicTacToe.jsx'

function App () {
  const { board, updateBoard, resetGame, turn, winner } = useTicTacToe()

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <Board board={board} updateBoard={updateBoard} />
      <Turn turn={turn} />
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App

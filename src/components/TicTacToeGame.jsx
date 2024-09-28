import { useScore } from '../hooks/useScore'
import { useTicTacToe } from '../hooks/useTicTacToe'
import styles from '../styles/shadow.module.css'
import utils from '../styles/utilities.module.css'
import { Board } from './Board'
import { Footer } from './Footer'
import { HistoryControls } from './HistoryControls'
import { Score } from './Score'
import { Turn } from './Turn'
import { WinnerModal } from './WinnerModal'

export default function TicTacToeGame ({ isSinglePlayer }) {
  const {
    board, updateBoard,
    startAgain,
    turn, winner,
    jumpTo,
    currentMove,
    history
  } = useTicTacToe({ isSinglePlayer })
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
      {
        !isSinglePlayer && (
          <HistoryControls
            history={history}
            currentMove={currentMove}
            jumpTo={jumpTo}
          />
        )
      }
      <Board
        board={board}
        updateBoard={updateBoard}
      />
      <Turn turn={turn} />
      <Footer
        resetGame={resetGame}
        gameMode={isSinglePlayer ? 'Against IA' : 'Multiplayer'}
      />

      <WinnerModal winner={winner} startAgain={startAgain} />
    </main>
  )
}

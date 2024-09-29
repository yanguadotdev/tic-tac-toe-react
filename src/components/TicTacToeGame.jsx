import { useScore } from '../hooks/useScore'
import { useTicTacToe } from '../hooks/useTicTacToe'
import styles from '../styles/shadow.module.css'
import utils from '../styles/utilities.module.css'
import game from '../styles/game.module.css'
import { Board } from './Board'
import { Footer } from './Footer'
import { HistoryControls } from './HistoryControls'
import { Score } from './Score'
import { Turn } from './Turn'
import { WinnerModal } from './WinnerModal'
import { TURNS } from '../constants'

export default function TicTacToeGame ({ setGameMode, isSinglePlayer }) {
  const {
    board, updateBoard,
    startAgain,
    turn, winner,
    jumpTo,
    currentMove,
    history
  } = useTicTacToe({ isSinglePlayer })
  const { oWins, xWins, draws, resetScore } = useScore({ winner })

  const backHome = () => {
    setGameMode('')
    startAgain()
  }

  return (
    <main
      className={`${game.Game} ${styles.Shadow_inset} ${utils.flex_col}`}
      style={{
        pointerEvents: isSinglePlayer && turn === TURNS.O ? 'none' : 'all'
      }}
    >
      <Score oWins={oWins} xWins={xWins} draws={draws} />
      <HistoryControls
        history={history}
        currentMove={currentMove}
        jumpTo={jumpTo}
        backHome={backHome}
      />
      <Board
        board={board}
        updateBoard={updateBoard}
      />
      <Turn turn={turn} />
      <Footer
        resetScore={resetScore}
        startAgain={startAgain}
        gameMode={isSinglePlayer ? 'Against IA' : 'Multiplayer'}
      />

      <WinnerModal winner={winner} startAgain={startAgain} />
    </main>
  )
}

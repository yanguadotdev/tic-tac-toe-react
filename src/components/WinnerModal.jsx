/* eslint-disable react/prop-types */
import { RestartIcon } from './Icons.jsx'
import { Square } from './Square.jsx'

export function WinnerModal ({ winner, startAgain }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={startAgain}>
            <RestartIcon />
          </button>
        </footer>
      </div>
    </section>
  )
}

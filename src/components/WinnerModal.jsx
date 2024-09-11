/* eslint-disable react/prop-types */
import { Square } from './Square.jsx'
import { TURNS } from '../constants.js'
import { OIcon, XIcon, RestartIcon, DrawIcon } from './Icons.jsx'

export function WinnerModal ({ winner, startAgain }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó'

  const replaceWithIcon = (winner) => winner === TURNS.X
    ? <XIcon />
    : winner === TURNS.O
      ? <OIcon />
      : <DrawIcon />

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          <Square>{replaceWithIcon(winner)}</Square>
        </header>

        <footer>
          <button onClick={startAgain}>
            <RestartIcon /> Start again
          </button>
        </footer>
      </div>
    </section>
  )
}

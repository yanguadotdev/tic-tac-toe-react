import { DrawIcon, OIcon, XIcon } from './Icons'

/* eslint-disable react/prop-types */
export function Score ({ oWins, xWins, draws }) {
  return (
    <>
      <header className='game-header'>
        <div className='score score--o'>
          <OIcon />
          <p>{oWins} wins</p>
        </div>
        <div className='score score--x'>
          <XIcon />
          <p>{xWins} wins</p>
        </div>
        <div className='score'>
          <DrawIcon />
          <p>{draws} draws</p>
        </div>
      </header>
    </>
  )
}

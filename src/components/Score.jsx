/* eslint-disable react/prop-types */
export function Score ({ oWins, xWins, draws }) {
  return (
    <>
      <header className='game-header' style={{ display: 'flex', gap: '3rem' }}>
        <div className='score'>
          <span>O</span>
          <p>{oWins} wins</p>
        </div>
        <div className='score'>
          <span>X</span>
          <p>{xWins} wins</p>
        </div>
        <div className='score'>
          <span>⚖</span>
          <p>{draws} draws</p>
        </div>
      </header>
    </>
  )
}

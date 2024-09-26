import { AllowSoundIcon, NotAllowSoundIcon, RepeatIcon } from './Icons'

export function Footer ({ resetGame, sound, toggleSound }) {
  return (
    <footer className='footer-game'>
      <button className='Button3D' onClick={resetGame}>
        <RepeatIcon />
      </button>

      <span className='label'>1 PLAYER</span>

      <button
        className='Button3D'
        onClick={toggleSound}
      >
        {sound ? <AllowSoundIcon /> : <NotAllowSoundIcon />}
      </button>

    </footer>
  )
}

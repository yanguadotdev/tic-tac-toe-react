import { AllowSoundIcon, NotAllowSoundIcon, RepeatIcon } from './Icons'

export function Footer ({ resetGame, sound, toggleSound }) {
  return (
    <footer className='footer-game'>
      <button onClick={resetGame}>
        <RepeatIcon />
      </button>

      <span className='label'>1 PLAYER</span>

      <button onClick={() => toggleSound(!sound)}>
        {sound ? <AllowSoundIcon /> : <NotAllowSoundIcon />}
      </button>
    </footer>
  )
}

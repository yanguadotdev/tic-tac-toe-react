import { RepeatIcon, SettingIcon } from './Icons'

export function Footer ({ resetGame }) {
  return (
    <footer className='footer-game'>
      <button onClick={resetGame}>
        <RepeatIcon />
      </button>

      <span className='label'>1 PLAYER</span>

      <button>
        <SettingIcon />
      </button>
    </footer>
  )
}

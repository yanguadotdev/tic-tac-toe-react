import { RepeatIcon, SettingIcon } from './Icons'

export function Footer ({ resetGame }) {
  return (
    <footer>
      <button onClick={resetGame}>
        <RepeatIcon />
      </button>

      <span>1 PLAYER</span>

      <button>
        <SettingIcon />
      </button>
    </footer>
  )
}

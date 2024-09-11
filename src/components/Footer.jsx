import { RepeatIcon, SettingIcon } from './Icons'

export function Footer ({ reset }) {
  return (
    <footer>
      <button onClick={reset}>
        <RepeatIcon />
      </button>

      <span>1 PLAYER</span>

      <button>
        <SettingIcon />
      </button>
    </footer>
  )
}

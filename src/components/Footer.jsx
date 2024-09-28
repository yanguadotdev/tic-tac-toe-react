import { AllowSoundIcon, NotAllowSoundIcon, RepeatIcon } from './Icons'
import styles from '../styles/button.module.css'
import footerStyles from '../styles/footer.module.css'

export function Footer ({ resetGame, sound, toggleSound }) {
  return (
    <footer className={footerStyles.FooterGame}>
      <button
        className={`${styles.Button3D} ${styles.Button_primary}`}
        onClick={resetGame}
      >
        <RepeatIcon />
      </button>

      <span className={footerStyles.Label}>Multiplayer</span>

      <button
        className={`${styles.Button3D} ${styles.Button_primary}`}
        onClick={toggleSound}
      >
        {sound ? <AllowSoundIcon /> : <NotAllowSoundIcon />}
      </button>

    </footer>
  )
}

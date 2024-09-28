import { useContext } from 'react'

import { AllowSoundIcon, NotAllowSoundIcon, RepeatIcon } from './Icons'
import styles from '../styles/button.module.css'
import footerStyles from '../styles/footer.module.css'
import { SoundContext } from '../context/soundContext'

export function Footer ({ resetGame, gameMode }) {
  const { sound, updateSound: toggleSound } = useContext(SoundContext)
  return (
    <footer className={footerStyles.FooterGame}>
      <button
        className={`${styles.Button3D} ${styles.Button_primary}`}
        onClick={resetGame}
      >
        <RepeatIcon />
      </button>

      <span className={footerStyles.Label}>{gameMode}</span>

      <button
        className={`${styles.Button3D} ${styles.Button_primary}`}
        onClick={toggleSound}
      >
        {sound ? <AllowSoundIcon /> : <NotAllowSoundIcon />}
      </button>

    </footer>
  )
}

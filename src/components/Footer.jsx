import React from 'react'

import { RepeatIcon, RestartIcon } from './Icons'
import styles from '../styles/button.module.css'
import footerStyles from '../styles/footer.module.css'

function Footer ({ resetScore, startAgain, gameMode }) {
  const resetGame = () => {
    startAgain()
    resetScore()
  }

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
        onClick={startAgain}
        aria-label='Start again'
        id='restart'
      >
        <RestartIcon />
      </button>

    </footer>
  )
}

export default React.memo(Footer)

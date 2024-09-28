/* eslint-disable react/prop-types */
import { TURNS } from '../constants.js'
import { OIcon, XIcon, RestartIcon, DrawIcon } from './Icons.jsx'
import styles from '../styles/button.module.css'
import modalStyles from '../styles/modal.module.css'
import utils from '../styles/utilities.module.css'
import shadows from '../styles/shadow.module.css'
import { useState } from 'react'

export function WinnerModal ({ winner, startAgain, delay = 200 }) {
  if (winner === null) return null

  const [isWait, setIsWait] = useState(true)
  setTimeout(() => {
    setIsWait(false)
  }, delay)

  if (isWait) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó'

  const replaceWithIcon = (winner) => winner === TURNS.X
    ? <XIcon />
    : winner === TURNS.O
      ? <OIcon />
      : <DrawIcon />

  return (
    <section className={`${modalStyles.Modal} ModalOpen`}>
      <div
        className={`${modalStyles.Modal_content} ${shadows.Shadow_inset}`}
      >

        <header>
          <h2 className={utils.text_xl}>{winnerText}</h2>
        </header>

        <div className={modalStyles.Modal_winner}>{replaceWithIcon(winner)}</div>

        <footer>
          <button
            className={`${styles.Button3D} ${styles.Button_fitContent} ${styles.Button_primary}`}
            onClick={startAgain}
          >
            <RestartIcon /> Start again
          </button>
        </footer>
      </div>
    </section>
  )
}

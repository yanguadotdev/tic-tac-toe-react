import { DrawIcon, OIcon, XIcon } from './Icons'
import styles from '../styles/score.module.css'

/* eslint-disable react/prop-types */
export function Score ({ oWins, xWins, draws }) {
  return (
    <>
      <header className={styles.ScoreLayout}>
        <div
          className={`${styles.Score} ${styles.Score_o}`}
        >
          <OIcon />
          <p>{oWins} wins</p>
        </div>
        <div
          className={`${styles.Score} ${styles.Score_x}`}
        >
          <XIcon />
          <p>{xWins} wins</p>
        </div>
        <div className={styles.Score}>
          <DrawIcon />
          <p>{draws} draws</p>
        </div>
      </header>
    </>
  )
}

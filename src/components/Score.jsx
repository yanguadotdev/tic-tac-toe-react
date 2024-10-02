import React from 'react'

import { DrawIcon, OIcon, XIcon } from './Icons'
import styles from '../styles/score.module.css'

function Score ({ oWins, xWins, draws }) {
  return (
    <>
      <header id='score' className={styles.ScoreLayout} aria-label='Game Score' aria-live='assertive'>
        <div
          className={`${styles.Score} ${styles.Score_o}`}
          role='group'
          aria-labelledby='score-o'
        >
          <OIcon aria-hidden='true' />
          <p id='score-o'>{oWins} wins</p>
        </div>
        <div
          className={`${styles.Score} ${styles.Score_x}`}
          role='group'
          aria-labelledby='score-x'
        >
          <XIcon aria-hidden='true' />
          <p id='score-x'>{xWins} wins</p>
        </div>
        <div className={styles.Score} role='group' aria-labelledby='score-draw'>
          <DrawIcon aria-hidden='true' />
          <p id='score-draw'>{draws} draws</p>
        </div>
      </header>
    </>
  )
}

export default React.memo(Score)

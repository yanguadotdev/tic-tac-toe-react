/* eslint-disable react/prop-types */
import { TURNS } from '../constants.js'
import { OIcon, XIcon } from './Icons.jsx'

import styles from '../styles/turn.module.css'

export function Turn ({ turn }) {
  return (
    <section className={styles.Turn}>
      <div
        className={`${styles.Turn_turn} 
          ${turn === TURNS.X ? styles.Turn_turn__active : ''}`}
      >
        <XIcon />
      </div>
      <div
        className={`${styles.Turn_turn} 
          ${turn === TURNS.O ? styles.Turn_turn__active : ''}`}
      >
        <OIcon />
      </div>
    </section>
  )
}

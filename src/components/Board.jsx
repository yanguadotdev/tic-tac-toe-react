/* eslint-disable react/prop-types */
import { OIcon, XIcon } from '../components/Icons.jsx'
import { TURNS } from '../constants.js'

import { Square } from './Square.jsx'
import styles from '../styles/board.module.css'

export function Board ({ board, updateBoard }) {
  const replaceWithIcon = (index) => board[index] === TURNS.X
    ? <XIcon />
    : <OIcon />

  return (
    <section className={styles.Board}>
      {board.map((_, index) => (
        <Square
          key={index}
          index={index}
          updateBoard={updateBoard}
        >
          {board[index] && replaceWithIcon(index)}
        </Square>
      ))}
    </section>
  )
}

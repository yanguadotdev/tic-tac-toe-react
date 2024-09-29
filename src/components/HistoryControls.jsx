import { HomeSmileBold, UndoLeftIcon, UndoRightIcon } from './Icons'
import styles from '../styles/button.module.css'
import utils from '../styles/utilities.module.css'

export function HistoryControls ({ jumpTo, currentMove, history, backHome }) {
  return (
    <section className={`${utils.items_between} ${utils.m_y_1}`}>
      <button
        className={`${styles.Button3D} ${styles.Button_secondary}`}
        onClick={() => jumpTo({ to: 'back' })}
        disabled={currentMove === 0}
        aria-label='undo'
      >
        <UndoLeftIcon />
      </button>

      <button
        className={`
        ${styles.Button3D} 
        ${styles.Button_home}`}
        onClick={backHome}
      >
        <HomeSmileBold style={{ width: '24', height: '24' }} />
      </button>

      <button
        className={`${styles.Button3D} ${styles.Button_secondary}`}
        onClick={() => jumpTo({ to: 'next' })}
        disabled={currentMove === history.length - 1}
        aria-label='redo'
      >
        <UndoRightIcon />
      </button>
    </section>
  )
}

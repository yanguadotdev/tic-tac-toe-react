import { OIcon, XIcon } from './Icons'
import styles from '../styles/gameselector.module.css'
import utils from '../styles/utilities.module.css'
import buttons from '../styles/button.module.css'
import { GAME_MODE } from '../constants'

export default function GameModeSelector ({ onSelectMode }) {
  const handleClick = (mode) => {
    onSelectMode(mode)
  }

  return (
    <main className={`${utils.flex_col} ${styles.SelectGameMode}`}>
      <div className={styles.Marks}>
        <div className='x-icon'>
          <XIcon />
        </div>
        <div className='o-icon'>
          <OIcon />
        </div>
      </div>

      <div className={`${utils.flex_col} ${styles.Options}`}>
        <button
          className={`
            ${styles.ModeSingle} 
            ${styles.Button} 
            ${buttons.Button3D} 
            ${buttons.Button_fitContent}`}
          onClick={() => handleClick(GAME_MODE.SINGLE)}
        >
          NEW GAME (VS CPU)
        </button>

        <button
          className={`
            ${styles.ModeMultiplayer} 
            ${styles.Button} 
            ${buttons.Button3D} 
            ${buttons.Button_fitContent}`}
          onClick={() => handleClick(GAME_MODE.MULTIPLAYER)}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </main>
  )
}

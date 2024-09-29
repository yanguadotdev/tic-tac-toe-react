import { useContext } from 'react'
import { SoundContext } from '../context/soundContext'

import { OIcon, XIcon } from './Icons'
import styles from '../styles/gameselector.module.css'
import utils from '../styles/utilities.module.css'
import buttons from '../styles/button.module.css'
import { GAME_MODE } from '../constants'
import Setting from './Setting'
import Dropdown from './Dropdown'

export default function GameModeSelector ({ onSelectMode }) {
  const { playSound, clickSound } = useContext(SoundContext)
  const handleClick = (mode) => {
    playSound(clickSound)
    onSelectMode(mode)
  }

  return (
    <main className={`${utils.flex_col} ${styles.SelectGameMode}`}>
      <h1 className={`
        ${utils.text_center}
        ${styles.Title}`}
      >
        Tic Tac Toe
      </h1>
      <div className={styles.Marks}>
        <div className='x-icon'>
          <XIcon />
        </div>
        <div className='o-icon'>
          <OIcon />
        </div>
      </div>

      <div>
        <div>
          <span className={styles.ChooseDificult_label}>Difficult:</span>
          <Dropdown />
        </div>
        <br />

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
      </div>

      <Setting />
    </main>
  )
}

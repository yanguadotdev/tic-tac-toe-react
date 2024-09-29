import { useContext } from 'react'
import { SoundContext } from '../context/soundContext'

import { AllowSoundIcon, NotAllowSoundIcon } from './Icons'
import styles from '../styles/button.module.css'

export default function Setting () {
  const { sound, updateSound: toggleSound } = useContext(SoundContext)
  return (
    <div>
      <button
        className={`${styles.Button3D} ${styles.Button_primary}`}
        onClick={toggleSound}
      >
        {sound ? <AllowSoundIcon /> : <NotAllowSoundIcon />}
      </button>
    </div>
  )
}

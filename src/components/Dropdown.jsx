import { useState, useContext } from 'react'
import { FiChevronDown } from './Icons'
import styles from '../styles/dropdown.module.css'
import { DifficultyContext } from '../context/difficultyContext'
import { DIFFICULTY } from '../constants'
import { SoundContext } from '../context/soundContext'

export default function Dropdown () {
  const [open, setOpen] = useState(false)
  const { difficulty, setDifficulty } = useContext(DifficultyContext)
  const { playSound, clickSound } = useContext(SoundContext)

  const handleClick = (difficulty) => {
    setDifficulty(difficulty)
    setOpen(false)
  }

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false)
    }
  }

  const handleTrigger = () => {
    playSound(clickSound)
    setOpen(!open)
  }

  return (
    <div
      className={`${styles.Dropdown} ${open ? styles.Dropdown_open : ''}`}
      onBlur={handleBlur}
    >
      <button
        className={styles.DropdownTrigger}
        onClick={handleTrigger}
      >
        <span>{difficulty}</span>
        <FiChevronDown />
      </button>

      <div className={styles.DropdownWrapper}>
        <ul className={styles.DropdownContent}>
          <Option text='Easy' handleClick={() => handleClick(DIFFICULTY.EASY)} />
          <Option text='Normal' handleClick={() => handleClick(DIFFICULTY.NORMAL)} />
          <Option text='Hard' handleClick={() => handleClick(DIFFICULTY.HARD)} />
        </ul>
      </div>
    </div>
  )
}

const Option = ({ text, Icon, handleClick }) => {
  return (
    <li
      tabIndex={0}
      className={styles.DropdownOption}
      onClick={handleClick}
    >
      {/* <span>
        <Icon />
      </span> */}
      <span>{text}</span>
    </li>
  )
}

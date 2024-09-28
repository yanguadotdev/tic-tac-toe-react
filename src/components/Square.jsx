/* eslint-disable react/prop-types */
import styles from '../styles/board.module.css'

export const Square = ({ children, updateBoard, index }) => {
  const className = `${styles.Square}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div
      onClick={handleClick}
      className={className}
      data-testid={`square-${index}`}
    >
      {children}
    </div>
  )
}

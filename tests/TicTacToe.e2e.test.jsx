import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../src/App'
import { SoundProvider } from '../src/context/soundContext'

describe('Tic Tac Toe App Flow', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should simulate a full gameplay flow, including making moves, using undo/redo functionality, and ensuring the correct state updates', () => {
    const { getByTestId } = render(
      <SoundProvider>
        <App />
      </SoundProvider>
    )

    const undoButton = screen.getByRole('button', { name: /undo/i })
    const redoButton = screen.getByRole('button', { name: /redo/i })

    const checkButtonsState = (undoDisabled, redoDisabled) => {
      expect(undoButton.disabled).toBe(undoDisabled)
      expect(redoButton.disabled).toBe(redoDisabled)
    }

    expect(undoButton.disabled).toBe(true)
    expect(redoButton.disabled).toBe(true)

    expect(getByTestId('square-0')).toBeTruthy()
    let iconSquare0 = getByTestId('square-0').querySelector('svg')
    expect(iconSquare0).toBeNull()

    fireEvent.click(getByTestId('square-0')) // X

    checkButtonsState(false, true)

    iconSquare0 = getByTestId('square-0').querySelector('svg')
    expect(iconSquare0.className).toBe('x-icon')

    fireEvent.click(getByTestId('square-4')) // O

    let iconSquare4 = getByTestId('square-4').querySelector('svg')
    expect(iconSquare4.className).toBe('o-icon')

    checkButtonsState(false, true)

    fireEvent.click(undoButton)

    checkButtonsState(false, false)

    fireEvent.click(undoButton)

    checkButtonsState(true, false)

    fireEvent.click(redoButton)

    checkButtonsState(false, false)

    fireEvent.click(redoButton)

    checkButtonsState(false, true)

    let iconSquare8 = getByTestId('square-8').querySelector('svg')
    expect(iconSquare8).toBeNull()

    fireEvent.click(getByTestId('square-8')) // X

    iconSquare8 = getByTestId('square-8').querySelector('svg')
    expect(iconSquare8.className).toBe('x-icon')

    checkButtonsState(false, true)

    fireEvent.click(undoButton)

    iconSquare8 = getByTestId('square-8').querySelector('svg')
    expect(iconSquare8).toBeNull()

    checkButtonsState(false, false)

    fireEvent.click(undoButton)

    checkButtonsState(false, false)

    iconSquare4 = getByTestId('square-4').querySelector('svg')
    expect(iconSquare4).toBeNull()

    fireEvent.click(getByTestId('square-8')) // O

    iconSquare8 = getByTestId('square-8').querySelector('svg')
    expect(iconSquare8.className).toBe('o-icon')

    checkButtonsState(false, true)
  })

  // ! For this to work you need to disable the confetti library, because canva doesn't work very well in a test environment or use Playwright and you can forget about this.
  it('should declare a winner when a player has three in a row', () => {
    const { getByTestId, getByRole } = render(
      <SoundProvider>
        <App />
      </SoundProvider>
    )
    const undo = getByRole('button', { name: /undo/i })
    const redo = getByRole('button', { name: /redo/i })
    expect(undo.disabled).toBe(false)
    expect(redo.disabled).toBe(true)

    // Jugadas para que 'X' gane
    fireEvent.click(getByTestId('square-1')) // X
    fireEvent.click(getByTestId('square-3')) // O
    fireEvent.click(getByTestId('square-2')) // X

    const iconSquare1 = getByTestId('square-1').querySelector('svg')
    const iconSquare3 = getByTestId('square-3').querySelector('svg')
    expect(iconSquare1.className).toBe('x-icon')
    expect(iconSquare3.className).toBe('o-icon')

    const winnerModal = document.querySelector('.ModalOpen')
    expect(winnerModal).toBeTruthy()

    const score = document.getElementById('score')
    console.log(score.textContent)
    const scoreX = score.querySelector('p#score-x')
    expect(scoreX.textContent).toBe('1 wins')

    const restartBtn = winnerModal.querySelector('button#restartGame')
    expect(restartBtn).toBeTruthy()
    fireEvent.click(restartBtn)

    expect(undo.disabled).toBe(true)
    expect(redo.disabled).toBe(true)
  })
})

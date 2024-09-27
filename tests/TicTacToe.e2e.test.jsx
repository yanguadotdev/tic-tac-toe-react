import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../src/App'

describe('Tic Tac Toe App Flow', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should allow making moves, undoing and redoing moves, and declaring a winner', () => {
    const { getByTestId } = render(<App />)

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

    fireEvent.click(getByTestId('square-0'))

    checkButtonsState(false, true)

    iconSquare0 = getByTestId('square-0').querySelector('svg')
    expect(iconSquare0.className).toBe('x-icon')

    fireEvent.click(getByTestId('square-4'))

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

    fireEvent.click(getByTestId('square-8'))

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

    fireEvent.click(getByTestId('square-8'))

    iconSquare8 = getByTestId('square-8').querySelector('svg')
    expect(iconSquare8.className).toBe('o-icon')

    checkButtonsState(false, true)
  })
})

import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { HistoryControls } from '../src/components/HistoryControls'

describe('HistoryControls Component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should disable both undo and redo buttons on the first move with only one state in history', () => {
    const jumpTo = vi.fn()
    const currentMove = 0
    const history = [[]]

    render(
      <HistoryControls jumpTo={jumpTo} currentMove={currentMove} history={history} />
    )
    const undoButton = screen.getByRole('button', { name: /undo/i })
    const redoButton = screen.getByRole('button', { name: /redo/i })

    // VERIFY IF EXISTS BUTTONS
    expect(undoButton).toBeTruthy()
    expect(redoButton).toBeTruthy()

    expect(undoButton.disabled).toBe(true)
    expect(redoButton.disabled).toBe(true)
  })

  it('should disable the undo button and enable the redo button when at the first move with multiple history states', () => {
    const jumpTo = vi.fn()
    const currentMove = 0
    const history = [[], [], []]

    render(
      <HistoryControls jumpTo={jumpTo} currentMove={currentMove} history={history} />
    )
    const undoButton = screen.getByRole('button', { name: /undo/i })
    const redoButton = screen.getByRole('button', { name: /redo/i })

    // VERIFY IF EXISTS BUTTONS
    expect(undoButton).toBeTruthy()
    expect(redoButton).toBeTruthy()

    expect(undoButton.disabled).toBe(true)
    expect(redoButton.disabled).toBe(false)
  })

  it('should enable both undo and redo buttons on the third movement with multiple history states', () => {
    const jumpTo = vi.fn()
    const currentMove = 2
    const history = [[], [], [], [], []]

    render(
      <HistoryControls jumpTo={jumpTo} currentMove={currentMove} history={history} />
    )
    const undoButton = screen.getByRole('button', { name: /undo/i })
    const redoButton = screen.getByRole('button', { name: /redo/i })

    // VERIFY IF EXISTS BUTTONS
    expect(undoButton).toBeTruthy()
    expect(redoButton).toBeTruthy()

    expect(undoButton.disabled).toBe(false)
    expect(redoButton.disabled).toBe(false)
  })

  it('should enable undo button and disable redo button when at the currentMove is equal to length of history', () => {
    const jumpTo = vi.fn()
    const currentMove = 4
    const history = [[], [], [], [], []]

    render(
      <HistoryControls jumpTo={jumpTo} currentMove={currentMove} history={history} />
    )
    const undoButton = screen.getByRole('button', { name: /undo/i })
    const redoButton = screen.getByRole('button', { name: /redo/i })

    // VERIFY IF EXISTS BUTTONS
    expect(undoButton).toBeTruthy()
    expect(redoButton).toBeTruthy()

    expect(undoButton.disabled).toBe(false)
    expect(redoButton.disabled).toBe(true)
  })

  it('should call jumpTo with "back" when the undo button is clicked', () => {
    const jumpTo = vi.fn()
    const currentMove = 1
    const history = [[], []]

    render(
      <HistoryControls jumpTo={jumpTo} currentMove={currentMove} history={history} />
    )

    const undoButton = screen.getByRole('button', { name: /undo/i })
    const redoButton = screen.getByRole('button', { name: /redo/i })
    expect(undoButton.disabled).toBe(false)
    expect(redoButton.disabled).toBe(true)

    // Simular un clic en el botón undo
    fireEvent.click(undoButton)
    // Verificar que jumpTo fue llamada con { to: 'back' }
    expect(jumpTo).toHaveBeenCalledWith({ to: 'back' })
  })
})

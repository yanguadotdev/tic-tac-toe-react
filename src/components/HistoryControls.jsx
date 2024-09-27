import { UndoLeftIcon, UndoRightIcon } from './Icons'

export function HistoryControls ({ jumpTo, currentMove, history }) {
  return (
    <section className='history-controls'>
      <button
        className='Button3D'
        onClick={() => jumpTo({ to: 'back' })}
        disabled={currentMove === 0}
        aria-label='undo'
      >
        <UndoLeftIcon />
      </button>

      <button
        className='Button3D'
        onClick={() => jumpTo({ to: 'next' })}
        disabled={currentMove === history.length - 1}
        aria-label='redo'
      >
        <UndoRightIcon />
      </button>
    </section>
  )
}

import { UndoLeftIcon, UndoRightIcon } from './Icons'

export function HistoryControls ({ jumpTo }) {
  return (
    <section className='history-controls'>
      <button onClick={() => jumpTo({ to: 'back' })}>
        <UndoLeftIcon />
      </button>

      <button onClick={() => jumpTo({ to: 'next' })}>
        <UndoRightIcon />
      </button>
    </section>
  )
}

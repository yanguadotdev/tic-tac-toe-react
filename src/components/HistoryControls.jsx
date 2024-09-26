import { UndoLeftIcon, UndoRightIcon } from './Icons'

export function HistoryControls ({ jumpTo }) {
  return (
    <section className='history-controls'>
      <button className='Button3D' onClick={() => jumpTo({ to: 'back' })}>
        <UndoLeftIcon />
      </button>

      <button className='Button3D' onClick={() => jumpTo({ to: 'next' })}>
        <UndoRightIcon />
      </button>
    </section>
  )
}

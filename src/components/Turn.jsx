/* eslint-disable react/prop-types */
import { TURNS } from '../constants.js'
import { OIcon, XIcon } from './Icons.jsx'

export function Turn ({ turn }) {
  return (
    <section className='turn'>
      <div className={turn === TURNS.X ? 'is-turn' : ''}>
        <XIcon />
      </div>
      <div className={turn === TURNS.O ? 'is-turn' : ''}>
        <OIcon />
      </div>
    </section>
  )
}

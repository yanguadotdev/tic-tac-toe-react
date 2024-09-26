import { useState, useEffect } from 'react'
import { getItemFromStorage, saveInStorage } from '../storage'
import audioPop from '../assets/pop.mp3'
import audioWinner from '../assets/winner.wav'
import audioClick from '../assets/buttonClick.wav'

export function useSound () {
  const [sound, toggleSound] = useState(getItemFromStorage({
    key: 'sound',
    fallback: false
  }))

  const [popSound, setPopSound] = useState(null)
  const [winnerSound, setWinnerSound] = useState(null)
  const [clickSound, setClickSound] = useState(null)

  useEffect(() => {
    // Precargar sonidos
    const popAudio = new window.Audio(audioPop)
    const winnerAudio = new window.Audio(audioWinner)
    const clickAudio = new window.Audio(audioClick)

    setPopSound(popAudio)
    setWinnerSound(winnerAudio)
    setClickSound(clickAudio)

    // Limpiar los audios cuando el componente se desmonta
    return () => {
      popAudio && popAudio.pause()
      winnerAudio && winnerAudio.pause()
      clickAudio && clickAudio.pause()
    }
  }, [])

  const playSound = (audio) => {
    if (sound && audio) {
      audio.currentTime = 0 // Reiniciar el sonido si es necesario
      audio.play()
    }
  }

  const updateSound = () => {
    playSound(clickSound)
    saveInStorage({ data: { sound: !sound } })
    toggleSound(!sound)
  }

  return { sound, updateSound, playSound, popSound, winnerSound, clickSound }
}

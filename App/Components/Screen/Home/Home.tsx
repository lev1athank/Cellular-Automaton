import { FC } from 'react'
import Canvas from './Sections/Convas/Canvas'
import style from './style.module.scss'
import { ICanvas } from "./../../../assets/interface/Canvas"
import Panels from './Sections/panels/Panels'

const Home: FC = () => {
  const setting: ICanvas = {
    width: 50,
    height: 50,
    sizePix: 15,
    emerges: [3],
    survives: [2, 3],
    bgColor: "rgb(255, 255, 255)",
    timeUp: 2
  }
  return (

    <div className={style.conteiner} >
      <Canvas {...setting} />
      <Panels />
    </div>
  )
}

export default Home
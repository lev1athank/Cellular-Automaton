import { FC, MouseEvent, useRef } from 'react'
import Canvas from './Sections/Convas/Canvas'
import style from './style.module.scss'
import Panels from './Sections/panels/Panels'

const Home: FC = () => {

  return (

    <div className={style.conteiner} >
      <Canvas />
      <Panels />
    </div>
  )
}

export default Home
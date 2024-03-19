import { useDispatch } from 'react-redux'
import style from './style.module.scss'
import { useState } from 'react'
import { actions } from '../../../../../../../../src/store/GameSettings/GameSettings.slice'
const GameButton = () => {
    const [isRun, setIsRun] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className={style.gamePanel}>
            <button className={style.restartANDclear} onClick={() => dispatch(actions.clear())} ><span>очистить</span><i className="fa-solid fa-rotate-right"></i></button>
            <button className={style.startANDstop} onClick={() => {
                setIsRun(prevState => !prevState)
                dispatch(actions.startOrStop(!isRun))
            }} >{isRun ? <span>стоп</span> : <span>старт</span>}<i className="fa-solid fa-play"></i></button>
        </div>
    )
}

export default GameButton
import { useDispatch } from 'react-redux'
import style from './style.module.scss'
import { useState } from 'react'
import { actions } from '../../../../../../../../src/store/GameSettings/GameSettings.slice'
import { settings } from '../../../../../../../../src/store/settingCanvas/settingCanvas'
const GameButton = () => {
    const [isRun, setIsRun] = useState(settings.isRun)
    const dispatch = useDispatch()

    return (
        <div className={style.gamePanel}>
            <button className={style.restartANDclear} onClick={() => {
                dispatch(actions.clear())
                setIsRun(false)
                dispatch(actions.startOrStop(false))
            }} ><i className={"fa-solid fa-rotate-right " + style.icon}></i></button>
            <button className={style.startANDstop} onClick={() => {
                setIsRun(prevState => !prevState)
                dispatch(actions.startOrStop(!isRun))
            }} >{isRun ? <span>стоп</span> : <span>старт</span>}<i className={"fa-solid fa-play " + style.icon}></i></button>
        </div >
    )
}

export default GameButton
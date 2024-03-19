import { useDispatch } from 'react-redux'
import style from './style.module.scss'
import { useEffect, useRef } from 'react'
import { actions } from '../../../../../../src/store/GameSettings/GameSettings.slice'
const Canvas = () => {
    const Elcanvas = useRef<HTMLCanvasElement>(null)
    const dispatch = useDispatch()
    useEffect(() => {
        if (Elcanvas.current == null) return
        dispatch(actions.init(Elcanvas.current))
        // const canvasClass = new CanvasClass(Elcanvas.current)
        // setTimeout(()=>{
        //     canvasClass.start()
        // }, 7000)

    }, [])

    return (
        <div className={style.zoneCanvas}>
            <canvas ref={Elcanvas} className={style.canvas}></canvas>
        </div>
    )

}

export default Canvas
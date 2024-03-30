import { useDispatch } from 'react-redux'
import style from './style.module.scss'
import { useEffect, useRef } from 'react'
import { actions } from '../../../../../../src/store/GameSettings/GameSettings.slice'
const Canvas = () => {
    const Elcanvas = useRef<HTMLCanvasElement>(null)
    const liveCountEl = useRef<HTMLElement>(null)
    const canvasZone = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    useEffect(() => {
        if (Elcanvas.current == null && liveCountEl.current == null) return
        dispatch(actions.init([Elcanvas.current, liveCountEl.current]))
        // const canvasClass = new CanvasClass(Elcanvas.current)
        // setTimeout(()=>{
        //     canvasClass.start()
        // }, 7000)

    }, [])

    const moveFun = (moveEvent: MouseEvent) => {
        if (!canvasZone.current) return

        const x: number = moveEvent.pageX - 30 * 5 - 20
        const y: number = moveEvent.pageY - 30 * 3.5
        canvasZone.current.style.top = `${y}px`
        canvasZone.current.style.left = `${x}px`

        document.addEventListener('mouseup', ()=>document.removeEventListener('mousemove', moveFun))
    }

    const movePanelDown = () => document.addEventListener('mousemove', moveFun)

    return (
        <div className={style.zoneCanvas} ref={canvasZone}>
            <div className={style.convasPanel}>
                <button className={style.btn} onMouseDown={movePanelDown} ><i className={"fa-solid fa-up-down-left-right " + style.icon} style={{ cursor: 'grab' }} ></i></button>
                <span className={style.countLiveAge} ref={liveCountEl}>прошло жизней: 0</span>
            </div>
            <canvas ref={Elcanvas} className={style.canvas} ></canvas>
        </div>
    )

}

export default Canvas
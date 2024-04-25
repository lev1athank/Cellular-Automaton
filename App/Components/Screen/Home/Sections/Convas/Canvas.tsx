import { useDispatch } from 'react-redux'
import style from './style.module.scss'
import { useEffect, useRef, useState } from 'react'
import { actions } from '../../../../../../src/store/GameSettings/GameSettings.slice'
import { useTypedSelector } from '../../../../../../src/hooks/useTypedSelector'

const Canvas = () => {
    const Elcanvas = useRef<HTMLCanvasElement>(null)
    const liveCountEl = useRef<HTMLElement>(null)
    const canvasZone = useRef<HTMLDivElement>(null)
    const [percentage, setPercentage] = useState(0)
    const dispatch = useDispatch()
    const { isRun } = useTypedSelector(state => state)



    useEffect(() => {
        if (Elcanvas.current == null && liveCountEl.current == null) return
        Elcanvas.current?.addEventListener('contextmenu', () => { })
        dispatch(actions.init([Elcanvas.current, liveCountEl.current]))
    }, [])

    const setValue = (el: HTMLInputElement, min: number, max: number) => {
        if (+el.value > max) {
            el.value = max.toString()
            return setPercentage(max)
        }
        else if (+el.value < min) {
            el.value = min.toString()
            return setPercentage(min)
        }
        setPercentage(+el.value)
    }

    const fillIn = () => {
        dispatch(actions.fill(percentage))
    }

    const moveFun = (moveEvent: MouseEvent) => {
        if (!canvasZone.current) return

        const x: number = moveEvent.pageX - 30 * 5 - 20
        const y: number = moveEvent.pageY - 30 * 3.5
        canvasZone.current.style.top = `${y}px`
        canvasZone.current.style.left = `${x}px`

        document.addEventListener('mouseup', () => document.removeEventListener('mousemove', moveFun))
    }

    const movePanelDown = () => document.addEventListener('mousemove', moveFun)

    return (
        <div className={style.zoneCanvas} ref={canvasZone}>
            <div className={style.convasPanel}>
                <button className={style.btn} onMouseDown={movePanelDown} ><i className={"fa-solid fa-up-down-left-right " + style.icon} style={{ cursor: 'grab' }} ></i></button>
                <span className={style.countLiveAge} ref={liveCountEl}>прошло жизней: 0</span>
            </div>
            <canvas ref={Elcanvas} className={style.canvas} onContextMenu={() => false} ></canvas>
            {
                !isRun ?
                    <div className={style.fillField}>
                        <input type="number" defaultValue={percentage} className={style.inputFill} onClick={(el) => el.target.select()} onChange={(el) => setValue(el.target, 0, 100)} /> %
                        <button className={style.btnFill} onClick={fillIn}>заполнить</button>
                    </div> : ""
            }
        </div>
    )

}

export default Canvas
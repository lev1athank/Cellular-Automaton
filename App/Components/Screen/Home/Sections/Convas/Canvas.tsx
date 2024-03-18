import style from './style.module.scss'
import { ICanvas } from "../../../../../assets/interface/Canvas"
import { CanvasClass } from "./../../../../../assets/class/CanvasClass"
import { useEffect, useRef } from 'react'
const Canvas = (settingCanvas: ICanvas) => {
    const Elcanvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (Elcanvas.current == null) return
        const canvasClass = new CanvasClass(settingCanvas, Elcanvas.current)
        // setTimeout(()=>{
        //     canvasClass.start()
        // }, 7000)

    }, [])

    return (
        <div className={style.zoneCanvas}>
            <canvas ref={Elcanvas} className={style.canvas} style={{ backgroundColor: settingCanvas.bgColor }}></canvas>
        </div>
    )

}

export default Canvas
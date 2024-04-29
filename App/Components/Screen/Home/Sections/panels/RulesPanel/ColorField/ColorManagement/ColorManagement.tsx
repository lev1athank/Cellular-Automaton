import style from './style.module.scss'
import { settings } from '../../../../../../../../../src/store/settingCanvas/settingCanvas';
import { useEffect, useRef, useState } from 'react';
type promp = {
    id: number,
    createColor: (neighbors: number, color: string) => void,
    deleteColor: () => void
}



const ColorManagement = ({ id, createColor, deleteColor }: promp) => {
    // const [isSelection, setIsSelection] = useState(false)
    const neighbors: number = settings.colorsPix[id].neighbors
    const color: string = settings.colorsPix[id].rgb
    const [activeNeighbor, setActiveNeighbor] = useState(neighbors)
    const [activeColor, setActiveColor] = useState(color)

    const inputColor = useRef<HTMLInputElement>(null)
    let curId: number = neighbors
    let curColor: string = color
    
    useEffect(() => {
        setActiveNeighbor(curId)
        setActiveColor(curColor)
    }, [curId])


    const freeNeighbor: number[] = [-1, 1, 2, 3, 4, 5, 6, 7, 8]
    let usingNeighbor: number[] = []


    settings.colorsPix.forEach(el => {
        if (el.neighbors !== neighbors)
            usingNeighbor.push(el.neighbors)
    });


    let freeCountNeighbor: number = freeNeighbor.length - usingNeighbor.length


    const columb: number = freeCountNeighbor > 3 ? 3 : freeCountNeighbor 
    const row: number = Math.floor(freeCountNeighbor / 3) < freeCountNeighbor / 3 ? Math.floor(freeCountNeighbor / 3) + 1 : Math.floor(freeCountNeighbor / 3)


    const acceptColorPix = () => {
        if (!inputColor.current) return
        createColor(activeNeighbor, inputColor.current.value)
    }


    return (
        <div className={style.colorSetting}>
            <div className={style.colorManagement}>
                <input type="color" className={style.selectionColor} defaultValue={activeColor} ref={inputColor} />
                соседей
                <div className={style.neighborSelection} style={{
                    gridTemplateColumns: `repeat(${columb}, 1fr)`,
                    gridTemplateRows: `repeat(${row}, 1fr)`
                }}>
                    {
                        freeNeighbor.map(value => usingNeighbor.indexOf(value) == -1 ? <span className={style.cellNeighbor + (value == activeNeighbor ? " " + style.active : '')} onClick={() => setActiveNeighbor(value)} key={value}>{value == -1 ? 0 : value}</span> : '')
                    }
                </div>
            </div>
            <div className={style.acceptColor}>
                <i className={"fa-solid fa-check " + style.acceptOrdel} onClick={acceptColorPix}></i>
                <i className={"fa-solid fa-trash " + style.acceptOrdel} onClick={deleteColor}></i>
            </div>
        </div >
    )
}

export default ColorManagement
import { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'

const SpeedRange = () => {
    let input = useRef<HTMLInputElement>(null)
    const [speed, setSpeed] = useState("1")


    const setAttrToRange = (curInput: HTMLInputElement) => {
        curInput.style.setProperty('--value', curInput.value)
        setSpeed(curInput.value)
    }

    useEffect(() => {
        const curInput = input.current
        if (!curInput?.value) return
        curInput.style.setProperty('--value', curInput.value);
        curInput.style.setProperty('--min', curInput.min == '' ? '0' : curInput.min);
        curInput.style.setProperty('--max', curInput.max == '' ? '100' : curInput.max);
        curInput.addEventListener('input', () => setAttrToRange(curInput));
    }, [input])


    return (
        <div className={style.speedPanel}>
            <span className={style.title}>Скорость</span>
            <input type="range" min={1} max={10} value={speed} ref={input} />
            <div className={style.speedLine}>
                {input.current?.value ? <span className={style.speedCount} style={{ transform: `translateX(${parseInt(input.current.value) * 70}%)` }}>{input.current?.value}</span> : <span className={style.speedCount} style={{ transform: `translateX(10%)` }}>1</span>}
            </div>
        </div>
    )
}

export default SpeedRange
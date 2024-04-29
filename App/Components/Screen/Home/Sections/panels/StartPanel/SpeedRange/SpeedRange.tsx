import { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import { useDispatch } from 'react-redux'
import { actions } from '../../../../../../../../src/store/GameSettings/GameSettings.slice'
import { settings } from '../../../../../../../../src/store/settingCanvas/settingCanvas'

const SpeedRange = () => {
    let input = useRef<HTMLInputElement>(null)
    const [speed, setSpeed] = useState(settings.timeUp.toString())
    const dispatch =  useDispatch()

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
        curInput.addEventListener('input', () => {
            dispatch(actions.setMoveSpeed(+curInput.value))
            setAttrToRange(curInput)
        });
    }, [input])


    return (
        <div className={style.speedPanel}>
            <span className={style.title}>Скорость</span>
            <input type="range" min={1} max={10} defaultValue={speed} ref={input} />
            <div className={style.speedLine}>
               <div className={style.speedCount} style={{ transform: `translateX(${(+speed-0.5) * 70}%)` }}>{+speed * (settings.rules.fastSpeed ? 2 : 1)}</div>
            </div>
        </div>
    )
}

export default SpeedRange
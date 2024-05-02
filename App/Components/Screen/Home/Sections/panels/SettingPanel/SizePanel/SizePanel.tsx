import { ChangeEvent, FocusEvent } from 'react';
import style from './style.module.scss'
import { useDispatch } from 'react-redux';
import { actions } from '../../../../../../../../src/store/GameSettings/GameSettings.slice';
import { settings } from '../../../../../../../../src/store/settingCanvas/settingCanvas';
const SizePanel = () => {
    const dispatch = useDispatch()

    const setValue = (el: ChangeEvent, maxNumber: number, id: number) => {
        const targetEl: HTMLInputElement = el.target as HTMLInputElement

        const value = targetEl.value
        if (isFinite(+value) && value)
            if (+value > 0 && +value <= maxNumber)
                targetEl.value = targetEl.value.split('').slice(0, 2).join('')
            else if (+value > maxNumber) {
                targetEl.value = maxNumber.toString()
            }
            else {
                return targetEl.value = value.length == 2 ? value[0] : ""
            }

        switch (id) {
            case 1:
                dispatch(actions.setPix(+targetEl.value))
                break;

            case 2:
                dispatch(actions.setFieldSize({ height: +targetEl.value }))
                break;

            case 3:
                dispatch(actions.setFieldSize({ width: +targetEl.value }))
                break;

        }


    }
    
    const fullFocus = (el: FocusEvent): void => {
        const a = el.target as HTMLInputElement
        a.select()
    }


    return (
        <div className={style.settingField}>

            <div className={style.FieldItem}>
                <span className={style.title}>клетка</span>
                <div className={style.cell}>
                    <i className={"fa-solid fa-arrow-up " + style.fieldUpHeight + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-down " + style.fieldDownHeight + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-left " + style.fieldLeftWidth + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-right " + style.fieldRightWidth + " " + style.arrow}></i>
                    <div className={style.inputField}>
                        <input type="number" className={style.inputCell} defaultValue={settings.sizePix} onChange={(el) => setValue(el, 30, 1)} onFocus={(el) => fullFocus(el)} />
                        <span>px</span>
                    </div>
                </div>

            </div>
            <div className={style.FieldItem}>
                <span className={style.title}>поле</span>
                <div className={style.field}>
                    <i className={"fa-solid fa-arrow-up " + style.fieldUpHeight + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-down " + style.fieldDownHeight + " " + style.arrow}></i>
                    <input className={style.inputFieldLeft} defaultValue={settings.height} onChange={(el) => setValue(el, 50, 2)} onFocus={(el) => fullFocus(el)} />
                    <i className={"fa-solid fa-arrow-left " + style.fieldLeftWidth + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-right " + style.fieldRightWidth + " " + style.arrow}></i>
                    <input type="number" className={style.inputFieldDown} defaultValue={settings.width} onChange={(el) => setValue(el, 50, 3)} onFocus={(el) => fullFocus(el)} />

                </div>
            </div>
        </div >
    )
}

export default SizePanel
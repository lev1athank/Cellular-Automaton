import { ChangeEvent } from 'react';
import style from './style.module.scss'
const SizePanel = () => {

    const setValue = (el: ChangeEvent, maxNumber: number) => {
        const targetEl: HTMLInputElement = el.target as HTMLInputElement
        console.log(el.nativeEvent?.data);

        const value = targetEl.value
        if(value)
        if (value.length > 2)
            targetEl.value = targetEl.value.split('').slice(0, 2).join('')
        else if (+value > maxNumber) {
            targetEl.value = maxNumber.toString()
        }

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
                        <input type="number" className={style.inputCell} defaultValue={15} onChange={(el) => setValue(el, 30)} />
                        <span>px</span>
                    </div>
                </div>

            </div>
            <div className={style.FieldItem}>
                <span className={style.title}>поле</span>
                <div className={style.field}>
                    <i className={"fa-solid fa-arrow-up " + style.fieldUpHeight + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-down " + style.fieldDownHeight + " " + style.arrow}></i>
                    <input className={style.inputFieldLeft} defaultValue={15} onChange={(el) => setValue(el, 50)} />
                    <i className={"fa-solid fa-arrow-left " + style.fieldLeftWidth + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-right " + style.fieldRightWidth + " " + style.arrow}></i>
                    {/* <input type="number" className={style.inputFieldDown} defaultValue={15} onChange={(el) => setValue(el, 30)} /> */}

                </div>
            </div>
        </div >
    )
}

export default SizePanel
import { ChangeEvent } from 'react';
import style from './style.module.scss'
const SizePanel = () => {

    const setValue = (el: ChangeEvent) => {
        const targetEl: HTMLInputElement = el.target as HTMLInputElement
        console.log(targetEl.value.split('').slice(0, 2));

        const value = targetEl.value
        if (value.length > 2)
            targetEl.value = targetEl.value.split('').slice(0, 2).join('')
        else if (+value > 30) {
            targetEl.value = "30"
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
                        <input type="number" className={style.inputCell} defaultValue={15} onChange={setValue} />
                        <span>px</span>
                    </div>
                </div>

            </div>
            <div className={style.FieldItem}>
                <span className={style.title}>поле</span>
                <div className={style.field}>
                    <i className={"fa-solid fa-arrow-up " + style.fieldUpHeight + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-down " + style.fieldDownHeight + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-left " + style.fieldLeftWidth + " " + style.arrow}></i>
                    <i className={"fa-solid fa-arrow-right " + style.fieldRightWidth + " " + style.arrow}></i>

                </div>
            </div>
        </div >
    )
}

export default SizePanel
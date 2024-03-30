import React, { ChangeEvent } from 'react';
import style from './style.module.scss'
const SizePanel = () => {

    const setValue = (el:ChangeEvent) => {
        const targetEl:HTMLInputElement = el.target as HTMLInputElement
        console.log(targetEl.value.split('').slice(0, 2));
        
        if(targetEl.value.length > 2)
            targetEl.value = targetEl.value.split('').slice(0, 2).join('')

    }

    return (
        <div className={style.settingField}>

            <div className={style.FieldItem}>
                <span className={style.title}>клетка</span>
                <div className={style.cell}>
                    <i className={"fa-solid fa-arrows-up-down " + style.cellArrowHeight}></i>
                    <i className={"fa-solid fa-arrows-left-right " + style.cellArrowWidth}></i>

                    <div className={style.inputField}>
                        <input type="number" className={style.inputCell} defaultValue={15} onChange={setValue}/>
                        <span>px</span>
                    </div>
                </div>

            </div>
            <div className={style.FieldItem}>
                <span className={style.title}>поле</span>
                <div className={style.field}></div>
            </div>
        </div>
    )
}

export default SizePanel
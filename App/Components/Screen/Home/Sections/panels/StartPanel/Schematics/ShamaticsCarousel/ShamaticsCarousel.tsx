import { useState } from 'react';
import style from './style.module.scss'
import Scheme from './Scheme/Scheme'
import { dataPrints } from '../../../../../../../../../src/store/GameSettings/DataPrints';
const ShamaticsCarousel = () => {
    const [pagePrints, setPagePrints] = useState(0)
    const maxPage = Math.ceil(dataPrints.length / 3)-1
    const movePage = (move: number): void => {
        setPagePrints(state=>state+move)
    }
    
    return (
        <>
            <i className={"fa-solid fa-caret-left " + style.icon} onClick={() => pagePrints != 0 ? movePage(-1): ""}></i>
            <div className={style.schemes}>
                {dataPrints.slice(pagePrints * 3, pagePrints * 3 + 3).map((el, i) => <Scheme id={el.id-1} key={i.toString()} />)}
            </div>
            <i className={"fa-solid fa-caret-right " + style.icon} onClick={() => pagePrints != maxPage ? movePage(1): ""}></i>
        </>
    )
}

export default ShamaticsCarousel
import style from './style.module.scss'
import Scheme from './Scheme/Scheme'

const Schematics = () => {
    return (
        <div className={style.schematicsPanel}>
            <span>готовые схемы</span>
            <div className={style.carouselSchemes}>
                <i className="fa-solid fa-caret-left"></i>
                <div className={style.schemes}>
                    <Scheme />
                    <Scheme />
                    <Scheme />
                </div>
                <i className="fa-solid fa-caret-right"></i>
            </div>
        </div>
    )
}

export default Schematics
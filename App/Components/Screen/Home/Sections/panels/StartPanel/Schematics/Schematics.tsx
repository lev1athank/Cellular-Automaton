import style from './style.module.scss'
import ShamaticsCarousel from './ShamaticsCarousel/ShamaticsCarousel'
const Schematics = () => {

    return (
        <div className={style.schematicsPanel}>
            <span>готовые схемы</span>
            <div className={style.carouselSchemes}>
                <ShamaticsCarousel />
            </div>
        </div>
    )
}

export default Schematics
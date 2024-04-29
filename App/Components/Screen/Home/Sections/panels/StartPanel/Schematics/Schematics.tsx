import style from './style.module.scss'
import ShamaticsCarousel from './ShamaticsCarousel/ShamaticsCarousel'
const Schematics = () => {

    return (
        <div className={style.schematicsPanel}>
            <p>готовые схемы</p>
            <div className={style.carouselSchemes}>
                <ShamaticsCarousel />
            </div>
        </div>
    )
}

export default Schematics
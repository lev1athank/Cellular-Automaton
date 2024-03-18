import style from './style.module.scss'
const GameButton = () => {
    return (
        <div className={style.gamePanel}>
            <button className={style.restartANDclear}><span>заново</span><i className="fa-solid fa-rotate-right"></i></button>
            <button className={style.startANDstop}><span>старт</span><i className="fa-solid fa-play"></i></button>
        </div>
    )
}

export default GameButton
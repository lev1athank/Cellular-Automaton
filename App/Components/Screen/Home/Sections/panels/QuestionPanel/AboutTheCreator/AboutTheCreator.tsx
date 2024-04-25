import style from './style.module.scss'
const AboutTheCreator = () => {
    return (
        <div className={style.aboutTheCreator}>
            Моя первая серьезная игра — это проект на основе <b>"Клеточного автомата"</b>, где простые правила создают удивительные паттерны. <br /> <br />

            До этого я уже создавал эту игру, но она были на чистом <b>JavaScript</b>, его было тяжело — поддерживать и развивать. И я решил полностью переписатьэту игру использую <b>React</b>, <b>TypeScript</b>, <b>Redux</b> и <b>SASS</b>, что позволяет делать все проще и гибче. <br /> <br />

            Я рад поделиться своей первой игрой, и это лишь начало. <br /> <br />
        </div>
    )
}

export default AboutTheCreator
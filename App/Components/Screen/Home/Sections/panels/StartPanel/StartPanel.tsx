import style from './style.module.scss'
import SpeedRange from './SpeedRange/SpeedRange'
import Schematics from './Schematics/Schematics'
import GameButton from './GameButton/GameButton'

const StartPanel = () => {

	return (
		<div className={style.startPanel}>
			<GameButton />
			<SpeedRange />
			<Schematics />
		</div>
	)
}

export default StartPanel
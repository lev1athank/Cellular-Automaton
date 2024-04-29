import { useDispatch } from 'react-redux'
import style from './style.module.scss'
import { actions } from '../../../../../../../../../../src/store/GameSettings/GameSettings.slice'
import { useTypedSelector } from '../../../../../../../../../../src/hooks/useTypedSelector'
import { dataPrints } from '../../../../../../../../../../src/store/GameSettings/DataPrints'
const Scheme = (element: { id: number }) => {
	
	const { activePrint } = useTypedSelector(state => state)
	const dispatch = useDispatch()
	const isActive = activePrint?.id === element.id + 1
	
	const toggleActive = ()=> dispatch(actions.setActivePrints(isActive? -1 : element.id))

	return (
		<span className={style.scheme + " " + (isActive ? style.active : "")} onClick={toggleActive} >
			<img src={dataPrints[element.id].image} alt="" />
		</span>
	)
}

// Scheme.prototype = {
//   object
// }

export default Scheme
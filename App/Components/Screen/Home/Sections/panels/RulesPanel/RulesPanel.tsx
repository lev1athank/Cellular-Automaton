import { useRef } from 'react'
import { settings } from '../../../../../../../src/store/settingCanvas/settingCanvas'
import style from './style.module.scss'
import ColorField from './ColorField/ColorField'
const RulesPanel = () => {
	const emerge = useRef<HTMLInputElement>(null)
	const survives = useRef<HTMLInputElement>(null)

	const enum EnumRule {
		"emerge", "survives"
	}

	const setNewRule = (idRule: number) => {
		if (idRule == EnumRule.emerge)
			settings.emerges = emerge.current?.value.split("").map(el => +el) || [3]
		else if (idRule == EnumRule.survives)
			settings.survives = survives.current?.value.split("").map(el => +el) || [2, 3]
	}

	let list: number[] = []
	const random = (): any => {
		const randomFigures = Math.floor(Math.random() * 9)
		
		if (list.indexOf(randomFigures) != -1)
			return random()
		else
			return randomFigures
	}

	const randomizer = (idRule: number) => {
		const count: number = Math.floor(Math.random() * 7) + 1
		for (let i = count; i--;) list.push(random())

		const numbers:string = list.sort().join('')
		list = []
		
		

		if (!emerge.current) return
		if (!survives.current) return

		if (idRule == EnumRule.emerge)
			emerge.current.value = numbers
		else if (idRule == EnumRule.survives)
			survives.current.value = numbers

		setNewRule(idRule)

	}


	return (
		<div className={style.rulesPanel}>
			<div className={style.rules}>
				<div className={style.rule}>появляются<input className={style.inputRule} type="number" ref={emerge} defaultValue={settings.emerges.join('')} onChange={() => setNewRule(EnumRule.emerge)} /> <i className={"fa-solid fa-rotate " + style.randomBtn} onClick={() => randomizer(EnumRule.emerge)}></i></div>
				<div className={style.rule}>выживают<input className={style.inputRule} type="number" ref={survives} defaultValue={settings.survives.join('')} onChange={() => setNewRule(EnumRule.survives)} />  <i className={"fa-solid fa-rotate " + style.randomBtn} onClick={() => randomizer(EnumRule.survives)}></i></div>
			</div>
			<div className={style.ruleColors}>
				<span className={style.title}>Клетки</span>
				<ColorField />
			</div>
		</div>
	)
}

export default RulesPanel
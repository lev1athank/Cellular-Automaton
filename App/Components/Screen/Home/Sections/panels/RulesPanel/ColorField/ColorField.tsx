import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss'
import { settings } from '../../../../../../../../src/store/settingCanvas/settingCanvas';
import ColorManagement from './ColorManagement/ColorManagement'
import rgbHex from 'rgb-hex';


const ColorField = () => {

	const [activeColor, setActiveColor] = useState(0)
	const [updataFiel, setupdata] = useState(0)
	const freeNeighbor: number[] = []
	const usingNeighbor: number[] = settings.colorsPix.map(el => el.neighbors)


	for (let i = 0; i < 9; i++) {
		if (usingNeighbor.indexOf(i) == -1)
			freeNeighbor.push(i)

	}


	const colorFocus = (id: number) => {
		setActiveColor(id)
	}

	const update = () => setupdata(state => state + 1)

	const newColor = () => {
		const random = (): number => Math.round(Math.random() * 255)
		const idNewColor = settings.colorsPix.push({
			neighbors: freeNeighbor[0],
			rgb: `#${rgbHex(random(), random(), random())}`
		})
		console.log(idNewColor - 1);

		setActiveColor(idNewColor - 1)
	}

	const editColor = (neighbors: number, color: string) => {
		settings.colorsPix[activeColor] = {
			neighbors: neighbors,
			rgb: color
		}
		update()
	}
	const deleteColor = () => {
		if (settings.colorsPix.length == 1) return
		
		let move: number = -1
		
		activeColor - 1 < 0 ? move = 0 : move = -1
		settings.colorsPix.splice(activeColor, 1)
		
		setActiveColor(state=>state + move)
		update()
	}

	return (
		<div className={style.colorField}>
			<div className={style.colorsLine}>
				{settings.colorsPix.map((el, i) => <span className={style.color + (activeColor == i ? ' ' + style.active : '')} style={{ backgroundColor: el.rgb }} key={i} onClick={() => colorFocus(i)} ><span className={style.neighbors}>{el.neighbors}</span></span>)}
				{settings.colorsPix.length < 9 ? <i className={"fa-solid fa-plus " + style.addColor} onClick={newColor}></i> : ""}
			</div>

			<ColorManagement id={activeColor} createColor={editColor} deleteColor={deleteColor} />
		</div >
	)
}

export default ColorField
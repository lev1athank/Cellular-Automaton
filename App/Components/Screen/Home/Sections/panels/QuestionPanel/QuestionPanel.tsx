import { useState } from 'react'
import style from './style.module.scss'
import { colorPanel } from './../../../../../../assets/interface/colorPanelSetting.interface'
import AboutGame from './AboutGame/AboutGame'
import RulesGame from './RulesGame/RulesGame'
import AboutTheCreator from './AboutTheCreator/AboutTheCreator'
import AdditionalInformation from './AdditionalInformation/AdditionalInformation'
const QuestionPanel = () => {
	const [activeQuestion, setActiveQuestion] = useState<colorPanel>({
		name: "Информация",
		element: null
	})
	const questionElements: colorPanel[] = [
		{
			name: "О игре",
			element: <AboutGame />
		},
		{
			name: "Правила",
			element: <RulesGame />
		},
		{
			name: "О создателе",
			element: <AboutTheCreator />
		},
		{
			name: "Дополнительная информация",
			element: <AdditionalInformation />
		}
	]


	return (
		<div className={style.questionPanel}>
			<div className={style.titleNavigate}>{activeQuestion.element != null ? <button className={style.back} onClick={()=>setActiveQuestion({name:"Информация",element:null })}>Назад</button> : ""}{activeQuestion.name}</div>
			{
				activeQuestion.element !== null ? activeQuestion.element :
					questionElements.map((quest, i) => <span className={style.question} onClick={() => setActiveQuestion(quest)} key={i}>{quest.name}</span>)
			}

		</div>
	)
}

export default QuestionPanel
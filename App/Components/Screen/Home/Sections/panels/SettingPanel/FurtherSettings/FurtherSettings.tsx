import style from './style.module.scss'
import { EnumRules, settings } from '../../../../../../../../src/store/settingCanvas/settingCanvas'
const FurtherSettings = () => {

  const toggleChecked = (el: EventTarget, id: number) => {
    const target: HTMLDivElement = el as HTMLDivElement
    const stateTC = target.classList.toggle(style.active)

    if (id == EnumRules.fastSpeed)
      settings.rules.fastSpeed = stateTC
    else if (id == EnumRules.noEdges)
      settings.rules.noEdges = stateTC

  }

  type TRules = {
    name: string,
    funID: number,
    isActive: boolean
  }

  const rules:TRules[] = [
    {
      name: "Без краев",
      funID: EnumRules.noEdges,
      isActive: settings.rules.noEdges
    },
    {
      name: "x2 скорость",
      funID: EnumRules.fastSpeed,
      isActive: settings.rules.fastSpeed
    }
  ]
  console.log(settings.rules);
  console.log(style.active);
  return (
    <>
      <div className={style.furtherSettings}>
        {
          rules.map((rule, i)=> <div key={i} onClick={(el) => toggleChecked(el.currentTarget, rule.funID)} className={`${style.setting} ${rule.isActive? style.active : ""}` }><span className={style.text}>{rule.name}</span><span className={style.inputCheckboxCustom}></span></div>)
        }
      </div>
    </>
  )
}

export default FurtherSettings
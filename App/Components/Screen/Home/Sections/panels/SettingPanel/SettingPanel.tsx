import style from './style.module.scss'
import SizePanel from './SizePanel/SizePanel'
const SettingPanel= () => {
  return (
    <div className={style.settingPanelMain}>
      <SizePanel />
    </div>
  )
}

export default SettingPanel
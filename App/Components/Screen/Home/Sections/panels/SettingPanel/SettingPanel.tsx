import style from './style.module.scss'
import SizePanel from './SizePanel/SizePanel'
import FurtherSettings from './FurtherSettings/FurtherSettings'
const SettingPanel= () => {
  return (
    <div className={style.settingPanelMain}>
      <SizePanel />
      <FurtherSettings />
    </div>
  )
}

export default SettingPanel
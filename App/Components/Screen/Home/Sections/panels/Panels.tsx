import StartPanel from './StartPanel/StartPanel'
import SettingPanel from './SettingPanel/SettingPanel'
import RulesPanel from './RulesPanel/RulesPanel'
import ColorPanel from './ColorPanel/ColorPanel'
import style from './style.module.scss'
import { IBookmarkList } from './../../../../../assets/interface/BookmarkBtn'
import BookmarkBtn from './../../../../../shared/BookmarkBtn/BookmarkBtn'
import { useState } from 'react'


const store: IBookmarkList[] = [{
    text: "Игра",
    element: <StartPanel />,
},
{
    text: "Настройки",
    element: <SettingPanel />,
},
{
    text: "Правила",
    element: <RulesPanel />,
},
{
    text: "Цвета",
    element: <ColorPanel />,
},]


const Panels = () => {


    const [activeEl, setActiveEl] = useState<TfunState>({ el: <StartPanel />, text: '' })

    type TfunState = {
        el: JSX.Element;
        text: string
    }

    console.log(activeEl.el);
    
    return (
        <div className={style.zonePalen}>
            <div className={style.panel}>
                <div className={style.bookmark}>
                    {
                        store.map((v, i) => <BookmarkBtn {...v} isActive={v.text == activeEl.text || i == 0} setActive={setActiveEl} key={i} />)
                    }
                </div>
                <div className={style.place}>
                {
                    activeEl.el
                }
                </div>
            </div>
        </div>
    )
}

export default Panels
import StartPanel from './StartPanel/StartPanel'
import SettingPanel from './SettingPanel/SettingPanel'
import RulesPanel from './RulesPanel/RulesPanel'
import ColorPanel from './ColorPanel/ColorPanel'
import style from './style.module.scss'
import { IBookmarkList } from './../../../../../assets/interface/BookmarkBtn'
import BookmarkBtn from './../../../../../shared/BookmarkBtn/BookmarkBtn'
import { useState } from 'react'


const store: IBookmarkList[] = [{
    text: "fa-solid fa-gamepad",
    element: <StartPanel />,
},
{
    text: "fa-solid fa-gear",
    element: <SettingPanel />,
},
{
    text: "fa-solid fa-heart-pulse",
    element: <RulesPanel />,
},
{
    text: "fa-solid fa-palette",
    element: <ColorPanel />,
},]


const Panels = () => {


    const [activeEl, setActiveEl] = useState<TfunState>({ el: <StartPanel />, text: '' })
    const [isClosePanel, setClosePanel] = useState<boolean>(false)

    type TfunState = {
        el: JSX.Element;
        text: string
    }

    console.log(activeEl.el);

    return (
        <div className={style.zonePalen}>
            <div className={style.openPanel} onClick={() => setClosePanel(false)}>
                <img src='unwrap.svg' />
            </div>
            <div className={style.panel}>
                <div className={style.bookmark}>
                    {
                        store.map((v, i) => <BookmarkBtn {...v} isActive={v.text == activeEl.text || (i == 0 && activeEl.text == v.text)} setActive={setActiveEl} key={i} />)
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
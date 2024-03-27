import StartPanel from './StartPanel/StartPanel'
import SettingPanel from './SettingPanel/SettingPanel'
import RulesPanel from './RulesPanel/RulesPanel'
import ColorPanel from './ColorPanel/ColorPanel'
import style from './style.module.scss'
import { IBookmarkList } from './../../../../../assets/interface/BookmarkBtn'
import BookmarkBtn from './../../../../../shared/BookmarkBtn/BookmarkBtn'
import { ReactHTMLElement, useRef, useState } from 'react'


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


    const [activeEl, setActiveEl] = useState<TfunState>({ el: <StartPanel />, text: 'fa-solid fa-gamepad' })
    const [isClosePanel, setClosePanel] = useState<boolean>(false)

    const panle = useRef<HTMLElement>(null)
    type TfunState = {
        el: JSX.Element;
        text: string
    }

    console.log(activeEl.el);

    const movePanel = (e:React.DragEvent) => {
        console.log();
        
    }

    return (
        <div className={style.zonePalen}>

            <div className={style.openPanel} style={isClosePanel ? {display:'grid'} : {display:'none'}} onClick={() => setClosePanel(false)} onDrag={movePanel}>
                <img src='unwrap.svg' />
            </div>
            <div className={style.panelEl} style={!isClosePanel ? {display:'block'} : {display:'none'}}>
                <div className={style.panelBtn}>
                    <button className={style.btn}><i className={"fa-solid fa-up-down-left-right " + style.icon} style={{ cursor: 'grab' }}></i></button>
                    <button className={style.btn}><i className={"fa-solid fa-xmark " + style.icon} onClick={() => setClosePanel(true)} ></i></button>
                </div>
                <div className={style.panel}>
                    <div className={style.bookmark}>
                        {
                            store.map((v, i) => <BookmarkBtn {...v} isActive={v.text == activeEl.text} setActive={setActiveEl} key={i} />)
                        }
                    </div>
                    <div className={style.place}>
                        {
                            activeEl.el
                        }
                    </div>
                </div>
            </div>




        </div>
    )
}

export default Panels
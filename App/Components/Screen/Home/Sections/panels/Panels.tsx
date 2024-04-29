import StartPanel from './StartPanel/StartPanel'
import SettingPanel from './SettingPanel/SettingPanel'
import RulesPanel from './RulesPanel/RulesPanel'
import QuestionPanel from './QuestionPanel/QuestionPanel'
import style from './style.module.scss'
import { IBookmarkList } from './../../../../../assets/interface/BookmarkBtn'
import BookmarkBtn from './../../../../../shared/BookmarkBtn/BookmarkBtn'
import { useRef, useState } from 'react'


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
    text: "fa-solid fa-question",
    element: <QuestionPanel />,
},]


const Panels = () => {

    const [activeEl, setActiveEl] = useState<TfunState>({ el: <StartPanel />, text: 'fa-solid fa-gamepad' })
    const [isClosePanel, setClosePanel] = useState<boolean>(false)

    const panel = useRef<HTMLDivElement>(null)
    type TfunState = {
        el: JSX.Element;
        text: string
    }

    const moveFun = (moveEvent: MouseEvent) => {
        if (!panel.current) return

        const x: number = moveEvent.pageX - 650 * 2.68
        const y: number = moveEvent.pageY - 175
        panel.current.style.top = `${y}px`
        panel.current.style.left = `${x}px`
        document.addEventListener('mouseup', () => document.removeEventListener('mousemove', moveFun))

    }

    const movePanelDown = () => document.addEventListener('mousemove', moveFun)


    return (
        <>
            <div className={style.openPanel} style={isClosePanel ? { display: 'grid' } : { display: 'none' }} onClick={() => setClosePanel(false)} >
                <img src='unwrap.svg' />
            </div>
            <div className={style.panelEl} style={!isClosePanel ? { display: 'block' } : { display: 'none' }} ref={panel} >
                <div className={style.panelBtn}>
                    <button className={style.btn} onMouseDown={movePanelDown}><i className={"fa-solid fa-up-down-left-right " + style.icon} ></i></button>
                    <button className={style.btn} onClick={() => setClosePanel(true)} ><i className={"fa-solid fa-xmark " + style.icon} ></i></button>
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




        </>
    )
}

export default Panels
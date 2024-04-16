import style from './style.module.scss'
import { IBookmarkEl } from '../../assets/interface/BookmarkBtn'
import { useTypedSelector } from '../../../src/hooks/useTypedSelector'
const BookmarkBtn = (prop: IBookmarkEl) => {
  const { isRun } = useTypedSelector(state => state)

  return (
    <button disabled={isRun} className={style.buttonBtn + (prop.isActive ? (" " + style.active) : "") + (isRun ? (" " + style.running) : "")} onClick={() => prop.setActive({el: prop.element, text: prop.text})}><i className={prop.text + " " + style.icon}></i></button>
  )
}

export default BookmarkBtn
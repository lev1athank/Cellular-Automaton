import style from './style.module.scss'
import { IBookmarkEl } from '../../assets/interface/BookmarkBtn'
const BookmarkBtn = (prop: IBookmarkEl) => {

  console.log(prop.isActive);

  return (
    <div className={style.buttonBtn + (prop.isActive ? (" " + style.active) : "")} onClick={() => prop.setActive({el: prop.element, text: prop.text})}>{prop.text}</div>
  )
}

export default BookmarkBtn
import './TabContent.css'
import { ItemState } from 'types'

type Props<T> = {
  style?: React.CSSProperties
  list: NonNullable<T>[]
  title: string
  active: T
  setActive: (item: T) => void
  setDraggedItem: React.Dispatch<React.SetStateAction<T>>
}

const TabContent = <T extends ItemState[keyof ItemState],>({ style, list, active, setActive, setDraggedItem }: Props<T>): JSX.Element => {
  const dragStartHandler = (item: T): void => {
    setDraggedItem(item)
  }
  const dragEndHandler = (): void => {
    setDraggedItem(null as T)
  }
  const setActiveItem = (item: NonNullable<T>): void => {
    const target = active && active.id === item.id ? null : item
    setActive(target as T)
  }
  return (
    <ul className="tab-list" style={style}>
      {list.map(item => {
        let className = 'tab-list_item'
        if (active && item.id === active.id) {
          className += ' active'
        }
      return (
        <li className={className} key={item.id}>
          <button onClick={() => setActiveItem(item)}>
            <span
              className={item.type + ' ' + item.type + '_' + item.id}
              role="img"
              aria-label={item.name}
              draggable={true}
              onDragStart={() => dragStartHandler(item)}
              onDragEnd={dragEndHandler}
            ></span>
          </button>
        </li>
      )})}
    </ul>
  )
}

export default TabContent

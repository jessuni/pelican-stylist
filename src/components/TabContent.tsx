import './TabContent.css'
import { Item } from 'types'

type Props<T = Item> = {
  list: T[]
  title: string
  active: T | null
  setActive: (item: T | null) => void
  setDraggedItem: (item: T | null) => void
}

const TabContent = <T extends Item,>({ list, active, setActive, setDraggedItem }: Props<T>): JSX.Element => {
  const dragStartHandler = (item: T): void => {
    setDraggedItem(item)
  }
  const dragEndHandler = (): void => {
    setDraggedItem(null)
  }
  return (
    <ul className="tab-list">
      {list.map(item => {
        let className = 'tab-list_item'
        if (active && item.id === active.id) {
          className += ' active'
        }
      return (
        <li className={className} key={item.id}>
          <button onClick={() => setActive(item)}>
            <img src={item.img} alt={item.name} onDragStart={() => dragStartHandler(item)} onDragEnd={dragEndHandler}></img>
          </button>
        </li>
      )})}
    </ul>
  )
}

export default TabContent

import './TabContent.css'
import { Item } from 'types'

type Props = {
  list: Item[]
  title: string,
  active: number
  setActive: (id: number) => void
}

function TabContent({ list, active, setActive }: Props): JSX.Element {
  return (
    <ul className="tab-list">
      {list.map(item => {
        let className = 'tab-list_item'
        if (item.id === active) {
          className += ' active'
        }
      return (
        <li className={className} key={item.id}>
          <button onClick={() => setActive(item.id)}>
            <img src={item.img} alt={item.name}></img>
          </button>
        </li>
      )})}
    </ul>
  )
}

export default TabContent

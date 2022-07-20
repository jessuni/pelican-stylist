import './TabContent.css'
import { Item } from 'types'

type Props = {
  list: Item[]
  title: string
}

function TabContent({ list }: Props): JSX.Element {
  return (
    <ul className="item-list">
      {list.map(item => (
        <li className="item" key={item.id}>
          <button>
            <img src={item.img} alt={item.name}></img>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TabContent

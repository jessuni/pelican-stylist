import './EditPanelList.css'
import { Item } from 'types'

function EditPanelList({ list }: { list: Item[] } ) {
  const items: JSX.Element[] = list.map(item => {
    return (
      <li className="item" key={item.id}>
        <button className="item-button">
          <img src={item.img} alt={item.name}></img>
        </button>
        {/* <span>{item.name}</span> */}
      </li>
    )
  })
  return (
    <ul className="item-list">{items}</ul>
  )
}

export default EditPanelList

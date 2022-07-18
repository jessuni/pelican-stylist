import './EditPanel.css'

import { useState } from 'react'
import { Item } from 'types'
import EditPanelList from './EditPanelList'
import hat_icon from '@/assets/hat.svg'
import top_icon from '@/assets/top.svg'
import bottom_icon from '@/assets/bottom.svg'
import footwear_icon from '@/assets/footwear.svg'

const ICONS = {
  hats: hat_icon,
  tops: top_icon,
  bottoms: bottom_icon,
  footwear: footwear_icon,
}

type EditPanelProps = {
  data: { [key: string]: Item[] }
}

function EditPanel({ data }: EditPanelProps) {
  const [active, setActive] = useState<string|null>(null)
  let tabItems: JSX.Element[] = []
  let contentLists: JSX.Element[] = []
  Object.keys(data).forEach(key => {
    if (!active) {
      setActive(key)
    }
    // TODO: isActive
    tabItems.push(
      <li className="edit-tabs-item" key={key}>
        <img alt={key} src={ICONS[key as keyof typeof ICONS]} />
      </li>
    )
    contentLists.push(<EditPanelList list={data[key]} key={key} />)
  })
  return (
    <div>
      <nav className="edit-tabs">
        <ul>
          {tabItems}
        </ul>
      </nav>
      {contentLists}
    </div>
  )
}

export default EditPanel

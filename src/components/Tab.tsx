import './Tab.css'

import { ReactElement, useState } from 'react'
import TabItem from './TabItem'
import { Item } from 'types'

import hat_icon from '@/assets/hat.svg'
import top_icon from '@/assets/top.svg'
import bottom_icon from '@/assets/bottom.svg'
import shoes_icon from '@/assets/footwear.svg'

const ICONS = {
  hats: hat_icon,
  tops: top_icon,
  bottoms: bottom_icon,
  shoes: shoes_icon,
}

type Props = {
  data: { [key: string]: Item[] }
  children: ReactElement[]
}

function Tab({ children }: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('hats')
  const tabItems = children.map(item => {
    const key = item.props.title
    return (
      <TabItem
        key={key}
        src={ICONS[key as keyof typeof ICONS]}
        title={key}
        activeTab={activeTab}
        setActiveTab={setActiveTab} />
    )
  })
  return (
    <div className="tab">
      <nav>
        <ul className="tab-items">
          {tabItems}
          <div className="tab-glider"></div>
        </ul>
      </nav>
      {children.filter(item => item.props.title === activeTab)}
    </div>
  )
}

export default Tab

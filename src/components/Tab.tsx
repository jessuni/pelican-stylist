import './Tab.css'

import { ReactElement, useState } from 'react'
import TabItem from './TabItem'
import { Item } from 'types'

type Props = {
  data: { [key: string]: Item[] }
  icons: object
  children: ReactElement[]
}

function Tab({ icons, children }: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('hats')
  const tabItems = children.map(item => {
    const key = item.props.title
    return (
      <TabItem
        key={key}
        src={icons[key as keyof typeof icons]}
        title={key}
        activeTab={activeTab}
        setActiveTab={setActiveTab} />
    )
  })
  return (
    <div className="tab">
      <nav>
        <div className="tab-items">
          {tabItems}
          <div className="tab-glider"></div>
        </div>
      </nav>
      {children.filter(item => item.props.title === activeTab)}
    </div>
  )
}

export default Tab

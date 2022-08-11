import './Tab.css'

import { ReactElement, useState } from 'react'
import KeepAlive from 'react-activation'
import TabItem from './TabItem'

type Props = {
  children: ReactElement[]
}

function Tab({ children }: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('hat')
  const tabItems = children.map(item => {
    const key = item.props.title
    const url = new URL(`../assets/${key}.svg`, import.meta.url).href
    return (
      <TabItem
        key={key}
        src={url}
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
      {children.map(item => {
        return activeTab === item.props.title &&
          <KeepAlive cacheKey={item.props.title} key={item.props.title}>{item}</KeepAlive>
        })}
    </div>
  )
}

export default Tab

import './Tab.css'

import { ReactElement, useState } from 'react'
import KeepAlive from 'react-activation'
import TabItem from './TabItem'

type Props = {
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
      {children.map(item => {
        return activeTab === item.props.title &&
          <KeepAlive cacheKey={item.props.title} key={item.props.title}>{item}</KeepAlive>
        })}
    </div>
  )
}

export default Tab

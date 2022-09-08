import './Tab.css'

import { ReactElement, useEffect, useState } from 'react'
import K from 'react-activation'
import TabItem from './TabItem'
import { ColorState } from 'types'

// @ts-ignore
// workaround for vite issue #2139
const KeepAlive = K.default ? K.default: K

type Props = {
  children: ReactElement[]
  onSetActiveTab: (tabName: keyof ColorState) => void
}

function Tab({ children, onSetActiveTab }: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('hair')
  useEffect(() => {
    onSetActiveTab(activeTab as keyof ColorState)
  }, [activeTab])
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

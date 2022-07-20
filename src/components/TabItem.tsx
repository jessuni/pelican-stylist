import './TabItem.css'

type Props = {
  activeTab: string
  setActiveTab: (title: string) => void
  title: string
  src: string
}

const TabItem: React.FC<Props> = ({ activeTab, setActiveTab, title, src }) => {
  let className = 'tab-item'
  if (activeTab === title) {
    className += ' active'
  }
  return (
    <li className={className}>
      <button onClick={() => setActiveTab(title)}>
        <img alt={title} src={src} loading="lazy" />
        <span>{title}</span>
      </button>
    </li>
  )
}

export default TabItem

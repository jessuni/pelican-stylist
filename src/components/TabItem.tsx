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
    <label className={className}>
      <input type="radio" name="tab" value={title} onChange={(e) => setActiveTab(e.target.value)} />
      <img alt={title} src={src} loading="lazy" />
      <span>{title}</span>
    </label>
  )
}

export default TabItem

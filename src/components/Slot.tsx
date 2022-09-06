import './Slot.css'
import { Item } from 'types'
import React from 'react'

type Props<T> = {
  type: string
  active: T | null
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onDel: (e: React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => void
}

function Slot ({ type, active, onDrop, onDel }: Props<Item>) {
  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }
  let children = null
  let typeName = type
  if (active) {
    typeName = active.type === 'bottom' ? 'bottom_worn' : type
    children = (<div className={`slot-img ${typeName} ${typeName}_${active.id}`} aria-label={active.name} onClick={onDel} onDragStart={onDel} tab-index="0" />)
  }
  const url = new URL(`../assets/${typeName}.svg`, import.meta.url).href
  return (
    <div onDragOver={onDragOver} onDrop={onDrop} data-name={type} className="slot">
      <div className={`slot-bg${active ? ' hide': ''}`} style={{ backgroundImage: `url(${url})` }}></div>
      {children}
    </div>
  )
}

export default Slot

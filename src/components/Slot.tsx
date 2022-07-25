import './Slot.css'
import { Item } from 'types'
import React from 'react'

type Props<T> = {
  type: string
  active: T | null
  bgImg: string
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onDel: (e: React.DragEvent<HTMLImageElement> | React.MouseEvent<HTMLImageElement>) => void
}

function Slot ({ type, bgImg, active, onDrop, onDel }: Props<Item>) {
  const onDragOver = (e: React.DragEvent<HTMLImageElement>): void => {
    e.preventDefault()
  }
  const children = active ? (<img className="slot-img" alt={active.name} src={active.img} onClick={onDel} onDragStart={onDel} />) : null
  return (
    <div onDragOver={onDragOver} onDrop={onDrop} data-name={type} className="slot">
      <div className={`slot-bg${active ? ' hide': ''}`} style={{backgroundImage: `url(${bgImg})`}}></div>
      {children}
    </div>
  )
}

export default Slot

import $style from './Avatar.module.css'
import { useRef, useEffect } from 'react'
import Slot from '@/components/Slot'
import { Item, Hat, Top, Bottom, Footwear, Hair, Accessory } from 'types'
import { States, SetStateActions } from './Main'

import avatar_bg_light from '@/assets/avatar/light.png'

type Props = {
  style?: React.CSSProperties
  inViewport: boolean
  draggedItem: Item | null
  setDraggedItem: React.Dispatch<React.SetStateAction<Item | null>>
  states: States
  setStates: SetStateActions
  className: string | null
}

function Avatar({ style, className, inViewport, draggedItem, setDraggedItem, states, setStates }: Props):JSX.Element {
  const outfitRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (outfitRef && outfitRef.current) {
      if (draggedItem) {
        const type = draggedItem.type
        outfitRef.current.querySelectorAll('[data-name]').forEach(el => {
          if (el.getAttribute('data-name') === type) {
            el.classList.add($style.active)
          } else {
            el.classList.add($style.disabled)
          }
        })
      } else {
        Array.from(outfitRef.current.children).forEach(el => {
          if (el.classList.contains($style.active)) {
            el.classList.remove($style.active)
          } else {
            el.classList.remove($style.disabled)
          }
        })
      }

    }
  }, [draggedItem])

  const dropHandler = (e: React.DragEvent<HTMLDivElement>):void => {
    e.preventDefault()
    let el = e.target as HTMLElement
    if (el.classList.contains('slot-img')) {
      el = el.parentElement as HTMLElement
    }
    if (draggedItem && el.getAttribute('data-name') === draggedItem.type) {
      setStates[draggedItem.type](draggedItem as Hair|Hat|Top|Bottom|Footwear|Accessory)
    }
    setDraggedItem(null)
  }

  const delHandler = (e: React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>): void => {
    const el = (e.target as HTMLElement).parentElement as HTMLDivElement
    setStates[el.getAttribute('data-name') as string](null)
  }

  return (
    <section className={`${$style.container} ${className}${inViewport ? ' ' + $style.overview : ''}`} style={style}>
      <div className={$style.avatar}>
        <div className={$style.display}>
          <img src={avatar_bg_light} alt="avatar in light background" />
          <div className={$style.body}>
            <div className="body_female" role="img" aria-label="avatar body"></div>
          </div>
          <div className={$style.arm}>
            <div className="arm_female" role="img" aria-label="avatar arm"></div>
          </div>
          {Object.keys(states).map(k => {
            return states[k]
              ? <div className={$style['' + k]} key={k}>
                  <div className={`${k} ${states[k]?.type}_${states[k]?.id}`}></div>
                </div>
              : null
          })}
          <div className={$style.skin}></div>
          <div className={$style.eyes}></div>
        </div>
        <div className={$style.outfit} ref={outfitRef}>
          {Object.keys(states).map(k => {
            return <Slot key={k} type={k} active={states[k]} onDrop={dropHandler} onDel={delHandler} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Avatar

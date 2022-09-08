import $style from './Avatar.module.css'
import { useRef, useEffect } from 'react'
import Slot from '@/components/Slot'
import { ItemState, ItemAction } from 'types'

import avatar_bg_light from '@/assets/avatar/light.png'

type Props = {
  style?: React.CSSProperties
  draggedItem: ItemState[keyof ItemState]
  setDraggedItem: React.Dispatch<React.SetStateAction<ItemState[keyof ItemState]>>
  state: ItemState
  dispatch: React.Dispatch<ItemAction>
  className: string
}

function Avatar({ style, className, draggedItem, setDraggedItem, state, dispatch }: Props):JSX.Element {
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
      dispatch({ type: draggedItem.type as keyof ItemState, payload: draggedItem })
    }
    setDraggedItem(null)
  }

  const delHandler = (e: React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>): void => {
    const el = (e.target as HTMLElement).parentElement as HTMLDivElement
    dispatch({ type: el.getAttribute('data-name') as keyof ItemState, payload: null })
  }

  const itemTypes = Object.keys(state) as (keyof ItemState)[]
  const itemList = itemTypes.map(k => {
    // Bottom image, when worn, is different from it as an item
    const type = state[k]?.type === 'bottom' ? 'bottom_worn' : k
    const dyable = state[k]?.dyable ? ' dyable' : ''
    return state[k as keyof ItemState]
      ? <div className={$style['' + k]} key={k}>
          <div className={`${type} ${type}_${state[k]?.id}${dyable}`}></div>
        </div>
      : null
  })

  return (
    <section className={className} style={style}>
      <div className={$style.avatar}>
        <div className={$style.display}>
          <img src={avatar_bg_light} alt="avatar in light background" />
          <div className={$style.body}>
            <div className="body_female" role="img" aria-label="avatar body"></div>
          </div>
          <div className={$style.arm}>
            <div className="arm_female" role="img" aria-label="avatar arm"></div>
          </div>
          {itemList}
          <div className={$style.skin}></div>
          <div className={$style.eyes}></div>
        </div>
        <div className={$style.outfit} ref={outfitRef}>
          {itemTypes.map(k => {
            return <Slot key={k} type={k} active={state[k]} onDrop={dropHandler} onDel={delHandler} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Avatar

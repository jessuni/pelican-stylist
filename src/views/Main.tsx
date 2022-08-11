import $style from './Main.module.css'

import React, { useEffect, useRef,useState } from 'react'
import Tab from '@/components/Tab'
import TabContent from '@/components/TabContent'
import Slot from '@/components/Slot'
import useIntersection from '@/composables/useIntersection'
import { Item, Footwear, Hat, Top, Bottom } from 'types'

import _shoes from '@data/footwear.json'
import _hats from '@data/hats.json'
import _tops from '@data/tops.json'
import _bottoms from '@data/bottoms.json'

type SetStateActions = { [key: string]: React.Dispatch<React.SetStateAction<any>> }
type States = { [key: string]: Item | null }
type Data = { [key:string]: Item[] }

const data: Data = {
  shoe: _shoes as Footwear[],
  hat: _hats as Hat[],
  top: _tops as Top[],
  bottom: _bottoms as Bottom[],
}

function Main(): JSX.Element {
  const exportElRef = useRef<HTMLElement>(null)
  const outfitRef = useRef<HTMLDivElement>(null)
  const inViewport = useIntersection(exportElRef)
  const [shoe, setShoe] = useState<Footwear|null>(null)
  const [hat, setHat] = useState<Hat|null>(null)
  const [top, setTop] = useState<Top|null>(null)
  const [bottom, setBottom] = useState<Bottom|null>(null)
  const [draggedItem, setDraggedItem] = useState<Item|null>(null)

  const states: States = { hat, top, bottom, shoe }
  const setStates: SetStateActions = {
    hat: setHat,
    top: setTop,
    bottom: setBottom,
    shoe: setShoe,
  }

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
    if (el.nodeName === 'IMG') {
      el = el.parentElement as HTMLElement
    }
    if (draggedItem && el.getAttribute('data-name') === draggedItem.type) {
      setStates[draggedItem.type](draggedItem as Hat|Top|Bottom|Footwear)
    }
    setDraggedItem(null)
  }

  const delHandler = (e: React.DragEvent<HTMLImageElement> | React.MouseEvent<HTMLImageElement>): void => {
    const el = (e.target as HTMLElement).parentElement as HTMLDivElement
    setStates[el.getAttribute('data-name') as string](null)
  }

  return (
    <main className={$style.main} id="main">
      <section className={$style.edit}>
        <Tab>
          {Object.keys(states).map(k => (
            <TabContent key={k} title={k} list={data[k]} setActive={setStates[k]} active={states[k]} setDraggedItem={setDraggedItem} />
          ))}
        </Tab>
      </section>
      <section className={$style.avatar_container}>
        <div className={`${$style.avatar}${inViewport ? ' ' + $style.overview : ''}`}>
          <div className={$style.avatar_info}>
            <div className={$style.avatar_hair}></div>
            <div className={$style.avatar_skin}></div>
            <div className={$style.avatar_eyes}></div>
            <div className={$style.avatar_accessories}></div>
          </div>
          <div className={$style.avatar_display}></div>
          <div className={$style.avatar_outfit} ref={outfitRef}>
            {Object.keys(states).map(k => {
              return <Slot key={k} type={k} active={states[k]} onDrop={dropHandler} onDel={delHandler} />
            })}
          </div>
        </div>
      </section>
      <section className="export" ref={exportElRef}></section>
    </main>
  )
}

export default Main

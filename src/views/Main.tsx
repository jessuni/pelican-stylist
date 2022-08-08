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

import hat_icon from '@/assets/hat.svg'
import top_icon from '@/assets/top.svg'
import bottom_icon from '@/assets/bottom.svg'
import shoes_icon from '@/assets/footwear.svg'

const shoes = _shoes as Footwear[]
const hats = _hats as Hat[]
const tops = _tops as Top[]
const bottoms = _bottoms as Bottom[]

type SetStateActions = {
  [key: string]: React.Dispatch<React.SetStateAction<any>>
}

type Icons = {
  hats: string
  tops: string
  bottoms: string
  shoes: string
}

const ICONS: Icons = {
  hats: hat_icon,
  tops: top_icon,
  bottoms: bottom_icon,
  shoes: shoes_icon,
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

  const setStates: SetStateActions = {
    shoe: setShoe,
    hat: setHat,
    top: setTop,
    bottom: setBottom,
  }

  useEffect(() => {
    if (outfitRef && outfitRef.current) {
      if (draggedItem) {
        const type = draggedItem.type
        outfitRef.current.querySelectorAll('[data-name]').forEach(el => {
          if (el.getAttribute('data-name')  === type) {
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
        <Tab icons={ICONS}>
          <TabContent title="hats" list={hats} setActive={setHat} active={hat} setDraggedItem={setDraggedItem} />
          <TabContent title="tops" list={tops} setActive={setTop} active={top} setDraggedItem={setDraggedItem} />
          <TabContent title="bottoms" list={bottoms} setActive={setBottom} active={bottom} setDraggedItem={setDraggedItem} />
          <TabContent title="shoes" list={shoes} setActive={setShoe} active={shoe} setDraggedItem={setDraggedItem} />
        </Tab>
      </section>
      <section className={$style.user_container}>
        <div className={`${$style.user}${inViewport ? ' ' + $style.overview : ''}`}>
          <div className={$style.user_info}>
            <div className={$style.user_hair}></div>
            <div className={$style.user_skin}></div>
            <div className={$style.user_eyes}></div>
            <div className={$style.user_accessories}></div>
          </div>
          <div className={$style.user_display}></div>
          <div className={$style.user_outfit} ref={outfitRef}>
            <Slot type="hat" active={hat} bgImg={ICONS['hats']} onDrop={dropHandler} onDel={delHandler} />
            <Slot bgImg={ICONS['tops']} type="top" active={top} onDrop={dropHandler} onDel={delHandler} />
            <Slot bgImg={ICONS['bottoms']} type="bottom" active={bottom} onDrop={dropHandler} onDel={delHandler} />
            <Slot bgImg={ICONS['shoes']} type="shoe" active={shoe} onDrop={dropHandler} onDel={delHandler} />
          </div>
        </div>
      </section>
      <section className="export" ref={exportElRef}></section>
    </main>
  )
}

export default Main

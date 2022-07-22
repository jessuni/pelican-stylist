import $style from './Main.module.css'

import { useEffect, useRef,useState } from 'react'
import Tab from '@/components/Tab'
import TabContent from '@/components/TabContent'
import useIntersection from '@/composables/useIntersection'
import { Item, Footwear, Hat, Top, Bottom } from 'types'

import _footwear from '@data/footwear.json'
import _hats from '@data/hats.json'
import _tops from '@data/tops.json'
import _bottoms from '@data/bottoms.json'

const footwear = _footwear as Footwear[]
const hats = _hats as Hat[]
const tops = _tops as Top[]
const bottoms = _bottoms as Bottom[]

function Main(): JSX.Element {
  const exportElRef = useRef<HTMLElement>(null)
  const outfitRef = useRef<HTMLDivElement>(null)
  const inViewport = useIntersection(exportElRef)
  const [shoes, setShoes] = useState<Footwear|null>(null)
  const [hat, setHat] = useState<Hat|null>(null)
  const [top, setTop] = useState<Top|null>(null)
  const [bottom, setBottom] = useState<Bottom|null>(null)
  const [draggedItem, setDraggedItem] = useState<Item|null>(null)

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

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>):void => {
    e.preventDefault()
    if (draggedItem && (e.target as HTMLDivElement).getAttribute('data-name') === draggedItem.type) {
      // drop preview
    }
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>):void => {
    e.preventDefault()
    const el = e.target as HTMLDivElement
    console.log('drop', draggedItem)
    if (draggedItem && el.getAttribute('data-name') === draggedItem.type) {
      if (draggedItem.type === 'hat') {
        setHat(draggedItem as Hat)
      }
      // const SlotItem = (item: Item): JSX.Element => (<img alt={item.name} src={item.img} />)
      // el.props.children = <SlotItem item={draggedItem} />
    }
    setDraggedItem(null)
  }

  return (
    <main className={$style.main} id="main">
      <section className={$style.edit}>
        <Tab data={{ footwear, hats, tops, bottoms }}>
          <TabContent title="hats" list={hats} setActive={setHat} active={hat} setDraggedItem={setDraggedItem} />
          <TabContent title="tops" list={tops} setActive={setTop} active={top} setDraggedItem={setDraggedItem} />
          <TabContent title="bottoms" list={bottoms} setActive={setBottom} active={bottom} setDraggedItem={setDraggedItem} />
          <TabContent title="shoes" list={footwear} setActive={setShoes} active={shoes} setDraggedItem={setDraggedItem} />
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
            <div className={$style.user_hat} data-name="hat" onDragOver={dragOverHandler} onDrop={dropHandler}></div>
            <div className={$style.user_top} data-name="top" onDragOver={dragOverHandler} onDrop={dropHandler}></div>
            <div className={$style.user_bottom} data-name="bottom" onDragOver={dragOverHandler} onDrop={dropHandler}></div>
            <div className={$style.user_shoes} data-name="footwear" onDragOver={dragOverHandler} onDrop={dropHandler}></div>
          </div>
        </div>
      </section>
      <section className="export" ref={exportElRef}></section>
    </main>
  )
}

export default Main

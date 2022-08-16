import $style from './Main.module.css'
import '@/assets/avatar/body.css'
import '@/assets/avatar/hat.css'
import '@/assets/avatar/hair.css'
import '@/assets/avatar/top.css'
import '@/assets/avatar/bottom.css'
import '@/assets/avatar/shoe.css'
import '@/assets/avatar/accs.css'

import { useRef,useState } from 'react'
import Tab from '@/components/Tab'
import TabContent from '@/components/TabContent'
import Avatar from '@/views/Avatar'
import useIntersection from '@/composables/useIntersection'
import { Item, Footwear, Hat, Top, Bottom, Hair, Accessory } from 'types'

import _shoes from '@data/shoes.json'
import _hats from '@data/hats.json'
import _tops from '@data/tops.json'
import _bottoms from '@data/bottoms.json'

export type States = { [key: string]: Item | null }
export type SetStateActions = { [key: string]: React.Dispatch<React.SetStateAction<any>> }
type Data = { [key:string]: Item[] }

const data: Data = {
  shoe: _shoes as Footwear[],
  hat: _hats as Hat[],
  top: _tops as Top[],
  bottom: _bottoms as Bottom[],
  hair: [...new Array(74)].map((_, i) => {
    const id = 5000 + i + 1
    return {
      id,
      name: `Hair ${i + 1}`,
      type: 'hair',
      img: new URL(`../assets/avatar/hair.png`, import.meta.url).href,
      initial: true,
    }
  }) as Hair[],
  accs: [...new Array(19)].map((_, i) => {
    const id = 6000 + i + 1
    return {
      id,
      name: `Accessory ${i + 2}`,
      type: 'accs',
      img: new URL(`../assets/avatar/accs.png`, import.meta.url).href,
      initial: true,
    }
  }) as Accessory[],
}

function Main(): JSX.Element {
  const exportElRef = useRef<HTMLElement>(null)
  const inViewport = useIntersection(exportElRef)
  const [shoe, setShoe] = useState<Footwear|null>(null)
  const [hat, setHat] = useState<Hat|null>(null)
  const [top, setTop] = useState<Top|null>(null)
  const [bottom, setBottom] = useState<Bottom|null>(null)
  const [hair, setHair] = useState<Hair|null>(null)
  const [accs, setAccs] = useState<Accessory|null>(null)
  const [draggedItem, setDraggedItem] = useState<Item|null>(null)

  const states: States = { hair, hat, top, bottom, shoe, accs }
  const setStates: SetStateActions = {
    hair: setHair,
    hat: setHat,
    top: setTop,
    bottom: setBottom,
    shoe: setShoe,
    accs: setAccs,
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
      <Avatar className={$style.avatar} inViewport={inViewport} draggedItem={draggedItem} setDraggedItem={setDraggedItem} states={states} setStates={setStates} />
      <section className={$style.export} ref={exportElRef}></section>
    </main>
  )
}

export default Main

import $style from './Main.module.css'
import '@/assets/avatar/body.css'
import '@/assets/avatar/hat.css'
import '@/assets/avatar/hair.css'
import '@/assets/avatar/top.css'
import '@/assets/avatar/bottom.css'
import '@/assets/avatar/bottom_worn.css'
import '@/assets/avatar/shoe.css'
import '@/assets/avatar/accs.css'

import { useRef,useState, useReducer, useMemo } from 'react'
import Tab from '@/components/Tab'
import TabContent from '@/components/TabContent'
import ColorPicker from '@/components/ColorPicker'
import Avatar from '@/views/Avatar'
import useIntersection from '@/composables/useIntersection'
import { Footwear, Hat, Top, Bottom, Hair, Accessory, ItemState, ItemAction } from 'types'

import _shoes from '@data/shoes.json'
import _hats from '@data/hats.json'
import _tops from '@data/tops.json'
import _bottoms from '@data/bottoms.json'

type Data = { [Property in keyof ItemState]: NonNullable<ItemState[Property]>[] }

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

  const reducer: React.Reducer<ItemState, ItemAction> = (state, action) => {
    const { type, payload } = action
    return { ...state, [type]: payload }
  }

  const [state, dispatch] = useReducer(reducer, {
    hair: null,
    hat: null,
    top: null,
    bottom: null,
    shoe: null,
    accs: null,
  } as ItemState)

  const [draggedItem, setDraggedItem] = useState<ItemState[keyof ItemState]>(null)
  const [hairColor, setHairColor] = useState<string>('4,74%,75%')

  const hairStyle = useMemo(() => ({'--hair-color': hairColor} as React.CSSProperties), [hairColor])

  const itemTypes = Object.keys(state) as (keyof ItemState)[]

  return (
    <main className={$style.main} id="main">
      <section className={$style.edit}>
        <div className={$style.edit_main}>
          <Tab>
            {itemTypes.map(k => (
              <TabContent
                key={k}
                title={k}
                list={data[k]}
                setActive={(payload) => dispatch({ type: k, payload })}
                active={state[k]}
                setDraggedItem={setDraggedItem}
                style={hairStyle}
              />
            ))}
          </Tab>
          <ColorPicker color={hairColor} setColor={setHairColor} />
        </div>
      </section>
      <Avatar
        className={`${$style.avatar} ${inViewport ? $style.overview : ''}`}
        draggedItem={draggedItem}
        setDraggedItem={setDraggedItem}
        states={state} dispatch={dispatch}
        style={hairStyle}
      />
      <section className={$style.export} ref={exportElRef}></section>
    </main>
  )
}

export default Main

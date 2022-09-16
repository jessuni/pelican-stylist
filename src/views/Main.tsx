import $style from './Main.module.css'
import '@/assets/avatar/body.css'
import '@/assets/avatar/hat.css'
import '@/assets/avatar/hair.css'
import '@/assets/avatar/top.css'
import '@/assets/avatar/bottom.css'
import '@/assets/avatar/bottom_worn.css'
import '@/assets/avatar/shoe.css'
import '@/assets/avatar/accs.css'

import { useRef, useState, useReducer, useMemo } from 'react'
import Tab from '@/components/Tab'
import TabContent from '@/components/TabContent'
import ColorPicker from '@/components/ColorPicker'
import Avatar from '@/views/Avatar'
import useIntersection from '@/composables/useIntersection'
import { Footwear, Hat, Top, Bottom, Hair, Accessory, ItemState, ItemAction, ColorState, ColorAction } from 'types'

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
      dyable: true,
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
      dyable: false,
    }
  }) as Accessory[],
}

const SHOW_COLOR_PICKER = ['hair', 'top', 'bottom']

function Main(): JSX.Element {
  const exportElRef = useRef<HTMLElement>(null)
  const inViewport = useIntersection(exportElRef)

  const itemReducer: React.Reducer<ItemState, ItemAction> = (state, action) => {
    const { type, payload } = action
    return { ...state, [type]: payload }
  }
  const [itemState, dispatchItem] = useReducer(itemReducer, {
    hair: null,
    hat: null,
    top: null,
    bottom: null,
    shoe: null,
    accs: null,
  } as ItemState)

  const colorReducer: React.Reducer<ColorState, ColorAction> = (state, action) => {
    const { type, payload } = action
    return { ...state, [type]: payload}
  }
  const [colorState, dispatchColor] = useReducer(colorReducer, {
    top: '0,0%,0%',
    bottom: '30,80%,30%',
    hair: '14,74%,37.5%',
    shoe: '0,0%,0%',
  })

  const [draggedItem, setDraggedItem] = useState<ItemState[keyof ItemState]>(null)
  const [activeTab, setActiveTab] = useState<keyof ColorState>('hair')

  const colorStyle = useMemo(() => ({
    '--hair-color': colorState.hair,
    '--bottom-color': colorState.bottom,
    '--top-color': colorState.top
  } as React.CSSProperties), [colorState])

  const itemTypes = Object.keys(itemState) as (keyof ItemState)[]
  const onSetActiveTab = (tabName: keyof ColorState) => {
    setActiveTab(tabName)
  }
  return (
    <main className={$style.main} id="main">
      <section className={$style.edit}>
        <div className={$style.edit_main}>
          <Tab onSetActiveTab={onSetActiveTab}>
            {itemTypes.map(k => (
              <TabContent
                key={k}
                title={k}
                list={data[k]}
                setActive={(payload) => dispatchItem({ type: k, payload })}
                active={itemState[k]}
                setDraggedItem={setDraggedItem}
                style={colorStyle}
              />
            ))}
          </Tab>
          {SHOW_COLOR_PICKER.indexOf(activeTab) !== -1
    ? <ColorPicker color={colorState[activeTab]} setColor={(payload) => dispatchColor({ type: activeTab, payload })} key={colorState[activeTab]} />
    : null}
        </div>
      </section>
      <Avatar
        className={`${$style.avatar} ${inViewport ? $style.overview : ''}`}
        draggedItem={draggedItem}
        setDraggedItem={setDraggedItem}
        state={itemState} dispatch={dispatchItem}
        style={colorStyle}
      />
      <section className={$style.export} ref={exportElRef}></section>
    </main>
  )
}

export default Main

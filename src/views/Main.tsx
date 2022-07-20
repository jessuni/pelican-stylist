import $style from './Main.module.css'

import { useRef,useState } from 'react'
import Tab from '@/components/Tab'
import TabContent from '@/components/TabContent'
import useIntersection from '@/composables/useIntersection'

import footwear from '@data/footwear.json'
import hats from '@data/hats.json'
import tops from '@data/tops.json'
import bottoms from '@data/bottoms.json'

function Main(): JSX.Element {
  const exportElRef = useRef<HTMLElement>(null)
  const inViewport = useIntersection(exportElRef)
  const [shoes, setShoes] = useState<number>(1001)
  const [hat, setHat] = useState<number>(2001)
  const [top, setTop] = useState<number>(3001)
  const [bottom, setBottom] = useState<number>(4001)
  return (
    <main className={$style.main} id="main">
      <section className={$style.edit}>
        <Tab data={{ footwear, hats, tops, bottoms }}>
          <TabContent title="hats" list={hats} setActive={setHat} active={hat} />
          <TabContent title="tops" list={tops} setActive={setTop} active={top} />
          <TabContent title="bottoms" list={bottoms} setActive={setBottom} active={bottom} />
          <TabContent title="shoes" list={footwear} setActive={setShoes} active={shoes} />
        </Tab>
      </section>
      <section className={$style.user_container}>
        <div className={`${$style.user}${inViewport ? $style._overview : ''}`}>
          <div className={$style.user_info}>
            <div className={$style.user_hair}></div>
            <div className={$style.user_skin}></div>
            <div className={$style.user_eyes}></div>
            <div className={$style.user_accessories}></div>
          </div>
          <div className={$style.user_display}></div>
          <div className={$style.user_outfit}>
            <div className={$style.user_hat} data-name="hats"></div>
            <div className={$style.user_top} data-name="tops"></div>
            <div className={$style.user_bottom} data-name="bottoms"></div>
            <div className={$style.user_shoes} data-name="shoes"></div>
          </div>
        </div>
      </section>
      <section className="export" ref={exportElRef}></section>
    </main>
  )
}

export default Main

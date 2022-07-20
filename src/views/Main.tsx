import $style from './Main.module.css'

import { useRef } from 'react'
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

  return (
    <main className={$style.main} id="main">
      <section className={$style.edit}>
        <Tab data={{ footwear, hats, tops, bottoms }}>
          <TabContent title="hats" list={hats} />
          <TabContent title="tops" list={tops} />
          <TabContent title="bottoms" list={bottoms} />
          <TabContent title="shoes" list={footwear} />
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

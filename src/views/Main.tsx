import './Main.css'

import { useRef } from 'react'
import EditPanel from '@/components/EditPanel'
import useIntersection from '@/composables/useIntersection'

import footwear from '@data/footwear.json'
import hats from '@data/hats.json'
import tops from '@data/tops.json'
import bottoms from '@data/bottoms.json'

function Main(): JSX.Element {
  const exportElRef = useRef<HTMLElement>(null)
  const inViewport = useIntersection(exportElRef)
  console.log(inViewport)

  return (
    <main className="main" id="main">
      <section className="edit">
        {/* TODO: <EditPanel /> */}
        <EditPanel data={{ footwear, hats, tops, bottoms }} />
      </section>
      <section className="user-container">
        <div className={`user${inViewport ? ' _overview' : ''}`}>
          <div className="user-info">
            <div className="user-hair"></div>
            <div className="user-skin"></div>
            <div className="user-eyes"></div>
            <div className="user-accessories"></div>
          </div>
          <div className="user-display"></div>
          <div className="user-outfit">
            <div className="user-hat"></div>
            <div className="user-top"></div>
            <div className="user-bottom"></div>
            <div className="user-shoes"></div>
          </div>
        </div>
      </section>
      <section className="export" ref={exportElRef}></section>
    </main>
  )
}

export default Main

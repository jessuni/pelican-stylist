import { useEffect, useRef } from 'react'
import './ParallaxItem.css'

type ParallaxProps = {
  scale: number,
  value: number,
  left: string,
  top: string,
  src: string,
  alt: string,
}

function ParallaxItem(props: ParallaxProps):JSX.Element {
  const divRef = useRef<HTMLDivElement>(null)

  const mouseMoveHandler = (e: MouseEvent):void => {
    const x = (window.innerWidth - e.pageX * props.value) / 90
    const y = (window.innerHeight - e.pageY * props.value) / 90
    if (divRef.current) {
      divRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandler)
    return (() => { window.removeEventListener('mousemove', mouseMoveHandler )})
  })

  const rotate = Math.round(Math.random() * 360) + 'deg'
  return (
    <div className="parallax-layer"
      ref={divRef}
      style={{top: props.top, left: props.left}}
    >
      <img src={props.src}
        alt={props.alt}
        style={{transform: `rotate(${rotate}) scale(${props.scale})` }}
      />
    </div>
  )
}

export default ParallaxItem

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

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX * props.value) / 90
      const y = (window.innerHeight - e.pageY * props.value) / 90
      if (divRef.current) {
        divRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`
      }
    })
  })

  const rotate = Math.round(Math.random() * 360) + 'deg'
  return (
    <div className="Parallax-layer"
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

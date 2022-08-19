import './ColorPicker.css'

import { useState, useMemo } from 'react'

type Props = {
  className?: string,
  color: string,
  setColor: React.Dispatch<React.SetStateAction<string>>
}

const HUE_RANGE = 360
const SAT_RANGE = 100
// max lightness in game is 50%
const LIGHT_RANGE = 50
const PER_RANGE = 100
// the max color value in Stardew Valley is 99 not 100
const MAX_VALUE = 99

function rangeToPercentage(string: string, range: number, replaceMark: string = '%') {
  string = string.replace(replaceMark, '')
  return Math.round(+string * range / PER_RANGE)
}


function ColorPicker({ className, color, setColor }: Props): JSX.Element {
  const hsl = color.split(',')

  const [h, setH] = useState<number>(rangeToPercentage(hsl[0], HUE_RANGE))
  const [s, setS] = useState<number>(rangeToPercentage(hsl[1], SAT_RANGE))
  const [l, setL] = useState<number>(rangeToPercentage(hsl[2], LIGHT_RANGE))

  const hPercent = useMemo(() => Math.round(h * PER_RANGE / HUE_RANGE), [h])
  const sPercent = useMemo(() => Math.round(s * PER_RANGE / SAT_RANGE), [s])
  const lPercent = useMemo(() => Math.round(l * PER_RANGE / LIGHT_RANGE), [l])
  const setHsl = (
    type: 'h' | 's' | 'l',
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    const value: string = (e.target as HTMLInputElement).value
    if (type === 'h') {
      setH(+value)
    }
    if (type === 's') {
      setS(+value)
    }
    if (type === 'l') {
      setL(+value)
    }
    setColor(`${h},${s}%,${lPercent}%`)
  }

  const style = {'--cp-hue': h, '--cp-sat': `${s}%`, '--cp-light': `${l}%`} as React.CSSProperties
  const maxHue = MAX_VALUE * HUE_RANGE / PER_RANGE
  const maxSat = MAX_VALUE * SAT_RANGE / PER_RANGE
  const maxLight = MAX_VALUE * LIGHT_RANGE / PER_RANGE
  return(
    <div className={`cp${className ? ' ' + className : ''}`} style={style}>
      <label className="cp-field">
        <span className="cp-field_name">Hue</span>
        <span className="cp-field_value">{hPercent}</span>
        <input className="cp-field_input Hue" type="range" min="0" max={maxHue} step={HUE_RANGE / PER_RANGE} value={h} onChange={(e) => setHsl('h', e)}></input>
      </label>
      <label className="cp-field">
        <span className="cp-field_name">Saturation</span>
        <span className="cp-field_value">{sPercent}</span>
        <input className="cp-field_input Sat" type="range" min="0" max={maxSat} step={SAT_RANGE / PER_RANGE} value={s} onChange={(e) => setHsl('s', e)}></input>
      </label>
      <label className="cp-field">
        <span className="cp-field_name">Lightness</span>
        <span className="cp-field_value">{lPercent}</span>
        <input className="cp-field_input Light" type="range" min="0" max={maxLight} step={LIGHT_RANGE / PER_RANGE} value={l} onChange={(e) => setHsl('l', e)}></input>
      </label>
    </div>
  )
}

export default ColorPicker

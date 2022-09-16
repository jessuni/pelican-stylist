import './ColorPicker.css'

import { useReducer, useMemo, useEffect, ChangeEvent } from 'react'

type Props = {
  className?: string
  color: string
  setColor: (value: string) => void
}

type State = {
  h: number
  s: number
  l: number
}

type Action = {
  type: keyof State
  payload: number | string
}

const HUE_RANGE = 360
const SAT_RANGE = 100
// max lightness in game is 50%
const LIGHT_RANGE = 50
const PER_RANGE = 100
// the max color value in game is 99 not 100
const MAX_VALUE = 99

function ColorPicker({ className, color, setColor }: Props): JSX.Element {
  const [h, s, l] = color.split(',').map(i => parseFloat(i.replace('%', '')))
  const initState = { h, s, l }
  const reducer: React.Reducer<State, Action> = (state, action) => {
    const { type, payload } = action
    return { ...state, [type]: +payload }
  }
  const [state, dispatch] = useReducer(reducer, initState)

  const hPercent = useMemo(() => Math.round(state.h * PER_RANGE / HUE_RANGE), [state.h])
  const sPercent = useMemo(() => Math.round(state.s * PER_RANGE / SAT_RANGE), [state.s])
  const lPercent = useMemo(() => Math.round(state.l * PER_RANGE / LIGHT_RANGE), [state.l])

  const onInputChange = (type: keyof State, e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type, payload: +e.target.value })
    setColor(`${h},${s}%,${l}%`)
  }

  const style = {'--cp-hue': state.h, '--cp-sat': `${state.s}%`, '--cp-light': `${state.l}%`} as React.CSSProperties
  const maxHue = 100 * HUE_RANGE / PER_RANGE
  const maxSat = MAX_VALUE * SAT_RANGE / PER_RANGE
  const maxLight = MAX_VALUE * LIGHT_RANGE / PER_RANGE
  return(
    <div className={`cp${className ? ' ' + className : ''}`} style={style}>
      <label className="cp-field">
        <span className="cp-field_name">Hue</span>
        <span className="cp-field_value">{hPercent}</span>
        <input className="cp-field_input Hue" type="range" min="0" max={maxHue} step={HUE_RANGE / PER_RANGE} value={state.h} onChange={(e) => onInputChange('h', e)}></input>
      </label>
      <label className="cp-field">
        <span className="cp-field_name">Saturation</span>
        <span className="cp-field_value">{sPercent}</span>
        <input className="cp-field_input Sat" type="range" min="0" max={maxSat} step={SAT_RANGE / PER_RANGE} value={state.s} onChange={(e) => onInputChange('s', e)}></input>
      </label>
      <label className="cp-field">
        <span className="cp-field_name">Lightness</span>
        <span className="cp-field_value">{lPercent}</span>
        <input className="cp-field_input Light" type="range" min="0" max={maxLight} step={LIGHT_RANGE / PER_RANGE} value={state.l} onChange={(e) => onInputChange('l', e)}></input>
      </label>
    </div>
  )
}

export default ColorPicker

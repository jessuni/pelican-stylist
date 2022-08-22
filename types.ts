export interface Recipe {
  name: string
  href?: string
  img?: string
}

export interface Item {
  id: number
  name: string
  img: string
  type: string
  initial: boolean
  href?: string
  description?: string
  obtain?: string[]
}

export interface Top extends Item {
  type: 'top'
  recipe: Recipe[]
  dyable: boolean
  dye_desc?: string
}

export interface Bottom extends Item {
  type: 'bottom'
  recipe: Recipe[]
  dyable: boolean
}

export interface Hat extends Item {
  type: 'hat'
  initial: false
  recipe: Recipe[]
}

export interface Footwear extends Item {
  type: 'shoe'
  initial: false
  buy_price: number | null
  sell_price: number | null
  effect: {
    type: string
    degree: number
  }
}

export interface Hair extends Item {
  type: 'hair'
  initial: true
}

export interface Accessory extends Item {
  type: 'accs'
  initial: true
}

export type ItemState = {
  shoe: Footwear | null
  hat: Hat | null
  top: Top | null
  bottom: Bottom | null
  hair: Hair | null
  accs: Accessory | null
}

export type ItemAction = { type: keyof ItemState, payload: Item | null }

import { Footwear, Hat, Top, Bottom } from '../types'
declare module 'footwear.json' {
  const footwear: Footwear
  export default footwear
}
declare module 'hats.json' {
  const hats: Hat[]
  export default hats
}
declare module 'tops.json' {
  const tops: Top[]
  export default tops
}
declare module 'bottoms.json' {
  const bottoms: Bottom[]
  export default bottoms
}

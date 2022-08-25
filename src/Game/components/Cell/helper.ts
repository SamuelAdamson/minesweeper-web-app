import { AdjacentStr } from './Cell'

export function getAdjacentStr(adjacentNum: number): AdjacentStr {
  switch(adjacentNum) {
    case 1: return 'one'
    case 2: return 'two'
    case 3: return 'three'
    default: return 'fourplus'
  }
}
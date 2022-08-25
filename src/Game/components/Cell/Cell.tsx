import { CSSProperties, useState } from 'react'
import { getAdjacentStr } from './helper'
import styles from './Cell.module.css'
import cx from 'classnames'

export type AdjacentStr = 'one' | 'two' | 'three' | 'fourplus'

type Props = {
  mode: string
  adjacentNum: number
  content?: string
}


export const Cell = ( { mode, adjacentNum, content }: Props ) => {
  const cellMode: CSSProperties = { "--mode": `var(--${mode})` } as CSSProperties;
  
  const [covered, setCovered] = useState<Boolean>(true)
  const [adjacent, setAdjacent] = useState<AdjacentStr>(getAdjacentStr(adjacentNum))

  return (
    <div 
      className={ 
        covered ? cx(styles.cell, styles.covered)
        : cx(styles.cell, styles.uncovered, adjacent) 
      } 
      style={ cellMode } 
      onContextMenu={(e)=> e.preventDefault()}  
    >
      <h3>{ content }</h3>
    </div>
  )
}
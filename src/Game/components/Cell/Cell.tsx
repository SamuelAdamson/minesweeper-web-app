import { CSSProperties, useState, MouseEvent } from 'react'
import { getAdjacentStr } from './helper'
import styles from './Cell.module.css'
import cx from 'classnames'

export type AdjacentStr = 'one' | 'two' | 'three' | 'fourplus'

type Props = {
  mode: string
  mine: boolean
  adjacentNum: number
  content?: string
}


export const Cell = ( { mode, mine, adjacentNum, content }: Props ) => {
  const cellMode: CSSProperties = { "--mode": `var(--${mode})` } as CSSProperties;
  
  const [covered, setCovered] = useState<Boolean>(true)
  const [flagged, setFlagged] = useState<Boolean>(true)
  const [adjacent, setAdjacent] = useState<AdjacentStr>(getAdjacentStr(adjacentNum))

  const handleClick = (e: MouseEvent<HTMLElement>) => {

    setCovered(false);
  }

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault() // suppress context menu
    setFlagged(true);
  }

  return (
    <div 
      className={ 
        covered ? cx(styles.cell, styles.covered)
        : (
            mine ? cx(styles.cell, styles.mine)
            : cx(styles.cell, styles.uncovered, adjacent)
          )
      } 
      style={ cellMode } 
      onClick={ handleClick }
      onContextMenu={ handleRightClick }
    >
      <h3>{ content }</h3>
    </div>
  )
}
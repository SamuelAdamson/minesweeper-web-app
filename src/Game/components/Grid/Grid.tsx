import { useState } from 'react'
import { Cell } from '..'


type Props = {
  mode: 'easy' | 'medium' | 'hard'
}

type dimension = [number, number]

type gridSizes = {
  easy: dimension
  medium: dimension
  hard: dimension
}




const gridSize: gridSizes = {
  easy : [8, 12],
  medium : [12, 16],
  hard : [16, 20]
}

export const Grid = ( { mode } : Props ) => {
	const [dimensions, setDimensions] = useState<dimension>(gridSize[mode])
  const [numRows, setNumRows] = useState<number>(dimensions[0])
  const [numCols, setNumCols] = useState<number>(dimensions[1])

  

  return (
    <>

    </>
  )
}
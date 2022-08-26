import { Cell } from './components/Cell'

export const Game = () => {
  return (
    <>
      <Cell mode="easy" mine={false} adjacentNum={1} />
    </>
  )
}
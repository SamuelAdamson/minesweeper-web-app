import { AdjacentStr, Mode } from '../type';
import styles from './Cell.module.css';
import cx from 'classnames';

function getAdjacentStr(adjacentNum: Number): AdjacentStr {
  switch (adjacentNum) {
    case 0: return 'zero';
    case 1: return 'one';
    case 2: return 'two';
    case 3: return 'three';
    default: return 'fourplus';
  }
}

export function getStyle(
    covered: Boolean, 
    mine: Boolean, 
    adjMines: Number,
    paused: Boolean, 
    mode: Mode,
    gameOver: Boolean
) : string 
{
  let modeStyle: String = (mode == 'easy') ? styles.cellEasy 
      : (mode == 'medium') ? styles.cellMedium : styles.cellHard;
  
  let style = paused
    ? cx(styles.paused) : covered
      ? (gameOver ? (mine ? cx(styles.mine) : cx(styles.covered, styles.gameOver)) : cx(styles.covered)) : mine
        ? cx(styles.mine) : cx(styles.uncovered, styles[getAdjacentStr(adjMines)]);

  return cx(styles.cell, style, modeStyle);
}
